import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";

const Signup: NextPage = () => {

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        onSubmit
    })

    async function onSubmit(values : any) {
        console.log(values)
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
                    <h1>Register page</h1>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <input type="text" placeholder="Username" {...formik.getFieldProps("username")} />
                    </div>
                    <div>
                        <input type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" {...formik.getFieldProps("cpassword")} />
                    </div>
                    <div>
                        <button type='submit'> Signup </button>
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