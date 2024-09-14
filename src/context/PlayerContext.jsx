import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PLayerContext=createContext();

const PLayerContextProvider=(props)=> {

    const audioRef=useRef();
    const seekBg=useRef();
    const seekBar=useRef();

    const [track,setTrack]=useState(songsData[0]);
    const [playStatus,SetPlayStatus]=useState(false);
    const[time,SetTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        TotalTime:{
            second:0,
            minute:0
        },

    })

    const play=()=>{
        audioRef.current.play();
        SetPlayStatus(true);
    }
    const pause=()=>{
        audioRef.current.pause();
        SetPlayStatus(false);
    }

    const playWithId=async (id) =>{
        await setTrack(songsData[id]);
        await audioRef.current.play();
        SetPlayStatus(true);
    }

    const previous =async()=>{
        if(track.id>0){
            await setTrack(songsData[track.id-1]);
            await audioRef.current.play();
            SetPlayStatus(true);
        }
    }
    const next =async()=>{
        if(track.id<songsData.length-1){
            await setTrack(songsData[track.id+1]);
            await audioRef.current.play();
            SetPlayStatus(true);
        }
    }
    const seekSong=async(e)=>{
        audioRef.current.currentTime=((e.nativeEvent.offsetX/seekBg.current.offsetWidth)*audioRef.current.duration)
        

    }
    useEffect(()=>{
        setTimeout(()=>{
                audioRef.current.ontimeupdate=()=>{
                    seekBar.current.style.width=(Math.floor((audioRef.current.currentTime/audioRef.current.duration)*100))+"%";
                    SetTime({
                        currentTime:{
                            second:Math.floor(audioRef.current.currentTime%60),
                            minute:Math.floor(audioRef.current.currentTime/60)
                        },
                        TotalTime:{
                            second:Math.floor(audioRef.current.duration%60),
                            minute:Math.floor(audioRef.current.duration/60)
                            
                        },
                
                    })
                }
        }, 1000);
    },[audioRef])

    
        
    const contextValue={
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        SetPlayStatus,
        time,
        SetTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong
    }
    return(
        <PLayerContext.Provider value={contextValue}>
            {props.children}
        </PLayerContext.Provider>
    )
}
export default PLayerContextProvider;