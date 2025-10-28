import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VideoCard } from '@/components/VideoCard';
import { BottomNav } from '@/components/BottomNav';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

interface Video {
  id: string;
  user_id: string;
  title: string | null;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  views_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
}

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase
          .from('videos')
          .select(`
            *,
            profiles (
              username,
              avatar_url
            )
          `)
          .order('created_at', { ascending: false })
          .limit(20);

        if (error) throw error;
        setVideos(data || []);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchVideos();
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar">
        {videos.length === 0 ? (
          <div className="h-screen flex items-center justify-center">
            <p className="text-muted-foreground text-lg">لا توجد فيديوهات حالياً</p>
          </div>
        ) : (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              videoId={video.id}
              username={video.profiles?.username || 'مستخدم'}
              avatar={video.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${video.id}`}
              description={video.description || ''}
              song="أغنية أصلية"
              likes={video.likes_count}
              comments={video.comments_count}
              shares={video.shares_count}
              videoUrl={video.video_url}
            />
          ))
        )}
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
