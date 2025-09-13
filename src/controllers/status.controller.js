import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createStatus = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const newStatus = await prisma.status.create({
      data: { nome, descricao }
    });
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o status.' });
  }
};

// --- READ ---
export const getAllStatus = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let status;

    if (hasQueryParams) {
      status = await prisma.status.findMany({
        where: {
          id: req.query.id,
          nome: req.query.nome,
          descricao: req.query.descricao
        }
      });
    } else {
      status = await prisma.status.findMany();
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os status.' });
  }
};

// --- UPDATE ---
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const updateStatus = await prisma.status.update({
      where: { id: id },
      data: { nome, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateStatus); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o status ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteStatus= async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.status.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Status deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o status ${req.params.id}.` });
  }
};