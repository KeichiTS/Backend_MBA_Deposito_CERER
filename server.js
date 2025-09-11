import express from 'express'
import cors from 'cors'
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())

app.post('/usuarios', async(req, res) => {

 await prisma.user.create({
  data: {
    email: req.body.email,
    name: req.body.name,
    age: req.body.age
  }
 })

 res.status(201).json(req.body)

})

app.post('/rejeito', async(req, res) => {

 await prisma.rejeito.create({
  data: {
    codigo_interno: req.body.codigo_interno,
    categoria_id: req.body.categoria_id,
    material_id: req.body.material_id,
    descricao: req.body.descricao,
    peso_kg: req.body.peso_kg,
    dimensoes_cm: req.body.dimensoes_cm,
    atividade_bq: req.body.atividade_bq,
    data_medicao_atividade: req.body.data_medicao_atividade,
    tempo_decaimento_dias: req.body.tempo_decaimento_dias,
    nivel_referencia_bq: req.body.nivel_referencia_bq,
    data_recebimento: req.body.data_recebimento,
    data_liberacao: req.body.data_liberacao,
    status_id: req.body.status_id,
    local_armazenamento_id: req.body.local_armazenamento_id

  }
 })

 console.log(req.body)
 res.status(201).json(req.body)

})

app.get('/usuarios', async (req, res) => {
 let users = []
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name : req.query.name,
        age : req.query.age,
        email : req.query.email
      }
    })
 }else{
  const users = await prisma.user.findMany()
 
 }

 console.log(req)
 res.status(200).json(users)

})

app.put('/usuarios/:id', async(req, res) => {

 await prisma.user.update({
  where : {
    id: req.params.id
  },
  data: {
    email: req.body.email,
    name: req.body.name,
    age: req.body.age
  }
 })

 res.status(201).json(req.body)

})

app.delete('/usuarios/:id', async (req, res) => {
  await prisma.user.delete({
    where: { 
      id: req.params.id
    }
  })
  res.status(200).json({message: "usuario deletado com sucesso"})
})

app.listen(3000)