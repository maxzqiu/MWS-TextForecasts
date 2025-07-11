import { useState, useEffect } from 'react'
import './App.css'

const NEWPORTBEACH="https://nws-api-server.vercel.app/newportbeach";
const LOSANGELES="https://nws-api-server.vercel.app/losangeles";
const CLAREMONT="https://nws-api-server.vercel.app/claremont";
const ITEMS=["name","shortForecast","temperature","windSpeed","probabilityOfPrecipitation"]


function App() {
  
  let [login,setLogin]=useState(false);
  let [text,setText]=useState("");
  useEffect(
    ()=>{
      if (login===false){
        return;
      }
      async function fetchData(){
        let res0=await fetch(NEWPORTBEACH);
        let newportbeachdata=await res0.json();
        let res1=await fetch(LOSANGELES);
        let losangelesdata=await res1.json();
        let res2=await fetch(CLAREMONT);
        let claremontdata=await res2.json();
        let data=""
        function getData(day,dataSet,item){
          if (item==="windSpeed" && parseInt((dataSet.properties.periods[day][item]).substring(0,1))===0){
            return;
          } else if (item==="probabilityOfPrecipitation" && dataSet.properties.periods[day][item].value===null){
            return;
          } else if (item==="name"){
            data+="."+dataSet.properties.periods[day][item].toUpperCase();
          } else if (item==="shortForecast"){
            data+="..."+dataSet.properties.periods[day][item]+"\n"
          } else if (item==="temperature"){
            if (dataSet===newportbeachdata){
              if (dataSet.properties.periods[1]["name"].toUpperCase()==="TONIGHT"){
                if (day===2){
                  if (61<=dataSet.properties.periods[2][item] && dataSet.properties.periods[2][item]<=64){
                    data+="High/Low Temp: "+(dataSet.properties.periods[2][item]+5)+"\n";
                  }  else {
                    data+="High/Low Temp: "+(dataSet.properties.periods[2][item]+4)+"\n";
                  }
                  
                } else if (day===4){
                  data+="High/Low Temp: "+(dataSet.properties.periods[4][item]+5)+"\n"
                }else {
                  data+="High/Low Temp: "+dataSet.properties.periods[day][item]+"\n";
                }
              }else if (dataSet.properties.periods[0]["name"].toUpperCase()==="TONIGHT"){
                if (day===1){
                  if (61<=dataSet.properties.periods[1][item] && dataSet.properties.periods[1][item]<=64){
                    data+="High/Low Temp: "+(dataSet.properties.periods[1][item]+5)+"\n";
                  }  else {
                    data+="High/Low Temp: "+(dataSet.properties.periods[1][item]+4)+"\n";
                  } 
                } else if (day===3){
                  data+="High/Low Temp: "+(dataSet.properties.periods[3][item]+5)+"\n"
                }else  {
                data+="High/Low Temp: "+dataSet.properties.periods[day][item]+"\n";
              }
            }
            } else {
              
              data+="High/Low Temp: "+dataSet.properties.periods[day][item]+"\n";
            }
          
          } else if (item==="probabilityOfPrecipitation"){
            if ((dataSet.properties.periods[day][item].value)<5){
                null
            } else {
              data+="Chance of Rain: "+dataSet.properties.periods[day][item].value+"\n";
            }
            
          } else if (item==="windSpeed"){
            data+="Wind Speed: "+dataSet.properties.periods[day][item]+"\n"
          } else {
            data+=item+": "+dataSet.properties.periods[day][item]+"\n";
            return;
          }
        
      }
        data+="General Forecast Product\n";
        data+="Max's Weather Service Newport Beach CA \n"
        data+="time goes here \n\n"
        data+="This product covers coastal Orange County, the Los Angeles County coastal plain including Downtown Los Angeles, and the San Gabriel Valley in Los Angeles County. \n \n"
        data+="Visit our website at www.maxweatherservice.com to see automatically updated forecast data. \n\n"
        data+="SYNOPSIS for Orange and Los Angeles Counties... \n\n"
        data+="Coastal Orange County including Newport Beach- \n \n"
        
        for (let i=0;i<10;i+=1){
          
          for (let j of ITEMS){
            getData(i,newportbeachdata,j)
          }
          data+="\n\n"
        }
        data+="Inland Los Angeles County including Downtown Los Angeles- \n \n"
        
        for (let i=0;i<10;i+=1){
          
          for (let j of ITEMS){
            getData(i,losangelesdata,j)
          }
          data+="\n\n"
        }
        data+="San Gabriel Valley in Los Angeles County including Pomona and Pasadena- \n \n"
        
        for (let i=0;i<10;i+=1){
          
          for (let j of ITEMS){
            getData(i,claremontdata,j)
          }
          data+="\n\n"
        }
        data+="\n&&\n\n"
        data+="Visit our website at www.maxweatherservice.com. "
        
        
        setText(data);

      }
      fetchData();
    },[login]
  )

  return (
    <>
      <h4>Max's Weather Service Newport Beach CA</h4>
      <label htmlFor="password">Password: </label>
      
      <input id="password" onChange={(e)=>{
        if (e.target.value==="mwsrules"){
          setLogin(true);
        }
      }
      }></input>
      <br></br>
      <p>Forecast product will display here: </p>
      <textarea rows="50" cols="150" defaultValue={text}></textarea>
    </>
  )
}

export default App
