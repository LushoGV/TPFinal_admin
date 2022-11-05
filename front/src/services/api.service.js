const url = null;

const api = {
  get: async (route) => {
    try {
      const req = await fetch(`${url}/${route}`);

      return await req.json();
    } catch (error) {
      if (error.message === 'Failed to fetch') window.location.reload();
      throw error;
    }
  },
  post: async (route, data) => {
    try {
      const req = await fetch(`${url}/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await req.json();
    } catch (error) {
      if (error.message === 'Failed to fetch') window.location.reload();
      throw error;
    }
  },
};

export default api;
