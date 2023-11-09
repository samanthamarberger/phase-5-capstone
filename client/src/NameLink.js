import React from "react";
import { Link } from "react-router-dom";
function NameLink({ name }) {
    const emailLink = `mailto:${name.email}`

    return (
        <Link to={emailLink}>
            <p>Email: {name.email}</p>
        </Link>
    )
}

export default NameLink