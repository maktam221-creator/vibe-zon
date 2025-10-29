import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Upload, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export default function UploadVideo() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 500MB)
      if (file.size > 524288000) {
        toast({
          title: 'خطأ',
          description: 'حجم الملف كبير جداً. الحد الأقصى 500 ميجابايت',
          variant: 'destructive',
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: 'خطأ',
          description: 'يرجى اختيار ملف فيديو',
          variant: 'destructive',
        });
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);

    try {
      // Upload video to storage
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Create video record in database
      const { error: dbError } = await supabase
        .from('videos')
        .insert({
          user_id: user.id,
          title: title || null,
          description: description || null,
          video_url: publicUrl,
          thumbnail_url: null,
        });

      if (dbError) throw dbError;

      toast({
        title: 'نجح!',
        description: 'تم رفع الفيديو بنجاح',
      });

      navigate('/');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'خطأ',
        description: error.message || 'فشل رفع الفيديو',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/create')}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            رفع فيديو
          </h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* File Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium">اختر الفيديو</label>
          <div className="relative">
            <Input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              id="video-upload"
              disabled={uploading}
            />
            <label
              htmlFor="video-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <Upload className="h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                {selectedFile ? selectedFile.name : 'اضغط لاختيار فيديو'}
              </p>
              {selectedFile && (
                <p className="text-xs text-muted-foreground mt-2">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} ميجابايت
                </p>
              )}
            </label>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <label className="text-sm font-medium">العنوان (اختياري)</label>
          <Input
            placeholder="أضف عنوان للفيديو"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
          />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <label className="text-sm font-medium">الوصف (اختياري)</label>
          <Textarea
            placeholder="أضف وصف للفيديو..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
            rows={4}
          />
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
          className="w-full gradient-primary border-0 text-white h-14 text-lg font-semibold"
        >
          {uploading ? (
            <>
              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
              جاري الرفع...
            </>
          ) : (
            'نشر الفيديو'
          )}
        </Button>
      </div>
    </div>
  );
}
