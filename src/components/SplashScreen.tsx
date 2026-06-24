import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set body background to white for splash screen
    document.body.style.backgroundColor = '#FFFFFF';
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      // Revert to black when splash is done
      document.body.style.backgroundColor = '#0A0A0A';
    };
  }, []);

  const handleExitComplete = () => {
    onFinish();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete} mode="wait">
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <img
            src="/images/logofull.png"
            alt="Tempest Gold"
            className="w-64 md:w-80 lg:w-96 h-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
