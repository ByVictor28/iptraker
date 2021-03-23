import {useState, useEffect} from "react";
import classes from './App.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import axios from "axios"
import Spiner from "./Spiner/Spiner";
import Tooltip from "./Tooltip/Tooltip";

function App() {

  const [reqData, setReqData] = useState({})
  const [coords, setcoords] = useState(null)
  const [ipAddress, setIpAddress] = useState("")

  useEffect(() => {
    axios.get("https://api-nod.herokuapp.com/ip")
    .then((result) => {
      setReqData(result.data.res)
      setcoords(result.data.res.coords)
      console.log(result)
    }).catch((err) => {
      console.log(err)
    });
  }, [])

  const SearchIp = () => {
    setcoords(null)
    axios.get("https://api-nod.herokuapp.com/ip?q="+ipAddress)
    .then((result) => {
      if(!result.data.error){
        setReqData(result.data.res)
        setcoords(result.data.res.coords)
      }else{
        setReqData({
          ip:"NOT FOUND",
          location:"NOT FOUND",
          timezone:"NOT FOUND",
          ISP:"NOT FOUND"
        })
      }
      
    }).catch((err) => {
      console.log(err)
    });
  }
  return (
    <div className="App">
      
      
      <div className={classes.Header} style={{backgroundImage:"url(/images/pattern-bg.png)"}}>
        <h1>IP Address Tracker </h1>
        <div className={classes.Search}>
          <input type="text" placeholder="Search for any API address or domain" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)}/>
          <input type="submit" value=">" onClick={SearchIp}/>
        </div>
        <div className={classes.Details}> 
          <div>
            <h2>IP ADDRESS</h2>
            <Tooltip text={reqData.ip}><p>{reqData.ip?reqData.ip:"NOT FOUND"}</p></Tooltip>
          </div>
          <div>
            <h2>LOCATION</h2>
            <p>{reqData.location?reqData.location:"NOT FOUND"}</p>
          </div>
          <div>
            <h2>TIMEZONE</h2>
            <p>{reqData.timezone?reqData.timezone:"NOT FOUND"}</p>
          </div>
          <div>
            <h2>ISP</h2>
            <p>{reqData.ISP?reqData.ISP:"NOT FOUND"}</p>
          </div>
        </div>     
      </div>
      <div className={classes.Map}>
        {
          coords===null?
          <Spiner></Spiner>
          : 
          <MapContainer className={classes.MapContainer} center={[coords.lat, coords.lon]} zoom={6} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coords.lat, coords.lon]}>
            <Popup>
              {reqData.ip}
            </Popup>
          </Marker>
        </MapContainer>
        }
      </div>
    </div>
  );
}

export default App;
