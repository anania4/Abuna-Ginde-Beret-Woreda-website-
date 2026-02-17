import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Debug: List all roles
    const roles = await strapi.db.query('plugin::users-permissions.role').findMany();
    strapi.log.info('Available Roles: ' + roles.map(r => r.type).join(', '));

    const publicRole = roles.find(r => r.type === 'public' || r.name === 'Public');
    if (!publicRole) {
      strapi.log.error('Public role not found!');
      return;
    }

    strapi.log.info(`Found Public Role: ID=${publicRole.id}`);

    const apis = ['sector', 'project', 'news', 'faq', 'kebele', 'admin-message', 'global-setting'];
    const actions = ['find', 'findOne'];

    for (const api of apis) {
      for (const action of actions) {
        const actionString = `api::${api}.${api}.${action}`;

        // Use a more generic query to check if it exists
        const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
          where: {
            role: publicRole.id,
            action: actionString,
          },
        });

        if (!existing) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: {
              role: publicRole.id,
              action: actionString,
            },
          });
          strapi.log.info(`Enabled public ${action} for ${api}`);
        } else {
          strapi.log.info(`Public ${action} for ${api} already enabled`);
        }
      }
    }
  },
};
