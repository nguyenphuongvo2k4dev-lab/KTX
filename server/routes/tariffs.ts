import { Router, Request, Response } from 'express';
import { Tariff } from '../models/Tariff.js';

const router = Router();

// GET /api/tariffs
router.get('/', async (_req: Request, res: Response) => {
  try {
    const tariffs = await Tariff.find().sort({ tariffId: 1 });
    res.json(tariffs.map(t => ({ id: t.tariffId, name: t.name, zone: t.zone, price: t.price, unit: t.unit, desc: t.desc })));
  } catch (err) {
    res.status(500).json({ error: 'Lỗi tải biểu phí' });
  }
});

// PUT /api/tariffs
router.put('/', async (req: Request, res: Response) => {
  try {
    const { updatedTariffs } = req.body;
    if (!Array.isArray(updatedTariffs)) return res.status(400).json({ error: 'Dữ liệu không hợp lệ' });

    await Promise.all(updatedTariffs.map((t: any) =>
      Tariff.findOneAndUpdate(
        { tariffId: t.id },
        { name: t.name, zone: t.zone, price: t.price, unit: t.unit, desc: t.desc },
        { upsert: true, new: true }
      )
    ));

    const result = await Tariff.find().sort({ tariffId: 1 });
    res.json({ success: true, tariffs: result.map(t => ({ id: t.tariffId, name: t.name, zone: t.zone, price: t.price, unit: t.unit, desc: t.desc })) });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi cập nhật biểu phí' });
  }
});

export default router;
