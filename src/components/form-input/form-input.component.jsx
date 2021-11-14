import React from "react";

import './form-input.styles.scss'

const FormInput = ({handleChange, label, ...otherProps}) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            // only rendering a label if a label field is present for an input
            label ?
            // we add a srhink class when the user has typed anything in to srhink the label
            (<label className={`${otherProps.value.length ? 'shrink' : '' } form-input-label`}>
                {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput