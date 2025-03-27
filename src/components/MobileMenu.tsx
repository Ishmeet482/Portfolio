
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface MobileMenuProps {
  navLinks: { name: string; href: string }[];
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu = ({ navLinks, scrollToSection }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="flex items-center space-x-2 rounded-full bg-black text-white/80 px-4 py-2"
          aria-label="Open menu"
        >
          <span>Menu</span>
          <Menu className="w-5 h-5" />
        </button>
      </SheetTrigger>
      <SheetContent 
        side="top" 
        className="bg-black text-white w-full h-[400px] flex flex-col justify-center items-center rounded-b-3xl"
      >
        <div className="flex flex-col items-center gap-8 text-2xl font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
