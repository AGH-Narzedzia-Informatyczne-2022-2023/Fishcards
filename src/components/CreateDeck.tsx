import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import FormikCreateDeck from "./FormikCreateDeck";

export function CreateDeck() {

    const deckMutation = trpc.deck.create.useMutation();
    const myGroups = trpc.group.getAll.useQuery();

    return (
        <>
            <label htmlFor="my-modal-11" className="btn btn-primary"> Create deck </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-11" className="modal-toggle" />
            <label htmlFor="my-modal-11" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <FormikCreateDeck/>
                </label>
            </label>                    
        </>
    )
}