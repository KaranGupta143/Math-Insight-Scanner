import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Volume2, BookOpen, Lightbulb, HelpCircle, MessageSquareHeart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ScanResult } from "@/types/scan";

function ConfidenceBadge({ confidence }: { confidence: number }) {
  const color = confidence > 80
    ? "bg-confidence-high text-success-foreground"
    : confidence >= 70
    ? "bg-confidence-medium text-warning-foreground"
    : "bg-confidence-low text-warning-foreground";

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>
      {confidence}% confidence
    </span>
  );
}

export function ScanResults({ result }: { result: ScanResult }) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Text copied to clipboard." });
  };

  const handleReadAloud = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
      toast({ title: "Reading aloud...", description: "Click again to stop." });
    } else {
      toast({ title: "Not supported", description: "Speech synthesis not available in this browser.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Problem & Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Problem & Student Work
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Problem</p>
            <p className="mt-1 text-foreground">{result.problem}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student's Working</p>
            <p className="mt-1 text-foreground whitespace-pre-wrap">{result.student_steps}</p>
          </div>
        </CardContent>
      </Card>

      {/* Misconceptions */}
      <div>
        <h3 className="text-lg font-heading font-bold flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-warning" />
          Root Misconceptions
        </h3>
        <div className="space-y-3">
          {result.misconceptions.map((m, i) => (
            <Card key={i} className="border-l-4 border-l-warning">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <h4 className="font-semibold text-foreground">{m.name}</h4>
                  <ConfidenceBadge confidence={m.confidence} />
                </div>
                <p className="mt-2 text-sm text-foreground">{m.description}</p>
                <div className="mt-3 p-3 rounded-md bg-muted/60">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Evidence</p>
                  <p className="text-sm text-foreground italic">"{m.evidence}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Interventions */}
      <div>
        <h3 className="text-lg font-heading font-bold flex items-center gap-2 mb-3">
          <HelpCircle className="h-5 w-5 text-secondary" />
          Interventions
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Analogy / Story</p>
              <p className="text-sm text-foreground">{result.interventions.analogy}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Visual Idea</p>
              <p className="text-sm text-foreground">{result.interventions.visual_idea}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-3">
          <CardContent className="pt-5">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Follow-up Questions</p>
            <ol className="space-y-2">
              {result.interventions.follow_up_questions.map((q, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">{i + 1}</span>
                  {q}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Parent Script */}
      <Card className="border-2 border-secondary/30 bg-accent/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquareHeart className="h-5 w-5 text-secondary" />
            Parent Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{result.parent_script}</p>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" onClick={() => handleCopy(result.parent_script)}>
              <Copy className="h-3.5 w-3.5 mr-1.5" /> Copy
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleReadAloud(result.parent_script)}>
              <Volume2 className="h-3.5 w-3.5 mr-1.5" /> Read Aloud
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
