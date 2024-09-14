import { useState } from "react";
import './App.css'
import PreliPrac from "./Components/PreliPrac";

function App(){
  return(
    <>
    <div className="Griddy">
    <br/>
    <div><h1>Prelim Exam: Color Roulette Game </h1></div>
    <div>
      <PreliPrac/>
    </div>
    </div>
    </>
  )
}

export default App