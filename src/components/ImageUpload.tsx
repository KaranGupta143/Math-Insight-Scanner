import React, { useCallback, useState } from "react";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface ImageUploadProps {
  onImageSelected: (file: File, preview: string) => void;
  preview: string | null;
  onClear: () => void;
  disabled?: boolean;
}

export function ImageUpload({ onImageSelected, preview, onClear, disabled }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      toast({ title: "Invalid file type", description: "Please upload a JPG or PNG image.", variant: "destructive" });
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return;
    const reader = new FileReader();
    reader.onload = (e) => onImageSelected(file, e.target?.result as string);
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  if (preview) {
    return (
      <div className="relative rounded-lg overflow-hidden border-2 border-primary/20 bg-card animate-slide-up">
        <img src={preview} alt="Uploaded worksheet" className="w-full max-h-80 object-contain bg-muted/30" />
        {!disabled && (
          <button
            onClick={onClear}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-border hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`
        flex flex-col items-center justify-center gap-4 p-10 rounded-xl border-2 border-dashed cursor-pointer
        transition-all duration-200
        ${isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border hover:border-primary/50 hover:bg-muted/50"
        }
      `}
    >
      <input type="file" accept="image/jpeg,image/png" onChange={handleInputChange} className="hidden" disabled={disabled} />
      <div className="p-4 rounded-full bg-primary/10">
        {isDragging ? <ImageIcon className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-primary" />}
      </div>
      <div className="text-center">
        <p className="font-semibold text-foreground">
          {isDragging ? "Drop your image here" : "Drag & drop a worksheet photo"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">or click to browse · JPG, PNG · Max 5MB</p>
      </div>
    </label>
  );
}
