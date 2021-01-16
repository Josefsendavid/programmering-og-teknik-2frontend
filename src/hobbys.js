import { mainURL } from "./settings";
import { useEffect, useState } from "react";

function Hobbys() {
    const [hobby, setHobby] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/startkodeca3" + "/api/hobby/all", { headers: { 'Accept': 'application/json' } })
            .then(res => res.json())
            .then((data) => setHobby(...data))
            .catch((err) => console.log("Error occured"))
        console.log(JSON.stringify(hobby))
    }, [])
    
    return (
        <div>
            <p>{JSON.stringify(hobby)}</p>
            <li>{hobby.name}</li>
        </div>
    )
}

export default Hobbys;