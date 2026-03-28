export type FinanceIntakeCommand = "expense" | "income" | "finance_record";

export type FinanceIntakeIntent = "expense" | "income" | "neutral";

export type FinanceProviderKind = "rule-based" | "ai";

export type FinanceIntakeRoute =
  | "rule-text"
  | "rule-qr"
  | "ai-text"
  | "ai-image"
  | "ai-pdf";

export type FinanceIntakeStatus =
  | "draft"
  | "needs-confirmation"
  | "confirmed"
  | "rejected";

export type FinanceProposalSource =
  | "telegram-text"
  | "telegram-image"
  | "telegram-pdf"
  | "telegram-receipt-qr";

export type FinanceExtractionStatus =
  | "success"
  | "ambiguous"
  | "non_finance"
  | "failed";

export type FinanceFieldName =
  | "type"
  | "amount"
  | "currency"
  | "dateTime"
  | "description"
  | "category"
  | "project"
  | "area";

export interface FinanceIntakeArtifact {
  id: string;
  kind: "text" | "image" | "pdf";
  fileName?: string;
  mimeType?: string;
  storagePath?: string;
  textContent?: string;
}

export interface FinanceProposedTransaction {
  type?: "expense" | "income";
  amount?: number;
  currency: string;
  dateTime?: string;
  description?: string;
  category?: string;
  area?: string;
  project?: string;
  artifact?: string;
  source: FinanceProposalSource;
}

export interface FinanceFieldConfidence {
  field: FinanceFieldName;
  confidence: number;
}

export interface FinanceProposalWarning {
  code:
    | "missing-type"
    | "missing-amount"
    | "missing-description"
    | "duplicate-suspected"
    | "artifact-processing-warning";
  message: string;
}

export interface FinanceExtractionIssue {
  code:
    | "missing-required-field"
    | "ambiguous-amount"
    | "ambiguous-date"
    | "ambiguous-direction"
    | "low-confidence-category"
    | "low-confidence-project"
    | "low-confidence-area"
    | "document-extraction-failed"
    | "non-finance-input"
    | "provider-error";
  severity: "info" | "warning" | "error";
  message: string;
  field?: FinanceFieldName;
}

export interface AiFinanceExtractionRequest {
  command: FinanceIntakeCommand;
  intent: FinanceIntakeIntent;
  text?: string;
  caption?: string;
  artifacts: FinanceIntakeArtifact[];
  defaultCurrency: string;
  locale?: string;
  timeZone?: string;
  knownCategories?: string[];
  knownProjects?: string[];
  knownAreas?: string[];
}

export interface AiFinanceExtractionResult {
  status: FinanceExtractionStatus;
  providerKind: FinanceProviderKind;
  route: FinanceIntakeRoute;
  transaction: FinanceProposedTransaction | null;
  overallConfidence?: number;
  fieldConfidences: FinanceFieldConfidence[];
  issues: FinanceExtractionIssue[];
  modelId?: string;
}

export interface FinanceIntakeProposal {
  id: string;
  command: FinanceIntakeCommand;
  intent: FinanceIntakeIntent;
  status: FinanceIntakeStatus;
  transaction: FinanceProposedTransaction;
  artifacts: FinanceIntakeArtifact[];
  warnings: FinanceProposalWarning[];
  createdAt: string;
  updatedAt: string;
}
