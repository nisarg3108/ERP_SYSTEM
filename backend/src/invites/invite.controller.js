import bcrypt from 'bcrypt';
import prisma from '../config/db.js';
import { createInvite, acceptInvite } from './invite.service.js';
import { signToken } from '../utils/jwt.js';

export const inviteUserController = async (req, res, next) => {
  try {
    const invite = await createInvite(req.body, req.user.tenantId);

    res.status(201).json({
      message: 'Invite created successfully',
      inviteLink: `http://localhost:5173/accept-invite?token=${invite.token}`,
    });
  } catch (err) {
    next(err);
  }
};

export const acceptInviteController = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const invite = await acceptInvite({ token, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: invite.email,
        password: hashedPassword,
        role: invite.role,
        tenantId: invite.tenantId,
      },
    });

    await prisma.userInvite.update({
      where: { id: invite.id },
      data: { used: true },
    });

    const jwt = signToken({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
    });

    res.json({
      message: 'Invite accepted',
      token: jwt,
    });
  } catch (err) {
    next(err);
  }
};
