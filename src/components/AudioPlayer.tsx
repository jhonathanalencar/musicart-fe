import { ChangeEvent, useRef, useState } from 'react';
import {
  FastForward,
  Pause,
  Play,
  Rewind,
  SpeakerHigh,
  SpeakerX,
} from 'phosphor-react';

import { formatHumanReadTime, formatTime } from '../utils/formatter';

const url =
  'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/4f/d1/6e/4fd16e9e-aee3-f565-f7ac-d374959bed75/mzaf_13334718501163194135.plus.aac.ep.m4a';

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaTime, setMediaTime] = useState(0);
  const [volume, setVolume] = useState(0.2);

  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlaying() {
    setIsPlaying((prev) => !prev);
    isPlaying ? audioRef.current?.pause() : audioRef.current?.play();
  }

  function onLoadedMetadata() {
    if (!audioRef.current) return;

    setDuration(audioRef.current.duration);
    audioRef.current.volume = volume;
  }

  function onTimeUpdate() {
    if (!audioRef.current) return;

    setMediaTime(audioRef.current.currentTime);
  }

  function onScrubberChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;

    const newTime = Number(event.target.value);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  function onRewind() {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.max(currentTime - 15, 0);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  function onFastForward() {
    if (!audioRef.current) return;

    const { currentTime } = audioRef.current;
    const newTime = Math.min(currentTime + 15, duration);
    setMediaTime(newTime);
    audioRef.current.currentTime = newTime;
  }

  function toggleMute() {
    if (!audioRef.current) return;

    setIsMuted((prev) => !prev);
    audioRef.current.muted = !isMuted;
  }

  function onVolumeChange() {
    if (!audioRef.current) return;

    if (audioRef.current.muted || audioRef.current.volume === 0) {
      setIsMuted(true);
    } else if (!audioRef.current.muted) {
      setIsMuted(false);
      setVolume(audioRef.current.volume);
    }
  }

  function onVolumeScrubberChange(event: ChangeEvent<HTMLInputElement>) {
    if (!audioRef.current) return;

    const newVolume = Number(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  }

  return (
    <div className="absolute z-[8] bottom-0 left-0 w-full h-32 bg-gray-900/60 backdrop-blur-sm">
      <div className="h-full flex items-center justify-between p-3">
        <div className="flex flex-1 gap-2">
          <div className="h-14 w-14 bg-gray-600 rounded">
            <img src="" alt="" />
          </div>

          <div className="flex flex-col items-start">
            <strong className="text-slate-200 ">Ado</strong>
            <span className="text-slate-300 ">Usewa</span>
          </div>
        </div>

        <div className="flex-1 justify-center flex flex-col gap-3">
          <div className="flex justify-center gap-3">
            <button
              aria-label="Rewind 15 seconds"
              onClick={onRewind}
              className="flex items-center gap-1"
            >
              <span className="text-slate-300 font-semibold text-lg">15</span>
              <Rewind weight="fill" className="w-8 h-8 text-slate-100" />
            </button>
            <button
              onClick={togglePlaying}
              className="bg-slate-100 rounded-full p-1"
            >
              {isPlaying ? (
                <>
                  <Pause weight="fill" className="h-8 w-8 text-gray-900" />
                  <span className="sr-only">Pause</span>
                </>
              ) : (
                <>
                  <Play weight="fill" className="h-8 w-8 text-gray-900" />
                  <span className="sr-only">Play</span>
                </>
              )}
            </button>
            <button
              aria-label="Fast-Forward 15 seconds"
              onClick={onFastForward}
              className="flex items-center gap-1"
            >
              <FastForward weight="fill" className="w-8 h-8 text-slate-100" />
              <span className="text-slate-300 font-semibold text-lg">15</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="sr-only">
              Elapsed Time: {formatHumanReadTime(mediaTime)}
            </span>
            <span
              aria-hidden="true"
              className="text-slate-300 text-base font-medium font-mono"
            >
              {formatTime(mediaTime)}
            </span>

            <input
              type="range"
              id="time-scrubber"
              value={mediaTime}
              min={0}
              max={duration}
              onChange={onScrubberChange}
              aria-valuetext={formatHumanReadTime(mediaTime)}
              className="w-full accent-violet-500"
            />

            <span className="sr-only">
              Total time: {formatHumanReadTime(duration)}
            </span>
            <span
              aria-hidden="true"
              className="text-slate-300 text-base font-medium font-mono"
            >
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex-1 flex justify-center gap-2">
          <button onClick={toggleMute}>
            {isMuted ? (
              <>
                <span className="sr-only">Unmute</span>
                <SpeakerX
                  aria-hidden="true"
                  weight="fill"
                  className="h-6 w-6 text-slate-300"
                />
              </>
            ) : (
              <>
                <span className="sr-only">Mute</span>
                <SpeakerHigh
                  aria-hidden="true"
                  weight="fill"
                  className="h-6 w-6 text-slate-300"
                />
              </>
            )}
          </button>

          <label htmlFor="volume-scrubber" className="sr-only">
            Volume
          </label>
          <input
            type="range"
            id="volume-scrubber"
            value={isMuted ? 0 : volume}
            min={0}
            max={1}
            step={0.1}
            onChange={onVolumeScrubberChange}
            className="accent-violet-500"
          />
        </div>

        <audio
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onVolumeChange={onVolumeChange}
          src={url}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}
