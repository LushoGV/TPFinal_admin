const url = "http://localhost:3000/api";

const api = {
  get: async (route) => {
    try {
      const req = await fetch(`${url}/${route}`);

      return { data: await req.json(), status: req.status };
    } catch (error) {
      throw error;
    }
  },
  post: async (route, data) => {
    try {
      const req = await fetch(`${url}/${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return { data: await req.json(), status: req.status };
    } catch (error) {
      throw error;
    }
  },
};

export default api;
