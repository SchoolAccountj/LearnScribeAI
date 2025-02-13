import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileText, Telescope } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();

  const links = [
    { href: "/pdf-tools", label: "Study Materials", icon: FileText },
    { href: "/science-qa", label: "Space Academy", icon: Telescope },
  ];

  return (
    <nav className="border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">SpaceEdu</a>
          </Link>

          <div className="flex gap-4">
            {links.map(({ href, label, icon: Icon }) => (
              <Button
                key={href}
                variant={location === href ? "default" : "ghost"}
                asChild
              >
                <Link href={href}>
                  <a className={cn(
                    "flex items-center gap-2",
                    location === href && "text-primary-foreground"
                  )}>
                    <Icon className="h-4 w-4" />
                    {label}
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