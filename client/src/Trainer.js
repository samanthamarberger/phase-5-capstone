import React from "react";

function Trainer({ trainer }) {
    return(
        <div>
            <h2>{trainer.name}</h2>
            <img src={trainer.image} alt={trainer.name} />
            <p>{trainer.bio}</p>
            <p>Email me for any questions at: {trainer.email}</p>
        </div>
    )
}

export default Trainer