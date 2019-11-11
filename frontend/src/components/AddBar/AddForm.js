import React from "react";
import { Field, reduxForm } from 'redux-form'

const AddForm = props => {
    const { handleSubmit, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <div>
                    <Field name="title" component="input" type="text" />
                </div>
            </div>
            <div>
                <label>Note</label>
                <div>
                    <Field name="note" component="input" type="text" />
                </div>
            </div>
            <div>
            <label htmlFor="type">Type:</label>
                <div>
                    <Field name="type" component="select">
                        <option />
                        <option name="type" value="home">Home</option>
                        <option name="type" value="work">Work</option>
                        <option name="type" value="other">Other</option>
                    </Field>
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>
                    Submit
                </button>
            </div>
        </form>
    );
}

export default reduxForm({form: 'addingNote' })(AddForm);