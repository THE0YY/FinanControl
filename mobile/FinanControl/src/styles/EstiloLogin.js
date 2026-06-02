import { StyleSheet } from 'react-native';
import {
    corPrincipal,
    corSecundaria,
    corTextos
} from './Estilos';

const corCard = '#ffffff';
const corTextoEscuro = '#333333';
const corBordaInput = '#e0e0e0';
const corFundoInput = '#f7f7f7';
const corIcone = '#888888';
const corPlaceholder = '#aaaaaa';
export const coresLogin = {
    icone: corIcone,
    placeholder: corPlaceholder
};

export const EstilosLogin = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradiente: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    containerTeclado: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    cabecalho: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    iconeLogo: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    nomeApp: {
        margin: 0,
        fontSize: 29,
        fontWeight: 'bold',
        color: corTextos
    },
    subtituloApp: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: '300',
        color: corTextos
    },
    conteudoPrincipal: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center'
    },
    formularioLogin: {
        backgroundColor: corCard,
        paddingVertical: 30,
        paddingHorizontal: 25,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4
    },
    titulo: {
        fontSize: 24,
        marginBottom: 25,
        color: corTextoEscuro,
        fontWeight: '600',
        textAlign: 'center'
    },
    grupoInput: {
        position: 'relative',
        width: '100%',
        marginBottom: 20,
        justifyContent: 'center',
        backgroundColor: corFundoInput,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: corBordaInput
    },
    iconeInput: {
        position: 'absolute',
        left: 12,
        color: corIcone
    },
    input: {
        width: '100%',
        paddingVertical: 12,
        paddingLeft: 40,
        paddingRight: 42,
        borderRadius: 8,
        fontSize: 16,
        color: corTextoEscuro
    },
    alternarVisibilidade: {
        position: 'absolute',
        right: 10,
        padding: 5
    },
    entreOpcoes: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerCheckbox: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rotuloCheckbox: {
        color: corTextoEscuro,
        fontSize: 14,
        marginLeft: 6
    },
    esqueceuSenha: {
        fontSize: 14,
        color: corSecundaria
    },
    mensagemFeedback: {
        width: '100%',
        minHeight: 22,
        marginTop: 14,
        color: '#b42318',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    botaoEntrar: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        backgroundColor: corPrincipal
    },
    textoBotaoEntrar: {
        color: corTextos,
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default EstilosLogin;
