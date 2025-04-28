import React from 'react'
import { Input } from '../input';
import { Select } from '../select';
import { Textarea } from '../textarea';
import { SelectContent, SelectTrigger } from '@radix-ui/react-select';
import { Label } from '../label';

const FormControls = ({ formControls = [], formData, setFormData }) => {
    function renderComponentByType(controlItem) {
        let element = null;
        const value = formData[controlItem.name];
        switch (controlItem.type) {
            case 'input':
                element = <Input
                    id={controlItem.id}
                    name={controlItem.name}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    value={value}
                    onChange={(e) => {
                        setFormData((prevState) => ({
                            ...prevState,
                            [controlItem.name]: e.target.value
                        }))
                    }}
                />
                break;
            case 'select':
                element = <Select onValueChange={(value) => {
                    setFormData({
                        ...formData,
                        [controlItem.name]: value
                    })
                }}
                    value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={controlItem.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            controlItem.options && controlItem.options.length > 0 ?
                                controlItem.options.map((option) => {
                                    return (
                                        <SelectItem key={option.id} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    )
                                }) : null
                        }
                    </SelectContent>
                </Select>
                break;
            case 'textarea':
                element = <Textarea
                    id={controlItem.id}
                    name={controlItem.name}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    value={value}
                    onChange={(e) => {
                        setFormData((prevState) => ({
                            ...prevState,
                            [controlItem.name]: e.target.value
                        }))
                    }} />
                break;
            default:
                element = <Input
                    id={controlItem.id}
                    name={controlItem.name}
                    type={controlItem.type}
                    placeholder={controlItem.placeholder}
                    value={value}
                    onChange={(e) => {
                        setFormData((prevState) => ({
                            ...prevState,
                            [controlItem.name]: e.target.value
                        }))
                    }} />
                break;
        }
        return element;
    }
    return (
        <div className="flex flex-col gap-3">
            {formControls.map((controleItem) => (
                <div key={controleItem.name}>
                    <Label htmlFor={controleItem.name}>{controleItem.label}</Label>
                    {renderComponentByType(controleItem)}
                </div>
            ))}
        </div >
    )
}

export default FormControls;
