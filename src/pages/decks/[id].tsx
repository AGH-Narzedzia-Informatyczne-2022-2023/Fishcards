import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../../utils/trpc";
import Navbar from "../../components/Navbar";
import { CreateCard } from "../../components/CreateCard";
import { UpdateGroup } from "../../components/UpdateGroup";
import { DeleteGroup } from "../../components/DeleteGroup";
import { AddToGroup } from "../../components/AddToGroup";
import { useRouter } from "next/router";
import React from "react";
import { UpdateCard } from "../../components/UpdateCard";
import { DeleteCard } from "../../components/DeleteCard";

function Decks() {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const query = router.query;
  const deckId = Number(query.id);

  const myCards = trpc.card.getAll.useQuery({ id: deckId });
  const currDeck = trpc.deck.getOne.useQuery({ id: deckId });

  const ShowCards = () => (
      <>
        {myCards.data?.map(card => (
            <tr key={card.id}>
              <td>{card.id}</td>
              <td>{card.question}</td>
              <td>{card.answer}</td>
              <td className="flex justify-end">
                <UpdateCard id={card.id}/>
                <DeleteCard id={card.id}/>
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

            <div className="normal-case text-2xl mb-4">
                { currDeck.data?.name ? currDeck.data.name : null }
            </div>

            <table className="table w-full">
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <ShowCards/>
              </tbody>
            </table>
            <div className="mt-4">
              <CreateCard id={deckId}/>
              <a className="ml-4 btn btn-bordered" href="/decks"> Go back </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Decks;

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