import {Search} from '../Search/Search'
import {Graph} from '../Graph/Graph'
import React , { useState, useEffect } from 'react';
import './Home.css'

export const Home = ({data}) =>{
    const [weekData,setWeekData] = useState([])
    useEffect(()=>{
        setWeekData(data.pop())
    },[data])
    return (
       <div>
            <div className="sevenDay">
                {data.map((e, i) => (
                <div key={i}>
                    <p>
                    {new Date(`${e.dt}` * 1000).toLocaleString("en", {
                        weekday: "short",
                    })}
                    </p>
                    <div className="daily-temp">
                    <p>{Math.round(e.temp.max)}°</p>
                    <p>{Math.round(e.temp.min)}°</p>
                    </div>
                    <div className="daily-img">
                    <img
                        src={`https://openweathermap.org/img/wn/${e?.weather[0]?.icon}@2x.png`}
                        alt=""
                    />
                    </div>
                    <p>{e.weather[0]?.main}</p>
                </div>
                ))}
            </div>
            <div className="graph-div">
                <div className="current-temp-img">
                    <strong>{Math.round(data[0]?.temp.max)}°C</strong>
                    <div className="current-img">
                        <img
                        src={`https://openweathermap.org/img/wn/${data[0]?.weather[0]?.icon}@2x.png`}
                        alt=""
                        />
                    </div>
                </div>
                <Graph data={data} />
                <div className="pressHumid">
                    <div>
                        <div className="pressure">Pressure</div>
                        <div>{data[0]?.pressure} hpa</div>
                    </div>
                    <div>
                        <div className="humidity">Humidity</div>
                        <div>{data[0]?.humidity} %</div>
                    </div>
                </div>
            </div>
       </div>
    )
}