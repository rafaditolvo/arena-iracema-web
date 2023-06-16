import api from "./apiAxios";

class UploadService {
  async upload(
    { fileType, fileName, base64, idResolve },
    token,
    onUploadProgress
  ) {
    const response = await api.post(
      "/upload",
      { file: base64, imageType: fileType, imageName: fileName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress,
      }
    );
    response.idResolve = idResolve;
    return response;
  }
}

export default new UploadService();
