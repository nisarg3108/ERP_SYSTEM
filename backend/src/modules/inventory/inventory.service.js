import prisma from '../../config/db.js';

export const createItem = async (data, tenantId) => {
  const { name, sku, price, quantity, description } = data;

  if (!name || !sku || price === undefined) {
    throw new Error('Missing required fields');
  }

  return prisma.item.create({
    data: {
      name,
      sku,
      price,
      quantity: quantity || 0,
      description,
      tenantId,
    },
  });
};

export const listItems = async (tenantId) => {
  return prisma.item.findMany({
    where: { tenantId },
    orderBy: { createdAt: 'desc' },
  });
};
