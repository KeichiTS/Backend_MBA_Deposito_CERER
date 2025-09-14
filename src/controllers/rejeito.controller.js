import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createRejeito = async (req, res) => {
  try {
    const { codigo_interno, descricao, categoria_id, blindagem_id, 
      peso_bruto_kg, peso_blindagem_kg, peso_liquido_kg, dimensoes_externas_cm, 
      dimensoes_internas_cm, atividade_total_bq, data_medicao_total, data_recebimento, 
      data_liberacao, status_id, local_armazenamento_id } = req.body;

    const newRejeito = await prisma.rejeito.create({
      data: { codigo_interno, descricao, categoria_id, blindagem_id, 
      peso_bruto_kg, peso_blindagem_kg, peso_liquido_kg, dimensoes_externas_cm, 
      dimensoes_internas_cm, atividade_total_bq, data_medicao_total, data_recebimento, 
      data_liberacao, status_id, local_armazenamento_id }
    });

    res.status(201).json(newRejeito);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o rejeito.' });
  }
};

// --- READ ---
export const getAllRejeitos = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let rejeitos;

    if (hasQueryParams) {
      rejeitos = await prisma.rejeito.findMany({
        where: {
          id: req.query.id,
          codigo_interno: req.query.codigo_interno, 
          descricao: req.query.descricao, 
          categoria_id: req.query.categoria_id, 
          blindagem_id: req.query.blindagem_id, 
          peso_bruto_kg: req.query.peso_bruto_kg, 
          peso_blindagem_kg: req.query.peso_blindagem_kg, 
          peso_liquido_kg: req.query.peso_liquido_kg, 
          dimensoes_externas_cm: req.query.dimensoes_externas_cm, 
          dimensoes_internas_cm: req.query.dimensoes_internas_cm, 
          atividade_total_bq: req.query.atividade_total_bq, 
          data_medicao_total: req.query.data_medicao_total, 
          data_recebimento: req.query.data_recebimento, 
          data_liberacao: req.query.data_liberacao, 
          status_id: req.query.status_id, 
          local_armazenamento_id: req.query.local_armazenamento_id
        }
      });
    } else {
      rejeitos = await prisma.rejeito.findMany();
    }
    res.status(200).json(rejeitos);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os rejeitos.' });
  }
};

// --- UPDATE ---
export const updateRejeito = async (req, res) => {
  try {
    const { id } = req.params;
    const {  codigo_interno, descricao, categoria_id, blindagem_id, 
      peso_bruto_kg, peso_blindagem_kg, peso_liquido_kg, dimensoes_externas_cm, 
      dimensoes_internas_cm, atividade_total_bq, data_medicao_total, data_recebimento, 
      data_liberacao, status_id, local_armazenamento_id } = req.body;
    
    const updateRejeito = await prisma.rejeito.update({
      where: { id: id },
      data: {  codigo_interno, descricao, categoria_id, blindagem_id, 
      peso_bruto_kg, peso_blindagem_kg, peso_liquido_kg, dimensoes_externas_cm, 
      dimensoes_internas_cm, atividade_total_bq, data_medicao_total, data_recebimento, 
      data_liberacao, status_id, local_armazenamento_id }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updateRejeito); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o rejeito ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteRejeito = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.rejeito.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Rejeito deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o rejeito ${req.params.id}.` });
  }
};