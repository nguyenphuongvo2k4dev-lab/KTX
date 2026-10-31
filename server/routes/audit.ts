import { Router, Request, Response } from 'express';
import { AuditLog } from '../models/AuditLog.js';

const router = Router();

// GET /api/audit-logs
router.get('/', async (req: Request, res: Response) => {
  try {
    const { role, actionType, search } = req.query as Record<string, string>;
    const filter: Record<string, any> = {};

    if (role) filter['user.role'] = { $regex: role, $options: 'i' };
    if (actionType) filter.actionType = actionType;
    if (search) {
      filter.$or = [
        { 'user.name': { $regex: search, $options: 'i' } },
        { detail: { $regex: search, $options: 'i' } },
        { targetId: { $regex: search, $options: 'i' } },
        { ip: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await AuditLog.find(filter).sort({ createdAt: -1 }).limit(100);
    const total = await AuditLog.countDocuments();

    res.json({ total, displayCount: items.length, items: items.map(l => ({ ...l.toObject(), id: l._id })) });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải nhật ký kiểm toán' });
  }
});

// POST /api/audit-logs/toggle-lock
router.post('/toggle-lock', async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const log = await AuditLog.findById(id);
    if (!log) return res.status(404).json({ error: 'Không tìm thấy log' });

    log.status = log.status === 'locked' ? 'success' : 'locked';
    log.statusText = log.status === 'locked' ? 'Đã khóa' : 'Đã mở khóa';
    await log.save();

    res.json({ success: true, log });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật trạng thái' });
  }
});

export default router;
