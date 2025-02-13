import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface ExerciseGeneratorProps {
  content: string;
  blanks: string[];
  answers: string[];
}

export default function ExerciseGenerator({
  content,
  blanks,
  answers
}: ExerciseGeneratorProps) {
  const [userAnswers, setUserAnswers] = useState<string[]>(new Array(blanks.length).fill(""));
  const [showResults, setShowResults] = useState(false);

  const handleCheck = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setUserAnswers(new Array(blanks.length).fill(""));
    setShowResults(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fill in the Blanks</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="prose prose-blue max-w-none">
          {content.split("___").map((part, i) => (
            <>
              {part}
              {i < blanks.length && (
                <span className="inline-block mx-2">
                  <Input
                    value={userAnswers[i]}
                    onChange={(e) => {
                      const newAnswers = [...userAnswers];
                      newAnswers[i] = e.target.value;
                      setUserAnswers(newAnswers);
                    }}
                    className="w-32 inline-block"
                    disabled={showResults}
                  />
                  {showResults && (
                    <span className="ml-2">
                      {userAnswers[i].toLowerCase() === answers[i].toLowerCase() ? (
                        <Check className="inline h-4 w-4 text-green-500" />
                      ) : (
                        <X className="inline h-4 w-4 text-red-500" />
                      )}
                    </span>
                  )}
                </span>
              )}
            </>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          {showResults ? (
            <Button onClick={handleReset}>Try Again</Button>
          ) : (
            <Button onClick={handleCheck}>Check Answers</Button>
          )}
        </div>

        {showResults && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Correct Answers:</h4>
            <ul className="list-disc list-inside space-y-1">
              {answers.map((answer, i) => (
                <li key={i}>
                  Blank {i + 1}: <span className="font-medium">{answer}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
