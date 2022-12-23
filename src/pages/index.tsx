import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {

  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Fishcards</title>
        <meta name="description" content="Webapp for smart learning" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      <main>
        { session ? <h1> Hello {session.user?.name} </h1> : <h1> Hello guest </h1> }
      </main>

    </>
  );
};

export default Home;
