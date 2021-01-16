import { useEffect, useState } from "react";
import facade from "./apiFacade";
import { mainURL, hotels } from "./settings";
import { Link, useRouteMatch} from "react-router-dom";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

function HotelFacade() {

    const GetAllHotels = () => {
        let { path, url } = useRouteMatch();
        const hotelObject = [
            {
                id: "",
                name: "",
                address: "",
                price: "",
                phone: "",
                url: ""
            }
        ]

        const [hotels, setHotels] = useState(hotelObject);

        useEffect(() => {
            fetch("http://localhost:8080/startkodeca3/api/hotel/all", { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    setHotels(data)
                    console.log(hotels)
                })
        }, [])
        return (
            <div>
                        <ul>
                            {hotels.map((hotel) => (
                                <li>
                                    ID: {hotel.id}<br/>
                                    {hotel.name} <br/>
                                    <a href={hotel.url}>{hotel.url}</a><br/><br/>
                                </li>
                            ))}
                        </ul>
            </div>
        )
    }

    const GetHotel = () => {
        const [hotel, setHotel] = useState([]);
        const [writeValue, setWriteValue] = useState("");

        function handleClick(e) {
            setWriteValue(e)
            console.log(writeValue)
            fetch(mainURL + "/api/hotel/" + writeValue, { headers: { 'Accept': 'application/json' } }, handleHttpErrors)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setHotel(data)
                })
        }

        useEffect(() => {
            fetch("http://localhost:8080/startkodeca3/api/hotel/38222", { headers: { 'Accept': 'application/json' } },)
                .then(res => res.json())
                .then(data => {
                    setHotel(data)
                })
        }, [])
        if (hotel.id !== undefined) {
            return (
                <div>
                    <input type="text" id="myInput" placeholder="Insert Hotel ID" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(writeValue)}>Find Hotel</button>

                    <h4>{hotel.name}</h4><br></br>
                    <li>ID: {hotel.id}</li>
                    <li>Title: {hotel.title}</li>
                    <li>Address: {hotel.address}</li>
                    <li>Price: {hotel.price}</li>
                    <li>Phone: {hotel.phone}</li>
                    <br></br>
                    <li>{hotel.content}</li>

                </div>
            )
        }
        else {
            return (
                <div>
                    <input type="text" id="myInput" placeholder="Insert Hotel ID" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(writeValue)}>Find Hotel</button>
                    <p>Please search for a given hotel ID:</p>

                </div>


            )
        }
    }
    return {
        GetHotel,
        GetAllHotels
    }
}
const MyFacade = HotelFacade();
export default MyFacade;