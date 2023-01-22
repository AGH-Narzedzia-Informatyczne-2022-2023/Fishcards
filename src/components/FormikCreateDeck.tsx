import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { trpc } from '../utils/trpc';

const FormikCreateDeck = () => {

  const allGroups = trpc.group.getAll.useQuery();
  const createDeck = trpc.deck.create.useMutation();

  return (
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
            <button type="submit" className='btn btn-primary mt-4'> Create Deck</button>
        </div>
        
      </Form>
    </Formik>
  );
};

export default FormikCreateDeck;