// PropertyVideoPlayer.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Heart, Info, Maximize2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function PropertyVideoPlayer({
  video,
  onAddToWishlist = (id) => console.log(`Added ${id} to wishlist`),
  onViewDetails = (id) => console.log(`Viewing details for ${id}`),
  onNext = () => {},
  onPrevious = () => {},
  onPlay = () => {}, // Callback for play event
  onPause = () => {}, // Callback for pause event
  onEnd = () => {}, // Callback for end event
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Reset video state when video source changes
    videoElement.load();
    setIsPlaying(true);
    setProgress(0);
    setIsLoading(true);

    // Start playing the new video
    videoElement.play().catch(() => setIsPlaying(false));
  }, [video]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const updateDuration = () => setDuration(videoElement.duration);
    const updateProgress = () => setProgress((videoElement.currentTime / videoElement.duration) * 100);
    const handleEnded = () => {
      setIsPlaying(false);
      videoElement.currentTime = 0;
      onEnd(); // Trigger ad when video ends
    };
    const handleLoadedData = () => setIsLoading(false);
    const handleWaiting = () => setIsLoading(true);
    const handleCanPlay = () => setIsLoading(false);
    const handlePlay = () => {
      setIsPlaying(true);
      onPlay(); // Trigger ad when video plays
    };
    const handlePause = () => {
      setIsPlaying(false);
      onPause(); // Trigger ad when video pauses
    };

    videoElement.addEventListener("loadedmetadata", updateDuration);
    videoElement.addEventListener("timeupdate", updateProgress);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("loadeddata", handleLoadedData);
    videoElement.addEventListener("waiting", handleWaiting);
    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);

    return () => {
      videoElement.removeEventListener("loadedmetadata", updateDuration);
      videoElement.removeEventListener("timeupdate", updateProgress);
      videoElement.removeEventListener("ended", handleEnded);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
      videoElement.removeEventListener("waiting", handleWaiting);
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("play", handlePlay);
      videoElement.removeEventListener("pause", handlePause);
    };
  }, [onPlay, onPause, onEnd]);

  const togglePlay = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
    } else {
      videoElement.play().catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (value) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const newTime = (value[0] / 100) * duration;
    videoElement.currentTime = newTime;
    setProgress(value[0]);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist(video.id);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full mx-auto rounded-lg overflow-hidden transition-all duration-300",
        "sm:max-w-[90%] sm:aspect-video sm:shadow-2xl sm:hover:shadow-3xl",
        "lg:max-w-[1200px]"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-[100dvh] sm:h-full object-cover sm:object-contain"
        poster={video}
        onClick={togglePlay}
        muted={isMuted}
        playsInline
        aria-label="Property video"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      )}

      {/* Action buttons */}
      <div className="absolute right-4 flex top-[10%] sm:top-4 flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:scale-105"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("w-5 h-5 sm:w-6 sm:h-6", isWishlisted ? "fill-red-500 text-red-500" : "text-white")}
          />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md w-10 h-10 sm:w-12 sm:h-12 transition-transform hover:scale-105"
          onClick={() => onViewDetails(video.id)}
          aria-label="View property details"
        >
          <Info className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </Button>
      </div>

      {/* Bottom controls */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 transition-opacity duration-300",
          isHovering || !isPlaying || isLoading ? "opacity-100" : "opacity-50 sm:opacity-0"
        )}
      >
        <div className="mb-2 sm:mb-3">
          <Slider
            value={[progress]}
            min={0}
            max={100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/40 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:border-0 [&_[role=slider]]:bg-white [&>span:first-child_span]:bg-primary]"
            aria-label="Video progress"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-transform hover:scale-110"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              {isPlaying ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-transform hover:scale-110"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
            <span className="text-white text-xs sm:text-sm">
              {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-2 sm:px-4 hidden sm:block"
              onClick={() => onViewDetails(video.id)}
            >
              View Details
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 w-8 h-8 sm:w-10 sm:h-10 transition-transform hover:scale-110 hidden sm:block"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Play button overlay when paused */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <Button
            variant="secondary"
            size="icon"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/90 hover:bg-primary text-white transition-transform hover:scale-110"
            onClick={togglePlay}
            aria-label="Play video"
          >
            <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-white" />
          </Button>
        </div>
      )}

      {/* Navigation arrows for mobile */}
      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full transition-transform hover:scale-110"
          onClick={onPrevious}
          aria-label="Previous property"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-black/50 hover:bg-black/70 text-white w-12 h-12 rounded-full transition-transform hover:scale-110"
          onClick={onNext}
          aria-label="Next property"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}