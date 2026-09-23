import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <AnimatePresence onExitComplete={onFinish} mode="wait">
      {visible && (
        <motion.div
          className="brand-splash"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          <img
            className="splash-photo"
            src="/images/advisory-workspace.webp"
            alt=""
          />
          <div className="splash-shade" />
          <p className="splash-top-left">
            Real Estate · Advisory · Solutions
            <br />
            For a Stronger Botswana
          </p>
          <p className="splash-top-right">People · Places · Potential</p>
          <div className="splash-brand">
            <img
              src="/images/logofull.png"
              alt="Tempest Gold - Your Property Pros"
            />
            <p>Building value. Empowering people. Transforming spaces.</p>
            <div className="splash-progress">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <small>Loading…</small>
          </div>
          <p className="splash-location">Gaborone · Botswana · Africa</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
