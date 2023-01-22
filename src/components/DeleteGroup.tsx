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

export function DeleteGroup({id} : any) {

    const groupMutation = trpc.group.delete.useMutation();

    const formik = useFormik({
        initialValues: {
            groupId: 0,
        },
        validationSchema: Yup.object({
            groupId: Yup.number()
                .required("Required")
                .min(id)
                .max(id),
        }),
        onSubmit: (values) => {
            groupMutation.mutate({ id: id });
        }
    });

    return (
        <>
            <label htmlFor="my-modal-6" className="btn btn-error mr-4"> Delete </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <label htmlFor="my-modal-6" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                        <div className="mb-1">
                            Enter group index to confirm
                        </div>
                        <input className="inline-block align-middle input input-bordered w-full max-w-xs mb-4" type="number" {...formik.getFieldProps("groupId")}></input>
                        <div>
                            <button type="submit">
                                <label htmlFor="my-modal-6" className="btn btn-error"> 
                                    Delete group
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}