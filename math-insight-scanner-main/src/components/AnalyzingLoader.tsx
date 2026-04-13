import { Loader2, Brain } from "lucide-react";

export function AnalyzingLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-slide-up">
      <div className="relative">
        <div className="p-5 rounded-full bg-primary/10">
          <Brain className="h-10 w-10 text-primary animate-pulse-soft" />
        </div>
        <Loader2 className="absolute -top-1 -right-1 h-6 w-6 text-secondary animate-spin" />
      </div>
      <h3 className="mt-5 font-heading font-bold text-lg text-foreground">Analyzing student's thinking...</h3>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-xs">
        Our AI is examining the work, identifying patterns, and diagnosing root misconceptions.
      </p>
    </div>
  );
}
