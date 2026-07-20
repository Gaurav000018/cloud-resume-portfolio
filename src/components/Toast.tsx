import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 bg-slate-900 border border-emerald-500/30 text-white px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md"
        >
          <FaCheckCircle className="text-emerald-500 text-lg shrink-0 animate-pulse" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-wide">{message}</span>
            <span className="text-[10px] text-slate-400">PDF download triggered successfully</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
