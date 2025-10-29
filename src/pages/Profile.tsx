import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from "@/components/BottomNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Grid, Heart, Bookmark, LogOut, Loader2 } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function Profile() {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        const { data: videosData, error: videosError } = await supabase
          .from('videos')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (videosError) throw videosError;
        setVideos(videosData || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={signOut}>
              <LogOut className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="ghost">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
          <h1 className="text-xl font-bold">الملف الشخصي</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24 border-4 border-primary glow-primary">
            <AvatarImage src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.username}`} />
            <AvatarFallback>{profile?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold">@{profile?.username}</h2>
            {profile?.bio && (
              <p className="text-muted-foreground mt-1">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              {profile?.followers_count || 0}
            </p>
            <p className="text-sm text-muted-foreground">متابع</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-secondary bg-clip-text text-transparent">
              {profile?.following_count || 0}
            </p>
            <p className="text-sm text-muted-foreground">متابَع</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold gradient-accent bg-clip-text text-transparent">
              {profile?.likes_count || 0}
            </p>
            <p className="text-sm text-muted-foreground">إعجاب</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" size="icon" className="h-11 w-11">
            <Bookmark className="h-5 w-5" />
          </Button>
          <Button className="flex-1 gradient-primary border-0 text-white font-semibold h-11">
            تعديل الملف الشخصي
          </Button>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="videos" className="px-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="videos" className="data-[state=active]:bg-background">
            <Grid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="liked" className="data-[state=active]:bg-background">
            <Heart className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="data-[state=active]:bg-background">
            <Bookmark className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4">
          {videos.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              لا توجد فيديوهات بعد
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative aspect-[9/16] rounded-sm overflow-hidden cursor-pointer group"
                >
                  {video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-pink-900/40 to-cyan-900/40 group-hover:opacity-80 transition-smooth" />
                  )}
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    <p className="text-xs font-semibold text-white">{video.views_count}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="liked" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            لا توجد فيديوهات محفوظة بعد
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-4">
          <div className="text-center py-12 text-muted-foreground">
            لا توجد فيديوهات محفوظة بعد
          </div>
        </TabsContent>
      </Tabs>

      <BottomNav />
    </div>
  );
}
