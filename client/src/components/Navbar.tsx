import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Utensils, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const cuisines = [
  { name: "Turkish", flag: "🇹🇷", path: "/cuisine/Turkish" },
  { name: "Italian", flag: "🇮🇹", path: "/cuisine/Italian" },
  { name: "Japanese", flag: "🇯🇵", path: "/cuisine/Japanese" },
  { name: "Mexican", flag: "🇲🇽", path: "/cuisine/Mexican" },
  { name: "Spanish", flag: "🇪🇸", path: "/cuisine/Spanish" },
  { name: "Thai", flag: "🇹🇭", path: "/cuisine/Thai" },
  { name: "Chinese", flag: "🇨🇳", path: "/cuisine/Chinese" },
  { name: "French", flag: "🇫🇷", path: "/cuisine/French" },
  { name: "Indian", flag: "🇮🇳", path: "/cuisine/Indian" },
  { name: "Greek", flag: "🇬🇷", path: "/cuisine/Greek" },
];

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Utensils className="text-primary text-2xl mr-3" />
            <h1 className="text-xl font-poppins font-bold text-dark-gray">
              World Cuisine
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`transition-colors ${location === '/' ? 'text-primary' : 'text-dark-gray hover:text-primary'}`}>
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-dark-gray hover:text-primary">
                  Cuisines <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {cuisines.map((cuisine) => (
                  <DropdownMenuItem key={cuisine.name} asChild>
                    <Link href={cuisine.path} className="cursor-pointer">
                      {cuisine.flag} {cuisine.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/about" className={`transition-colors ${location === '/about' ? 'text-primary' : 'text-dark-gray hover:text-primary'}`}>
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="block py-2 text-dark-gray hover:text-primary transition-colors">
                  Home
                </Link>
                <div className="space-y-2">
                  <p className="font-semibold text-dark-gray">Cuisines</p>
                  {cuisines.map((cuisine) => (
                    <Link 
                      key={cuisine.name} 
                      href={cuisine.path} 
                      className="block py-2 pl-4 text-dark-gray hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {cuisine.flag} {cuisine.name}
                    </Link>
                  ))}
                </div>
                <Link href="/about" className="block py-2 text-dark-gray hover:text-primary transition-colors">
                  About
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
