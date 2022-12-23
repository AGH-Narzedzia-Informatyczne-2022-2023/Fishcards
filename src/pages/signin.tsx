import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"

const Signin: NextPage = () => {

    const { data: session } = useSession();

    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: `${window.location.origin}`});
    }

    async function handleGithubSignin() {
        signIn('github', { callbackUrl: `${window.location.origin}`});
    }

    return (
        <>
            <Head>
                <title>Fishcards</title>
                <meta name="description" content="Webapp for smart learning" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main>
                <div>
                    <h1>Login page</h1>
                </div>

                <form>
                    <div>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div>
                        <button> Submit </button>
                    </div>
                </form>

                <div>
                    <button onClick={ handleGoogleSignin }> Signin with Google </button>
                </div>
                <div>
                    <button onClick={ handleGithubSignin }> Signin with Github </button>
                </div>
                <div>
                    <p> You don't have an account? <Link href={'/signup'}> Signup </Link></p>
                </div>

            </main>
        </>
    );
}

export default Signin;