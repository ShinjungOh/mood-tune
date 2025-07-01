
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Music, Heart, TrendingUp, Settings } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("entries");

  const mockStats = {
    totalEntries: 24,
    totalPlaylists: 18,
    totalLikes: 156,
    favoriteGenres: ["K-Pop", "Indie", "Jazz", "Classical"]
  };

  const mockEntries = [
    { id: 1, date: "2024-01-15", summary: "새로운 시작에 대한 설렘", mood: "hopeful", likes: 12 },
    { id: 2, date: "2024-01-14", summary: "친구들과의 즐거운 시간", mood: "happy", likes: 8 },
    { id: 3, date: "2024-01-13", summary: "조용한 휴식이 필요한 하루", mood: "calm", likes: 15 },
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
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              선호 장르
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockStats.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
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
                <Card key={entry.id} className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {entry.likes}
                      </div>
                    </div>
                    <p className="font-medium mb-2">{entry.summary}</p>
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
              <Card className="hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-mood-gradient flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">희망찬 시작의 플레이리스트</p>
                      <p className="text-sm text-muted-foreground">3곡 • 2024.01.15</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      12
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">평온한 휴식의 플레이리스트</p>
                      <p className="text-sm text-muted-foreground">3곡 • 2024.01.13</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Heart className="h-3 w-3" />
                      15
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
