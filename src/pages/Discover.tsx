import { BottomNav } from "@/components/BottomNav";
import { Search, TrendingUp, Music, Hash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Discover() {
  const trendingHashtags = [
    { tag: "ترند_اليوم", views: "12.5M", icon: TrendingUp },
    { tag: "موسيقى", views: "8.9M", icon: Music },
    { tag: "كوميدي", views: "6.2M", icon: Hash },
    { tag: "رقص", views: "5.1M", icon: Hash },
    { tag: "طبخ", views: "4.8M", icon: Hash },
    { tag: "سفر", views: "3.9M", icon: Hash },
  ];

  const trendingVideos = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    thumbnail: `https://api.dicebear.com/7.x/shapes/svg?seed=${i}`,
    views: `${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 9)}M`,
  }));

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="p-4 space-y-3">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            اكتشف
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="ابحث عن فيديوهات، هاشتاجات، مستخدمين..."
              className="pl-10 bg-muted border-0 h-12 rounded-xl"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Trending Hashtags */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">الهاشتاجات الرائجة</h2>
          <div className="grid grid-cols-2 gap-3">
            {trendingHashtags.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.tag}
                  className="p-4 cursor-pointer hover:bg-muted transition-smooth border-border bg-card"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 text-right">
                      <p className="font-semibold">#{item.tag}</p>
                      <p className="text-sm text-muted-foreground">{item.views} مشاهدة</p>
                    </div>
                    <div className="p-2 rounded-lg gradient-primary">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Trending Videos Grid */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">فيديوهات رائجة</h2>
          <div className="grid grid-cols-3 gap-2">
            {trendingVideos.map((video) => (
              <div
                key={video.id}
                className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-cyan-900/40 group-hover:opacity-80 transition-smooth" />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md">
                  <p className="text-xs font-semibold text-white">{video.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
