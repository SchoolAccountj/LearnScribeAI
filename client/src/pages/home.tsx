import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Brain, BookOpen } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "PDF Exercise Tools",
      description: "Create interactive fill-in-the-blank exercises from your PDF materials",
      icon: FileText,
      href: "/pdf-tools",
      image: "https://images.unsplash.com/photo-1535127022272-dbe7ee35cf33"
    },
    {
      title: "Science Q&A Assistant",
      description: "Get expert answers to your 9th and 10th grade science questions",
      icon: Brain,
      href: "/science-qa",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31"
    },
    {
      title: "ELA Q&A Assistant",
      description: "Expert help with literature, grammar, and writing questions",
      icon: BookOpen,
      href: "/ela-qa",
      image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d"
    }
  ];

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Space theme decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] text-primary/[0.15] opacity-50"></div>
      </div>

      <div className="relative text-center mb-12 pt-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Interactive Learning Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Enhance your learning experience with our educational tools
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card key={feature.href} className="overflow-hidden group backdrop-blur bg-card/50 hover:bg-card/60 transition-colors border border-primary/10">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <CardContent className="p-6">
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-2">{feature.title}</h2>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <Button asChild>
                <Link href={feature.href}>Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}