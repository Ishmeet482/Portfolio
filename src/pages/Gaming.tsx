import { useEffect } from "react";

const Gaming = () => {
  useEffect(() => {
    window.location.replace("https://gaming-overview.vercel.app/");
  }, []);

  return null;
};

export default Gaming;
