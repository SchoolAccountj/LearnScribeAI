import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Telescope } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Study Materials",
      description: "Create interactive exercises from astronomy and space science materials",
      icon: FileText,
      href: "/pdf-tools",
      image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5"
    },
    {
      title: "Space Academy",
      description: "Explore space science with our comprehensive Q&A platform",
      icon: Telescope,
      href: "/science-qa",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Explore the Universe of Learning
        </h1>
        <p className="text-lg text-muted-foreground">
          Your gateway to space science education
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <Card key={feature.href} className="overflow-hidden bg-card/60 backdrop-blur">
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
                <Link href={feature.href}>Begin Journey</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}