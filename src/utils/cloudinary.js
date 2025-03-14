import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: 'process.env.CLOUDINARY_CLOUD_NAME', 
    api_key: 'process.env.CLOUDINARY_API_KEY', 
    api_secret: 'process.env.CLOUDINARY_API_SECRET' 
});


const uploadOnCloudinary = async (localFilePath) =>{
    try {

        if( ! localFilePath) return null;
        // file upload on cloudinary 
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type :"auto"
        })
        // uploaded successfully
        console.log("File has been uploaded successfully on cloudinary", response.url)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary files if file upload got failed
        return null
    }
}

export {uploadOnCloudinary}