import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Gaming = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.location.href = "https://gaming-overview.vercel.app/";
  }, []);

  return null;
};

export default Gaming;
