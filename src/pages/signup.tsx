import Head from 'next/head'
import { type NextPage } from 'next';
import Link from 'next/link';
import { getSession, signIn, useSession } from "next-auth/react";
import { useFormik } from "formik";
import Navbar from '../components/Navbar';

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
        else if (values.username.length < 4) {
            errors.username = 'Minimum username lenght is 4';
        }
        else if (20 < values.username.length) {
            errors.username = 'Maximum username lenght is 20';
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

        
            <div className="max-w-5xl m-auto">
                <main className="flex min-h-screen flex-col items-center justify-center">
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                        <div className="rounded-xl">
                            <input className={"input input-bordered w-full max-w-xs mb-2 " + ((formik.errors.username && formik.touched.username) ? "input-error" : "input-accent")} type="text" placeholder="Username" {...formik.getFieldProps("username")} />
                        </div>
                        <div>
                            <input className={"input input-bordered w-full max-w-xs mb-2 " + ((formik.errors.email && formik.touched.email) ? "input-error" : "input-accent")} type="email" placeholder="Email" {...formik.getFieldProps("email")} />
                        </div>
                        <div>
                            <input className={"input input-bordered w-full max-w-xs mb-2 " + ((formik.errors.password && formik.touched.password) ? "input-error" : "input-accent")} type="password" placeholder="Password" {...formik.getFieldProps("password")} />
                        </div>
                        <div>
                            <input className={"input input-bordered w-full max-w-xs mb-4 " + ((formik.errors.cpassword && formik.touched.cpassword) ? "input-error" : "input-accent")} type="password" placeholder="Confirm Password" {...formik.getFieldProps("cpassword")} />
                        </div>
                        <div>
                            <button type='submit' className="btn btn-primary gap-2 mb-2 w-64"> Signup </button>
                        </div>
                    </form>

                    <div>
                        <p> You already have an account? <Link className='hover:text-emerald-500' href={'/signin'}> Sign in </Link></p>
                    </div>

                </main>
            </div>
        </>
    );
}

export default Signup;

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
