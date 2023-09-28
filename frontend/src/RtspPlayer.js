import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';

const RtspPlayer = ({ rtspUrl }) => {
    const videoRef = useRef(null);
    
    useEffect(() => {
       const video = videoRef.current;
       if (Hls.isSupported()) {
         const hls = new Hls();
         hls.loadSource(rtspUrl);
         hls.attachMedia(video);
         hls.on(Hls.Events.MANIFEST_PARSED, () => {
           video.play();
         });
       } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
         video.src = rtspUrl;
         video.addEventListener('loadedmetadata', () => {
           video.play();
         });
       }
    }, [rtspUrl]);
 
    return <video ref={videoRef} width="100%" height="auto" controls />;
};

export default RtspPlayer;