export function youtube_parser(url) {
  if (!url) {
    return false;
  }

  const regExp =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?([^&?]+)/;
  const match = url.match(regExp);

  if (match && match[5].length === 11) {
    return match[5];
  } else {
    return false;
  }
}
