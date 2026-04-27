import { supabase } from '../config/supabase';

export const uploadFileToSupabase = async (file: Express.Multer.File) => {
  const cleanName = file.originalname
    .replace(/\s+/g, '-')
    .replace(/[^\w.-]/g, '');

  const fileName = `${Date.now()}-${cleanName}`;
  const filePath = `products/${fileName}`;

  const { data, error } = await supabase.storage
    .from('my-bucket')
    .upload(filePath, file.buffer, {
      // ✅ Pass buffer directly
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from('my-bucket')
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
