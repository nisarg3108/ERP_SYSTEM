import { createItem, listItems } from './inventory.service.js';
import { getWorkflowForAction } from '../../core/workflow/workflow.service.js';

export const createItemController = async (req, res, next) => {
  try {
    const workflow = await getWorkflowForAction(
      req.user.tenantId,
      'INVENTORY',
      'CREATE'
    );

    if (workflow) {
      return res.status(202).json({
        message: 'Approval required',
        workflowId: workflow.id,
      });
    }

    const item = await createItem(req.body, req.user.tenantId);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
};

export const listItemsController = async (req, res, next) => {
  try {
    const items = await listItems(req.user.tenantId);
    res.json(items);
  } catch (err) {
    next(err);
  }
};
