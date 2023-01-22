import { useState } from "react";
import { object, setErrorMap, string } from "zod";
import { trpc } from "../utils/trpc";
import { useFormik, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import FormikCreateDeck from "./FormikCreateDeck";
import { useRouter } from "next/router";

export function CreateDeck() {

    const deckMutation = trpc.deck.create.useMutation();
    const myGroups = trpc.group.getAll.useQuery();

    const allGroups = trpc.group.getAll.useQuery();
    const createDeck = trpc.deck.create.useMutation();

    const router = useRouter();
    const forceReload = () => {
        router.reload();
    }

    return (
        <>
            <label htmlFor="my-modal-11" className="btn btn-primary"> Create deck </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-11" className="modal-toggle" />
            <label htmlFor="my-modal-11" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                <Formik
                    initialValues={{ deckName: '', deckDescription: '', group: -1 }}
                    validationSchema={Yup.object({
                        deckName: Yup.string()
                        .max(64, 'Must be 64 characters or less')
                        .required('Required'),
                        description: Yup.string()
                        .max(256, 'Must be 256 characters or less'),
                        group: Yup.number(),
                    })}
                    onSubmit={(values, { resetForm }) => {
                        if (values.group == -1) {
                        return;
                        }
                        createDeck.mutate({
                        name: values.deckName,
                        description: values.deckDescription,
                        groupId: Number(values.group)
                        });
                        resetForm();
                    }}
                    >
                    <Form>
                        <div>
                            <label htmlFor="deck">Deck Name</label>
                        </div>
                        <Field name="deckName" type="text" className="inline-block align-middle input input-bordered w-full max-w-xs mb-4"/>

                        <div>
                            <label htmlFor="deckDescription">Deck Description</label>
                        </div>
                        <Field name="deckDescription" type="text" className="inline-block align-middle input input-bordered w-full max-w-xs mb-4"/>

                        <div>
                            <label htmlFor="group">Group</label>
                        </div>
                        
                        <Field as="select" name="group" className="select select-bordered w-full max-w-xs">
                        <option key="" value="" selected disabled hidden>Choose your group</option>
                        {allGroups.data?.map(group => (
                            <option key={group.id} value={group.id}> {group.name} </option>
                        ))}
                        </Field>

                        <div>
                            <button type="submit" onClick={forceReload}>
                                <label htmlFor="my-modal-11" className="btn btn-primary mt-4"> 
                                    Create deck
                                </label>
                            </button>
                        </div>
                        
                    </Form>
                    </Formik>
                </label>
            </label>                    
        </>
    )
}