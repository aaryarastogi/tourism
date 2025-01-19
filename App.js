import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Routes , Route } from 'react-router-dom';
import SignUp from './Components/Login/SignUp';
import Main from './Components/Main';
import Hotels from './Components/BookingPart/Hotels/Hotels';
import SignIn from './Components/Login/SignIn';
import Flights from './Components/BookingPart/Flights/Flights';
import Trains from './Components/BookingPart/Trains/Trains';
import Forex from './Components/BookingPart/Forex/Forex';
import Dubai from './Components/Destinations/Dubai/Dubai';
import Cabs from './Components/BookingPart/Cabs/Cabs';
import MyTrips from './Components/Trips/MyTrips'
import MyAccount from './Components/Account/MyAccount';
import Registered from './Components/Login/Registered';
import NotFound from './Components/NotFound';


function App() {

  return (
    <div className="App bg-gradient-to-tr from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88]">
        <Navbar/>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/signin' element={<SignIn/>}></Route>
          <Route path='/hotels' element={<Hotels/>}></Route>
          <Route path='/flights' element={<Flights/>}></Route>
          <Route path='/trains' element={<Trains/>}></Route>
          <Route path='/cabs' element={<Cabs/>}></Route>
          <Route path='/forex' element={<Forex/>}></Route>
          <Route path='/mytrips' element={<MyTrips/>}></Route>
          <Route path='/dubai' element={<Dubai/>}></Route>
          <Route path='/myprofile' element={<MyAccount/>}></Route>
          <Route path='/registered' element={<Registered/>}></Route>
          <Route path='/*' element={<NotFound/>}></Route>
        </Routes>
    </div>
  );
}

export default App;