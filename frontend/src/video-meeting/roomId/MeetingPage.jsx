import React, { useContext, useEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { AuthContext } from '@/context/auth-context';
import { toast, ToastContainer } from 'react-toastify';
import { Button } from '@/components/ui/button';

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
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated before joining the meeting
    if (auth.authenticate) {
      joinMeeting(containerRef.current);
    } else {
      console.log('Session is not authenticated. Please login before use.');
      // Redirect to login if not authenticated
      navigation('/login');
    }
  }, [auth.authenticate, auth.user?.userName, navigation]); // Run when authentication or user changes

 

  useEffect(() => {
    return () => {
      // Cleanup: destroy the meeting instance when component is unmounted
      if (zp) {
        zp.destroy();
      }
    };
  }, [zp]);

   useEffect(() => {
    if (redirected) {
      setRedirected(false);
    }
  }, [redirected]);

  // ZegoCloud
  const joinMeeting = async (element) => {
    try {
      const appID = Number(NEXT_PUBLIC_ZEGOAPP_ID);
      const serverSecret = NEXT_PUBLIC_ZEGO_SERVER_SECRET;
      if (!appID || !serverSecret) {
        throw new Error('Please provide appId and secret key');
      }
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        auth?.user?.id || Date.now().toString(),
        auth?.user?.userName || 'Guest'
      );

      // Create instance object from Kit Token
      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
      setZp(zegoInstance);

      // Start the call
      zegoInstance.joinRoom({
        container: element,
        onDisconnect: () => {
        toast.error("Disconnected from the meeting. Reconnecting...");
        setTimeout(() => {
          window.location.reload(); // Reload to attempt reconnection
          }, 2000);
        },
        sharedLinks: [
          {
            name: 'Join via this link',
            url: `${window.location.origin}/class/start-live-class/video-meeting/${roomID}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here
        },
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
        onJoinRoom: () => {
          toast.success('Meeting joined successfully');
          setIsInMeeting(true);
        },
        onLeaveRoom: () => {
          endMeeting();
        },
      });
    } catch (error) {
      console.error('Error joining the meeting:', error);
      toast.error('Failed to join the meeting');
    }
  };

 
  const endMeeting = () => {
    if (zp) {
      zp.destroy(); // Destroy meeting instance if it exists
      setZp(null);  // Reset state
    }

    toast.success('Meeting ended successfully');

    setTimeout(() => {
      if (auth?.user?.role === 'instructor') {
        navigation('/instructor');
      } else {
        navigation('/home');
      }

      setTimeout(() => {
        window.location.reload(); // Refresh the page after navigation
      }, 10); // Give some time for navigation before reloading
    }, 1000); // Delay to allow toast message to show
  };



  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className={`flex-grow flex flex-col md:flex-row relative ${isInMeeting ? 'h-screen' : ''}`}>
          <div
            ref={containerRef}
            className="video-container flex-grow"
            style={{ height: isInMeeting ? '100%' : 'calc(100vh - 4rem)' }}
          ></div>
        </div>

        {!isInMeeting && (
          <div className="flex flex-col">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Meeting Info</h2>
              <p className="mb-4 text-gray-600 dark:text-gray-300">Participant - {auth?.user?.userName || 'You'}</p>
              <Button
                onClick={endMeeting}
                className="w-full bg-red-500 hover:bg-red-200 text-white hover:text-black"
              >
                End Meeting
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-200 dark:bg-gray-700">
              <div className="text-center">
                <img
                  src="/images/videoQuality.jpg"
                  alt="Feature 1"
                  width={150}
                  height={150}
                  className="mx-auto mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">HD Video Quality</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Experience crystal clear video calls</p>
              </div>
              <div className="text-center">
                <img
                  src="/images/screenShare.jpg"
                  alt="Feature 1"
                  width={150}
                  height={150}
                  className="mx-auto mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Screen Sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Easily share your screen with participants</p>
              </div>
              <div className="text-center">
                <img
                  src="/images/videoSecure.jpg"
                  alt="Feature 1"
                  width={150}
                  height={150}
                  className="mx-auto mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">Secure Meetings</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Your meetings are protected and private</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoMeeting;
