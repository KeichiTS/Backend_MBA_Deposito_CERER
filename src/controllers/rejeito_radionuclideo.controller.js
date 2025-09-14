import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createRejeitoRadionuclideo  = async (req, res) => {
  try {
    const { rejeito_id, radionuclideo_id, concentracao_atividade, data_medicao } = req.body;
    const newRejeitoRadionuclideo = await prisma.rejeitoRadionuclideo.create({
      data: { rejeito_id, radionuclideo_id, concentracao_atividade, data_medicao}
    });
    res.status(201).json(newRejeitoRadionuclideo);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o novo rejeito radionuclideo.' });
  }
};

// --- READ ---
export const getAllRejeitosRadionclideos = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let rejeitos_radionuclideos;

    if (hasQueryParams) {
      rejeitos_radionuclideos = await prisma.rejeitoRadionuclideo.findMany({
        where: {
          id: req.query.id,
          rejeito_id: req.query.rejeito_id,
          radionuclideo_id: req.query.radionuclideo_id,
          concentracao_atividade: req.query.concentracao_atividade,
          data_medicao: req.query.data_medicao,

        }
      });
    } else {
      rejeitos_radionuclideos = await prisma.rejeitoRadionuclideo.findMany();
    }
    res.status(200).json(rejeitos_radionuclideos);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os rejeitos radionuclideos.' });
  }
};

// --- UPDATE ---
export const updateRejeitoRadionuclideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejeito_id, radionuclideo_id, concentracao_atividade, data_medicao } = req.body;
    
    const updateRejeitoRadionuclideo = await prisma.rejeitoRadionuclideo.update({
      where: { id: id },
      data: { rejeito_id, radionuclideo_id, concentracao_atividade, data_medicao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateRejeitoRadionuclideo); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o rejeito radionuclideo ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteRejeitoRadionuclideo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rejeitoRadionuclideo.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Rejeito radionuclideo deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o rejeito radionuclideo ${req.params.id}.` });
  }
};