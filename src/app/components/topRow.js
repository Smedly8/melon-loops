'use client'
import styles from './topRow.module.css'

export default function TimeLine({play, isPlaying}) {
    
    return (
        <>
            <div className={styles.topRow}>
                {isPlaying 
                    ? <img onClick={play} className={styles.playButton} src='/images/pause.svg'/>
                    : <img onClick={play} className={styles.playButton} src='/images/play.svg'/>
                }
            </div>
        </>
    )
}