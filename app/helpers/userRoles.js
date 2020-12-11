import isEmpty from 'lodash/isEmpty';

export const roles = [
  {
    role: 'free',
    permissions: {
      project: ['view', 'add', 'edit', 'delete'],
      schedule: [
        'view',
        'add',
        'edit',
        'save',
        'status',
        'delete',
        'comment',
        'download',
      ],
      cost_estimates: ['view', 'add', 'edit', 'delete'],
      purchase_order: ['view', 'add', 'edit', 'delete', 'download'],
      onboarding_materials: ['view', 'add', 'edit', 'delete'],
      labors: ['view', 'add', 'edit', 'delete'],
      file_management: ['view', 'add'],
      chat: ['view', 'add'],
      reports: [],
    },
  },
  {
    role: 'co',
    permissions: {
      project: ['view', 'add', 'edit', 'delete'],
      schedule: [
        'view',
        'add',
        'edit',
        'save',
        'status',
        'delete',
        'comment',
        'download',
      ],
      cost_estimates: ['view', 'add', 'edit', 'delete'],
      purchase_order: ['view', 'add', 'edit', 'delete', 'download'],
      onboarding_materials: ['view', 'add', 'edit', 'delete'],
      labors: ['view', 'add', 'edit', 'delete'],
      file_management: ['view', 'add', 'delete'],
      chat: ['view', 'add'],
      reports: ['view', 'download'],
    },
  },
  {
    role: 'pm',
    permissions: {
      project: ['view', 'add', 'edit'],
      schedule: [
        'view',
        'add',
        'edit',
        'save',
        'status',
        'delete',
        'comment',
        'download',
      ],
      cost_estimates: ['view', 'add', 'edit', 'delete'],
      purchase_order: ['view', 'add', 'edit', 'download'],
      onboarding_materials: ['view'],
      labors: ['view'],
      file_management: ['view', 'add'],
      chat: ['view', 'add'],
      reports: ['view', 'download'],
    },
  },
  {
    role: 'se',
    permissions: {
      project: ['view'],
      schedule: ['view', 'status', 'save', 'comment', 'download'],
      cost_estimates: [],
      purchase_order: ['view', 'download'],
      onboarding_materials: ['view', 'add', 'edit'],
      labors: ['view', 'add', 'edit'],
      file_management: ['view', 'add'],
      chat: ['view', 'add'],
      reports: [],
    },
  },
  {
    role: 'qs',
    permissions: {
      project: ['view'],
      schedule: ['view', 'comment', 'download'],
      cost_estimates: ['view', 'add', 'edit'],
      purchase_order: ['view', 'download'],
      onboarding_materials: ['view'],
      labors: ['view'],
      file_management: ['view', 'add'],
      chat: ['view', 'add'],
      reports: [],
    },
  },
  {
    role: 'po',
    permissions: {
      project: ['view'],
      schedule: ['view', 'comment', 'download'],
      cost_estimates: ['view'],
      purchase_order: ['view', 'add', 'edit', 'download'],
      onboarding_materials: ['view'],
      labors: ['view'],
      file_management: ['view', 'add'],
      chat: ['view', 'add'],
      reports: [],
    },
  },
];

export default (inputRole, inputFeature) => {
  const { permissions } = roles.find(({ role }) => inputRole === role);
  const access = {};

  if (!isEmpty(permissions)) {
    permissions[inputFeature].map(feature => {
      access[feature] = true;
      return true;
    });
  }
  return access;
};
