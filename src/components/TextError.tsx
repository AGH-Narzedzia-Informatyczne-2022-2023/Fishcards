import React from "react";

function TextError(props : any) {
    return (
        <div className="text-red-500">
            { props.children }
        </div>
    )
}

export default TextError;