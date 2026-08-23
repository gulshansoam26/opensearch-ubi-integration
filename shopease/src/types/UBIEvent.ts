export type UBIAction = "view" | "search" | "click";

export interface UBIEvent {
  action_name: UBIAction;
  timestamp: string;
  client_id: string;
  session_id: string;

  user_query?: string;

  event_attributes?: Record<string, unknown>;
}