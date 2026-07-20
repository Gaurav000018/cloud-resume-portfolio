import { FaUndo, FaExclamationTriangle } from 'react-icons/fa';

interface NotFoundProps {
  onBackToHome: () => void;
}

export default function NotFound({ onBackToHome }: NotFoundProps) {
  return (
    <section className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Grid lines and background blur elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-red-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg glass-panel p-8 sm:p-12 rounded-2xl border-red-500/20 shadow-2xl">
        <div className="inline-flex p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-6 animate-bounce">
          <FaExclamationTriangle className="text-4xl" />
        </div>

        <h1 className="font-outfit text-5xl font-extrabold text-white leading-none tracking-tight mb-2">
          404
        </h1>
        <h2 className="font-outfit text-xl font-bold text-slate-200 mb-4 uppercase tracking-wider">
          Error: CONTAINER_NOT_FOUND
        </h2>
        
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-mono">
          The requested pod/address does not exist in the current routing configuration. 
          The connection was terminated by upstream proxy.
        </p>

        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
        >
          <FaUndo className="text-sm" />
          <span>Restart Cluster (Back to Home)</span>
        </button>
      </div>

      {/* Mock Kubernetes logs */}
      <div className="mt-8 relative z-10 w-full max-w-md font-mono text-[10px] text-slate-500 text-left bg-slate-900/40 border border-slate-900/60 p-4 rounded-lg overflow-hidden">
        <p className="text-red-400">[ERROR] pod-ingress-controller: path /invalid not mapped to active deployments</p>
        <p>[INFO] ingress-nginx: 192.168.1.1 - - [18/Jul/2026:20:13:30 +0000] "GET /invalid HTTP/1.1" 404</p>
        <p>[WARN] core-scheduler: reschedule failed for terminated route</p>
      </div>
    </section>
  );
}
