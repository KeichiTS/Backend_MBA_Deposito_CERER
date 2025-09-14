import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createRejeitoMaterial = async (req, res) => {
  try {
    const { rejeito_id, material_id, percentual } = req.body;
    const newRejeitoMaterial = await prisma.rejeitoMaterial.create({
      data: { rejeito_id, material_id, percentual }
    });
    res.status(201).json(newRejeitoMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o material de rejeito.' });
  }
};

// --- READ ---
export const getAllRejeitosMateriais = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let rejeitosMateriais;

    if (hasQueryParams) {
      rejeitosMateriais = await prisma.rejeitoMaterial.findMany({
        where: {
          id: req.query.id,
          rejeito_id: req.query.rejeito_id,
          material_id: req.query.material_id,
          percentual: req.query.percentual,
        }
      });
    } else {
      rejeitosMateriais = await prisma.rejeitoMaterial.findMany();
    }
    res.status(200).json(rejeitosMateriais);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os materiais de rejeito.' });
  }
};

// --- UPDATE ---
export const updateRejeitoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { rejeito_id, material_id, percentual } = req.body;
    
    const updateRejeitoMaterial = await prisma.rejeitoMaterial.update({
      where: { id: id },
      data: { rejeito_id, material_id, percentual  }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateRejeitoMaterial); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o material de rejeito ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteRejeitoMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rejeitoMaterial.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Material do Rejeito deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar a blindagem ${req.params.id}.` });
  }
};