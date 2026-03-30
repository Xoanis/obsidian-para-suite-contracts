import type { TFile } from "obsidian";
import type { TelegramInlineButton, TelegramInlineKeyboard } from "./telegram";

export type TemplateTarget =
  | "project"
  | "area"
  | "resource"
  | "daily"
  | "dashboard"
  | "review"
  | "guideline";

export interface TemplateContributionContext {
  target: TemplateTarget;
  slot: string;
}

export interface TemplateContribution {
  id: string;
  domainId: string;
  target: TemplateTarget;
  slot: string;
  order?: number;
  render: (context: TemplateContributionContext) => string;
}

export type TelegramCardTarget = "project" | "area";

export type MetadataContributionTarget = "project" | "area" | "resource" | "daily";

export interface TelegramCardContributionContext {
  target: TelegramCardTarget;
  path: string;
  page: number;
}

export interface TelegramCardContribution {
  id: string;
  domainId: string;
  target: TelegramCardTarget;
  order?: number;
  renderSection?: (
    context: TelegramCardContributionContext,
  ) => Promise<string | null> | string | null;
  buildInlineKeyboard?: (
    context: TelegramCardContributionContext,
  ) =>
    | Promise<TelegramInlineKeyboard | null | undefined>
    | TelegramInlineKeyboard
    | null
    | undefined;
}

export interface TelegramHelpContributionContext {
  command: "help";
}

export interface TelegramHelpContribution {
  id: string;
  domainId: string;
  order?: number;
  renderHelp: (
    context: TelegramHelpContributionContext,
  ) => Promise<string | string[] | null | undefined> | string | string[] | null | undefined;
}

export interface MetadataContributionContext {
  target: MetadataContributionTarget;
  path?: string;
  page?: number;
}

export interface MetadataContribution {
  id: string;
  domainId: string;
  target: MetadataContributionTarget;
  order?: number;
  frontmatterDefaults?:
    | Record<string, unknown>
    | ((context: MetadataContributionContext) => Record<string, unknown> | null | undefined);
  renderMetadataLines?:
    | ((
        context: MetadataContributionContext,
      ) => Promise<string | string[] | null | undefined> | string | string[] | null | undefined);
  buildInlineKeyboard?:
    | ((
        context: MetadataContributionContext,
      ) => Promise<TelegramInlineKeyboard | null | undefined> | TelegramInlineKeyboard | null | undefined);
}

export interface TemplateContext<TFrontmatter = Record<string, unknown>> {
  title: string;
  date: string;
  timestamp: string;
  frontmatter: TFrontmatter;
}

export interface ValidationIssue {
  code: string;
  message: string;
  severity: "error" | "warning";
  filePath?: string;
}

export type FolderKey =
  | "projects"
  | "areas"
  | "resources"
  | "records"
  | "unclassified"
  | "inbox"
  | "archive"
  | "attachments"
  | string;

export interface BaseFrontmatter {
  type: string;
  status: string;
  created: string;
  tags?: string[];
  area?: string | null;
  project?: string | null;
}

export interface NoteTypeDefinition<TFrontmatter = BaseFrontmatter> {
  type: string;
  displayName: string;
  folderKey: FolderKey;
  fileNameStrategy?: "title" | "date";
  requiredFields: string[];
  allowedStatuses: readonly string[];
  defaultFrontmatter: (date: string, timestamp: string) => TFrontmatter;
  template: (ctx: TemplateContext<TFrontmatter>) => string;
  validate?: (frontmatter: Partial<TFrontmatter>) => ValidationIssue[];
}

export interface CreateNoteOptions {
  type: string;
  title: string;
  folderOverride?: string;
  frontmatterOverrides?: Record<string, unknown>;
  openAfterCreate?: boolean;
  fileNameOverride?: string;
}

export interface ParaDomainRegistration {
  id: string;
  displayName: string;
  recordsPath: string;
  attachmentsPath?: string;
  noteTypes?: NoteTypeDefinition[];
}

export interface RegisteredParaDomain {
  id: string;
  displayName: string;
  recordsPath: string;
  attachmentsPath?: string;
  noteTypeIds: string[];
}

export interface ParaCoreSettings {
  folders: {
    projects: string;
    areas: string;
    resources: string;
    records: string;
    unclassified: string;
    inbox: string;
    archive: string;
    attachments: string;
    templates: string;
  };
  daily: {
    fileNameFormat: "YYYY-MM-DD";
    headingTitle: string;
  };
  metadata: {
    validateOnCommand: boolean;
  };
  rootNotes: {
    startNotePath: string;
    dashboardNotePath: string;
    reviewNotePath: string;
    guidelineNotePath: string;
    ensureRootNotes: boolean;
  };
  logging: {
    enableDebugLogging: boolean;
  };
}

export type AttachmentScope = string;
export type AttachmentSource = TFile | ArrayBuffer | Uint8Array;

export interface SaveAttachmentOptions {
  source: AttachmentSource;
  fileName?: string;
  scope: AttachmentScope;
  subdirs?: string[];
  placementDate?: string | Date;
}

export interface SavedAttachment {
  file: TFile;
  path: string;
  embed: string;
}

export interface ParaCoreApi {
  registerDomain(definition: ParaDomainRegistration): RegisteredParaDomain;
  registerTemplateContribution(contribution: TemplateContribution): void;
  listTemplateContributions(target: TemplateTarget, slot?: string): TemplateContribution[];
  registerMetadataContribution(contribution: MetadataContribution): void;
  listMetadataContributions(target: MetadataContributionTarget): MetadataContribution[];
  registerTelegramCardContribution(contribution: TelegramCardContribution): void;
  listTelegramCardContributions(target: TelegramCardTarget): TelegramCardContribution[];
  registerTelegramHelpContribution(contribution: TelegramHelpContribution): void;
  listTelegramHelpContributions(): TelegramHelpContribution[];
  createNote(options: CreateNoteOptions): Promise<TFile>;
  validateFile(file: TFile): Promise<ValidationIssue[]>;
  validateVault(): Promise<ValidationIssue[]>;
  getSettings(): ParaCoreSettings;
  getFolderPath(key: FolderKey): string;
  getDomainRecordsPath(domainId: string): string | null;
  saveAttachment(options: SaveAttachmentOptions): Promise<SavedAttachment>;
  ensureFolder(path: string): Promise<void>;
  getStartNotePath(): string;
}

export type IParaCoreApi = ParaCoreApi;
