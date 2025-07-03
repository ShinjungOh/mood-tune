
import { useState } from "react";
import PlaylistCard from "@/components/PlaylistCard";
import { Button } from "@/components/ui/button";
import { Music, Users, Globe } from "lucide-react";

// Mock data for demonstration
const mockPlaylists = [
  {
    id: 1,
    summary: "오늘은 비가 와서 마음이 차분해졌어요",
    mood: "melancholy",
    author: "음악러버",
    createdAt: "2시간 전",
    likes: 24,
    isFriend: true,
    songs: [
      { title: "Rain", artist: "이적", albumCover: "/api/placeholder/60/60" },
      { title: "우산", artist: "에픽하이", albumCover: "/api/placeholder/60/60" },
      { title: "비 오는 날", artist: "윤하", albumCover: "/api/placeholder/60/60" },
    ]
  },
  {
    id: 2,
    summary: "친구들과 즐거운 시간을 보냈던 하루",
    mood: "happy",
    author: "데일리뮤직",
    createdAt: "5시간 전",
    likes: 43,
    isFriend: false,
    songs: [
      { title: "좋은 날", artist: "IU", albumCover: "/api/placeholder/60/60" },
      { title: "Dancing Queen", artist: "ABBA", albumCover: "/api/placeholder/60/60" },
      { title: "Happy", artist: "Pharrell Williams", albumCover: "/api/placeholder/60/60" },
    ]
  },
  {
    id: 3,
    summary: "새로운 도전을 앞두고 설레는 마음",
    mood: "excited",
    author: "감성플레이어",
    createdAt: "1일 전",
    likes: 18,
    isFriend: true,
    songs: [
      { title: "새로운 시작", artist: "정용화", albumCover: "/api/placeholder/60/60" },
      { title: "Can't Stop the Feeling", artist: "Justin Timberlake", albumCover: "/api/placeholder/60/60" },
      { title: "좋은 일이 생길 거야", artist: "심규선", albumCover: "/api/placeholder/60/60" },
    ]
  }
];

const Timeline = () => {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");
  const [viewMode, setViewMode] = useState<"all" | "friends">("all");

  const filteredPlaylists = mockPlaylists.filter(playlist => 
    viewMode === "all" || playlist.isFriend
  );

  const sortedPlaylists = [...filteredPlaylists].sort((a, b) => {
    if (sortBy === "popular") {
      return b.likes - a.likes;
    }
    return 0; // Keep original order for latest
  });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-mood-gradient flex items-center justify-center">
            <Music className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">오늘의 플레이리스트</h2>
            <p className="text-sm text-muted-foreground">
              {viewMode === "friends" ? "친구들의 감정이 담긴 음악들" : "모두의 감정이 담긴 음악들"}
            </p>
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <Button
            variant={sortBy === "latest" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("latest")}
            className="text-xs"
          >
            최신
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSortBy("popular")}
            className="text-xs"
          >
            인기
          </Button>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex bg-muted rounded-lg p-1 mb-6">
        <Button
          variant={viewMode === "all" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("all")}
          className="flex items-center gap-2 flex-1"
        >
          <Globe className="h-4 w-4" />
          전체 타임라인
        </Button>
        <Button
          variant={viewMode === "friends" ? "default" : "ghost"}
          size="sm"
          onClick={() => setViewMode("friends")}
          className="flex items-center gap-2 flex-1"
        >
          <Users className="h-4 w-4" />
          친구 타임라인
        </Button>
      </div>

      {/* Timeline Feed */}
      <div className="space-y-6">
        {sortedPlaylists.length > 0 ? (
          sortedPlaylists.map(playlist => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              아직 친구의 플레이리스트가 없습니다.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              친구를 추가해보세요!
            </p>
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedPlaylists.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="w-full">
            더 많은 플레이리스트 보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
