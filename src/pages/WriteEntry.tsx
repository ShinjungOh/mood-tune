
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WriteEntry = () => {
  const [entry, setEntry] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    summary: string;
    mood: string;
    songs: Array<{ title: string; artist: string; reason: string }>;
  } | null>(null);
  const [rerollCount, setRerollCount] = useState(0);
  const maxRerolls = 2;

  const navigate = useNavigate();
  const charCount = entry.length;
  const minChars = 50;
  const maxChars = 1000;

  const mockPlaylistSets = [
    {
      summary: "오늘은 새로운 시작에 대한 설렘과 약간의 긴장감이 공존하는 하루였어요",
      mood: "hopeful",
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
    },
    {
      summary: "열정과 도전 정신이 가득한 하루였네요. 당신의 에너지가 느껴집니다",
      mood: "energetic",
      songs: [
        {
          title: "Run",
          artist: "방탄소년단",
          reason: "청춘의 열정과 도전 정신을 담은 곡"
        },
        {
          title: "Power",
          artist: "EXO",
          reason: "에너지 넘치는 비트와 긍정적인 메시지"
        },
        {
          title: "불타오르네",
          artist: "방탄소년단",
          reason: "열정적인 에너지를 불어넣어주는 곡"
        }
      ]
    },
    {
      summary: "잔잔한 감성과 여유로움이 느껴지는 하루였군요",
      mood: "peaceful",
      songs: [
        {
          title: "너의 의미",
          artist: "IU",
          reason: "따뜻하고 포근한 감성의 곡"
        },
        {
          title: "Through the Night",
          artist: "IU",
          reason: "잔잔한 밤의 감성을 담은 곡"
        },
        {
          title: "좋은 날",
          artist: "IU",
          reason: "일상의 소소한 행복을 노래하는 곡"
        }
      ]
    }
  ];

  const handleAnalyze = async (isReroll = false) => {
    if (!isReroll && entry.length < minChars) return;

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      // Use different mock data based on reroll count
      const mockResult = mockPlaylistSets[rerollCount % mockPlaylistSets.length];

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleReroll = async () => {
    if (rerollCount >= maxRerolls) return;

    setRerollCount(prev => prev + 1);
    handleAnalyze(true);
  };

  const handleShare = () => {
    // Here would normally save to database and redirect
    navigate("/");
  };

  if (analysisResult) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="animate-fade-in">
          {/* Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI가 분석한 오늘의 감정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed mb-4">{analysisResult.summary}</p>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                #{analysisResult.mood}
              </div>
            </CardContent>
          </Card>

          {/* Generated Playlist */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  당신을 위한 플레이리스트
                </span>
                {rerollCount < maxRerolls && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleReroll}
                    disabled={isAnalyzing}
                    className="text-xs"
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    다시 추천 ({maxRerolls - rerollCount}회 남음)
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResult.songs.map((song, index) => (
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

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={handleShare}
              className="w-full bg-mood-gradient hover:opacity-90 text-white font-medium"
              size="lg"
            >
              <Music className="mr-2 h-4 w-4" />
              플레이리스트 공유하기
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                setAnalysisResult(null);
                setRerollCount(0);
              }}
              className="w-full"
            >
              다시 작성하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <div className="animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">오늘의 감정을 들려주세요</h2>
          <p className="text-muted-foreground">당신의 이야기에 어울리는 음악을 찾아드릴게요</p>
        </div>

        {/* Writing Form */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <Textarea
              placeholder="오늘 하루는 어떠셨나요? 당신의 감정, 경험, 생각을 자유롭게 적어주세요..."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="min-h-[200px] resize-none border-0 focus-visible:ring-0 text-base leading-relaxed"
            />

            <div className="flex justify-between items-center mt-4 pt-4 border-t">
              <span className={`text-sm ${
                charCount < minChars 
                  ? "text-muted-foreground" 
                  : charCount > maxChars 
                    ? "text-destructive" 
                    : "text-primary"
              }`}>
                {charCount}/{maxChars}
              </span>

              {charCount < minChars && (
                <span className="text-xs text-muted-foreground">
                  최소 {minChars}자 이상 작성해주세요
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Button
          onClick={handleAnalyze}
          disabled={charCount < minChars || charCount > maxChars || isAnalyzing}
          className="w-full bg-mood-gradient hover:opacity-90 text-white font-medium"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="mr-2 h-4 w-4 animate-spin" />
              AI가 분석 중...
            </>
          ) : (
            <>
              음악 추천받기
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        {/* Tips */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2 text-sm">💡 더 좋은 음악 추천을 받으려면</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• 구체적인 감정이나 상황을 자세히 써주세요</li>
            <li>• 오늘 있었던 특별한 일이나 생각을 포함해보세요</li>
            <li>• 솔직하고 진솔한 마음을 표현해주세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WriteEntry;
