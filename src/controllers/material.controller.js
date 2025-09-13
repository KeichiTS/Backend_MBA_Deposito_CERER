import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createMaterial = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const newMaterial = await prisma.material.create({
      data: { nome, descricao }
    });
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o material.' });
  }
};

// --- READ ---
export const getAllMateriais = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let materiais;

    if (hasQueryParams) {
      materiais = await prisma.material.findMany({
        where: {
          id: req.query.id,
          nome: req.query.nome,
          descricao: req.query.descricao
        }
      });
    } else {
      materiais = await prisma.material.findMany();
    }
    res.status(200).json(materiais);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os materiais.' });
  }
};

// --- UPDATE ---
export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const updateMaterial = await prisma.material.update({
      where: { id: id },
      data: { nome, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateMaterial); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o material ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.material.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Material deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o material ${req.params.id}.` });
  }
};