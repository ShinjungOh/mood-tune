import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Music, Calendar, Heart, Share2 } from "lucide-react";

const EntryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - 실제로는 ID로 데이터를 가져와야 함
  const mockEntry = {
    id: Number(id),
    date: "2024-01-15",
    title: "새로운 시작에 대한 설렘",
    content: "오늘은 정말 특별한 하루였다. 새로운 프로젝트를 시작하게 되었고, 오랜만에 친구들도 만났다. 카페에서 따뜻한 커피를 마시며 나눈 대화들이 아직도 귓가에 맴돈다. 앞으로의 일들이 기대되면서도 약간은 긴장된다. 하지만 이런 설렘이 나를 더 성장시킬 것이라고 믿는다.",
    mood: "hopeful",
    likes: 12,
    playlist: {
      title: "희망찬 시작의 플레이리스트",
      songs: [
        {
          title: "새로운 시작",
          artist: "정용화",
          reason: "새로운 도전에 대한 희망적인 메시지"
        },
        {
          title: "봄날",
          artist: "BTS",
          reason: "그리움과 희망이 담긴 감성적인 멜로디"
        },
        {
          title: "좋은 일이 생길 거야",
          artist: "심규선",
          reason: "긍정적인 에너지와 희망적인 가사"
        }
      ]
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            뒤로 가기
          </Button>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Entry Content */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">{mockEntry.date}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span className="text-sm">{mockEntry.likes}</span>
              </div>
            </div>
            <CardTitle className="text-2xl">{mockEntry.title}</CardTitle>
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                #{mockEntry.mood}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed whitespace-pre-wrap">
              {mockEntry.content}
            </p>
          </CardContent>
        </Card>

        {/* Playlist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music className="h-5 w-5 text-primary" />
              {mockEntry.playlist.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEntry.playlist.songs.map((song, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className="w-12 h-12 rounded-lg bg-mood-gradient flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                    <p className="text-xs text-muted-foreground mt-1">{song.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryDetail;