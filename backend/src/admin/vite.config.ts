import { mergeConfig, type UserConfig } from 'vite';

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
        // Fix for @strapi/design-system/v2 import issue
        '@strapi/design-system/v2': '@strapi/design-system',
      },
    },
  });
};
