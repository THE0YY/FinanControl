import { Router } from "express";
import { BD } from "../../db.js";
import { autenticarToken } from '../middlewares/autenticacao.js'

const router = Router()

// ====================================================================
// Listar transacoes, mostrando categorias e subcategorias
router.get('/transacoes', async(req, res) =>{
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                        SELECT
                            t.id_transacao,
                            t.valor,
                            t.descricao,
                            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                            t.tipo,
                            c.nome AS nome_categoria,
                            s.nome AS nome_subcategoria
                        FROM transacoes t
                        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                    `

        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar trasações', error.message);
        return res.status(500).json({error: 'Erro ao listar transacoes'})
    }
})

// Listando transacoes por tipo (E ou S)
router.get('/transacoes/periodo', async(req, res) =>{
    const {inicio, fim} = req.query
    //- Quando a query for acionada, a informaçao é enviada:
    //- ?inicio=01/04/2026&fim=13/04/2026

    try{
        if (!inicio || !fim){
            return res.status(400).json({message: 'Informe as datas de inicio e fim do periodo'})
        }
        //cria uma variavel para enviar o comando sql
        const comando = `
                        SELECT
                            t.id_transacao,
                            t.valor,
                            t.descricao,
                            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                            t.tipo,
                            c.nome AS nome_categoria,
                            s.nome AS nome_subcategoria
                        FROM transacoes t
                        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                            WHERE t.data_registro BETWEEN TO_DATE($1, 'DD/MM/YYYY') AND TO_DATE($2, 'DD/MM/YYYY')
                        ORDER BY t.data_registro DESC
                    `
        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [inicio, fim]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar tipo de trasações', error.message);
        return res.status(500).json({error: 'Erro interno do servidor' + error.message})
    }
})

router.get('/transacoes/tipo/:tipo', async(req, res) =>{
    const {tipo} = req.params
    try{
        if (tipo !== 'E' && tipo !== 'S'){
            return res.status(400).json({message: 'Tipo invalido. Use E para entrada ou S para saida'})
        }
        //cria uma variavel para enviar o comando sql
        const comando = `
                        SELECT
                            t.id_transacao,
                            t.valor,
                            t.descricao,
                            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                            t.tipo,
                            c.nome AS nome_categoria,
                            s.nome AS nome_subcategoria
                        FROM transacoes t
                        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                            WHERE t.tipo = $1
                        ORDER BY t.data_registro DESC
                    `
        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [tipo]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar tipo de trasações', error.message);
        return res.status(500).json({error: 'Erro interno do servidor' + error.message})
    }
})

// Busca por categoria pelo id_categoria
router.get('/transacoes/categoria/:id_categoria', async(req, res) =>{
    const {id_categoria} = req.params
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                        SELECT
                            t.id_transacao,
                            t.valor,
                            t.descricao,
                            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                            t.id_categoria,
                            c.nome AS nome_categoria,
                            s.nome AS nome_subcategoria
                        FROM transacoes t
                        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                            WHERE t.id_categoria = $1
                        ORDER BY t.data_registro DESC
                    `
        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [id_categoria]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar tipo de trasações', error.message);
        return res.status(500).json({error: 'Erro interno do servidor' + error.message})
    }
})

// Busca por subcategoria pelo id_subcategoria
router.get('/transacoes/subcategoria/:id_subcategoria', async(req, res) =>{
    const {id_subcategoria} = req.params
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `
                        SELECT
                            t.id_transacao,
                            t.valor,
                            t.descricao,
                            TO_CHAR(t.data_registro, 'DD/MM/YYYY') AS data_registro,
                            TO_CHAR(t.data_vencimento, 'DD/MM/YYYY') AS data_vencimento,
                            TO_CHAR(t.data_pagamento, 'DD/MM/YYYY') AS data_pagamento,
                            t.id_subcategoria,
                            c.nome AS nome_categoria,
                            s.nome AS nome_subcategoria
                        FROM transacoes t
                        LEFT JOIN categorias c ON t.id_categoria = c.id_categoria
                        LEFT JOIN subcategorias s ON t.id_subcategoria = s.id_subcategoria
                            WHERE t.id_subcategoria = $1
                        ORDER BY t.data_registro DESC
                    `
        //cria uma variavel para receber o retorno do sql
        const transacoes = await BD.query(comando, [id_subcategoria]);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(transacoes.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar tipo de trasações', error.message);
        return res.status(500).json({error: 'Erro interno do servidor' + error.message})
    }
})
//* ============================  ^  GET  ^  ============================

