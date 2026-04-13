export const EMAIL_PROVIDER_PLUGIN_ID = "email-provider";

export const EMAIL_PROVIDER_API_VERSION = "0.1.0";

export type MailChannelDriverKind =
  | "imap"
  | "http-bridge"
  | "gmail-api"
  | "microsoft-graph"
  | "jmap";

export type MailConsumerCheckpointStatus =
  | "idle"
  | "success"
  | "failed"
  | "skipped";

export interface MailChannelSummary {
  id: string;
  name: string;
  enabled: boolean;
  driverKind: MailChannelDriverKind;
  isDefault: boolean;
}

export interface MailChannelCapabilities {
  supportsCursorPagination: boolean;
  supportsServerSideSearch: boolean;
  supportsAttachmentMaterialization: boolean;
  supportsHtmlBody: boolean;
  supportsTextBody: boolean;
  supportsFolderScope: boolean;
  supportsLabelScope: boolean;
  supportsOAuth: boolean;
  supportsBasicAuth: boolean;
}

export interface MailConnectionTestResult {
  ok: boolean;
  message: string;
  capabilities?: MailChannelCapabilities;
}

export interface MailMessageRef {
  channelId: string;
  externalId: string;
  scopeId?: string;
}

export interface MailAttachmentSummary {
  id: string;
  fileName: string;
  mimeType?: string;
  byteLength?: number;
  isInline?: boolean;
}

export interface MailMessageSummary {
  ref: MailMessageRef;
  threadId?: string;
  from?: string;
  to?: string[];
  cc?: string[];
  subject?: string;
  receivedAt: string;
  snippet?: string;
  hasAttachments: boolean;
  attachmentCount: number;
  attachmentNames?: string[];
  labels?: string[];
}

export interface MailMessageDetails extends MailMessageSummary {
  textBody?: string;
  htmlBody?: string;
  attachments: MailAttachmentSummary[];
}

export interface MaterializedMailAttachment {
  ref: MailMessageRef;
  attachmentId: string;
  fileName: string;
  mimeType?: string;
  byteLength?: number;
  bytes: ArrayBuffer;
}

export interface MailSearchQuery {
  channelIds?: string[];
  text?: string;
  from?: string[];
  subject?: string[];
  receivedAfter?: string;
  receivedBefore?: string;
  hasAttachments?: boolean;
  folderScope?: string;
  labelScope?: string;
  cursor?: string | null;
  limit?: number;
}

export interface MailSearchResult {
  messages: MailMessageSummary[];
  nextCursor?: string | null;
}

export interface MailConsumerCheckpointKey {
  consumerId: string;
  channelId: string;
  scopeFingerprint?: string;
}

export interface MailConsumerCheckpoint {
  key: MailConsumerCheckpointKey;
  cursor?: string | null;
  watermark?: string | null;
  lastAttemptAt?: string | null;
  lastSuccessAt?: string | null;
  lastStatus?: MailConsumerCheckpointStatus;
  summary?: string | null;
}

export interface IEmailProviderApi {
  getApiVersion(): string;

  listChannels(): MailChannelSummary[];
  getChannel(channelId: string): MailChannelSummary | null;
  getDefaultChannel(): MailChannelSummary | null;
  getChannelCapabilities(channelId: string): MailChannelCapabilities | null;

  testChannelConnection(channelId: string): Promise<MailConnectionTestResult>;

  searchMessages(query: MailSearchQuery): Promise<MailSearchResult>;
  getMessage(ref: MailMessageRef): Promise<MailMessageDetails | null>;
  materializeAttachment(
    ref: MailMessageRef,
    attachmentId: string,
  ): Promise<MaterializedMailAttachment>;

  getCheckpoint(
    key: MailConsumerCheckpointKey,
  ): Promise<MailConsumerCheckpoint | null>;
  saveCheckpoint(checkpoint: MailConsumerCheckpoint): Promise<void>;
}
