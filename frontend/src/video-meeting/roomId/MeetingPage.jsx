

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthContext } from '@/context/auth-context';
import { toast, ToastContainer } from 'react-toastify';


export const VideoMeeting = () => {
   const NEXT_PUBLIC_ZEGOAPP_ID = import.meta.env.VITE_NEXT_PUBLIC_ZEGOAPP_ID;
   const NEXT_PUBLIC_ZEGO_SERVER_SECRET = import.meta.env.VITE_NEXT_PUBLIC_ZEGO_SERVER_SECRET;
  const params = useParams();
  const roomID = params.roomId;
  const navigation = useNavigate();
  const containerRef = useRef(null); // ref for video container element
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const { auth } = useContext(AuthContext); // Access authentication state
  useEffect(() => {
    // Check if the user is authenticated before joining the meeting
    if (auth.authenticate ) {
      joinMeeting(containerRef.current);
    } else {
      console.log('Session is not authenticated. Please login before use.');
      ; // Redirect to login if not authenticated
    }
  }, [auth.authenticate, auth.user?.userName, navigation]); // Run when authentication or user changes

  useEffect(() =>{
    return () =>{
      if(zp){
          zp.destroy()
      }
    }
  },[zp])
 //zegocloud
const joinMeeting = async (element) => {
    // generate Kit Token
      const appID = Number(NEXT_PUBLIC_ZEGOAPP_ID);
      const serverSecret = NEXT_PUBLIC_ZEGO_SERVER_SECRET;
      if(!appID && !serverSecret){
      throw new Error('please provide appId and secret key')
     }
      const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID,  auth?.user?.id || Date.now().toString(),  auth?.user?.userName || 'Guest');

      

    
     // Create instance object from Kit Token.
      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
      setZp(zegoInstance)
      // start the call
      zegoInstance.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'join via this link',
            url:`${window.location.origin}/class/start-live-class/video-meeting/${roomID}`
            
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showAudioVideoSettingsButton: true,
        showScreenSharingButton:true,
        showTurnOffRemoteCameraButton:true,
        showTurnOffRemoteMicrophoneButton:true,
        showRemoveUserButton:true,
        onJoinRoom:() =>{
          toast.success('Meeting joined succesfully')
          setIsInMeeting(true);
        },
        onLeaveRoom:() =>{
          endMeeting();
        },
      });
 };

 const endMeeting =() =>{
  if(zp){
    zp.destroy();
  }
  toast.success('Meeting end succesfully')
  setZp(null);
  setIsInMeeting(false)
  router.push('/')
 }



  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
     <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
       <div className={`flex-grow flex flex-col md:flex-row relative ${ isInMeeting ? "h-screen" : "" }`}>
        <div
          ref={containerRef}
          className="video-container flex-grow"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
        </div>

     </div>
     </>
  )
}
export default VideoMeeting;