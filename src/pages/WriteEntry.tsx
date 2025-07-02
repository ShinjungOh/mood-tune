
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
    },
    {
      summary: "감정의 롤러코스터를 탄 듯한 복잡한 하루였네요. 당신의 마음을 이해합니다",
      mood: "complex",
      songs: [
        {
          title: "Palette",
          artist: "IU (feat. G-DRAGON)",
          reason: "성장과 변화를 담담하게 노래하는 곡"
        },
        {
          title: "에잇",
          artist: "IU & SUGA",
          reason: "그리움과 위로가 공존하는 감성적인 곡"
        },
        {
          title: "Love poem",
          artist: "IU",
          reason: "복잡한 감정을 섬세하게 표현한 곡"
        }
      ]
    },
    {
      summary: "오늘은 조금 지치고 힘든 하루였군요. 충분한 휴식을 취하세요",
      mood: "tired",
      songs: [
        {
          title: "잠이 오질 않네요",
          artist: "장범준",
          reason: "피곤한 마음을 달래주는 편안한 멜로디"
        },
        {
          title: "나의 바람",
          artist: "박효신",
          reason: "지친 마음에 위로를 전하는 곡"
        },
        {
          title: "괜찮아요",
          artist: "비투비",
          reason: "힘든 시간을 보내는 이들을 위한 응원가"
        }
      ]
    },
    {
      summary: "사랑스러운 감정으로 가득한 하루였네요. 행복이 묻어납니다",
      mood: "romantic",
      songs: [
        {
          title: "Love Story",
          artist: "백예린",
          reason: "달콤한 사랑의 감정을 표현한 곡"
        },
        {
          title: "Butterfly",
          artist: "BTS",
          reason: "소중한 사람을 향한 마음을 담은 곡"
        },
        {
          title: "스물셋",
          artist: "IU",
          reason: "설레는 감정을 섬세하게 표현한 곡"
        }
      ]
    },
    {
      summary: "성취감과 자부심이 느껴지는 멋진 하루였어요!",
      mood: "proud",
      songs: [
        {
          title: "DNA",
          artist: "BTS",
          reason: "운명적인 만남과 성취를 노래하는 곡"
        },
        {
          title: "WANNABE",
          artist: "ITZY",
          reason: "자신감 넘치는 메시지를 전하는 곡"
        },
        {
          title: "Not Today",
          artist: "BTS",
          reason: "도전과 승리의 메시지를 담은 곡"
        }
      ]
    },
    {
      summary: "그리움과 추억이 교차하는 감성적인 하루였네요",
      mood: "nostalgic",
      songs: [
        {
          title: "기억의 빈자리",
          artist: "넬",
          reason: "추억과 그리움을 담은 서정적인 곡"
        },
        {
          title: "청춘",
          artist: "김필",
          reason: "지나간 시간을 회상하게 하는 곡"
        },
        {
          title: "너였다면",
          artist: "정승환",
          reason: "아련한 추억을 불러일으키는 곡"
        }
      ]
    },
    {
      summary: "도전적이고 모험심이 가득한 활기찬 하루였어요!",
      mood: "adventurous",
      songs: [
        {
          title: "ON",
          artist: "BTS",
          reason: "새로운 도전을 향한 결의를 담은 곡"
        },
        {
          title: "Kick It",
          artist: "NCT 127",
          reason: "강렬한 에너지와 도전 정신이 담긴 곡"
        },
        {
          title: "DALLA DALLA",
          artist: "ITZY",
          reason: "자유롭고 당당한 메시지를 전하는 곡"
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
          onClick={() => handleAnalyze()}
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
