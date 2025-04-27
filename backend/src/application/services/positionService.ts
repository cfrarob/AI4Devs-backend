import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getCandidatesByPositionService = async (positionId: number) => {
  // Buscar todas las aplicaciones para la posición, incluyendo candidato, etapa y entrevistas
  const applications = await prisma.application.findMany({
    where: { positionId },
    include: {
      candidate: true,
      interviewStep: true,
      interviews: true,
    },
  });

  // Mapear la información requerida para la respuesta
  return applications.map(app => {
    const fullName = `${app.candidate.firstName} ${app.candidate.lastName}`;
    const currentInterviewStep = app.interviewStep?.name || null;
    const scores = app.interviews.map(interview => interview.score).filter(score => score !== null && score !== undefined);
    const averageScore = scores.length > 0
      ? scores.reduce((sum, score) => sum + (score as number), 0) / scores.length
      : null;

    return {
      candidateId: app.candidate.id,
      fullName,
      currentInterviewStep,
      averageScore,
    };
  });
};
