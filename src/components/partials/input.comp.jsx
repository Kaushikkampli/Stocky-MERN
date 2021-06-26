import React from "react"

function Input(props) {
    return (
        <div class="form-group">
            <input onChange={props.onChange} value={props.value} className="form-control" type={props.type} name={props.name} placeholder={props.placeholder} />
        </div>
    )
}

function Button(props) {
    return (
            <button type="submit" className="btn btn-primary mb-3">{props.name}</button>
    )
}

export {Input, Button}