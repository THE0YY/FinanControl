import { corPrincipal, corSecundaria, corTextos, corFundo2 } from './Estilo';

const corCard = '#ffffff';
const corTextoEscuro = '#333333';
const corBordaInput = '#e0e0e0';
const corFundoInput = '#f7f7f7';
const corIcone = '#888888';

export const EstilosLogin = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${corFundo2}, ${corPrincipal})`,
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
        color: corTextoEscuro
    },
    cabecalho: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        color: corTextos
    },
    iconeLogo: {
        marginRight: '15px',
        color: corTextos,
        width: '50px',
        height: '50px'
    },
    nomeApp: {
        margin: 0,
        fontSize: '1.8em',
        fontWeight: 'bold'
    },
    subtituloApp: {
        margin: 0,
        fontSize: '0.9em',
        fontWeight: 'lighter'
    },
    conteudoPrincipal: {
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    formularioLogin: {
        backgroundColor: corCard,
        padding: '30px 25px',
        borderRadius: '15px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '30px'
    },
    titulo: {
        fontSize: '1.5em',
        marginBottom: '25px',
        color: corTextoEscuro,
        fontWeight: 600,
        textAlign: 'center'
    },
    grupoInput: {
        position: 'relative',
        width: '100%',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: corFundoInput,
        borderRadius: '8px',
        border: `1px solid ${corBordaInput}`
    },
    iconeInput: {
        position: 'absolute',
        left: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: corIcone,
        fontSize: '1.2em'
    },
    input: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '8px',
        fontSize: '1em',
        boxSizing: 'border-box',
        color: corTextoEscuro,
        outline: 'none'
    },
    entreOpcoes: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    containerCheckbox: {
        display: 'flex',
        alignItems: 'center'
    },
    checkbox: {
        marginRight: '5px'
    },
    alternarVisibilidade: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: corIcone,
        fontSize: '1.3em',
        padding: '5px',
        display: 'flex',
        alignItems: 'center'
    },
    esqueceuSenha: {
        fontSize: '0.9em',
        color: corSecundaria,
        textDecoration: 'none'
    },
    mensagemFeedback: {
        width: '100%',
        minHeight: '22px',
        marginTop: '14px',
        color: '#b42318',
        fontSize: '0.9em',
        fontWeight: 500,
        textAlign: 'center'
    },
    botaoEntrar: {
        width: '100%',
        padding: '12px',
        background: `linear-gradient(to right, ${corPrincipal}, ${corSecundaria})`,
        color: corTextos,
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '20px',
        marginTop: '20px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    }
};

export default EstilosLogin;
