import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { api_key, api_secret, cloud_name } from "../constants/constants.js";

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Ai_Tutor',
      allowedFormats: ["png" ,"jpeg", "jpg"],
      transformation: [
        { quality: "80", fetch_format: "auto" }
      ]
    },
});
