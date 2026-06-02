import express from 'express';
import {BD, testarConexao} from './db.js';
//! ===================  v  Importando rotas  v  ===================
import rotasUsuarios from './src/routes/rotasUsuarios.js'
import rotasCategorias from './src/routes/rotasCategorias.js'
import rotasSubCategorias from './src/routes/rotasSubCategorias.js'
import rotasTransacoes from './src/routes/rotasTransacoes.js'
import rotasDashboard from './src/routes/rotasDashboard.js'
//! ================================================================
//* usando swagger
import swaggerUi from 'swagger-ui-express';
import documentacao from './config/swagger.js';
import cors from 'cors'

const app = express();
app.use(express.json());
// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(documentacao))
app.use(cors())

app.get('/swagger', (req, res) => {
    res.send(`<!DOCTYPE html>
<html><head>
    <title>API FinanControl</title>
    <meta charset="utf-8"/>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css">
</head><body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
        SwaggerUIBundle({
            spec: ${JSON.stringify(documentacao)},
            dom_id: '#swagger-ui'})
    </script>
</body></html>`);
});


app.get('/', async(req, res) =>{
    await testarConexao();
    // res.status(200).json("Api Funcionando");
    res.redirect('/swagger')
})

//! ===  v  Utilizando rotas  v  ===
app.use(rotasUsuarios);
app.use(rotasCategorias);
app.use(rotasSubCategorias);
app.use(rotasTransacoes);
app.use(rotasDashboard);
//! ================================

const porta = 3000;
app.listen(porta, () =>{
    console.log(`http://localhost:${porta}`);
})
