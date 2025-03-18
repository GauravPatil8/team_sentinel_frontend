// lib/types.ts
export type PaperSize = "a4" | "letter" | "legal" | "a3";
export type Orientation = "portrait" | "landscape";
export type ColorMode = "color" | "bw";

export interface FileSettings {
  copies: number;
  paperSize: PaperSize;
  orientation: Orientation;
  color: ColorMode;
  doubleSided: boolean;
  pages: string;
}

export interface SelectedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview: string | null;
  file: File;
  settings: FileSettings;
}