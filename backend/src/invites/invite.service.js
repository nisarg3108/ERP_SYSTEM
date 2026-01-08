import crypto from 'crypto';
import prisma from '../config/db.js';

export const createInvite = async ({ email, role }, tenantId) => {
  if (!email) {
    throw new Error('Email is required');
  }

  const token = crypto.randomBytes(32).toString('hex');

  const invite = await prisma.userInvite.create({
    data: {
      email,
      role: role || 'USER',
      token,
      tenantId,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    },
  });

  return {
    email: invite.email,
    token: invite.token,
  };
};

export const acceptInvite = async ({ token, password }) => {
  const invite = await prisma.userInvite.findUnique({
    where: { token },
  });

  if (!invite || invite.used || invite.expiresAt < new Date()) {
    throw new Error('Invalid or expired invite');
  }

  return invite;
};
