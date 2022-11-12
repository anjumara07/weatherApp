import React , { useState, useEffect } from 'react';
import axios from 'axios'
import './Dropdown.css'
import {Home} from '../Home/Home'

export const Dropdown = (props) =>{
    const [singleDay, setSingleDay] = useState({});
    const [weatherData,setWeatherData] = useState([])

    useEffect(()=>{
        getCity("delhi")
    },[])

    const getCity = (city) => {
        props.setData([])
        props.setCity(city)
        city = city.toLowerCase()
        try {
        axios
            .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c654cd32f0421daf4f1ea2aaaf2c917&units=metric`
            )
            .then((res) => {
            sevenDaysData(res.data.coord.lat, res.data.coord.lon);
            setSingleDay(res.data);
            })
            .catch((err) => {
            console.log(err);
            });
        } catch (error) {}
    };

  const sevenDaysData = (lat, lon) => {
    try {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9c654cd32f0421daf4f1ea2aaaf2c917&units=metric`
        )
        .then((res) => {
        //   console.log(res.data);
          let array = []
          for(let i=0 ; i<6 ; i++){
            array.push(res.data.daily[i])
          }
          setWeatherData(array);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch {}
  };

    return (
        <div>
            <div className="inputBoxDropdown">
                {props.data.map((e,i)=>(
                    <div onClick={()=>getCity(e.city)} key={i} className="dataDiv" >{e.city} , {e.state}</div>
                ))}
            </div>
            <Home data={weatherData} />
        </div>
    )
}

