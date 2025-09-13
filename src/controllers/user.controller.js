import prisma from '../database/prismaClient.js';

// --- CREATE ---
export const createUser = async (req, res) => {
  try {
    const { email, name, age } = req.body;
    const newUser = await prisma.user.create({
      data: { email, name, age }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível criar o usuário.' });
  }
};

// --- READ ---
export const getAllUsers = async (req, res) => {
  try {
    // Uma forma mais segura de verificar se há query params
    const hasQueryParams = Object.keys(req.query).length > 0;
    let users;

    if (hasQueryParams) {
      users = await prisma.user.findMany({
        where: {
          name: req.query.name,
          age: req.query.age ? Number(req.query.age) : undefined, // Converte idade para número
          email: req.query.email
        }
      });
    } else {
      users = await prisma.user.findMany();
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Não foi possível buscar os usuários.' });
  }
};

// --- UPDATE ---
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, age } = req.body;
    
    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, name, age }
    });
    // É uma boa prática retornar o objeto atualizado
    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(500).json({ error: `Não foi possível atualizar o usuário ${req.params.id}.` });
  }
};

// --- DELETE ---
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({
      where: { id: id }
    });
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: `Não foi possível deletar o usuário ${req.params.id}.` });
  }
};