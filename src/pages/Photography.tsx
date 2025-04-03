import { useEffect, useRef, useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Container from "@/components/ui-components/Container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const images = [
  { src: "/images/Photography/1.jpeg", caption: "Sunset over the moutains" },
  { src: "/images/Photography/2.jpeg", caption: "Sunset, Manipal" },
  { src: "/images/Photography/3.jpeg", caption: "NIH , Manipal" },
  { src: "/images/Photography/4.jpeg", caption: "Sunset" },
  { src: "/images/Photography/5.jpeg", caption: "Night Flight" },
  { src: "/images/Photography/6.jpg", caption: "Malpe Beach" },
  { src: "/images/Photography/7.jpeg", caption: "twilight" },
  { src: "/images/Photography/8.jpeg", caption: "Checking Buildings" },
  { src: "/images/Photography/9.jpeg", caption: "Namma Metro" },
  {src: "/images/Photography/10.jpeg", caption: "Beach side"},
];

const Photography = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-enter-active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const closeModal = () => { setSelectedIndex(null); setZoom(1); };
  const prevImage = () => selectedIndex !== null && setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : prev!));
  const nextImage = () => selectedIndex !== null && setSelectedIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : prev!));

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowLeft") prevImage();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "Escape") closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  const handlers = useSwipeable({
    onSwipedLeft: nextImage,
    onSwipedRight: prevImage,
    onSwipedDown: closeModal,
    trackTouch: true,
    trackMouse: true,
  });
  const handleWheelZoom = (event: WheelEvent) => {
    if (selectedIndex !== null) {
      setZoom((prevZoom) => Math.max(1, Math.min(3, prevZoom + event.deltaY * -0.001)));
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheelZoom);
    return () => window.removeEventListener("wheel", handleWheelZoom);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main
        className="flex-grow py-20"
        style={{
          background: "#FFF9E5",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container size="large">
          <div className="mb-10">
            <Link to="/" className="inline-flex items-center text-charcoal/80 hover:text-charcoal transition-colors duration-300">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Link>
          </div>

          <div ref={titleRef} className="section-enter max-w-3xl mb-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-8">Photography Portfolio</h1>
            <p className="text-lg text-charcoal/80 mb-12">
              A visual exploration of urban environments, natural landscapes, and the stories they tell through my lens.
            </p>
            <hr className="border-t border-charcoal/20 mb-12" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.src}
                  alt={`Photography ${index + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Caption Overlay on Hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center text-lg font-medium px-4">{image.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </main>
      <Footer />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...handlers}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-3xl w-[90vw] max-h-[80vh] overflow-hidden rounded-xl shadow-2xl bg-black border-2 border-white/20"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
              }}
            >
              <img
                src={images[selectedIndex].src}
                alt="Preview"
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center py-4 text-lg">
                {images[selectedIndex].caption}
              </div>

              {/* Navigation Buttons */}
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black transition"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={28} className="text-white" />
              </button>

              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black transition"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={28} className="text-white" />
              </button>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black transition"
                onClick={closeModal}
              >
                <X size={24} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Photography;