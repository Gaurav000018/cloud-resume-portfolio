# AWS Deployment & Monitoring Setup Guide

This guide details how to configure AWS S3, set up the AWS EC2 server, configure IAM Roles, configure GitHub Actions, and set up CloudWatch monitoring.

---

## 1. AWS S3 Setup (Static Assets Storage)

We store images and documents (like your resume) on S3 to offload asset serving and decrease container sizes.

### Step-by-Step Configuration:
1. Log in to the **AWS Management Console** and navigate to **S3**.
2. Click **Create bucket**.
   - **Bucket name**: Choose a unique name (e.g., `gaurav-portfolio-assets-123`).
   - **Region**: Same region as your EC2 (e.g., `us-east-1`).
   - **Object Ownership**: ACLs disabled (recommended).
3. **Block Public Access settings**:
   - For a public portfolio, **uncheck** "Block *all* public access".
   - Acknowledge that the objects will become public.
4. Click **Create bucket**.
5. Upload your files into the bucket:
   - `avatar.png` (profile photo)
   - `project1.png` (project 1 image)
   - `project2.png` (project 2 image)
   - `project3.png` (project 3 image)
   - `resume.pdf` (resume download)
6. Add a **Bucket Policy** to allow read access to public visitors:
   - Navigate to the **Permissions** tab of the bucket.
   - Click **Edit** under **Bucket policy** and paste this JSON (replace `your-bucket-name` with your actual bucket name):
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Sid": "PublicReadGetObject",
           "Effect": "Allow",
           "Principal": "*",
           "Action": "s3:GetObject",
           "Resource": "arn:aws:s3:::your-bucket-name/*"
         }
       ]
     }
     ```

---

## 2. AWS EC2 Server Setup

### Step 1: Launch EC2 Instance
1. Go to **EC2 Dashboard** -> click **Launch instance**.
2. **Name**: `portfolio-prod-server`.
3. **OS (AMI)**: `Ubuntu Server 24.04 LTS` (Eligible for Free Tier).
4. **Instance Type**: `t2.micro` (or `t3.micro`).
5. **Key pair**: Create or select an existing SSH key pair (`.pem` format). Download the private key; you will need it for GitHub Actions.
6. **Network Settings**:
   - Create a security group.
   - **Inbound Security Group Rules**:
     - Port `22` (SSH) from `My IP` (for security) or `Anywhere` (required for GitHub Actions runner IPs, or use Github Actions IP whitelist).
     - Port `80` (HTTP) from `Anywhere` (`0.0.0.0/0`).
     - Port `443` (HTTPS) from `Anywhere` (`0.0.0.0/0`).

### Step 2: Create IAM Role for EC2 (S3 + CloudWatch access)
We must grant the EC2 instance permission to stream metrics/logs to CloudWatch and read from S3.
1. Go to **IAM Console** -> **Roles** -> **Create role**.
2. Select **AWS service** -> **EC2** as the trusted entity.
3. Search and attach the following managed policies:
   - `CloudWatchAgentServerPolicy` (Allows CloudWatch agent to upload metrics)
   - `AmazonEC2ContainerRegistryReadOnly` (Optional: if pulling from AWS ECR)
4. Name the role `EC2-Portfolio-Role` and click **Create role**.
5. Back in **EC2 Dashboard**, select your EC2 instance -> **Actions** -> **Security** -> **Modify IAM role**.
6. Select `EC2-Portfolio-Role` and click **Update IAM role**.

### Step 3: Install Docker and Docker Compose on EC2
Connect to your EC2 instance via SSH and run this setup script:
```bash
# Update local packages
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker dependencies
sudo apt-get install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key
sudo fold -w 10 /etc/apt/keyrings/docker.gpg || true
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up repository
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker Engine & Compose
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start Docker and enable auto-start
sudo systemctl enable docker
sudo systemctl start docker

# Add your user to the docker group so you don't need 'sudo' prefix
sudo usermod -aG docker ubuntu

# Apply group changes without logging out
newgrp docker
```

---

## 3. GitHub Secrets Configuration

Add these variables to your GitHub repository (**Settings** -> **Secrets and variables** -> **Actions** -> **New repository secret**):

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `SSH_PRIVATE_KEY` | Content of the downloaded `.pem` key file | `-----BEGIN RSA PRIVATE KEY-----...` |
| `EC2_HOST` | EC2 Public IP address or Public DNS | `54.210.33.190` |
| `EC2_USERNAME` | SSH username for the OS | `ubuntu` |
| `GHCR_PAT` | Optional: GitHub PAT with `read:packages` permission if package is private | `ghp_xxxx` |

---

## 4. AWS CloudWatch Host Monitoring Setup

### Step 1: Install CloudWatch Unified Agent on EC2
Run these commands on the EC2 server to download and install the agent package:
```bash
# Download agent deb package
wget https://amazoncloudwatch-agent.s3.amazonaws.com/ubuntu/amd64/latest/amazon-cloudwatch-agent.deb

# Install agent package
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
```

### Step 2: Push Configuration File
Copy the `amazon-cloudwatch-agent.json` file from your repository to `/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json` on the EC2 server:
```bash
# On your local machine, or inside deployment pipeline, copy file:
# scp -i your-key.pem amazon-cloudwatch-agent.json ubuntu@your-ec2-ip:/tmp/

# On the EC2 server, move the configuration file:
sudo mv /tmp/amazon-cloudwatch-agent.json /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
```

### Step 3: Start CloudWatch Agent
Start the agent using the configuration file:
```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -s \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json
```

Check agent status:
```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a status
```

### Step 4: Verify Metrics in CloudWatch Console
1. Go to **AWS CloudWatch** console.
2. Under **Metrics** -> click **All metrics**.
3. Under Custom Namespaces, select **CWAgent**.
4. You will see metrics for **cpu_usage_active**, **disk_used_percent**, and **mem_used_percent** mapped to your EC2 instance ID!
5. You can now build a CloudWatch Dashboard or configure billing/performance alarms!
