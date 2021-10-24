import { useSession, getSession, signIn } from "next-auth/client";
import WhosNext from "@components/Overlays/WhosNext";

export default function OverlayWhosNext(props) {
  const [session] = useSession();

  return (
    <WhosNext />
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
