'use client'
import Image from "next/image";
import styles from "./page.module.css";
import TimeLine from "./components/timeLine";
import TopRow from './components/topRow'
import {useState, useEffect} from 'react'
let interval = null;

const lengthForLists = 5
let kickList = []
let hatList = []
let snareList = []


console.log(kickList, hatList, snareList);

const visualizeSound = (text) => {
  
}

let hatCounter = 0
const playHat = () => {
  console.log('HAT');
  hatList[hatCounter % lengthForLists].volume = 0.4;
  hatList[hatCounter % lengthForLists].play();
  hatCounter++
}

let kickCounter = 0
const playKick = () => {
    console.log('KICK');
    kickList[kickCounter % lengthForLists].play();
    kickCounter++
}

let snareCounter = 0
const playSnare = () => {
  console.log('SNARE');
  snareList[snareCounter % lengthForLists].play();
  snareCounter++
}


let soundsSet = null



const testSound = () => {
  playHat()
}



const updateSoundsSet = (newSet) => {
  console.log('updateSoundsSet');
  soundsSet = newSet
}

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  useEffect(() => {
    for(let list of [[kickList, '/sounds/K-long.mp3'], [hatList, '/sounds/H-long.mp3'], [snareList, '/sounds/S-long.mp3']]){
      for(let i = 0; i < lengthForLists; i++){
        list[0].push(new Audio(list[1]))
      }
    }
  
  })
  const playPause = () => {
    if(isPlaying){
      stop()
    } else {
      sound()
    }
    setIsPlaying(!isPlaying)
    setTimeout(() => {
      console.log('@@2', isPlaying);
    }, 100)
  }
  
  const [currentTick, setCurrentTick] = useState(0) 
  
  const stop = () => {
    clearInterval(interval)
    setCurrentTick(-1)
    setTimeout(() => {
      console.log(currentTick);
    }, 100)
  }
  
  const sound = () => {
    console.log('sound');
    
  
    setCurrentTick(-1)
      let i = 0 // переменная для посчета текущего тика
      interval = setInterval(() => {
        let current;
        let length = soundsSet.length
        let currentTickRow = i % length
        setTimeout(() => {
          console.log('@@', isPlaying);
          if(!isPlaying){
            setCurrentTick(currentTickRow)
          }
        }, 270)
        current = soundsSet[currentTickRow]
        if(current.H){
          playHat()
        }
        if(current.K){
          playKick()
        }
  
        if(current.S){
          playSnare()
        }
        // playKick()
        // playSnare()
        i++
      }, 280)
  
      
  
  }

  return (
    <main className={styles.main}>
        {/* <p onClick={stop}>stop</p>
        <p onClick={sound}>sound</p>
        <p onClick={testSound}>testSound</p> */}
        <div className={styles.centralWrap}>
          <TopRow play={playPause} isPlaying={isPlaying}/>
          <TimeLine currentTick={currentTick} isPlaying={isPlaying} updateSoundsSet={updateSoundsSet}/>
        </div>
    </main>
  );
}
