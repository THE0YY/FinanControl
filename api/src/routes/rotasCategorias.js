import { Router } from "express";
import { BD } from "../../db.js";
const router = Router();

//Criando o endpoint para listar todos os usuarios
router.get('/categorias', async(req, res) =>{
    try{
        //cria uma variavel para enviar o comando sql
        const comando = `SELECT * FROM categorias WHERE ativo = true`

        //cria uma variavel para receber o retorno do sql
        const categorias = await BD.query(comando);

        //retorno para a pagina, o json com os dados 
        //buscados do sql
        return res.status(200).json(categorias.rows);//200 ok
    }catch(error){
        console.error('Erro ao listar categorias', error.message);
        return res.status(500).json({error: 'Erro ao listar categorias'})
    }
})

//Endpoint seguro contra sql Injection
router.post('/categorias', async(req, res) => {
    const { nome, descricao, cor, icone, tipo } = req.body;
    try{
        const comando = `INSERT INTO categorias(nome, descricao, cor, icone, tipo) VALUES($1, $2, $3, $4, $5)`
        const valores = [ nome, descricao, cor, icone, tipo ];

        await BD.query(comando, valores)
        console.log(comando,valores);

        return res.status(201).json("Categoria cadastrada.");
    }catch(error){
        console.error('Erro ao cadastrar categorias', error.message);
        return  res.status(500).json({error: 'Erro ao cadastrar usuarios'})
    }
})

// endpoint para atualizar um unico usuário
// recebendo o parametro pelo id e buscando o Categoria
router.put('/categorias/:id_categoria', async(req, res) =>{
    // Id recebido via parametro
    const {id_categoria} = req.params;

    // Dados do Categoria recebido via Corpo da página
    const { nome, descricao, cor, icone, tipo } = req.body;
    try{
        //Verificar se o Categoria existe
        const verificarCategoria = await BD.query(`SELECT * FROM categorias
            WHERE id_categoria = $1 and ativo = true`, [id_categoria])
        if(verificarCategoria.rows.length === 0){
            return res.status(404).json({message: 'Categoria não encontrado'})
        }

        // Atualiza todos os campos da tabela(PUT Substituição completa)
        const comando = `UPDATE categorias SET nome = $1, descricao = $2, cor = $3, icone = $4, tipo = $5 WHERE
        id_categoria = $6`;
        const valores = [ nome, descricao, cor, icone, tipo, id_categoria ];
        await BD.query(comando, valores);

        return res.status(200).json('Categoria foi atualizado!');
    }catch(error){
        console.error('Erro ao atualizar usuários', error.message);
        return  res.status(500).json({error: 'Erro ao atualizar categorias'})
    }
})

//Rota patch atualizando parcialmente as informações
// router.patch('/usuarios/:id_usuario', async(req,res) =>{
//     const { id_usuario } = req.params;
//     const {nome, email, senha} = req.body;

//     try{
//          //Verificar se o usuario existe
//         const verificarCategoria = await BD.query(`SELECT * FROM USUARIOS
//             WHERE id_usuario = $1`, [id_usuario])
//         if(verificarCategoria.rows.length === 0){
//             return res.status(404).json({message: 'Usuario não encontrado'})
//         }

//         //Montar o update dinamicamente(apenas campos enviados)
//         const campos = [];
//         const valores = [];
//         let contador = 1;

//         if(nome !== undefined){
//             campos.push(`nome = $${contador}`);
//             valores.push(nome);
//             contador++;
//         }
//         if(email !== undefined){
//             campos.push(`email = $${contador}`);
//             valores.push(email);
//             contador++;
//         }
//         if(senha !== undefined){
//             campos.push(`senha = $${contador}`);
//             valores.push(senha);
//             contador++;
//         }

//         //se nenhum campo foi enviado
//         if(campos.length === 0 ){
//             return res.status(400).json({message: "Nenhum campo a atualizar"})
//         }

//         //Adicionando ID ao final de valores
//         valores.push(id_usuario)
        
//         //montando a query dinamicamente
//         const comando = `UPDATE USUARIOS SET ${campos.join(', ')} WHERE id_usuario = $${contador}`
//         await BD.query(comando, valores)

//         return res.status(200).json('Usuário atualizado com sucesso');
//     }catch(error){
//         console.error('Erro ao atualizar usuario', error.message)
//         return res.status(500).json({message: "Erro interno so servidor" + error.message})
//     }
// })

router.delete('/categorias/:id_categoria', async(req, res) =>{
    const {id_categoria} = req.params;
    try{
        //Executa o comando de delete
        // const comando = `DELETE FROM categoria WHERE id_categoria = $1`
        const comando = `UPDATE categorias SET ativo = false WHERE id_categoria = $1 `
        await BD.query(comando, [id_categoria])
        return res.status(200).json({message: "Categoria desativada com sucesso"})
    }catch(error){
        console.error('Erro ao atualizar categoria', error.message)
        return res.status(500).json({message: "Erro interno so servidor" + error.message})
    }
})

export default router