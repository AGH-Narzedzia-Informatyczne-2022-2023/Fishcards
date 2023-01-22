import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Navbar from "../components/Navbar";
import { CreateGroup } from "../components/CreateGroup";
import { UpdateGroup } from "../components/UpdateGroup";
import { DeleteGroup } from "../components/DeleteGroup";
import { AddToGroup } from "../components/AddToGroup";
import { CreateDeck } from "../components/CreateDeck";
import FormikContainer from "../components/FormikContainer";
import { decl } from "postcss";

const Groups: NextPage = () => {

  const myDecks = trpc.deck.getAll.useQuery();

  const ShowDecks = () => (
      <>
        {myDecks.data?.map(deck => (
            <tr key={deck.id}>
              <td>{deck.id}</td>
              <td>{deck.name}</td>
              <td>{deck.description}</td>
              <td className="flex justify-end">
                <Link href={`/decks/${encodeURIComponent(deck.id)}`} className="btn btn-warning mr-4"> Enter </Link>
                <Link href={`/learn/${encodeURIComponent(deck.id)}`} className="btn btn-accent"> Learn </Link>
              </td>
            </tr>
        ))}
      </>
  )

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
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Deck name</th>
                  <th>Deck description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ShowDecks/>
              </tbody>
              
              
            </table>
            <div className="mt-4">
              <CreateDeck/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Groups;

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