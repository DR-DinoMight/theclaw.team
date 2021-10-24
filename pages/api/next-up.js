import { useSession, getSession, signIn } from "next-auth/client";
import TeamData from "@utils/TeamData";

export default async (req, res) => {
   const session = await getSession({req});

    if (!session) {
        return res.status(403).json({ message: "You must be signed in to view this page." });l
    }

    var nextUpArr = await TeamData.getWhosNext();

    // Check through the next up data and exlude any where the start_time passes
    // Assign to the next up
    nextUpArr = nextUpArr.filter(
      (streamer) => new Date(streamer.start_time) >= new Date() && !streamer.vacation,
    );

    const nextUp = nextUpArr[0] ?? null;

    const streamer = await TeamData.getStreamer(nextUp.broadcast_name.toLowerCase());

    return res
        .status(200)
        .json({
            nextUp,
            avatar: streamer.profile_image_url,
            isPartner: streamer.broadcaster_type && streamer.broadcaster_type === "partner"
        });
}
