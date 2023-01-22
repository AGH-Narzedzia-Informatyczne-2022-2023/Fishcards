import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik } from "formik";
import * as Yup from "yup";

export const groupSchema = object({
    name: string({
        required_error: "Group name is required",
    }).min(1).max(256),
});

export function AddToGroup({id} : any) {

    const groupMutation = trpc.group.addToGroup.useMutation();

    const formik = useFormik({
        initialValues: {
            groupEmail: "",
        },
        validationSchema: Yup.object({
            groupEmail: Yup.string().email()
        }),
        onSubmit: (values) => {
            groupMutation.mutate({
                groupId: id,
                userEmail: values.groupEmail
            });
        }
    });

    return (
        <>
            <label htmlFor="my-modal-7" className="btn btn-accent"> Invite user </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-7" className="modal-toggle"/>
            <label htmlFor="my-modal-7" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                        <div className="mb-1">
                            Enter the invited user's email
                        </div>
                        <input className="inline-block align-middle input input-bordered w-full max-w-xs mb-4" placeholder="Email" type="email" {...formik.getFieldProps("groupEmail")}></input>
                        <div>
                            <button type="submit">
                                <label htmlFor="my-modal-7" className="btn btn-accent">
                                    Invite
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}