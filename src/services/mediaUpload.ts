import MediaModel from "../models/media";
import path from "path";
export default async (files: Express.Multer.File | Express.Multer.File[]) => {
  if (files) {
    const filesArray = Array.isArray(files)? files : [files]
    const mediaDocs = filesArray.map((file) => ({
      url: process.env.URL + file.path.split(path.sep).join("/"),
      type: file.mimetype.split("/")[0],
    }));

    // Insert all media documents in a single operation
    return await MediaModel.insertMany(mediaDocs);
  }
  else return []
};
