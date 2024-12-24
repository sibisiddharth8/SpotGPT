import { createContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
// import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(new Audio());

  const seekBg = useRef();
  const seekBar = useRef();

  const url = 'http://localhost:4000'


  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const playWithId = async (id) =>{
    await songsData.map((item)=>{
      if(id === item._id){
        setTrack(item);
      }
    })

    await audioRef.current.play();
    setPlayStatus(true);
  }

  const previous = async (id) =>{
    songsData.map(async (item, index)=>{
      if(track._id === item._id && index>0){
        await setTrack(songsData[index-1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    })
  }

  const next = async (id) =>{
    songsData.map(async (item, index)=>{
      if(track._id === item._id && index < songsData.length - 1) {
        await setTrack(songsData[index+1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    })
  }

  const seekSong = async (e) =>{
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    
  }

  const getSongsData = async () =>{
    try{
      const response = await axios.get(`${url}/api/song/list`);
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch(error){

    }
  }

  const getAlbumsData = async () =>{
    try{
      const response = await axios.get(`${url}/api/album/list`);
      console.log("albums Data");
      console.log(response.data.albums);
      setAlbumsData(response.data.albums);
    } catch(error){

    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.ontimeupdate = () => {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 0;
  
        const progress = (current / duration) * 100;
  
        seekBar.current.style.width = progress + '%';
  
        setTime({
          currentTime: {
            second: Math.floor(current % 60),
            minute: Math.floor(current / 60),
          },
          totalTime: {
            second: Math.floor(duration % 60),
            minute: Math.floor(duration / 60),
          },
        });
  
        if (progress >= 100) {
          next();
        }
      };
    }
  }, [audioRef, track, songsData]);
  

  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
