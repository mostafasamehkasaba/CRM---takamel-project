const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromApi(path: string, init: RequestInit = {}) {
  if (!BASE_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL");
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    let details = "";
    try {
      const data = await res.json();
      if (data && typeof data === "object") {
        details = (data.message as string) ?? JSON.stringify(data);
      } else {
        details = String(data);
      }
    } catch {
      try {
        details = await res.text();
      } catch {
        details = "";
      }
    }
    const suffix = details ? ` - ${details}` : "";
    throw new Error(`API ${res.status}${suffix}`);
  }

  return res.json();
}


