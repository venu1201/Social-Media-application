
import './App.css';
//import UilReact from '@iconscout/react-unicons/icons/uil-react'
import Topbutton from './components/Topbutton';
import Input from './components/Input';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import GetFormattedWeatherData from './services/WeatherServices';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [query,setQuery]=useState({q:'berlin'});
  const [units,setUnits]=useState('metric');
  const [weather,setWeather]=useState(null);

  useEffect(()=>{
    
    
    
    const fetchData=async ()=>{
    
      const message=query.q ? query.q:"current location.";
     

      await GetFormattedWeatherData({...query,units}).then(
        (data)=>{
          
          setWeather(data);
        });
  
  
    };
  
    fetchData();

  },[query,units])


  const fetchData=async()=>{

    const data=await GetFormattedWeatherData({q:"london"});
    console.log(data);

  };

  fetchData();

  const formatbackground =()=>{
    if(!weather) return  "from-cyan-900 to-blue-600"
    const threshold=units==="metric"? 25 : 80

    if(weather.temp<=threshold) return  "from-cyan-900 to-blue-600"

    return "from-orange-700 to-yellow-500"
  } 
  return (
    <div className={`max-w-full  bg-gradient-to-br from-cyan-900 to-blue-600 shadow-xl  ${formatbackground()}`}>
      <Topbutton setQuery={setQuery}/>
      <Input setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather &&(
      <div>
      <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather}/>

      </div>
      
      )}

      {/* <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} /> */}

     
    
    </div>
  );
}

export default App;
