import { supabase } from '../config/supabase';

export const uploadFileToSupabase = async (file: any) => {
  const cleanName = file.originalname
    .replace(/\s+/g, '-')
    .replace(/[^\w.-]/g, '');

  const fileName = `${Date.now()}-${cleanName}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabase.storage
    .from('my-bucket')
    .upload(filePath, new Uint8Array(file.buffer), {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data } = supabase.storage.from('my-bucket').getPublicUrl(filePath);

  return data.publicUrl;
};
