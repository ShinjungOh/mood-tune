import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface GenreEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGenres: string[];
  onSave: (genres: string[]) => void;
}

const allGenres = [
  // 한국 음악
  { id: "k-pop", name: "K-Pop", category: "한국" },
  { id: "k-ballad", name: "발라드", category: "한국" },
  { id: "k-indie", name: "인디", category: "한국" },
  { id: "k-hiphop", name: "힙합", category: "한국" },
  { id: "k-rock", name: "록", category: "한국" },
  { id: "k-rnb", name: "R&B", category: "한국" },
  { id: "trot", name: "트로트", category: "한국" },
  
  // 해외 음악
  { id: "pop", name: "Pop", category: "해외" },
  { id: "rock", name: "Rock", category: "해외" },
  { id: "jazz", name: "Jazz", category: "해외" },
  { id: "classical", name: "Classical", category: "해외" },
  { id: "edm", name: "EDM", category: "해외" },
  { id: "country", name: "Country", category: "해외" },
  { id: "blues", name: "Blues", category: "해외" },
  { id: "latin", name: "Latin", category: "해외" },
  { id: "reggae", name: "Reggae", category: "해외" },
  
  // 분위기/상황별
  { id: "study", name: "공부할 때", category: "분위기" },
  { id: "workout", name: "운동할 때", category: "분위기" },
  { id: "sleep", name: "잠들기 전", category: "분위기" },
  { id: "party", name: "파티", category: "분위기" },
  { id: "chill", name: "휴식", category: "분위기" },
  { id: "focus", name: "집중", category: "분위기" },
  { id: "meditation", name: "명상", category: "분위기" }
];

const GenreEditModal = ({ isOpen, onClose, currentGenres, onSave }: GenreEditModalProps) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(currentGenres);

  const toggleGenre = (genreName: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreName) 
        ? prev.filter(g => g !== genreName)
        : [...prev, genreName]
    );
  };

  const handleSave = () => {
    onSave(selectedGenres);
    onClose();
  };

  const groupedGenres = allGenres.reduce((acc, genre) => {
    if (!acc[genre.category]) {
      acc[genre.category] = [];
    }
    acc[genre.category].push(genre);
    return acc;
  }, {} as Record<string, typeof allGenres>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>선호 장르 편집</DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            좋아하는 장르를 선택해주세요. AI가 더 정확한 음악을 추천해드립니다.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(groupedGenres).map(([category, genres]) => (
            <div key={category}>
              <h3 className="font-medium mb-3">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.name);
                  return (
                    <Badge
                      key={genre.id}
                      variant={isSelected ? "default" : "outline"}
                      className={`cursor-pointer transition-all ${
                        isSelected 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-primary/10"
                      }`}
                      onClick={() => toggleGenre(genre.name)}
                    >
                      {isSelected && <Check className="h-3 w-3 mr-1" />}
                      {genre.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {selectedGenres.length}개 선택됨
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                취소
              </Button>
              <Button onClick={handleSave}>
                저장
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenreEditModal;