import { supabase } from '../config/supabase';

export const uploadFileToSupabase = async (file: any) => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from('my-bucket')
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) throw error;

  const { data } = supabase.storage.from('my-bucket').getPublicUrl(fileName);

  return data.publicUrl;
};
