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

const Groups: NextPage = () => {
  const { data: sessionData } = useSession();

  const myGroups = trpc.group.getAll.useQuery();

  const ShowGroups = () => (
      <>
        {myGroups.data?.map(group => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td className="flex justify-end">
                <UpdateGroup id={group.id}/>
                <DeleteGroup id={group.id}/>
                <AddToGroup id={group.id}/>
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
                  <th className="bg-gray-700">Index</th>
                  <th className="bg-gray-700">Group name</th>
                  <th className="bg-gray-700"></th>
                </tr>
              </thead>
              <tbody>
                <ShowGroups/>
              </tbody>
            </table>
            <div className="mt-4">
              <CreateGroup/>
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