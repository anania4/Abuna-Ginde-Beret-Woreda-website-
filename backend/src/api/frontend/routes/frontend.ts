export default {
  routes: [
    {
      method: 'GET',
      path: '/',
      handler: 'frontend.index',
      config: {
        auth: false,
      },
    },
  ],
};