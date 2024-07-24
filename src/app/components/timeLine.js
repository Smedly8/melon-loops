'use client'
import { useState, useEffect } from 'react'
import styles from './timeLine.module.css'

const ticks = [0,1,2,3,4,5,6,7]
const sounds = [
    'H','S','K'
]


const stylesDict = {
    'H': styles.row__hat,
    'S': styles.row__snare,
    'K': styles.row__kick,
}

let rawSoundsSet = []
for(let tick in ticks){
    rawSoundsSet.push({'H': false, 'S': false, 'K': false})
}


export default function TimeLine({updateSoundsSet, currentTick, isPlaying}) {
    const [soundsSet, setSoundsSet] = useState(rawSoundsSet);
    
    
    const editTick = (sound, tick) => {
        console.log(sound, tick, );
        let soundsSetNext = [...soundsSet]
        soundsSetNext[tick][sound] = !soundsSet[tick][sound] 
        setSoundsSet(soundsSetNext)
        updateSoundsSet(soundsSet)
        
    }

    useEffect(() => {
        updateSoundsSet(soundsSet)
    }, [])

    const [test, setTest] = useState(1);

    return (
        <div className={styles.main}>            
            {sounds.map(sound =>
                <div key={sound} className={`${styles.row} ${stylesDict[sound]}`}>
                    {ticks.map(tick => 
                        <div key={tick} className={`${styles.soundBlock} ${soundsSet[tick][sound] ? styles.soundBlockActive : ''} ${currentTick === tick && isPlaying ? styles.soundBlockPlaying : ''}`} onClick={(e) => editTick(sound, tick, e) }>
                        </div>
                    )}
                </div>
            )}
            {/* <span className={styles.timeTarget} style={{left: `${100/8 * currentTick}%`}}></span> */}
        </div>
    );
  }