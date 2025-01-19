import React, { useEffect, useRef, useState } from "react";
import { addDays, setDate } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {  DateRange, DateRangePicker } from 'react-date-range';
import format from 'date-fns/format'
import { Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, styled } from "@mui/material";
import axios from "axios";
import {airport, category , packages} from './data'
import { Book, DepartureBoard } from "@mui/icons-material";
import { baseUrl } from "../../../HelperUrl/Helper";

const StylingRadio=styled(RadioGroup)`
    display:flex;
    flex-direction:row;
`

const StylingButton=styled(Button)(({ theme }) => ({
    marginLeft:'85%',
    background: '#374151',
    [theme.breakpoints.down('md')]: {
      marginLeft:'65%'
  },
  ":hover":{
    background:'#52525b'
  }
  }))


const Cabs=()=>{
    const [category,setCategory]=useState('Out Station One Way');

    const[OutStationOneway,setOutstationOneway]=useState(true);
    const [OutstationRoundTrip,setOutstationRoundTrip]=useState(false);
    const [AirportTransfers,setAirportTransfers]=useState(false);
    const [HourlyRentals,setHourlyRentals]=useState(false);

    const handleOutstationOneway=(e)=>{
        setOutstationOneway(true);
        setOutstationRoundTrip(false);
        setAirportTransfers(false);
        setHourlyRentals(false);
        setCategory('Out Station One Way')
    }

    const handleOutstationRoundTrip=()=>{
        setOutstationOneway(false);
        setOutstationRoundTrip(true);
        setAirportTransfers(false);
        setHourlyRentals(false);
        setCategory('Out Station Round Trip')
    }

    const handleAirportTransfers=()=>{
        setOutstationOneway(false);
        setOutstationRoundTrip(false);
        setAirportTransfers(true);
        setHourlyRentals(false);
        setCategory('Airport Transfers')
    }

    const handleHourlyRentals=()=>{
        setOutstationOneway(false);
        setOutstationRoundTrip(false);
        setAirportTransfers(false);
        setHourlyRentals(true);
        setCategory('Hourly Rentals')
    }

    const[fromCity,setFromCity]=useState('');
    const handleFrom=(e)=>{
        setFromCity(e.target.value);
    }

    const[destination,setDestination]=useState('');
    const handleDestination=(e)=>{
        setDestination(e.target.value);
    }

    const[pickuptype,setPickUpType]=useState('');
    const handlePickUpType=(e)=>{
        setPickUpType(e.target.value);
    }

    const[airportValue,setAirportValue]=useState('');
    const handleAirport=(e)=>{
        setAirportValue(e.target.value);
    }

    var config = {
        method: 'get',
        url: 'https://api.countrystatecity.in/v1/countries',
        headers: {
          'X-CSCAPI-KEY': 'S3AwWUVncFhudTVDRnVrdUJmSVQ1WDR4MDZBN253TlZBU2VWdENBVg=='
        }
      };
    
    var [countries,setCountries]=useState([]);

      axios(config)
      .then(function (response) {
        const newData=(response.data);
        setCountries(newData);
      },[])
      .catch(function (error) {
        console.log(error);
      });


    const [departureDate,setDepartureDate] = useState('')
    const handleDepartureDate = (e) => {
        setDepartureDate(e.target.value)
    }

    const [returnDate,setReturnDate] = useState('')
    const handleReturnDate = (e) => {
        setReturnDate(e.target.value)
    }

    const [pickupTime,setPickupTime] = useState()
    const handlePickup = (e) => {
        setPickupTime(e.target.value)
    }

    const [dropTime,setDropTime] = useState()
    const handleDrop = (e) => {
        setDropTime(e.target.value)
    }

    const[pickupLoc,setPickupLoc]=useState('Select City');
    const handlePickupLoc=(e)=>{
        setPickupLoc(e.target.value)
    }

    const[pickupDate,setPickupDate]=useState(new Date());
    const handlePickupDate=(e)=>{
        setPickupDate(e.target.value)
    }

    const[packageValue,setPackageValue]=useState(new Date());
    const handlePackage=(e)=>{
        setPackageValue(e.target.value)
    }


    const[data,setData]=useState([])

    const[email,setEmail]=useState('');
    const[logined,setLogined]=useState(false);
    const[token,setToken]=useState('');

    useEffect(()=>{
        const storedToken=localStorage.getItem('token');
        const loginState=localStorage.getItem('loginState');
        // console.log('navbar',storedToken);
        if(storedToken){
            setToken(storedToken);
            axios.get(`${baseUrl}/user`, {
                headers: {
                Authorization:  storedToken,
                    },
                })
            .then(response => {
                if(response.data.success){
                    // console.log('respp',response.data);
                    // setUsername(response.data.user.username);
                    setEmail(response.data.user.email);
                    setLogined(true);
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error.message);
            });
        }
      },[])

    const cabBooking = async (e) => {
        e.preventDefault();
        try {   
            console.log("Running");
          const departureDateObj = new Date(departureDate);
          const returnDateObj = new Date(returnDate);
          if (returnDateObj < departureDateObj) {
            alert("Return date cannot be earlier than departure date.");
          } else {
            const response = await axios.post(`${baseUrl}/cabbooking`, {
              email,  
              category,
              fromCity,
              destination,
              departureDate,
              returnDate,
              pickupTime,
              dropTime,
              pickuptype,
              airport,
              pickupDate,
              pickupLoc,
              packageValue
            });
      
            if (response.data === "fail") {
              alert("Cab booking failed. Please check the details.");
            } else {
              alert("Successfully, your cab is booked...");
              setData(response.data);
              console.log("data", data);

              window.location.reload();
            }
            console.log(fromCity);
          }
        } catch (e) {
          console.log("Error:", e);
        }
      };

    return(
    <div className="w-full h-screen">
        <div className="w-auto bg-white md:mx-8 rounded-md py-10">
                <div className="flex flex-row space-x-2 ml-12 justify-between">
                    <StylingRadio
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Outstation One Way" control={<Radio checked={OutStationOneway === true} />} label="Outstation One-Way" onClick={handleOutstationOneway} />
                        <FormControlLabel value="Outstation Round Trip" control={<Radio checked={OutstationRoundTrip === true} />} label="Outstation Round-Trip"  onClick={handleOutstationRoundTrip} />
                        <FormControlLabel value="Airport Transfers" control={<Radio checked={AirportTransfers === true} />} label="Airport Transfers" onClick={handleAirportTransfers} />
                        <FormControlLabel value="Hourly Rentals" control={<Radio checked={HourlyRentals === true} />} label="Hourly Rentals" onClick={handleHourlyRentals} />
                    </StylingRadio>
                    <h1 className="pr-10 text-medium font-semibold text-gray-600 mt-2">Online Cab Booking 🤗</h1>
                </div>

            {/* Outstation one way */}
            {
                    OutStationOneway ? (
                        <div className="flex flex-col">
                            <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                            <div className="flex md:flex-row flex-col justify-around my-4 md:space-y-0 space-y-4">
                                
                                {/* from component */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">From</h3>
                                    <select value={fromCity} onChange={handleFrom} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                            <option>choose</option>
                                            {
                                            countries.map((country) =>(
                                                <option key={country.iso2} value={country.name}>{country.name}</option>
                                                // <option>country</option>
                                            ))
                                            }
                                    </select>
                                </div>
                                
                                {/* destination */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">To</h3>
                                    <select value={destination} onChange={handleDestination} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                            <option>choose</option>
                                            {
                                            countries.map((country) =>(
                                                <option key={country.iso2} value={country.name}>{country.name}</option>
                                                // <option>country</option>
                                            ))
                                            }
                                    </select>
                                </div>

                                {/* departure-return */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">Departure</h3>
                                    <input type="date" onChange={handleDepartureDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                                </div>

                                {/* <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">Return</h3>
                                    <input type="date" onChange={handleReturnDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                                </div> */}

                                {/* Pickup time */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">PickUp Time</h3>
                                    <input type="time" onChange={handlePickup} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"/>
                                </div>

                                </div>
                            </div>
                        </div>
                    )
                        : OutstationRoundTrip?(
                            <div className="flex flex-col">
                            <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                            <div className="flex md:flex-row flex-col justify-around my-4 md:space-y-0 space-y-4">
                                
                                {/* from component */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">From</h3>
                                    <select value={fromCity} onChange={handleFrom} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                            <option>choose</option>
                                            {
                                            countries.map((country) =>(
                                                <option key={country.iso2} value={country.name}>{country.name}</option>
                                                // <option>country</option>
                                            ))
                                            }
                                    </select>
                                </div>
                                
                                {/* destination */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">To</h3>
                                    <select value={destination} onChange={handleDestination} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                            <option>choose</option>
                                            {
                                            countries.map((country) =>(
                                                <option key={country.iso2} value={country.name}>{country.name}</option>
                                                // <option>country</option>
                                            ))
                                            }
                                    </select>
                                </div>

                                {/* departure-return */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">Departure</h3>
                                    <input type="date" onChange={handleDepartureDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                                </div>

                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">Return</h3>
                                    <input type="date" onChange={handleReturnDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                                </div>

                                {/* Pickup time */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">PickUp Time</h3>
                                    <input type="time" onChange={handlePickup} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"/>
                                </div>

                                {/* Drop time */}
                                <div className="text-left md:ml-10">
                                    <h3 className="font-semibold text-gray-800">Drop Time</h3>
                                    <input type="time" onChange={handleDrop} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"/>
                                </div>

                            </div>
                        </div>
                    </div>
                )
                :AirportTransfers ?(
                    <div className="flex flex-col">
                        <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                        <div className="flex md:flex-row flex-col justify-around my-4 md:space-y-0 space-y-4">
                            
                            {/* PickUp type */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Pick Up Type</h3>
                                <select value={pickuptype} onChange={handlePickUpType} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        <option>From the Airport</option>
                                        <option>To the Airport</option>
                                        {/* {
                                        category.map((c) =>(
                                            <option key={c.value} value={c.value}>{c.value}</option>
                                        ))
                                        } */}
                                </select>
                            </div>
                            
                            {/* destination */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Airport</h3>
                                <select onChange={handleAirport} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        airport.map((a) =>(
                                            <option key={a.id}>{a.value}</option>
                                            // <option>country</option>
                                        ))
                                        }
                                </select>
                            </div>

                            {/* city to part */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">To</h3>
                                <select onChange={handleAirport} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        airport.map((a) =>(
                                            <option key={a.id}>{a.value}</option>
                                            // <option>country</option>
                                        ))
                                        }
                                </select>
                            </div>

                            {/* departure-return */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Departure</h3>
                                <input type="date" onChange={handleDepartureDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                            </div>

                            {/* Pickup time */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">PickUp Time</h3>
                                <input type="time" onChange={handlePickup} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"/>
                            </div>

                            </div>
                        </div>
                    </div>
                )
                :(
                    <div className="flex flex-col">
                        <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                        <div className="flex md:flex-row flex-col justify-around my-4 md:space-y-0 space-y-4">
                            
                            {/* PickUp location */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Pick Up Location</h3>
                                <select value={pickupLoc} onChange={handlePickupLoc} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>Select City</option>
                                        {
                                        countries.map((country) =>(
                                            <option key={country.iso2} value={country.name}>{country.name}</option>
                                            // <option>country</option>
                                        ))
                                        }
                                </select>
                            </div>

                            {/* pick up date */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Pick Up Date</h3>
                                <input type="date" onChange={handlePickupDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                            </div>

                            {/* Pickup time */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">PickUp Time</h3>
                                <input type="time" onChange={handlePickup} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"/>
                            </div>

                            {/* package */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Packages</h3>
                                <select value={packageValue} onChange={handlePackage} className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>Select City</option>
                                        {
                                        packages.map((pack) =>(
                                            <option key={pack.id} value={pack.value}>{pack.value}</option>
                                            // <option>country</option>
                                        ))
                                        }
                                </select>
                            </div>

                            </div>
                        </div>
                    </div>
                )
            }
            <StylingButton variant="contained" onClick={()=> logined ? cabBooking : alert("You need to login/signup...")} type="submit">Book cab</StylingButton>
            </div>
        </div>
    )
}

export default Cabs
