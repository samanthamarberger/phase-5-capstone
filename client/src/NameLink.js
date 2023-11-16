import React from "react";
import { Link } from "react-router-dom";
function NameLink({ name }) {
    const emailLink = `mailto:${name.email}`

    return (
        <p>
            Email: 
            <Link to={emailLink}>
                {name.name}
            </Link>
        </p>
    )
}

export default NameLink