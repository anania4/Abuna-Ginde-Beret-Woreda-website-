import type { Schema, Struct } from '@strapi/strapi';

export interface ProjectMilestone extends Struct.ComponentSchema {
  collectionName: 'components_project_milestones';
  info: {
    description: '';
    displayName: 'Milestone';
    icon: 'calendar';
  };
  attributes: {
    date: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'project.milestone': ProjectMilestone;
    }
  }
}
