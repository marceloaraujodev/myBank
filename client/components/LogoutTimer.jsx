import { useEffect, useState, useContext, useRef } from "react";
import UserContext from '../UserContext';

export default function LogoutTimer() {
  const {logout} = useContext(UserContext);
  
  // checks if there is a timer in local storage if not sets time to 300s 5m
  const initialTime = () => {
    const savedTime = localStorage.getItem('logout-timer');
    return savedTime ? Number(savedTime) : 300;
  }

  // state is moved after initial time so it exist on component mount
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      setTime(prevTime => {
        // console.log(prevTime)
        // console.log(prevTime -1)
        if(prevTime <= 1){
          localStorage.removeItem('logout-timer');
          logout()
        }
        return prevTime - 1;
      });
    }

    // ref lets you persist its value without causing rerenders
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      clearInterval(intervalRef.current);
    }
  }, [logout]);

  useEffect(() => {
    // Save the current time to localStorage whenever it changes
    localStorage.setItem('logout-timer', time);
  }, [time]);
  
  // format times to dispay full number if 00:00 instead of 1:1s
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2,'0')}`
  }

  return (
    <p className="logout-timer">
    You will be logged out in <span className="timer">{formatTime(time)}</span>
  </p>
  )
}
