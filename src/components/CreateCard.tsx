import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik } from "formik";
import * as Yup from "yup";

export function CreateCard({id} : any) {

    const createCard = trpc.card.create.useMutation();
    const createProcessedCard = trpc.card.createProcessed.useMutation();

    const formik = useFormik({
        initialValues: {
            question: "",
            answer: "",
        },
        validationSchema: Yup.object({
            question: Yup.string().min(1).max(4096),
            answer: Yup.string().min(1).max(4096),
        }),
        onSubmit: (values, {resetForm}) => {
            createCard.mutate({
                question: values.question,
                answer: values.answer,
                deckId: id,
            });
            resetForm();
        }
    });

    return (
        <>
            <label htmlFor="my-modal-14" className="btn btn-primary"> Create card </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-14" className="modal-toggle" />
            <label htmlFor="my-modal-14" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <textarea className="textarea textarea-bordered w-full max-w-xs mb-4 inline-block align-middle" placeholder="Question" {...formik.getFieldProps("question")}></textarea>
                    </div>
                    <div>
                        <textarea className="textarea textarea-bordered w-full max-w-xs mb-4 inline-block align-middle" placeholder="Answer" {...formik.getFieldProps("answer")}></textarea>
                    </div>
                        <div>
                            <button type="submit">
                                <label htmlFor="my-modal-14" className="btn btn-primary"> 
                                    Create card
                                </label>
                            </button>
                        </div>
                    </form>
                </label>
            </label>                    
        </>
    )
}