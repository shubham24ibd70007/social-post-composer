const API_URL = "http://localhost:9090/api/posts";

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  const body = await response.json();

  if (!response.ok || !body.success) {
    throw new Error(body.message || "Unable to complete the request.");
  }

  return body.data;
}

export const postsApi = {
  getAll: () => request(),
  create: (post) => request("", { method: "POST", body: JSON.stringify(post) }),
  update: (id, post) => request(`/${id}`, { method: "PUT", body: JSON.stringify(post) }),
  remove: (id) => request(`/${id}`, { method: "DELETE" }),
};
