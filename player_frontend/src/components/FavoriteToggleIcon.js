import React, { useState } from "react";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./FavoriteToggleIcon.css";

const FavoriteToggleIcon = ({ onClick }) => {
  const [isBumping, setIsBumping] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleIconClick = () => {
    setIsBumping(true);
    setTimeout(() => {
      setIsBumping(false);
      setIsFavorite((prev) => !prev);
    }, 300);
  };

  return (
    <>
      {isFavorite ? (
        <FavoriteIcon
          className={isBumping ? "bump-animation" : ""}
          style={{ color: "#e30085" }}
          onClick={handleIconClick}
        />
      ) : (
        <div onClick={onClick}>
          <FavoriteBorderIcon
            className={isBumping ? "bump-animation" : ""}
            onClick={handleIconClick}
          />
        </div>
      )}
    </>
  );
};

export default FavoriteToggleIcon;
