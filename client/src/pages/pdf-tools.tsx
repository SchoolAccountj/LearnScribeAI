import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import PDFUploader from "@/components/pdf/pdf-uploader";
import ExerciseGenerator from "@/components/pdf/exercise-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PdfTools() {
  const [exercise, setExercise] = useState<{
    content: string;
    blanks: string[];
    answers: string[];
  } | null>(null);

  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("pdf", file);
      const res = await apiRequest("POST", "/api/pdf/upload", formData);
      return res.json();
    },
    onSuccess: (data) => {
      setExercise(data);
      toast({
        title: "Exercise generated",
        description: "Your PDF has been processed successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>PDF Exercise Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Upload a PDF to automatically generate fill-in-the-blank exercises
          </p>
          <PDFUploader
            onUpload={(file) => uploadMutation.mutate(file)}
            isUploading={uploadMutation.isPending}
          />
        </CardContent>
      </Card>

      {exercise && (
        <ExerciseGenerator
          content={exercise.content}
          blanks={exercise.blanks}
          answers={exercise.answers}
        />
      )}
    </div>
  );
}
