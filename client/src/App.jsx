import React from 'react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import RouteWrapper from '../src/Pages/RouteWrapper/RouteWrapper';
import { useSelector } from 'react-redux';


const App = () => {
  //  const navigate= useNavigate();

  //  const state=useSelector((state)=>state);
  //  console.log(state);
  //  useEffect(() => {
  //    if(user.authData===null)
  //    navigate('/Auth')
  //  }, [])

  // localStorage.removeItem('profile');
  // const store=useSelector((state)=>state);
  // console.log("store",store);
  return (
    
    <BrowserRouter>
      <RouteWrapper />

    </BrowserRouter>
  );
};

export default App;
