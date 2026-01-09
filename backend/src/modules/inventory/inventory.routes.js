import { Router } from 'express';
import { requireAuth } from '../../core/auth/auth.middleware.js';
import { requireRole } from '../../core/auth/role.middleware.js';
import {
  createItemController,
  listItemsController,
} from './inventory.controller.js';

const router = Router();

// ADMIN creates items
router.post(
  '/',
  requireAuth,
  requireRole(['ADMIN']),
  createItemController
);

// All users can view items
router.get('/', requireAuth, listItemsController);

export default router;
