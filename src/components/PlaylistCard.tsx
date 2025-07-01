
import { Heart, Play, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Song {
  title: string;
  artist: string;
  albumCover: string;
}

interface Playlist {
  id: number;
  summary: string;
  mood: string;
  author: string;
  createdAt: string;
  likes: number;
  songs: Song[];
}

interface PlaylistCardProps {
  playlist: Playlist;
}

const getMoodColor = (mood: string) => {
  switch (mood) {
    case "happy": return "bg-mood-gradient";
    case "melancholy": return "bg-gradient-to-r from-blue-500 to-purple-600";
    case "excited": return "bg-gradient-to-r from-orange-500 to-pink-500";
    case "calm": return "bg-gradient-to-r from-green-400 to-blue-500";
    default: return "bg-mood-gradient";
  }
};

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <Card className="overflow-hidden hover-scale animate-fade-in">
      <CardContent className="p-0">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${getMoodColor(playlist.mood)} flex items-center justify-center`}>
                <span className="text-white text-sm font-medium">
                  {playlist.author[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">{playlist.author}</p>
                <p className="text-xs text-muted-foreground">{playlist.createdAt}</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="text-foreground leading-relaxed mb-4 text-sm">
            {playlist.summary}
          </p>
        </div>

        {/* Songs */}
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {playlist.songs.map((song, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <Play className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{song.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
                </div>
                <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="px-4 py-3 border-t border-border/50 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm">{playlist.likes + (isLiked ? 1 : 0)}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-2 ${isSaved ? 'text-primary' : ''}`}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="text-sm">저장</span>
              </Button>
            </div>

            <Button variant="outline" size="sm" className="text-xs">
              플레이리스트 듣기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
