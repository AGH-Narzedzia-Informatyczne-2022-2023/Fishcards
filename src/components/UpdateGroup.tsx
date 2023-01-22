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

export function UpdateGroup({id} : any) {

    const groupMutation = trpc.group.update.useMutation();

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
            groupMutation.mutate({
                id: id,
                name: values.groupName
            });
        }
    });

    return (
        <>
            <label htmlFor="my-modal-4" className="btn btn-warning mr-4"> Edit </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                        <input className="inline-block align-middle input input-bordered w-full max-w-xs mb-4" placeholder="New group name" type="text" {...formik.getFieldProps("groupName")}></input>
                        <div>
                            <button type="submit">
                                <label htmlFor="my-modal-4" className="btn btn-warning"> 
                                    Edit group
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}