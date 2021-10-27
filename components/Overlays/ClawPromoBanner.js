import MothAndBanner from "@components/OverlayElements/MothAndBanner";
import styles from "@styles/Overlays.module.css";
import { motion } from "framer-motion";

export default function ClawPromoBanner() {
  return (
    <div className={styles.overlay__container}>
      <div className={styles.overlay__one__topLeft}>
        <motion.div
          className={styles.overlay__one__moth}
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}>
          <MothAndBanner />
        </motion.div>

        <motion.div
          className={styles.overlay__one__url}
          style={{ y: "-200%" }}
          animate={{
            y: ["-200%", "0%", "0%", "-200%"],
          }}
          transition={{
            duration: 5,
            ease: "easeIn",
            times: [0, 0.05, 0.95, 1],
            repeatDelay: 30,
            repeat: Infinity,
          }}>
          theclaw.team
        </motion.div>
      </div>
    </div>
  );
}
