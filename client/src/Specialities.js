import React, { useContext } from "react";
import { UserContext } from "./context/user";
import SpecialityLink from "./SpecialityLink";


function Specialities() {
    const { specialities, clientLoggedIn } = useContext(UserContext)

    if (clientLoggedIn) {
        const specialityList = specialities.map(speciality => <SpecialityLink key={speciality.id} speciality={speciality} />)
        return (
            <div className="Specialities">
                <h1>Personal Training Options: </h1>
                <br />
                {specialityList}
            </div>
        )
    }
    else {
        return (
            <h3> Not Authorized - Please Signup or Login as a client</h3>
        )
    }
}

export default Specialities