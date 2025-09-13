import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createCategoria = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const newCategoria = await prisma.categoria.create({
      data: { nome, descricao }
    });
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar a categoria.' });
  }
};

// --- READ ---
export const getAllCategorias = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let categorias;

    if (hasQueryParams) {
      categorias = await prisma.categoria.findMany({
        where: {
          id: req.query.id,
          nome: req.query.nome,
          descricao: req.query.descricao
        }
      });
    } else {
      categorias = await prisma.categoria.findMany();
    }
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar as categorias.' });
  }
};

// --- UPDATE ---
export const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    
    const updateCategoria = await prisma.categoria.update({
      where: { id: id },
      data: { nome, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateCategoria); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar a categoria  ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.categoria.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar a categoria ${req.params.id}.` });
  }
};