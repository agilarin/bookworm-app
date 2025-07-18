export async function createOrRefreshSession(idToken: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({ idToken }),
  });
  return response.json();
}

export async function deleteSession() {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  return response.json();
}
