const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchFromApi(path: string) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
}


