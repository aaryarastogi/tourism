import { Box, Button, Checkbox, FormControlLabel, Radio, RadioGroup, TextField, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { DateRange, DateRangePicker } from 'react-date-range';
import format from 'date-fns/format'
import axios from "axios";
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


const liveTrainStatus=[
    {
        number:'14722',
        name:'Abohar Jodhpur Express'
    },
    {
        number:'02502',
        name:'Agartala Kolkata Special'
    },
    {
        number:'12231',
        name:'Lucknow Chandigarh SF Express'
    },
    {
        number:'12565',
        name:'Bihar Sampark Kranti Express'
    },
    {
        number:'12528',
        name:'Ramnagar Weekly SF Express'
    },
    {
        number:'15011',
        name:'Chandigarh Express'
    },
    {
        number:'14616',
        name:'Lalkuan Express'
    },
    {
        number:'09417',
        name:'Ahmedabad Patna Special'
    },
    {
        number:'04302',
        name:'Saharanpur Moradabad Express'
    },
    {
        number:'14650',
        name:'Saryu Yamuna Express'
    },
    {
        number:'15120',
        name:'Dehradun Banaras Express'
    },
]

const classs =[
    {value : "All Class"},
    {value : "Sleeper Class"},
    {value : "Third AC"},
    {value : "Second AC"},
    {value : "First AC"},
    {value : "Second Seating"},
    {value : "Vistadome AC"},
    {value : "AC Chair Car"}
]

const Trains=()=>{

    // const [place,setPlace]=useState('From');

    // const handleSelectChange=(event)=>{
    //     setPlace(event.target.value);
    // };
    const [category,setCategory]=useState('Book Train');
    const[bookTrain,setBookTrain]=useState(true);
    const [checkPNR , setCheckPNR]=useState(false);
    const [liveTrain,setLiveTrain]=useState(false);

    const handleBookTrain=(e)=>{
        setBookTrain(true);
        setCheckPNR(false);
        setLiveTrain(false);
        setCategory('Book Train')
    }

    const handleCheckPNR=()=>{
        setBookTrain(false);
        setCheckPNR(true);
        setLiveTrain(false);
        setCategory('Check PNR')
    }

    const handleTrain=()=>{
        setBookTrain(false);
        setCheckPNR(false);
        setLiveTrain(true);
        setCategory('Live Train Status')
    }
    
    const [PNRnumber , setPNRNumber]=useState();
    const handlePNRNumber=(e)=>{
        setPNRNumber(e.target.value);
        // console.log(e.target.value);
    }

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

      const[fromCity,setFromCity]=useState('');
      const[destination,setDestination]=useState('');

      const[trainNumber,setTrainNumber]=useState('');
      const handleTrainNumber=(e)=>{
        setTrainNumber(e.target.value)
      }

      const[seatingClass,setSeatingClass]=useState('');
      const handleSeatingClass=(e)=>{
        setSeatingClass(e.target.value)
      }

      const [travelDate,setTravelDate] = useState(new Date())
      const handleTravelDate = (e) => {
            setTravelDate(e.target.value)
      }

    const[email,setEmail]=useState('');
    const[logined,setLogined]=useState(false);
    const[token,setToken]=useState('');
    const[data,setData]=useState([]);

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

      //for backend data passing
      const handlingTrainBooking=async(e)=>{
        console.log("func call hua...")
        e.preventDefault();
        try{
            alert('Train Ticket Booked Succesfully...')
            await axios.post(`${baseUrl}/trainbooking`,{
                email,category,fromCity,destination,travelDate,trainNumber,seatingClass
            }).then(res=>{
                console.log("success",res.data)
            })
            .catch((e)=>{
                console.log("failed",e)
            })
            // console.log(data);
        }
        catch(e){
            console.log('book train failed',e);
        }
      }
      
    return(
        <div className="w-full h-screen">
        <div className="w-auto bg-white md:mx-32 rounded-md py-10">
                <div className="flex flex-row space-x-2 ml-12 justify-between">
                    <StylingRadio
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Book Train" control={<Radio checked={bookTrain === true} />} label="Book Train Tickets" onClick={handleBookTrain}/>
                        <FormControlLabel value="Check PNR Status" control={<Radio checked={checkPNR === true} />} label="Check PNR Status"  onClick={handleCheckPNR} />
                        <FormControlLabel value="Live Train Status" control={<Radio checked={liveTrain === true} />} label="Live Train Status" onClick={handleTrain} />
                    </StylingRadio>
                    <h1 className="pr-10 text-medium font-semibold text-gray-600 mt-2">Train Booking 🤗</h1>
                    
                </div>

                {
                    //pnr status wala
                    checkPNR ? (
                    
                        <div className=" p-10 my-10 space-y-4 md:border-2 md:border-gray-300 mx-10 rounded-md">
                            <h1 className="text-2xl font-bold text-gray-600">PNR Number</h1>
                            <input className="w-full text-2xl text-gray-500" style={{outline:'none'}} value={PNRnumber} onChange={handlePNRNumber}></input>
                        </div>

                    ) : liveTrain ? (
                        
                        <div className="flex flex-col">
                        <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                        <div className="flex md:flex-row flex-col justify-between mx-4 my-4 md:space-y-0 space-y-4">
                            {/* train number component */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Train Number / Name</h3>
                                <select value={trainNumber} placeholder="Select Train No." onChange={handleTrainNumber} className="md:w-auto w-56 h-12 text-md font-semibold capitalize cursor-pointer"> 
                                        <option>choose</option>
                                        {
                                        liveTrainStatus.map((item,index) =>(
                                            <option key={index} value={item.name}>{item.number} , {item.name}</option>
                                        ))}
                                </select>
                            </div>
                            {/* to component */}
                            
                                {/* travellers part */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Seating Class</h3>
                                <select onChange={handleSeatingClass} className="md:w-auto w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        classs.map((item,index) =>(
                                            <option key={index} value={item.value}>{item.value}</option>
                                        ))}
                                </select>
                            </div>
    
                        </div>
                    </div>
                    
                </div>

                    ) : (
                    <div className="flex flex-col">
                        <div className="my-10 md:border-2 md:border-gray-300 mx-10 rounded-md">
                        <div className="flex md:flex-row flex-col justify-around my-4 md:space-y-0 space-y-4">
                            {/* from component */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">From</h3>
                                <select value={fromCity} onChange={(e)=>setFromCity(e.target.value)} className="md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        cities.map((city) =>(
                                            <option key={city.id} value={city.name}>{city.name}</option>
                                        ))}
                                </select>
                            </div>
                            {/* to component */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Destination</h3>
                                <select value={destination} onChange={(e)=>setDestination(e.target.value)} className="md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        cities.map((city) =>(
                                            <option key={city.id} value={city.name}>{city.name}</option>
                                        ))}
                                </select>
                            </div>
                            {/*travel date */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Travel Date</h3>
                                <input type="date" onChange={handleTravelDate}className="lg:w-44 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"></input>
                            </div>

                                {/* travellers part */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Class</h3>
                                <select value={seatingClass} onChange={(e)=>setSeatingClass(e.target.value)} className="md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer border-2 border-gray-50"> 
                                        <option>choose</option>
                                        {
                                        classs.map((item,index) =>(
                                            <option key={index} value={item.value}>{item.value}</option>
                                        ))}
                                </select>
                            </div>

                            {/* trains data */}
                            <div className="text-left md:ml-10">
                                <h3 className="font-semibold text-gray-800">Train Number / Name</h3>
                                <select value={trainNumber} placeholder="Select Train No." onChange={handleTrainNumber} className="md:w-36 w-56 h-12 text-md font-semibold capitalize cursor-pointer"> 
                                        <option>choose</option>
                                        {
                                        liveTrainStatus.map((item,index) =>(
                                            <option key={index} value={item.name}>{item.number} , {item.name}</option>
                                        ))}
                                </select>
                            </div>
    
                        </div>
                    </div>
                    
                </div>
                )}
                {
                    bookTrain ? (
                        <StylingButton variant="contained" onClick={()=>logined ? handlingTrainBooking : alert("You need to login/SignUp first")}>Book Train</StylingButton>
                    )
                    :(
                        <StylingButton variant="contained">search Train</StylingButton>
                    )
                }
        </div>
    </div>
    )
}
        
export default Trains;
