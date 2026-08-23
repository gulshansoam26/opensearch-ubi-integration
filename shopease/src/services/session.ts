const getOrCreateId = (key: string): string => {
  let id = sessionStorage.getItem(key);

  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }

  return id;
};

export const getSessionId = (): string => {
  return getOrCreateId("ubi_session_id");
};

export const getClientId = (): string => {
  let clientId = localStorage.getItem("ubi_client_id");

  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem("ubi_client_id", clientId);
  }

  return clientId;
};