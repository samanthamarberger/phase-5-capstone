import React, { useContext } from "react";
import { UserContext } from "./context/user";

function Home() {
    const { user, loggedIn } = useContext(UserContext)

    if (loggedIn) {
        return (
            <div className="Home">
                <h1>{user.name}'s Home Page</h1>
                <p>Welcome to Find Your Fit! This is an application geared towards those who want to try out new forms of fitness by connecting you with trainers in all different areas of fitness.  </p>
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