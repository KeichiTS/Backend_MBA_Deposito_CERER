import express from 'express'
import cors from 'cors'

import userRoutes from './src/routes/user.routes.js';
import blindagemRoutes from './src/routes/blindagem.routes.js';
import categoriaRoutes from './src/routes/categoria.routes.js';
import materialRoutes from './src/routes/material.routes.js';
import statusRoutes from './src/routes/status.routes.js';
import localRoutes from './src/routes/local.routes.js';
import radionuclideoRoutes from './src/routes/radionuclideo.routes.js';
import rejeitoMaterialRoutes from './src/routes/rejeito_material.routes.js';
import rejeitoRadionuclideoRoutes from './src/routes/rejeito_radionuclideo.routes.js';
import historicoRoutes from './src/routes/historico.routes.js';
import rejeitoRoutes from './src/routes/rejeito.routes.js';




const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/usuarios', userRoutes);
app.use('/api/blindagens', blindagemRoutes)
app.use('/api/categorias', categoriaRoutes)
app.use('/api/materiais', materialRoutes)
app.use('/api/status', statusRoutes)
app.use('/api/locais', localRoutes)
app.use('/api/radionuclideos', radionuclideoRoutes)
app.use('/api/rejeito_material', rejeitoMaterialRoutes)
app.use('/api/rejeito_radionuclideo', rejeitoRadionuclideoRoutes)
app.use('/api/historico', historicoRoutes)
app.use('/api/rejeito', rejeitoRoutes)





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

 app.get('/materiais', async (req, res) => {
 let materiais = []
  if (req.query) {
    materiais = await prisma.materiais.findMany({
      where: {
        id : req.query.id,
        nome : req.query.nome,
        descricao : req.query.descricao
      }
    })

 }else{
  const materiais = await prisma.materiais.findMany()
 }


 console.log(req)
 res.status(200).json(materiais)

})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});