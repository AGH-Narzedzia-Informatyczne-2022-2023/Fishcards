import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"

const Signup: NextPage = () => {

    return (
        <>
            <Head>
                <title>Fishcards</title>
                <meta name="description" content="Webapp for smart learning" />
                <link rel="icon" href="/logo.svg" />
            </Head>

            <main>
                <div>
                    <h1>Register page</h1>
                </div>

                <form>
                    <div>
                        <input type="text" name="username" placeholder="Username" />
                    </div>
                    <div>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div>
                        <input type="password" name="cpassword" placeholder="Confirm Password" />
                    </div>
                    <div>
                        <button> Signup </button>
                    </div>
                </form>

                <div>
                    <p> You already have an account? <Link href={'/signin'}> Sign in </Link></p>
                </div>

            </main>
        </>
    );
}

export default Signup;