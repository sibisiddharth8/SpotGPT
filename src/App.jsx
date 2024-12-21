import React, { useContext } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Player from './components/Player.jsx'
import Display from './components/Display.jsx'
import { PlayerContext } from './context/PlayerContext.jsx'

const App = () => {

  const {audioRef, track} = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex '>
        <Sidebar/>
        <Display/>
      </div>
      <Player/>
      <audio ref={audioRef} preload='auto' src={track.file}></audio>
    </div>
  )
}

export default App
