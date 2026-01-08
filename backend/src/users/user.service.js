import bcrypt from 'bcrypt';
import prisma from '../config/db.js';

/**
 * Create a user under the same tenant (ADMIN only)
 */
export const createUser = async ({ email, password, role }, tenantId) => {
  if (!email || !password || !role) {
    throw new Error('Missing required fields');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role,
      tenantId,
    },
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};

/**
 * List users of the same tenant
 */
export const listUsers = async (tenantId) => {
  return prisma.user.findMany({
    where: { tenantId },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};
