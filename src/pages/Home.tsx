import { VideoCard } from "@/components/VideoCard";
import { BottomNav } from "@/components/BottomNav";

export default function Home() {
  const videos = [
    {
      username: "أحمد_الفنان",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      description: "أفضل لحظات اليوم 🔥 #ترند #استكشف #فن",
      song: "الأغنية الرائجة - أحمد الفنان",
      likes: 125000,
      comments: 2300,
      shares: 450,
    },
    {
      username: "سارة_الإبداع",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      description: "تعلم معي هذا الرقص الجديد 💃✨ #رقص #تعليم",
      song: "موسيقى رائجة - DJ Mix",
      likes: 89000,
      comments: 1500,
      shares: 320,
    },
    {
      username: "محمد_الكوميدي",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohamed",
      description: "لما تحاول تطبخ لأول مرة 😂🔥 #كوميدي #مضحك",
      song: "Original Sound - محمد الكوميدي",
      likes: 256000,
      comments: 5200,
      shares: 1200,
    },
    {
      username: "نور_السفر",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nour",
      description: "أجمل الأماكن في دبي 🌆✨ #سفر #دبي #استكشف",
      song: "Travel Vibes - Mix 2024",
      likes: 178000,
      comments: 3400,
      shares: 890,
    },
  ];

  return (
    <div className="relative">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
      <BottomNav />
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
