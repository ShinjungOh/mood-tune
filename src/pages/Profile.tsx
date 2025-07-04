
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, Music, Users, UserPlus, UserCheck, UserX, Check, X, Edit2, Calendar, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import GenreEditModal from "@/components/GenreEditModal";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

  // Mock data
  const [mockProfile, setMockProfile] = useState({
    nickname: "나의뮤직",
    bio: "감정을 음악으로 표현하는 것을 좋아합니다",
    favoriteGenres: ["인디", "재즈", "로파이", "발라드", "R&B"],
    totalLikes: 128,
    totalEntries: 15,
    joinDate: "2024.01.01"
  });

  const [favoriteGenres, setFavoriteGenres] = useState(mockProfile.favoriteGenres);

  // Mock entries data
  const mockEntries = [
    {
      id: 1,
      date: "2024-01-15",
      title: "새로운 시작에 대한 설렘",
      summary: "따뜻한 햇살 속에서 느낀 평온함",
      mood: "peaceful",
      likes: 18,
      playlistId: 1
    },
    {
      id: 2,
      date: "2024-01-14",
      title: "카페에서의 여유",
      summary: "새로운 카페에서 마신 커피의 여운",
      mood: "contemplative",
      likes: 12,
      playlistId: 2
    },
    {
      id: 3,
      date: "2024-01-13",
      title: "친구와의 소중한 시간",
      summary: "친구와의 깊은 대화가 남긴 감동",
      mood: "grateful",
      likes: 25,
      playlistId: 3
    },
  ];

  const mockFriends = [
    { id: 1, nickname: "음악러버", profileImageUrl: "", isOnline: true },
    { id: 2, nickname: "감성플레이어", profileImageUrl: "", isOnline: false },
    { id: 3, nickname: "데일리뮤직", profileImageUrl: "", isOnline: true },
  ];

  const mockFriendRequests = [
    { requestId: 1, fromUser: { id: 4, nickname: "뮤직메이트" } },
    { requestId: 2, fromUser: { id: 5, nickname: "플레이리스터" } },
  ];

  const handleAcceptRequest = (requestId: number, nickname: string) => {
    toast({
      title: "친구 요청 수락",
      description: `${nickname}님과 친구가 되었습니다!`,
    });
  };

  const handleRejectRequest = (requestId: number, nickname: string) => {
    toast({
      title: "친구 요청 거절",
      description: `${nickname}님의 친구 요청을 거절했습니다.`,
    });
  };

  const handleRemoveFriend = (friendId: number, nickname: string) => {
    toast({
      title: "친구 삭제",
      description: `${nickname}님과의 친구 관계가 해제되었습니다.`,
    });
  };

  const handleSaveGenres = (newGenres: string[]) => {
    setFavoriteGenres(newGenres);
    setMockProfile(prev => ({
      ...prev,
      favoriteGenres: newGenres
    }));
    toast({
      title: "음악 취향 업데이트",
      description: "선호 장르가 업데이트되었습니다.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="animate-fade-in">
        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {mockProfile.nickname.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{mockProfile.nickname}</h2>
                <p className="text-muted-foreground text-sm">{mockProfile.bio}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockProfile.joinDate}부터 활동
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                설정
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{mockProfile.totalEntries}</p>
                <p className="text-sm text-muted-foreground">작성한 일기</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{mockProfile.totalLikes}</p>
                <p className="text-sm text-muted-foreground">받은 좋아요</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">프로필</TabsTrigger>
            <TabsTrigger value="friends">친구</TabsTrigger>
            <TabsTrigger value="requests">요청</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Music className="h-5 w-5" />
                    음악 취향
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsGenreModalOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {favoriteGenres.length > 0 ? (
                    favoriteGenres.map((genre) => (
                      <span
                        key={genre}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      음악 취향을 설정하면 더 정확한 추천을 받을 수 있습니다.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* My Entries */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  나의 일기
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer hover:border-primary/50"
                      onClick={() => navigate(`/entry/${entry.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm text-muted-foreground">{entry.date}</span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Heart className="h-3 w-3" />
                          {entry.likes}
                        </div>
                      </div>
                      <h3 className="font-semibold mb-1">{entry.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{entry.summary}</p>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          #{entry.mood}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                          <Music className="h-3 w-3 mr-1" />
                          플레이리스트
                        </span>
                      </div>
                    </div>
                  ))}

                  {mockEntries.length === 0 && (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">아직 작성한 일기가 없습니다.</p>
                      <Button
                        className="mt-4"
                        onClick={() => navigate('/write')}
                      >
                        첫 일기 작성하기
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="friends" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  친구 목록 ({mockFriends.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockFriends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {friend.nickname.charAt(0)}
                            </span>
                          </div>
                          {friend.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{friend.nickname}</p>
                          <p className="text-xs text-muted-foreground">
                            {friend.isOnline ? "온라인" : "오프라인"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/user/${friend.id}`)}
                        >
                          프로필 보기
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFriend(friend.id, friend.nickname)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <UserX className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  친구 요청 ({mockFriendRequests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {mockFriendRequests.length > 0 ? (
                  <div className="space-y-3">
                    {mockFriendRequests.map((request) => (
                      <div key={request.requestId} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {request.fromUser.nickname.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{request.fromUser.nickname}</p>
                            <p className="text-xs text-muted-foreground">친구 요청을 보냈습니다</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.requestId, request.fromUser.nickname)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            수락
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectRequest(request.requestId, request.fromUser.nickname)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            거절
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">새로운 친구 요청이 없습니다.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Genre Edit Modal */}
      <GenreEditModal
        isOpen={isGenreModalOpen}
        onClose={() => setIsGenreModalOpen(false)}
        currentGenres={favoriteGenres}
        onSave={handleSaveGenres}
      />
    </div>
  );
};

export default Profile;
