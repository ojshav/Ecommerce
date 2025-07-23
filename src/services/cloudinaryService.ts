interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
}

class CloudinaryService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async uploadImage(file: File, folder: string): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/upload/image`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to upload image');
    }

    const data = await response.json();
    return data.secure_url;
  }

  generatePreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}

export const cloudinaryService = new CloudinaryService();
export type { CloudinaryUploadResponse };