router.post('/transacoes', autenticarToken, async(req, res) => {
    const { valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria } = req.body;
    const id_usuario = req.usuarios.id_usuario
    try{
        const comando = `INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
        const valores = [valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria];

        await BD.query(comando, valores)
        console.log(comando,valores);

        return res.status(201).json("transaçao cadastrada.");
    }catch(error){
        console.error('Erro ao cadastrar transaçao', error.message);
        return  res.status(500).json({error: 'Erro ao cadastrar transaçao'})
    }
})
//? ============================  ^  POST  ^  ===========================

router.put('/transacoes/:id_transacao', async(req, res) =>{
    // Id recebido via parametro
    const {id_transacao} = req.params;

    // Dados do usuario recebido via Corpo da página
    const {valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, nome_categoria, nome_subcategoria} = req.body;
    try{
        //Verificar se o usuario existe
        const verificarTransacao = await BD.query(`SELECT * FROM transacoes
            WHERE id_transacao = $1`, [id_transacao])
        if(verificarTransacao.rows.length === 0){
            return res.status(404).json({message: 'Transação não encontrado'})
        }
        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE USUARIOS SET valor = $1, descricao = $2, dataa_registro =$3, data_vencimento = $4, data_pagamento = $5, tipo = $6, nome_categoria = $7, nome_subcategoria = $8 WHERE
        id_transacao = $9`;
        const valores = [valor, descricao, data_registro, data_vencimento, data_pagamento, tipo, nome_categoria, nome_subcategoria, id_transacao];
        await BD.query(comando, valores);

        return res.status(200).json('Transação foi atualizado!');
    }catch(error){
        console.error('Erro ao atualizar trasações', error.message);
        return  res.status(500).json({error: 'Erro ao atualizar transacoes'})
    }
})
//todo =========================  ^  PUT  ^  ============================

router.delete('/transacoes/:id_transacao', async(req, res) =>{
    const {id_transacao} = req.params;
    try{
        //Executa o comando de delete
        // const comando = `DELETE FROM categoria WHERE id_transacao = $1`
        const comando = `DELETE FROM transacoes WHERE id_transacao = $1 `
        await BD.query(comando, [id_transacao])
        return res.status(200).json({message: "transações removida com sucesso"})
    }catch(error){
        console.error('Erro ao atualizar categoria', error.message)
        return res.status(500).json({message: "Erro interno so servidor" + error.message})
    }
})
//! ==========================  ^  DELETE  ^  ===========================

router.post('/transacoes/agendar', autenticarToken, async(req, res) => {
    const {valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria} = req.body

    const id_usuario = req.usuario.id_usuario
    try{
        const consulta = `
            SELECT id_transacao FROM transacoes
            WHERE data_vencimento = TO_DATE($1, 'DD/MM/YYYY')
            AND id_categoria = $2
            AND id_usuario = $3
        `

        const conflito = await BD.query(consulta, [data_vencimento, id_categoria, id_usuario])

        if(conflito.rows.length > 0) {
            return res.status(409).json({
                message: 'Já existe um agendamento nesta categoria e nesta data'
            })
        }

        const comando = `
            INSERT INTO transacoes (valor, descricao, data_vencimento, data_pagamento, tipo, id_categoria, id_subcategoria, id_usuario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        const valores = [valor, descricao, data_vencimento, data_pagamento, tipo, id_subcategoria, id_categoria, id_usuario]

        await BD.query(comando, valores)
        return res.status(201).json({message: 'Agendamento realizado com sucesso'})
    }catch(error){
        console.error('Erro no agendamento', error.message);
        return res.status(500).json({error: 'Verifique o formata das datas'})
        
    }   
})
// id_usuario
export default router