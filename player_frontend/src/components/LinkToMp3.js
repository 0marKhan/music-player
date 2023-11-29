import React, { useRef, useState } from "react";
import FilledTextInput from "../UI/common/FilledTextInput";
import PurpleButton from "../UI/common/PurpleButton";
import axios from "axios";
import { youtube_parser } from "../utils";

const LinkToMp3 = () => {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const youtubeID = youtube_parser(inputUrlRef.current.value);
    console.log("youtubeID:", youtubeID);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      params: { id: youtubeID },
      headers: {
        "X-RapidAPI-Key": "ed7b85fe80msh77491ed2c4da0e0p17f269jsn8568f1656544",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    };

    axios(options)
      .then((res) => setUrlResult(res.data))
      .catch((err) => console.log(err));

    inputUrlRef.current.value = "";
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="filled-input-form">
          <FilledTextInput
            ref={inputUrlRef}
            id="filled-basic"
            label="Enter a Youtube video link"
            variant="filled"
          />
        </div>
        <div className="submit-button">
          <PurpleButton
            type="submit"
            variant="contained"
            style={{
              width: "25rem",
              height: "3rem",
              "@media (maxWidth: 415px)": {
                width: "20rem",
              },
            }}
          >
            Save MP3
          </PurpleButton>
        </div>
      </form>
    </>
  );
};

export default LinkToMp3;
