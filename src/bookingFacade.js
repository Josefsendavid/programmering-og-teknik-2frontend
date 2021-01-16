import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import facade from "./apiFacade";


function BookingFacade() {

    let [booking, setBooking] = useState({});
    const [nameSearch, setNameSearch] = useState("");
    const [arr, setArr] = useState([]);

    const handleChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const prop = target.id;
        let booking1 = { ...booking, [prop]: value };
        setBooking(booking1);
    };

    const handleName = (evt) => {
        setNameSearch(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(facade.addBooking);
        facade.addBooking(booking);
        console.log("New booking succesfull")
    }

    const handleSubmitName = (evt) => {
        evt.preventDefault();
        facade.fetchBookings(setArr, nameSearch);
    }

    return (
        <div>
            <h2>Add Booking</h2>
            <form onSubmit={e => {
                e.preventDefault();
            }}>
                <div>
                    <h4>Nights</h4>
                    <input
                        type="text"
                        id="nights"
                        onChange={handleChange}
                    />

                    <h4>Start Date</h4>
                    <input
                        type="text"
                        id="startDate"
                        onChange={handleChange}
                    />

                    <h4>Name</h4>
                    <input
                        type="text"
                        id="name"
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <button onClick={handleSubmit}>Apply</button>
                    <br />
                </div>
            </form>

            <div>
                <h2>Search for booking</h2>
                <input
                    type="text"
                    id="name2"
                    onchange={handleName}
                />
                <br />
                <button onClick={handleSubmitName}>Search</button>
                {console.log(arr)}
                <table className="table">
                    <tr>
                        <th>
                            Nights
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Name
                        </th>
                    </tr>

                    {arr.map(myData => {
                        return <tr>
                            <td>
                                {myData.nights}
                            </td>
                            <td>
                                {myData.startDate}
                            </td>
                            <td>
                                {myData.name}
                            </td>
                        </tr>
                    })}
                </table>
            </div>
        </div>
    )
}
export default BookingFacade;