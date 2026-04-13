export interface ScanResult {
  problem: string;
  student_steps: string;
  misconceptions: Misconception[];
  interventions: Interventions;
  parent_script: string;
}

export interface Misconception {
  name: string;
  description: string;
  evidence: string;
  confidence: number;
}

export interface Interventions {
  analogy: string;
  visual_idea: string;
  follow_up_questions: string[];
}

export interface Scan {
  id: string;
  image_url: string;
  result: ScanResult | null;
  status: string;
  created_at: string;
  updated_at: string;
}
