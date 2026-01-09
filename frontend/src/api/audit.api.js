import { apiClient } from './http';

export const auditAPI = {
  getAuditLogs: (params) => apiClient.get('/audit', { params }),
  getAuditLog: (id) => apiClient.get(`/audit/${id}`)
};