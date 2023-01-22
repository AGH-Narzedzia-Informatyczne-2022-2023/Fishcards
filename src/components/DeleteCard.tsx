import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";

export function DeleteCard({id} : any) {

    const deleteCard = trpc.card.delete.useMutation();

    const formik = useFormik({
        initialValues: {
            cardId: 0
        },
        validationSchema: Yup.object({
            cardId: Yup.number(),
        }),
        onSubmit: (values, {resetForm}) => {
            if (values.cardId != id) {
                return;
            }
            deleteCard.mutate({
                id: values.cardId,
            });
            resetForm();
        }
    });

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    return (
        <>
            <label htmlFor="my-modal-20" className="btn btn-error"> Delete </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-20" className="modal-toggle" />
            <label htmlFor="my-modal-20" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                <div className="mb-1">
                            Enter group index to confirm
                        </div>
                        <input className="inline-block align-middle input input-bordered w-full max-w-xs mb-4" type="number" {...formik.getFieldProps("cardId")}></input>
                        <div>
                            <button type="submit" onClick={forceReload}>
                                <label htmlFor="my-modal-20" className="btn btn-error"> 
                                    Delete card
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}