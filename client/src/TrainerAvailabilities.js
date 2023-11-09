import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/user";
import Calendar from "./Calendar";
import moment from 'moment';

function TrainerAvailabilities() {
    const { user, trainerLoggedIn } = useContext(UserContext)

    if (!user || !user.availabilities) {
        return <h3>...loading</h3>
    }
    const availabilities = user.availabilities.map(a => ({
        title: `${calculateDuration(a.start, a.end)} available`,
        start: a.start,
        end: a.end,
        color: 'green',
        trainer_id: user.id,
        availability_id: a.id,
    }))

    function calculateDuration(start, end) {
        const startMoment = moment(start);
        const endMoment = moment(end);
        const duration = moment.duration(endMoment.diff(startMoment));
        const hours = duration.hours();
        const minutes = duration.minutes();

        switch (true) {
            case hours === 1 && minutes === 0:
                return `${hours} hour`
            case hours === 0 && minutes > 0:
                return `${minutes} minutes`
            case hours === 1 && minutes > 0:
                return `${hours} hour ${minutes} minutes`
            case hours > 1 && minutes === 0:
                return `${hours} hours`
            default:
                return `${hours} hours ${minutes} minutes`
        }
    }

    if (trainerLoggedIn) {
        return ( 
            <div>
                <h3>{user.name}</h3>
                <Calendar events={availabilities}  />
            </div>
        )
    }
    else {
        return <h1>Error: Not Authorized</h1>
    }
}

export default TrainerAvailabilities