import React from 'react'
import { Button } from '../button'
import FormControls from './form-controls'

const CommonForm = ({ handleSubmit, buttonText, formControls = [], formData, setFormData, isButtonDisabled }) => {
    return (
        <form onSubmit={handleSubmit}>
            {/* render form controls here */}
            <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
            <Button className="w-full mt-2" disabled={isButtonDisabled} type="submit">
                {buttonText || "Submit"}
            </Button>
        </form >
    )
}

export default CommonForm
