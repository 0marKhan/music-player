import { openUploadWidget } from "../utils/CloudinaryService";
import { cloudinary_upload_preset } from "../config";

const CloudinaryUpload = ({ setUrl, setName }) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "decgdudjl",
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="upload-song-button" onClick={uploadImageWidget}>
      SELECT TRACK
    </button>
  );
};

export default CloudinaryUpload;
