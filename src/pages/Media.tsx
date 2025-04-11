import { useEffect } from "react";

const Media = () => {
  useEffect(() => {
    window.location.replace("https://my-movie-overview.vercel.app/");
  }, []);

  return null;
};

export default Media;