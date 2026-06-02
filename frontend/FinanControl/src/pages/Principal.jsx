import { useState, useEffect } from "react"
import { MdSpaceBar } from "react-icons/md"
import { useLoaderData, useNavigate } from "react-router-dom"

export default function Principal () {
    const navigate = useNavigate()
    const [dadosLogin, setDadosLogin] = useState(null)

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await localStorage.getItem('UsuarioLogado')
            if (usuarioLogado != null) {
                setDadosLogin(JSON.parse(usuarioLogado))
            }
        }
        buscarUsuario()
    }, [])
    
    function botaoLogout() {
        localStorage.removeItem('UsuarioLogado')
        navigate('/')
    }
    
    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between", padding: '10px', borderBottom: '1px solid #ccc'}}>
                <div style={{display: "flex", gap: 20}}>
                    <p>Usuario: {dadosLogin?.usuario?.nome}</p>
                    <p>Email: {dadosLogin?.usuario?.email}</p>
                </div>
                <button onClick={botaoLogout}>Sair</button>
            </div>
        </div>
    )
}