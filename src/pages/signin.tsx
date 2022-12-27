import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react"
import { useFormik } from "formik"

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

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                        { formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></> }
                    </div>
                    <div>
                        <input type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                        { formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></> }
                    </div>
                    <div>
                        <button type="submit"> Submit </button>
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