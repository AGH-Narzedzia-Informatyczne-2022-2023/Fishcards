import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export const groupSchema = object({
    name: string({
        required_error: "Group name is required",
    }).min(1).max(256),
});

export function CreateGroup() {

    const groupMutation = trpc.group.create.useMutation();

    const formik = useFormik({
        initialValues: {
            groupName: "",
        },
        validationSchema: Yup.object({
            groupName: Yup.string()
                .required("Required")
                .max(64, "Must be 64 characters or less"),
        }),
        onSubmit: (values) => {
            groupMutation.mutate({ name: values.groupName });
        }
    });

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    return (
        <>
            <label htmlFor="my-modal-5" className="btn btn-primary"> Create group </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <label htmlFor="my-modal-5" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                        <input className="inline-block align-middle input input-bordered w-full max-w-xs mb-4" placeholder="Name" type="text" {...formik.getFieldProps("groupName")}></input>
                        <div>
                            <button type="submit" onClick={forceReload}>
                                <label htmlFor="my-modal-5" className="btn btn-primary"> 
                                    Create group
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}