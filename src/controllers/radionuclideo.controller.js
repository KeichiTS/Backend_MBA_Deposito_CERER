import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createRadionuclideo = async (req, res) => {
  try {
    const { simbolo, nome_comum, meia_vida_dias, descricao } = req.body;
    const newRadionuclideo = await prisma.radionclideos.create({
      data: { simbolo, nome_comum, meia_vida_dias, descricao }
    });
    res.status(201).json(newRadionuclideo);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o radionuclideo.' });
  }
};

// --- READ ---
export const getAllRadionuclideos = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let radionuclideos;

    if (hasQueryParams) {
      radionuclideos = await prisma.radionclideos.findMany({
        where: {
          id: req.query.id,
          simbolo: req.query.simbolo,
          nome_comum: req.query.nome_comum,
          meia_vida_dias: req.query.meia_vida_dias,
          descricao: req.query.descricao
        }
      });
    } else {
      radionuclideos = await prisma.radionclideos.findMany();
    }
    res.status(200).json(radionuclideos);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os radionuclideos.' });
  }
};

// --- UPDATE ---
export const updateRadionuclideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { simbolo, nome_comum, meia_vida_dias, descricao } = req.body;
    
    const updateRadionuclideo = await prisma.radionclideos.update({
      where: { id: id },
      data: { simbolo, nome_comum, meia_vida_dias, descricao }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateRadionuclideo); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o radionuclideo ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteRadionuclideo = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.radionclideos.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Radionuclideo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o radionuclideo ${req.params.id}.` });
  }
};