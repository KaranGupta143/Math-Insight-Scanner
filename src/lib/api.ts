import { supabase } from "@/integrations/supabase/client";
import type { ScanResult } from "@/types/scan";

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  
  const { error } = await supabase.storage
    .from("scan-images")
    .upload(fileName, file);

  if (error) throw new Error("Failed to upload image: " + error.message);

  const { data: urlData } = supabase.storage
    .from("scan-images")
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function analyzeScan(imageUrl: string): Promise<ScanResult> {
  const { data, error } = await supabase.functions.invoke("analyze-scan", {
    body: { image_url: imageUrl },
  });

  if (error) throw new Error("Analysis failed: " + error.message);
  if (data?.error) throw new Error(data.error);
  return data.result as ScanResult;
}

export async function saveScan(imageUrl: string, result: ScanResult) {
  const { data, error } = await supabase
    .from("scans")
    .insert({ image_url: imageUrl, result: result as any, status: "completed" })
    .select()
    .single();

  if (error) throw new Error("Failed to save scan: " + error.message);
  return data;
}

export async function getScans() {
  const { data, error } = await supabase
    .from("scans")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Failed to fetch scans: " + error.message);
  return data;
}

export async function deleteScan(id: string) {
  const { error } = await supabase.from("scans").delete().eq("id", id);
  if (error) throw new Error("Failed to delete scan: " + error.message);
}
