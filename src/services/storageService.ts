import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage, isFirebaseConfigured } from '../lib/firebase';

export interface UploadResult {
  url: string;
  fileName: string;
  sizeBytes: number;
}

export const uploadMediaFile = async (
  file: File,
  folder: 'events' | 'teachers' | 'gallery' | 'departments' | 'students'
): Promise<UploadResult> => {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Only image files (PNG, JPG, WEBP) are accepted.');
  }

  // Validate size (max 5 MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Image size exceeds 5MB limit. Please compress or choose a smaller image.');
  }

  const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${Date.now()}_${cleanName}`;

  if (isFirebaseConfigured && storage) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
      });
      const url = await getDownloadURL(snapshot.ref);
      return {
        url,
        fileName: file.name,
        sizeBytes: file.size,
      };
    } catch (err: any) {
      console.error('[StorageService] Upload error:', err);
      throw new Error(err.message || 'Failed to upload image to Firebase Storage.');
    }
  }

  // Local / Fallback Data URI Simulation for development
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result as string,
        fileName: file.name,
        sizeBytes: file.size,
      });
    };
    reader.onerror = () => reject(new Error('Failed to read local image preview.'));
    reader.readAsDataURL(file);
  });
};

export const uploadImage = async (
  file: File,
  folder: 'events' | 'teachers' | 'gallery' | 'departments' | 'students'
): Promise<string> => {
  const res = await uploadMediaFile(file, folder);
  return res.url;
};

