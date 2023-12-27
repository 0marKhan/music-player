export function youtube_parser(url) {
  if (!url) {
    return false;
  }

  const regExp =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([^&?]+)/;
  const match = url.match(regExp);

  if (match && match[5]) {
    // Splitting by & to remove extra parameters and returning the video ID
    const videoId = match[5].split("&")[0];
    return videoId;
  } else {
    return false;
  }
}
