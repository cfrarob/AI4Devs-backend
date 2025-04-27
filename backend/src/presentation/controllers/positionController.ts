import { Request, Response } from 'express';
import { getCandidatesByPositionService } from '../../application/services/positionService';

export const getCandidatesByPosition = async (req: Request, res: Response) => {
  try {
    const positionId = parseInt(req.params.id, 10);
    if (isNaN(positionId)) {
      return res.status(400).json({ error: 'Invalid position ID' });
    }

    const candidates = await getCandidatesByPositionService(positionId);
    return res.json(candidates);
  } catch (error) {
    console.error('Error in getCandidatesByPosition:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
