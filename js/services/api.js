export const api = axios.create({
  baseURL: "https://seriescope-api.vercel.app/api",
  timeout: 8000,
  headers: {
    "X-Learner": "a.dehbi",
  },
});

//  feature/axios-service
//  feature/server-filters
//  feature/add-serie
//  feature/edit-serie
//  feature/delete-serie
