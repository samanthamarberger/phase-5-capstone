import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Home() {
    const { user, clientLoggedIn, trainerLoggedIn } = useContext(UserContext)

    if (clientLoggedIn) {
        return (
            <div className="Home">
                <h1>{user.name}'s Home Page</h1>
                <p>Welcome to ElevateFit! This is an application geared towards those who want to try out new forms of fitness by connecting you with trainers in all different areas of fitness.  </p>
            </div>
        )
    }
    else if (trainerLoggedIn) {
        return (
            <div className="Home">
                <h1>Trainer {user.name}'s Home Page</h1>
                <p>Welcome to ElevateFit! As a fitness coach be sure to keep your scheldule updated!  </p>
            </div>
        )
    } 
    else {
        return (
            <div className="Home">
                <h1>Please Login or Signup</h1>
            </div>
        )
    }
}

export default Home;