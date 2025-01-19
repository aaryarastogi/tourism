import { Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, styled } from "@mui/material";
import Select , {SelectChangeEvent} from "@mui/material/Select";
import React, { useEffect, useRef, useState, useContext } from "react";
import axios from 'axios'

import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { baseUrl } from "../../../HelperUrl/Helper";



const StylingRadio=styled(RadioGroup)`
    display:flex;
    flex-direction:row;
`

const StylingButton=styled(Button)(({ theme }) => ({
    marginLeft:'85%',
    marginBottom:'15px',
    background: '#374151',
    [theme.breakpoints.down('md')]: {
      marginLeft:'65%'
  },
  ":hover":{
    background:'#52525b'
  }
  }))

const Hotels=()=>{

    const [checkinDate,setCheckinDate] = useState(new Date())
    const handleCheckInDate = (e) => {
        setCheckinDate(e.target.value)
    }

    const [checkoutDate,setCheckoutDate] = useState(new Date())
    const handleCheckOutDate = (e) => {
        setCheckoutDate(e.target.value)
    }

    const [location,setLocation]=useState('From');

    const handleLocation=(event)=>{
        setLocation(event.target.value)
    };

    const options=[
        {value:'aarya'},
        {value:'ujjwal'}
    ]

    var config = {
        method: 'get',
        url: 'https://api.countrystatecity.in/v1/countries/IN/cities',
        headers: {
          'X-CSCAPI-KEY': 'S3AwWUVncFhudTVDRnVrdUJmSVQ1WDR4MDZBN253TlZBU2VWdENBVg=='
        }
      };
      
      var [cities,setCities]=useState([]);

      axios(config)
      .then(function (response) {
        const newData=(response.data);
        setCities(newData);
        // console.log(cities);
      })
      .catch(function (error) {
        console.log(error);
      });

      const prices=[
        {
            value:'Rs 0 - Rs 1500'
        },
        {
            value:'Rs 1500 - Rs 2500'
        },
        {
            value:'Rs 2500 - Rs 5000'
        },
        {
            value:'Rs 5000+'
        },
      ]

      const[price,setPrice]=useState('');
      const handlePrice=(e)=>{
        setPrice(e.target.value)
      }

      const rooms=[
        {value : '1 Room'} , {value : '2 Room'} , {value : '3 Room'} , {value : '4 Room'} , {value : '1 Room with hall'}
      ]

      const[room,setRoom]=useState('')
      const handleRoom=(e)=>{
        setRoom(e.target.value)
      }

      const[category,setCategory]=useState('rooms')

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
        window.scrollTo(1,1);
      },[])

      const hotelBooking=async(e)=>{
        e.preventDefault();
        try{
            alert('hotel Ticket Booked Succesfully...')
            await axios.post(`http://localhost:8000/hotelbooking`,{
                email,category,location,checkinDate,checkoutDate,room,price
            }).then(res=>{
                console.log(res.data);
            })
            .catch((e)=>{
                console.log("failed",e)
            })
            console.log(e);
        }
        catch(e){
            console.log('book hotel failed',e);
        }
      }

    return(
        <div className="w-full h-screen overflow-hidden">
            <div className="w-auto bg-white md:mx-32 rounded-md">
            <div className="flex flex-row space-x-2 ml-12">
                <StylingRadio
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="rooms" control={<Radio checked={category === "rooms"}/>} label="Upto 4 Rooms" onChange={(e)=>setCategory(e.target.value)}/>
                    <FormControlLabel value="group" control={<Radio checked={category === "group"} />} label="Group Deals" onChange={(e)=>setCategory(e.target.value)}/>
                </StylingRadio>
                <h1 className="text-gray-500 mt-12 font-semibold text-md">Book Domestic and International Property Online. To list your property.</h1>  
            </div>

            <div className="flex md:flex-row flex-col pt-4 justify-around md:ml-0 ml-10">
                 {/* Location */}
                <div className="text-left md:ml-10 py-4 space-y-4">
                    <h3 className="font-semibold text-gray-800">Location</h3>
                    <select value={location} onChange={handleLocation} className="bg-white md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                    <option>choose</option>
                    {
                        cities.map((item,index) =>(
                            <option key={index} value={item.name}>{item.name}</option>
                    ))}
                    </select>
                </div>

                {/* check-in & check-out */}
                            <div className="text-left md:ml-10 py-8">
                                <h3 className="font-semibold text-gray-800">Check In</h3>
                                <input type="date" onChange={handleCheckInDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                            </div>

                            <div className="text-left md:ml-10 py-8">
                                <h3 className="font-semibold text-gray-800">Check Out</h3>
                                <input type="date" onChange={handleCheckOutDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                            </div>

                {/* rooms & guests */}

                <div className="text-left md:ml-10 py-4 space-y-4">
                    <h3 className="font-semibold text-gray-800">Rooms & Guests</h3>
                    <select value={room} onChange={handleRoom} className="md:w-auto w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                    <option className=" bg-blue-400">choose</option>
                    <h1>Adults</h1>
                    {   
                        rooms.map((item,index) =>(
                            <option key={index} value={item.value}>{item.value}</option>
                    ))}
                    </select>
                </div>

                {/* price per night */}
                <div className="text-left md:ml-10 py-4 space-y-4">
                    <h3 className="font-semibold text-gray-800">Price Per Night</h3>
                    <select value={price} onChange={handlePrice} className="md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                    <option className=" bg-blue-400">choose</option>
                    {
                        prices.map((item,index) =>(
                            <option key={index} value={item.value}>{item.value}</option>
                    ))}
                    </select>
                </div>
            </div>
            <StylingButton variant="contained" onClick={()=>logined ? hotelBooking : alert("You need to login/SignUp first")}>Book Hotel</StylingButton>
            </div>
        </div>
    )
}

export default Hotels;