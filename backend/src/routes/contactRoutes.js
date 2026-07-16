import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import nodemailer from 'nodemailer';
import { ContactMessage, AnalyticsEvent } from '../models/index.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

const transporter = process.env.SMTP_USER
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  : null;

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('A valid email is required.'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, subject, message } = req.body;
      const saved = await ContactMessage.create({ name, email, subject, message });

      await AnalyticsEvent.create({ eventType: 'contact_submit', meta: { email } });

      if (transporter) {
        await transporter.sendMail({
          from: `"Portfolio Site" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          replyTo: email,
          subject: `New contact form message: ${subject || 'No subject'}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        });
      }

      res.status(201).json({ message: 'Message received. Thank you!', id: saved.id });
    } catch (err) {
      next(err);
    }
  }
);

// Admin: list messages
router.get('/', requireAuth, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['createdAt', 'DESC']] });
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/read', requireAuth, requireRole('admin', 'editor'), async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Not found.' });
    msg.readFlag = true;
    await msg.save();
    res.json(msg);
  } catch (err) {
    next(err);
  }
});

export default router;
