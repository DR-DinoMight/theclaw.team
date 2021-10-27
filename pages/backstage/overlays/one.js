import ClawPromoBanner from "@components/Overlays/ClawPromoBanner";
import { useSession, getSession, signIn } from "next-auth/client";


export default function OverlayOne() {
  const [session] = useSession();

  return (
    <ClawPromoBanner />
  );
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
