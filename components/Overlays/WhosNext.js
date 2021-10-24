import styles from "@styles/Overlays.module.css";
import { motion } from "framer-motion";
import TeamData from "@utils/TeamData";
import StreamerProfileImage from "@components/StreamerProfileImage";
import { getTimeRemaining } from "@utils/Date";
import Countdown from "react-countdown";
import Fetcher from "@utils/Fetcher";
import useSWR from "swr";

export default function WhosNext() {
    const { data, error } = useSWR ('/api/next-up', Fetcher);

    if (error) { return "An error has occurred!"};
    if (!data) { return  <></>}

    const { nextUp, avatar, isPartner } = data;
    const { broadcast_name, start_time, title } = nextUp;

    return (
        <div className={styles.overlay__container}>
          <div className={styles.overlay__whosNext__topLeft}>
            <motion.div
              className={styles.overlay__whosNext__container}
              style={{ opacity: "0" }}
              animate={{
                opacity: ["0", "1", "1", "0"],
              }}
              transition={{
                duration: 20,
                ease: "easeIn",
                times: [0, 0.05, 0.95, 1],
                repeat: Infinity,
                repeatDelay: 30,
              }}>
              <motion.div
                className={styles.overlay__whosNext__upNext}
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  times: [0, 0.5, 1],
                  repeat: Infinity,
                }}>
                <p>Up Next</p>
              </motion.div>
              <div className={styles.overlay__whosNext__avatar}>
                <StreamerProfileImage imageUrl={avatar} isPartner={isPartner} />
              </div>
              <div className={styles.overlay__whosNext__details}>
                <p className={styles.overlay__whosNext__details__streamer}>
                  {broadcast_name} in&nbsp;
                  <Countdown date={start_time} />
                </p>
                <p className={styles.overlay__whosNext__details__title}>{title}</p>
              </div>
            </motion.div>
          </div>
        </div>
      );
}
