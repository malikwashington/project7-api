import './App.css';
import axios from 'axios';
import {useEffect, useState} from "react"

function App() {
  const [legend, setLegend] = useState();
  const [count, setCount] = useState(0)
  const getLegend = async () => {
    const res = await axios.get(
      "https://league-api-production.up.railway.app/characters",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    setLegend(res.data);
  };
  useEffect(() => {
    getLegend();
  }, []);
  
  const nextLegend = () => {
    setCount(count+1)
  }

  const prevLegend = () => {
    setCount(count - 1)
    console.log(count)
  }

  if (!legend) return <div>Loading...</div>;

  return (
    <>
      <h1>League of Legends</h1>
      <div className="app">
        <div className="legend">
          <h2>{legend[count]["name"]}</h2>
          <h4>{legend[count]["title"]}</h4>
        <button className="prev" disabled={count == 0 ? true : false}  onClick={prevLegend}>
          Previous Legend
        </button>
          <img src={legend[count]['image_splash']} alt={legend[count]['name']}/>
        <button className="next" disabled={count==159 ? true : false} onClick={nextLegend}>
          Next Legend
        </button>
          <p>{legend[count]["blurb"]}</p>
        </div>
      </div>
    </>
  );
}

export default App;
