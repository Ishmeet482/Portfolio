
import { useNavigate } from "react-router-dom";
import Container from "@/components/ui-components/Container";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container size="small" className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          This page doesn't exist or was removed
        </p>
        
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return home</span>
        </button>
      </Container>
    </div>
  );
};

export default NotFound;
