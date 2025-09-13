import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createBlindagem = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const newBlindagem = await prisma.blindagem.create({
      data: { nome, descricao }
    });
    res.status(201).json(newBlindagem);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a blindagem.' });
  }
};

// --- READ ---
export const getAllBlindagens = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let blindagens;

    if (hasQueryParams) {
      blindagens = await prisma.blindagem.findMany({
        where: {
          id: req.query.id,
          nome: req.query.nome,
          descricao: req.query.descricao
        }
      });
    } else {
      blindagens = await prisma.blindagem.findMany();
    }
    res.status(200).json(blindagens);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar as blindagens.' });
  }
};

// --- UPDATE ---
export const updateBlindagem = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const updateBlindagem = await prisma.blindagem.update({
      where: { id: id },
      data: { nome, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateBlindagem); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar a blindagem ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteBlindagem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.blindagem.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Blindagem deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar a blindagem ${req.params.id}.` });
  }
};