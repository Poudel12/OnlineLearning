

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthContext } from '@/context/auth-context';


export const VideoMeeting = () => {
  const params = useParams();
  const roomID = params.roomId;
  const navigation = useNavigate();
  const containerRef = useRef(null); // ref for video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const { auth } = useContext(AuthContext); // Access authentication state

  useEffect(() => {
    // Check if the user is authenticated before joining the meeting
    if (auth.authenticate && auth.user?.userName && containerRef.current) {
      joinMeeting(containerRef.current);
    } else {
      console.log('Session is not authenticated. Please login before use.');
      ; // Redirect to login if not authenticated
    }
  }, [auth.authenticate, auth.user?.userName, navigation]); // Run when authentication or user changes


 


  return (
    <div>page</div>
  )
}
export default VideoMeeting;