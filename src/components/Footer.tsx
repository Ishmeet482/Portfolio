
import { useState } from "react";
import Container from "./ui-components/Container";
import { Github, Twitter, Linkedin, Instagram, Mail, X, Send } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/smithwalker19" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/ishmeet19" },
  { name: "Twitter", icon: Twitter, url: "https://x.com/SmithWa17081703" },
  { name: "GitHub", icon: Github, url: "https://github.com/Ishmeet482" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [message, setMessage] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Message submitted:", message);
    setMessage("");
    setShowContactForm(false);
    // You could add a toast notification here
  };
  
  return (
    <footer id="contact" className="py-20 border-t border-border relative">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-yellow-light/30 pointer-events-none"></div>
      
      <Container>
        <div className="flex flex-col items-center justify-center text-center">
          {/* Large centered Connect button with glow effect */}
          <div className="relative mx-auto mb-16 mt-10">
            {!showContactForm ? (
              <DropdownMenu open={isConnectOpen} onOpenChange={setIsConnectOpen}>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="connect-btn text-4xl md:text-5xl py-6 px-16 md:px-20 animate-pulse-subtle hover:animate-none"
                    aria-label="Connect with me"
                    onClick={() => setShowContactForm(true)}
                  >
                    Connect
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-black border-yellow-accent p-2 w-48">
                  {socialLinks.map((link) => (
                    <DropdownMenuItem key={link.name} asChild className="focus:bg-black/50 cursor-pointer">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-white hover:text-yellow-accent py-2 px-3 w-full transition-colors"
                      >
                        <link.icon className="w-5 h-5" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Card className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm border-yellow-accent/30 shadow-lg">
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Textarea 
                        placeholder="Type your message here..." 
                        className="min-h-[120px] resize-none border-yellow-light focus:border-yellow-accent"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowContactForm(false)}
                        className="border-yellow-light hover:bg-yellow-light/20"
                      >
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                      <Button 
                        type="submit"
                        className="bg-black text-white hover:bg-yellow-accent hover:text-black"
                      >
                        <Send className="mr-2 h-4 w-4" /> Send Message
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Email address with icon */}
          <div className="flex items-center justify-center mb-12">
            <Mail className="w-5 h-5 mr-2" />
            <a
              href="mailto:ishmeet22694@gmail.com"
              className="email-link text-foreground font-medium group relative"
            >
              ishmeet22694@gmail.com
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          {/* Social media icons */}
          <div className="flex space-x-4 mb-10">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon transform transition-all duration-300 hover:rotate-6 hover:scale-110"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Ishmeet. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
