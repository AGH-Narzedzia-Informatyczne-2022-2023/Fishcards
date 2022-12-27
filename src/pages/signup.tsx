import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";

const Signup: NextPage = () => {

    interface Values {
        username: string;
        email: string;
        password: string;
        cpassword: string;
    }

    interface Errors {
        username?: string;
        email?: string;
        password?: string;
        cpassword?: string;
    }

    const validateSignup = (values : Values) => {
        let errors: Errors = {};

        if (!values.username) {
            errors.username = 'Required';
        }
        else if (values.username.includes(" /?<>")) {
            errors.username = 'Invalid username';
        }

        if (!values.email) {
            errors.email = 'Required';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if (!values.password) {
            errors.password = 'Required';
        }
        else if (values.password.length < 8) {
            errors.password = 'Minimum password lenght is 8';
        }
        else if (20 < values.password.length) {
            errors.password = 'Maximum password lenght is 20';
        }
        else if (values.password.includes(" ")) {
            errors.password = 'Invalid password';
        }

        if (values.password != values.cpassword) {
            errors.cpassword = 'Passwords do not match';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            cpassword: ''
        },
        validate: validateSignup,
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
                        { formik.errors.username && formik.touched.username ? <span>{formik.errors.username}</span> : <></> }
                    </div>
                    <div>
                        <input type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                        { formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : <></> }
                    </div>
                    <div>
                        <input type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                        { formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : <></> }
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm Password" {...formik.getFieldProps("cpassword")} />
                        { formik.errors.cpassword && formik.touched.cpassword ? <span>{formik.errors.cpassword}</span> : <></> }
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