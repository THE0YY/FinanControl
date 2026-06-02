import jwt from "jsonwebtoken";

const SECRET_KEY = "sua_chave_secreta"

export function autenticarToken(req, res, next){
    const cabecalho = req.headers['authorization']

    //^ Extrair o token, Do padrado better TOKEN
    const token = cabecalho && cabecalho.split(' ')[1]

    if (!token) {
        return res.status(401).json({message: 'Token nao fornecido'})
    }

    jwt.verify(token, SECRET_KEY, (error, usuario) => {
        if(error) {
            return res.status(403).json({message: 'Token invalido ou expirado'})
        }

        //* se tudo estiver correto anexa os dados do usuario na requisicao
        req.usuario = usuario

        //* chamar o next para que passa a proxima funcao ou rota
        next()
    })
}