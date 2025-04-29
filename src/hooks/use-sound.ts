import { useRef } from 'react';

export const useSound = (src: string, volume = 1) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return { play, stop };
};
