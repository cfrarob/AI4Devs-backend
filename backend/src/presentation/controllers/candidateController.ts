import { Request, Response } from 'express';
import { addCandidate, findCandidateById, updateCandidateStageService } from '../../application/services/candidateService';

export const addCandidateController = async (req: Request, res: Response) => {
    try {
        const candidateData = req.body;
        const candidate = await addCandidate(candidateData);
        res.status(201).json({ message: 'Candidate added successfully', data: candidate });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({ message: 'Error adding candidate', error: error.message });
        } else {
            res.status(400).json({ message: 'Error adding candidate', error: 'Unknown error' });
        }
    }
};

export const getCandidateById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const candidate = await findCandidateById(id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        res.json(candidate);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateCandidateStage = async (req: Request, res: Response) => {
  try {
    const candidateId = parseInt(req.params.id, 10);
    const { applicationId, interviewStepId } = req.body;

    if (isNaN(candidateId) || !applicationId || !interviewStepId) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const result = await updateCandidateStageService(candidateId, applicationId, interviewStepId);

    if (!result.success) {
      return res.status(result.status || 400).json({ error: result.message });
    }

    return res.json({
      success: true,
      message: 'Interview step updated successfully',
      application: result.application,
    });
  } catch (error) {
    console.error('Error in updateCandidateStage:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export { addCandidate };