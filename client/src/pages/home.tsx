import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Brain } from "lucide-react";

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
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Interactive Learning Tools
        </h1>
        <p className="text-lg text-muted-foreground">
          Enhance your learning experience with our educational tools
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <Card key={feature.href} className="overflow-hidden">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
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
