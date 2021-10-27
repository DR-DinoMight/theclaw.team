import ClawPromoBanner from "@components/Overlays/ClawPromoBanner";
import WhosNext from "@components/Overlays/WhosNext";
import { useSession, getSession, signIn } from "next-auth/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 *  Take all overlay and cycle through each of them like a carousel.
 *  Also allow for custom configuration via query params.
 */

// ?overlays=claw-promo-banner,whos-next&delay-between=5

export default function TickerOverlay() {
    const overlays = [
        "WhosNext",
        "ClawPromoBanner"
    ];

    const cycleTimeInS = 20;

    const [currentOverlay, setCurrentOverlay] = useState(overlays[0]);


    useEffect( () => {
        const interval = setInterval( () => {
            //get the next overlay in the list, if no more then start from the beginning
            let nextOverlayIndex = (overlays.indexOf(currentOverlay)+1);
            if(nextOverlayIndex >= overlays.length) {
                nextOverlayIndex = 0;
            }

            setCurrentOverlay(overlays[nextOverlayIndex]);

        }, cycleTimeInS * 1000);

        return () => clearInterval(interval);
    }, [setCurrentOverlay, currentOverlay]);

    // every x Seconds cycle through and get the next components from the overlays array
    // and render them.

    // To do add animation for fading between components.
        return (
        <>
            {currentOverlay === "WhosNext" && <WhosNext customTransition={true}/>}
            {currentOverlay === "ClawPromoBanner" && <ClawPromoBanner />}
        </>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: "/backstage",
        },
      };
    }

    return {
      props: {
        session: await getSession(context),
      },
    };
  }
