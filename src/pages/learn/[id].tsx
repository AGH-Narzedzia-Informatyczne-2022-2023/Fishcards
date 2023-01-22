import Head from "next/head";
import { getSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import React from "react";
import { BestCard } from "../../components/BestCard";

function Learn() {
  const router = useRouter();
  const query = router.query;
  const deckId = Number(query.id);

  const forceReload = () => {
    router.reload();
  }

  return (
    <>
      <Head>
        <title> Fishcards </title>
        <meta name="description" content="Fishcards - smart learning with flashcards" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Navbar></Navbar>
      
      <main className="p-4 m-auto min-h-screen bg-base-200">
        <div className="max-w-5xl m-auto p-4">
          <div className="overflow-x-auto w-full">

            <BestCard id={deckId}/>

            <div className="mt-4">
              <button onClick={forceReload} className="btn btn-primary"> Next </button>
              <a className="ml-4 btn btn-bordered" href="/decks"> End Session </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Learn;

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }

}