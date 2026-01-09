const API_URL = "http://localhost:3000";

export const api = {
  getPersons: async () => {
    return fetch(`${API_URL}/persons`).then((r) => r.json());
  },

  createPerson: async (person) => {
    return fetch(`${API_URL}/persons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person)
    });
  }
};
