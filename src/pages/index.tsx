import { GetServerSideProps } from "next";
import {type NextPage } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Fishcards</title>
        <meta name="description" content="Webapp for smart learning" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      <main>
        You should be logged in to see this.
        <div>
          <button onClick={ () => signOut() }> Logout </button>
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}