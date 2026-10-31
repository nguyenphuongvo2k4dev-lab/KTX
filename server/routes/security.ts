import { Router, Request, Response } from 'express';
import { SecurityAlert } from '../models/SecurityAlert.js';

const router = Router();

// GET /api/security-alerts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const alerts = await SecurityAlert.find().sort({ createdAt: -1 });
    res.json(alerts.map(a => ({ ...a.toObject(), id: a.alertId })));
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải cảnh báo bảo mật' });
  }
});

// POST /api/security-alerts/block-ip
router.post('/block-ip', async (req: Request, res: Response) => {
  try {
    const { alertId, ip } = req.body;
    const alert = await SecurityAlert.findOne({ alertId });
    if (!alert) return res.status(404).json({ error: 'Không tìm thấy cảnh báo' });

    alert.status = 'resolved';
    alert.actionTaken = `Đã chặn vĩnh viễn IP ${ip} trên tường lửa WAF`;
    await alert.save();

    res.json({ success: true, message: `IP ${ip} đã được chặn trên WAF VNU-Cloud.` });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi chặn IP' });
  }
});

export default router;
