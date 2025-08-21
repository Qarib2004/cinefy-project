import { axiosWithAuth } from "@/api/interceptors";
import { API_URL } from "@/config/api.config";

class FileService {
  async uploadSingle(file: File, folder?: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file); // ключ "file" обязателен для Multer

    const { data } = await axiosWithAuth<{ url: string }>({
      url: API_URL.files('/single'),
      method: 'POST',
      data: formData,
      params: folder ? { folder } : undefined, // передаём folder только если он есть
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data.url;
  }

  async uploadMultiple(files: File[], folder?: string): Promise<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file)); // ключ "files" для массива

    const { data } = await axiosWithAuth<{ urls: string[] }>({
      url: API_URL.files('/multiple'),
      method: 'POST',
      data: formData,
      params: folder ? { folder } : undefined,
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return data.urls;
  }
}

export const fileService = new FileService();
