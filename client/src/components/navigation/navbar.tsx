import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Brain, BookOpen } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/pdf-tools", label: "PDF Tools", icon: FileText },
    { href: "/science-qa", label: "Science Q&A", icon: Brain },
    { href: "/ela-qa", label: "ELA Q&A", icon: BookOpen },
  ];

  return (
    <nav className="border-b border-primary/10 bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              EduTools
            </a>
          </Link>

          <div className="flex gap-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                variant={location === href ? "default" : "ghost"}
                asChild
                className="relative overflow-hidden group"
              >
                <Link href={href}>
                  <a className={cn(
                    "flex items-center gap-2",
                    location === href && "text-primary-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                    {label}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}