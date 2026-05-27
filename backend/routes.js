const express = require('express')
const router = express.Router()
const db = require('./db')

//GET - listar usuários
router.get('/usuarios', async (req, res) => {
    try {
        const sql = 'select id,nome,email from tbusuarios order by id desc'
        const [rows] = await db.query(sql)
        res.json(rows)
    } catch (err) {
        res.status(500).json({ erro: 'erro ao buscar usuario' })

    }
})

//POST - Criar usuario
router.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body
    if (!nome || !email)
        return res.status(400).
            json({ erro: 'nome e email são obrigatorios.' })
    try {
        const sql = 'insert into tbusuarios(nome,email)valvules(?,?)'
        const [result] = await db.query(sql, [nome], [email])
        res.status(201).json({ id: result.insertid, nome, email })

    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            return res.status(400)
                .json({ erro: 'Este e-mail ja esta cadastrado' })
        res.status(500).json({ erro: 'erro ao salvar o banco.' })
    }
})

//PUT - Alterar usuarios
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    const { nome, email } = req.body
    try {
        const sql = 'update tbusuarios set nome=?, email=?, where id=?'
        conts[result] = await db.query(sql, [nome, email, id])
        if (result.affectedRows === 0)
            return res.status(404)
                .json({ erro: 'usuario não encontrado.' })
        res.json({ mensagem: 'usuario alterado com sucesso!' })
    }
    catch (err) {
        if (err.code === 'EL_DUP_ENTRY')
            return res.status(400).json({ erro: 'Este e-mail já esta em uso' })
        res.status(500).json({ erro: 'Erro ao atualizar no banco.' })
    }

})

//Delect - excluindo usuário
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params
    try {
        const sql = 'delete from tbusuarios where id=?'
        const [result] = await db.query(sql, [id])
        if (result.affectedRows === 0)
            return res.status(404).json({ erro: 'usuarios não encontrado' })
        res.json({ mensagem: 'usuario deletado com sucesso!' })
    } catch (err) {
        res.status(500).json({ erro: 'erro ao deletar do banco' })

    }
})

module.exports = router