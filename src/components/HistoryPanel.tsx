import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, Trash2, Eye, Loader2 } from "lucide-react";
import { getScans, deleteScan } from "@/lib/api";
import type { Scan, ScanResult } from "@/types/scan";
import { toast } from "@/hooks/use-toast";

interface HistoryPanelProps {
  onSelectScan: (scan: Scan) => void;
  refreshKey: number;
}

export function HistoryPanel({ onSelectScan, refreshKey }: HistoryPanelProps) {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScans();
  }, [refreshKey]);

  const loadScans = async () => {
    setLoading(true);
    try {
      const data = await getScans();
      setScans(data.map(s => ({ ...s, result: s.result as unknown as ScanResult | null })));
    } catch {
      toast({ title: "Error", description: "Failed to load scan history.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteScan(id);
      setScans(prev => prev.filter(s => s.id !== id));
      toast({ title: "Deleted", description: "Scan removed from history." });
    } catch {
      toast({ title: "Error", description: "Failed to delete scan.", variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (scans.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <History className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="font-medium">No scans yet</p>
        <p className="text-sm mt-1">Upload a worksheet to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {scans.map((scan) => (
        <Card
          key={scan.id}
          className="cursor-pointer hover:border-primary/40 transition-colors"
          onClick={() => onSelectScan(scan)}
        >
          <CardContent className="p-3 flex items-center gap-3">
            <img
              src={scan.image_url}
              alt="Scan"
              className="w-14 h-14 rounded-md object-cover bg-muted flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {(scan.result as ScanResult | null)?.problem?.slice(0, 60) || "Scan"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(scan.created_at).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                })}
              </p>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => { e.stopPropagation(); onSelectScan(scan); }}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={(e) => handleDelete(scan.id, e)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
