import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createHistorico = async (req, res) => {
  try {
    const { rejeito_id, data_modificacao, tipo_modificacao, descricao, usuario_responsavel } = req.body;
    const newHistorico = await prisma.historicoRejeito.create({
      data: { rejeito_id, data_modificacao, tipo_modificacao, descricao, usuario_responsavel }
    });
    res.status(201).json(newHistorico);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o historico.' });
  }
};

// --- READ ---
export const getAllHistoricos = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let historicos;

    if (hasQueryParams) {
      historicos = await prisma.historicoRejeito.findMany({
        where: {
          id: req.query.id,
          rejeito_id: req.query.rejeito_id,
          data_modificacao: req.query.data_modificacao,
          tipo_modificacao: req.query.tipo_modificacao,
          descricao: req.query.descricao,
          usuario_responsavel: req.query.usuario_responsavel,
        }
      });
    } else {
      historicos = await prisma.historicoRejeito.findMany();
    }
    res.status(200).json(historicos);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar o historico de rejeitos.' });
  }
};

// --- UPDATE ---
export const updateHistorico = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejeito_id, data_modificacao, tipo_modificacao, descricao, usuario_responsavel } = req.body;
    
    const updateHistorico = await prisma.historicoRejeito.update({
      where: { id: id },
      data: { rejeito_id, data_modificacao, tipo_modificacao, descricao, usuario_responsavel}
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateHistorico); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o historico ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteHistorico = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.historicoRejeito.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Historico deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o historico do rejeito ${req.params.id}.` });
  }
};