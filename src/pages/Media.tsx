import { useEffect } from "react";

const Media = () => {
  useEffect(() => {
    window.location.replace("https://media-database.vercel.app/");
  }, []);

  return null;
};

export default Media;