export const apiUrl: string = `http://localhost:3000`;
export const requestConfig = (method: string, data: any): RequestInit => {
  let config;

  if (method === "DELETE" || data === null) {
    config = { method, headers: {} };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" } as HeadersInit,
    };
  }

  return config;
};
