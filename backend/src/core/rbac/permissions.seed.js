import prisma from '../../config/db.js';

export const seedPermissions = async () => {
  const permissions = [
    // Inventory
    { code: 'inventory.create', label: 'Create inventory item' },
    { code: 'inventory.view', label: 'View inventory' },
    { code: 'inventory.update', label: 'Update inventory' },

    // Users
    { code: 'user.invite', label: 'Invite users' },
    { code: 'user.manage', label: 'Manage users' },
    // Departments ✅ ADD
  { code: 'department.create', label: 'Create department' },
  { code: 'department.view', label: 'View departments' },
  { code: 'audit.view', label: 'View audit logs' },

  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: {},
      create: perm,
    });
  }
};
