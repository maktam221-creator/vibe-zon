import { Heart, MessageCircle, Share2, Music } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface VideoCardProps {
  username: string;
  avatar: string;
  description: string;
  song: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
}

export function VideoCard({
  username,
  avatar,
  description,
  song,
  likes,
  comments,
  shares,
}: VideoCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="relative h-screen w-full snap-start snap-always">
      {/* Video Background - placeholder gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/30 to-cyan-900/30" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex">
        {/* Left side - User info and description */}
        <div className="flex-1 flex flex-col justify-end p-4 pb-24">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-white text-lg">@{username}</span>
              <Button
                size="sm"
                className="h-8 px-6 gradient-primary border-0 text-white font-semibold hover:opacity-90"
              >
                متابعة
              </Button>
            </div>
            <p className="text-white text-base leading-relaxed">{description}</p>
            <div className="flex items-center gap-2 text-white/90">
              <Music className="h-4 w-4" />
              <span className="text-sm">{song}</span>
            </div>
          </div>
        </div>

        {/* Right side - Action buttons */}
        <div className="flex flex-col items-center justify-end gap-6 p-4 pb-24">
          <div className="flex flex-col items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className={`h-14 w-14 rounded-full transition-all ${
                isLiked
                  ? "bg-primary text-white glow-primary"
                  : "bg-background/20 backdrop-blur-sm text-white hover:bg-background/30"
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-7 w-7 ${isLiked ? "fill-current" : ""}`} />
            </Button>
            <span className="text-white text-sm font-semibold">{likeCount}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-14 w-14 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/30"
            >
              <MessageCircle className="h-7 w-7" />
            </Button>
            <span className="text-white text-sm font-semibold">{comments}</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-14 w-14 rounded-full bg-background/20 backdrop-blur-sm text-white hover:bg-background/30"
            >
              <Share2 className="h-7 w-7" />
            </Button>
            <span className="text-white text-sm font-semibold">{shares}</span>
          </div>

          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-white animate-spin-slow">
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback>{username[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}
