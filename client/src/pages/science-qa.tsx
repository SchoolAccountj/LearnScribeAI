import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import QuestionForm from "@/components/qa/question-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Question } from "@shared/schema";

export default function ScienceQA() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: questions = [] } = useQuery({
    queryKey: ["/api/questions"],
  });

  const questionMutation = useMutation({
    mutationFn: async (data: { subject: string; question: string }) => {
      const res = await apiRequest("POST", "/api/questions", data);
      return res.json();
    },
    onSuccess: (data: Question) => {
      toast({
        title: "Question submitted",
        description: "Your question has been answered",
      });
      setSelectedQuestion(data.id.toString());
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
          <CardTitle>Science Q&A Assistant</CardTitle>
          <CardDescription>
            Get expert answers to your science questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionForm
            onSubmit={(data) => questionMutation.mutate(data)}
            isSubmitting={questionMutation.isPending}
          />
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Previous Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion
              type="single"
              collapsible
              value={selectedQuestion}
              onValueChange={setSelectedQuestion}
            >
              {questions.map((q: Question) => {
                const answer = JSON.parse(q.answer);
                return (
                  <AccordionItem key={q.id} value={q.id.toString()}>
                    <AccordionTrigger className="text-left">
                      <div>
                        <span className="font-medium">{q.subject}</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {q.question}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Answer:</h4>
                        <p>{answer.answer}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Explanation:</h4>
                        <p>{answer.explanation}</p>
                      </div>
                      {answer.relatedTopics.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">Related Topics:</h4>
                          <ul className="list-disc list-inside">
                            {answer.relatedTopics.map((topic: string, i: number) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
