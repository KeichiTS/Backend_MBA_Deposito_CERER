import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createLocal = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const newLocal = await prisma.localArmazenamento.create({
      data: { nome, descricao }
    });
    res.status(201).json(newLocal);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o local de armazenamento.' });
  }
};

// --- READ ---
export const getAllLocais = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let locais;

    if (hasQueryParams) {
      locais  = await prisma.localArmazenamento.findMany({
        where: {
          id: req.query.id,
          nome: req.query.nome,
          descricao: req.query.descricao
        }
      });
    } else {
      locais = await prisma.localArmazenamento.findMany();
    }
    res.status(200).json(locais);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os locais de armazenamento.' });
  }
};

// --- UPDATE ---
export const updateLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const updateLocal = await prisma.localArmazenamento.update({
      where: { id: id },
      data: { nome, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateLocal); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o local de armazenamento ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteLocal = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.localArmazenamento.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Local de armazenamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o local de armazenamento ${req.params.id}.` });
  }
};