declare module "obsidian" {
  export interface App {
    plugins?: {
      plugins?: Record<string, unknown>;
    };
  }

  export interface TFile {
    path: string;
    name: string;
    extension: string;
  }
}
