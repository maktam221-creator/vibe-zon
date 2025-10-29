import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Video, Image as ImageIcon, Music, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            إنشاء محتوى
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Main Create Options */}
        <div className="space-y-4">
          <Button className="w-full h-32 gradient-primary border-0 text-white justify-start p-6 group hover:opacity-90">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                <Video className="h-10 w-10" />
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">تسجيل فيديو</p>
                <p className="text-sm text-white/80">ابدأ التصوير الآن</p>
              </div>
            </div>
          </Button>

          <Button 
            onClick={() => navigate('/upload-video')}
            className="w-full h-32 gradient-secondary border-0 text-white justify-start p-6 group hover:opacity-90"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                <ImageIcon className="h-10 w-10" />
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">رفع فيديو</p>
                <p className="text-sm text-white/80">اختر من معرض الصور</p>
              </div>
            </div>
          </Button>
        </div>

        {/* Additional Features */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-muted-foreground">ميزات إضافية</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-24 flex-col gap-2 border-border hover:bg-muted">
              <Music className="h-8 w-8 text-secondary" />
              <span className="text-sm font-semibold">إضافة موسيقى</span>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 border-border hover:bg-muted">
              <Sparkles className="h-8 w-8 text-accent" />
              <span className="text-sm font-semibold">تأثيرات</span>
            </Button>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-muted rounded-xl space-y-2">
          <h3 className="font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            نصائح للمحتوى الرائج
          </h3>
          <ul className="text-sm text-muted-foreground space-y-1 pr-4">
            <li>• استخدم الإضاءة الجيدة</li>
            <li>• أضف الموسيقى الرائجة</li>
            <li>• استخدم هاشتاجات مناسبة</li>
            <li>• كن مبدعاً وأصلياً</li>
          </ul>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
