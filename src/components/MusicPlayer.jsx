import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Disc, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const MusicPlayer = ({ isPlaying, setIsPlaying }) => {
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);
  const isReady = useRef(false);

  useEffect(() => {
    // Check if script already exists
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      playerRef.current = new window.YT.Player('youtube-audio-player', {
        height: '1',
        width: '1',
        videoId: 'syFZfO_wfMQ', // Night Changes Official Video
        playerVars: {
          autoplay: 0,
          controls: 0,
          start: 38, // Chorus: "We're only getting older baby"
          playsinline: 1
        },
        events: {
          onReady: (event) => {
            isReady.current = true;
            if (isPlaying) {
              event.target.seekTo(38, true);
              event.target.playVideo();
            }
          }
        }
      });
    };

    window.onYouTubeIframeAPIReady = initPlayer;
    if (window.YT && window.YT.Player) {
      initPlayer();
    }

    return () => {
      // Cleanup
    };
  }, []);

  useEffect(() => {
    if (isReady.current && playerRef.current && typeof playerRef.current.playVideo === 'function') {
      if (isPlaying) {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime < 38) {
          playerRef.current.seekTo(38, true);
        }
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [isPlaying]);

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (isReady.current && playerRef.current && typeof playerRef.current.isMuted === 'function') {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:-translate-x-0 md:right-6 z-[60] flex items-center gap-3 p-2 md:p-3 rounded-full glass border border-rose-500/30 shadow-2xl backdrop-blur-xl bg-black/60 w-max">
      
      {/* Hidden YouTube Player */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', opacity: 0, pointerEvents: 'none' }}>
        <div id="youtube-audio-player"></div>
      </div>
      
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black flex items-center justify-center border-2 border-rose-800 shadow-[0_0_15px_rgba(244,63,94,0.3)] shrink-0"
      >
        <Disc size={18} className="text-rose-500" />
      </motion.div>

      <div className="flex flex-col pr-1 md:pr-2">
        <span className="text-[10px] md:text-xs font-medium text-rose-200 tracking-wider whitespace-nowrap">Night Changes</span>
        <span className="text-[8px] md:text-[10px] text-rose-400 whitespace-nowrap">One Direction</span>
      </div>

      <div className="flex items-center gap-1 md:gap-2 pl-1 md:pl-2 border-l border-rose-500/20">
        <button onClick={togglePlay} className="p-2 hover:bg-rose-500/20 rounded-full transition-colors text-rose-300">
          {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>
        <button onClick={toggleMute} className="p-2 hover:bg-rose-500/20 rounded-full transition-colors text-rose-300">
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
