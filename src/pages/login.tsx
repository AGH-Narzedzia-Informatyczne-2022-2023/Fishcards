import Head from 'next/head'
import { NextPage } from 'next';
import Link from 'next/link';

const Login: NextPage = () => {
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

                <form action="">
                    <div>
                        <input type="email" name="email" placeholder="Email" />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="Password" />
                    </div>
                    <div>
                        <button> Submit </button>
                    </div>
                    <div>
                        <button> Signin with Google </button>
                    </div>
                    <div>
                        <button> Signin with Github </button>
                    </div>
                    <div>
                        <p> You don't have an account? <Link href={'/signup'}> Signup </Link></p>
                    </div>
                </form>
            </main>
        </>
    );
}

export default Login;