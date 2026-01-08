import { Router } from 'express';
import { requireAuth } from '../auth/auth.middleware.js';
import { requireRole } from '../auth/role.middleware.js';
import {
  createUserController,
  listUsersController,
} from './user.controller.js';

const router = Router();

// ADMIN only
router.post(
  '/',
  requireAuth,
  requireRole(['ADMIN']),
  createUserController
);

router.get(
  '/',
  requireAuth,
  requireRole(['ADMIN']),
  listUsersController
);

export default router;
