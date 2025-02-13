import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileType } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PDFUploaderProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export default function PDFUploader({ onUpload, isUploading }: PDFUploaderProps) {
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file.type !== "application/pdf") {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file"
      });
      return;
    }
    onUpload(file);
  }, [onUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"]
    },
    maxFiles: 1,
    disabled: isUploading
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div
          {...getRootProps()}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">
              {isDragActive ? "Drop the PDF here" : "Drag & drop a PDF file"}
            </p>
            <p className="text-sm text-muted-foreground">
              or click to select a file
            </p>
          </div>
          {isUploading && (
            <Button disabled className="mt-4">
              <FileType className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
