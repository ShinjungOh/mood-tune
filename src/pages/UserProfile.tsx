
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Music, Heart, TrendingUp, ArrowLeft, UserPlus, UserCheck, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("playlists");
  const [isFriend, setIsFriend] = useState(false);

  // Mock user data - 실제 앱에서는 userId로 API 호출
  const mockUser = {
    id: userId,
    nickname: "감성플레이어",
    bio: "일상의 감정을 음악으로 기록하는 것을 좋아해요",
    favoriteGenres: ["인디", "Jazz", "Lo-fi", "발라드"],
    totalLikes: 342,
    totalEntries: 28,
    joinDate: "2024.01.01"
  };

  const mockPlaylists = [
    { 
      id: 1, 
      date: "2024-01-15", 
      mood: "peaceful", 
      likes: 18,
      songs: [
        { title: "봄날", artist: "BTS" },
        { title: "Through the Night", artist: "아이유" },
        { title: "너의 의미", artist: "아이유, 김창완" }
      ]
    },
    { 
      id: 2, 
      date: "2024-01-14", 
      mood: "contemplative", 
      likes: 12,
      songs: [
        { title: "밤편지", artist: "아이유" },
        { title: "오래된 노래", artist: "스탠딩 에그" },
        { title: "잊어야 한다는 마음으로", artist: "아이유" }
      ]
    },
    { 
      id: 3, 
      date: "2024-01-13", 
      mood: "grateful", 
      likes: 25,
      songs: [
        { title: "고마워", artist: "김동률" },
        { title: "너에게", artist: "김광석" },
        { title: "사랑하기 때문에", artist: "유재하" }
      ]
    },
  ];

  const handleAddFriend = () => {
    setIsFriend(true);
    toast({
      title: "친구 추가 완료!",
      description: `${mockUser.nickname}님과 친구가 되었습니다.`,
      duration: 2000,
    });
  };

  const handleRemoveFriend = () => {
    setIsFriend(false);
    toast({
      title: "친구 삭제",
      description: `${mockUser.nickname}님과의 친구 관계가 해제되었습니다.`,
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="animate-fade-in">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 p-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          뒤로 가기
        </Button>

        {/* User Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {mockUser.nickname.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{mockUser.nickname}</h2>
                <p className="text-muted-foreground text-sm">{mockUser.bio}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockUser.joinDate}부터 활동
                </p>
              </div>
              <Button
                onClick={isFriend ? handleRemoveFriend : handleAddFriend}
                variant={isFriend ? "outline" : "default"}
                size="sm"
                className="flex items-center gap-2"
              >
                {isFriend ? (
                  <>
                    <UserCheck className="h-4 w-4" />
                    친구
                  </>
                ) : (
                  <>
                    <UserPlus className="h-4 w-4" />
                    친구 추가
                  </>
                )}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{mockUser.totalEntries}</p>
                <p className="text-sm text-muted-foreground">작성한 일기</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{mockUser.totalLikes}</p>
                <p className="text-sm text-muted-foreground">받은 좋아요</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Music Preferences */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              음악 취향
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mockUser.favoriteGenres.map((genre) => (
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

        {/* User's Playlists */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="playlists" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              {mockUser.nickname}님의 플레이리스트
            </TabsTrigger>
          </TabsList>

          <TabsContent value="playlists" className="mt-6">
            {/* Privacy Notice */}
            <Card className="mb-4 bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <p>다른 사용자의 일기 내용은 비공개입니다. 플레이리스트만 조회할 수 있습니다.</p>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {mockPlaylists.map((playlist) => (
                <Card 
                  key={playlist.id} 
                  className="hover-scale transition-all hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{playlist.date}</span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          #{playlist.mood}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-3 w-3" />
                        {playlist.likes}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm mb-2">{mockUser.nickname}님의 {playlist.mood} 플레이리스트</h4>
                      {playlist.songs.map((song, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <Music className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{song.title}</span>
                          <span className="text-muted-foreground">-</span>
                          <span className="text-muted-foreground">{song.artist}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
