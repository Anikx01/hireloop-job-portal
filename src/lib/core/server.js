const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Handle 401, 403, 404, and other HTTP errors
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));

    if (res.status === 401) {
      throw new Error(errorData.error || "Unauthorized. Please sign in.");
    }
    if (res.status === 403) {
      throw new Error(
        errorData.error || "Forbidden. You do not have permission.",
      );
    }
    if (res.status === 404) {
      throw new Error(errorData.error || `Resource not found: ${path}`);
    }

    throw new Error(errorData.error || `Request failed (${res.status})`);
  }

  return res.json();
};
