import { supabase } from '../config/supabase';

export const uploadFileToSupabase = async (file: any) => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const { data, error } = await supabase.storage
    .from('my-bucket')
    .upload(fileName, file.buffer, {
      contentType: file.minetype,
    });

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from('my-bucket')
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};
