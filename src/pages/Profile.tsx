
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Music, Heart, TrendingUp, Settings, BookOpen, Bookmark, Edit2 } from "lucide-react";
import GenreEditModal from "@/components/GenreEditModal";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("entries");
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);
  const [favoriteGenres, setFavoriteGenres] = useState(["K-Pop", "인디", "Jazz", "Classical"]);
  const navigate = useNavigate();

  const mockStats = {
    totalEntries: 24,
    totalPlaylists: 18,
    totalLikes: 156,
  };

  const mockEntries = [
    { id: 1, date: "2024-01-15", summary: "새로운 시작에 대한 설렘", mood: "hopeful", likes: 12 },
    { id: 2, date: "2024-01-14", summary: "친구들과의 즐거운 시간", mood: "happy", likes: 8 },
    { id: 3, date: "2024-01-13", summary: "조용한 휴식이 필요한 하루", mood: "calm", likes: 15 },
  ];

  const mockPlaylists = [
    { 
      id: 1, 
      title: "희망찬 시작의 플레이리스트", 
      songCount: 3, 
      date: "2024.01.15", 
      likes: 12,
      type: "diary", // 일기 기반
      entryId: 1
    },
    { 
      id: 2, 
      title: "평온한 휴식의 플레이리스트", 
      songCount: 3, 
      date: "2024.01.13", 
      likes: 15,
      type: "diary", // 일기 기반
      entryId: 3
    },
    { 
      id: 3, 
      title: "K-Pop 신나는 플레이리스트", 
      songCount: 10, 
      date: "2024.01.10", 
      likes: 25,
      type: "saved" // 저장된 플레이리스트
    },
    { 
      id: 4, 
      title: "잔잔한 재즈 모음", 
      songCount: 8, 
      date: "2024.01.08", 
      likes: 18,
      type: "saved" // 저장된 플레이리스트
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="animate-fade-in">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-mood-gradient flex items-center justify-center">
                <span className="text-white text-xl font-bold">M</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">음악애호가</h2>
                <p className="text-muted-foreground">음악으로 감정을 표현하는 것을 좋아해요</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{mockStats.totalEntries}</p>
                <p className="text-sm text-muted-foreground">일기</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{mockStats.totalPlaylists}</p>
                <p className="text-sm text-muted-foreground">플레이리스트</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{mockStats.totalLikes}</p>
                <p className="text-sm text-muted-foreground">좋아요</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Favorite Genres */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                선호 장르
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsGenreModalOpen(true)}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
              {favoriteGenres.length === 0 && (
                <p className="text-sm text-muted-foreground">아직 선호 장르를 설정하지 않으셨네요. 편집 버튼을 눌러 추가해보세요!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="entries" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              내 일기
            </TabsTrigger>
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              플레이리스트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="entries" className="mt-6">
            <div className="space-y-4">
              {mockEntries.map((entry) => (
                <Card 
                  key={entry.id} 
                  className="hover-scale cursor-pointer transition-all hover:shadow-md"
                  onClick={() => navigate(`/entry/${entry.id}`)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {entry.likes}
                      </div>
                    </div>
                    <p className="font-medium mb-2 hover:text-primary transition-colors">{entry.summary}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      #{entry.mood}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="playlists" className="mt-6">
            <div className="space-y-4">
              {mockPlaylists.map((playlist) => (
                <Card 
                  key={playlist.id} 
                  className="hover-scale cursor-pointer transition-all hover:shadow-md"
                  onClick={() => {
                    if (playlist.type === "diary" && playlist.entryId) {
                      navigate(`/entry/${playlist.entryId}`);
                    }
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        playlist.type === "diary" ? "bg-mood-gradient" : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}>
                        <Music className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{playlist.title}</p>
                          <Badge 
                            variant={playlist.type === "diary" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {playlist.type === "diary" ? (
                              <>
                                <BookOpen className="h-3 w-3 mr-1" />
                                내 일기
                              </>
                            ) : (
                              <>
                                <Bookmark className="h-3 w-3 mr-1" />
                                저장됨
                              </>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{playlist.songCount}곡 • {playlist.date}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {playlist.likes}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Genre Edit Modal */}
        <GenreEditModal
          isOpen={isGenreModalOpen}
          onClose={() => setIsGenreModalOpen(false)}
          currentGenres={favoriteGenres}
          onSave={(newGenres) => {
            setFavoriteGenres(newGenres);
            // 여기서 실제로는 API를 호출하여 서버에 저장
            console.log("Updated genres:", newGenres);
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
