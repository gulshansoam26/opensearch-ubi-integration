import { getClientId, getSessionId } from "./session";
import type { UBIEvent, UBIAction } from "../types/UBIEvent";
import axios from "axios";

export const captureEvent = async (
  action: UBIAction,
  options?: {
    query?: string;
    attributes?: Record<string, unknown>;
  }
) => {
  const event: UBIEvent = {
    action_name: action,
    timestamp: new Date().toISOString(),
    client_id: getClientId(),
    session_id: getSessionId(),
  };

  if (options?.query) {
    event.user_query = options.query;
  }

  if (options?.attributes) {
    event.event_attributes = options.attributes;
  }

  console.log("UBI EVENT:", event);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/events",
      event
    );

    console.log("Backend Response:", response.data);

  } catch (error) {
    console.error("Failed to send event:", error);
  }
};