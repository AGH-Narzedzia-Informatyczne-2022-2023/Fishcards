import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { getSession, signIn, useSession } from "next-auth/react"
import { useFormik } from "formik"
import Navbar from '../components/Navbar';

const Signin: NextPage = () => {

    interface Values {
        email: string;
        password: string;
    }

    interface Errors {
        email?: string;
        password?: string;
    }

    const validateSignin = (values : Values) => {
        let errors: Errors = {};

        if (!values.email) {
            errors.email = 'Required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate : validateSignin,
        onSubmit
    })

    async function onSubmit(values : any) {
        console.log(values)
    }

    async function handleGoogleSignin() {
        signIn('google', { callbackUrl: `${window.location.origin}`});
    }

    async function handleGithubSignin() {
        signIn('github', { callbackUrl: `${window.location.origin}`});
    }

    async function handleDiscordSignin() {
        signIn('discord', { callbackUrl: `${window.location.origin}`});
    }

    async function handleCredentialsSignin() {
        signIn('credentials',  { callbackUrl: `${window.location.origin}`});
    }

    return (
        <>
            <Head>
                <title>Fishcards</title>
                <meta name="description" content="Webapp for smart learning" />
                <link rel="icon" href="/logo.svg" />
                <link rel="stylesheet" href="../styles/styles.css" />
            </Head>

            <div className="max-w-5xl m-auto">
                <main className="flex min-h-screen flex-col items-center justify-center">
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                        <div className="rounded-xl">
                            <input className={"input input-bordered w-full max-w-xs mb-2 " + ((formik.errors.email && formik.touched.email) ? "input-error" : "input-accent")} type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                        </div>
                        <div>
                            <input className={"input input-bordered w-full max-w-xs mb-4 " + ((formik.errors.password && formik.touched.password) ? "input-error" : "input-accent")} type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                        </div>
                        <div>
                            <button type="submit" onClick={ handleCredentialsSignin } className="btn btn-primary gap-2 mb-4 w-64">
                                Login
                            </button>
                        </div>
                    </form>
                    <div>
                        <button onClick={ handleGoogleSignin } className="btn gap-2 mb-2 w-64">
                            Signin with
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"/><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
                        </button>
                    </div>
                    <div>
                        <button onClick={ handleGithubSignin } className="btn gap-2 mb-2 w-64">
                            Signin with
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' viewBox="0 0 100 100"><path fill-rule="evenodd" clip-rule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/></svg>
                        </button>
                    </div>
                    <div>
                        <button onClick={ handleDiscordSignin } className="btn gap-2 mb-2 w-64">
                            Signin with
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-6 w-6' fill="currentColor" viewBox="0 0 16 16"> <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/></svg>
                        </button>
                    </div>
                    <div>
                        <p> You don't have an account? <Link className='hover:text-emerald-500' href={'/signup'}> Signup </Link></p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Signin;

export async function getServerSideProps(context: any) {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        }
    }
    return {
        props: {}
    };
}