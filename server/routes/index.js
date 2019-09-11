import express from 'express';
import authRoutes from './authRoutes';
import mentorRoutes from './mentorRoutes';
import sessionRoutes from './sessionRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Free Mentors',
}));

router.use('/api/v1', authRoutes);
router.use('/api/v1/mentors', mentorRoutes);
router.use('/api/v1/sessions', sessionRoutes);
router.use('/api/v1/users', userRoutes);

export default router;
