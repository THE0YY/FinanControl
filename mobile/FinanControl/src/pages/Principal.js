import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Principal({ navigation }) {
    const [usuarioLogado, setUsuariLogado] = useState()
    const [dadosLogin, setDadosLogin] = useState([])

    function botaoLogout() {
        AsyncStorage.removeItem('UsuarioLogado')
        navigation.navigate('Login')
    }

    useEffect(() => {
        async function buscarUsuario() {
            const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
            if (usuarioLogado != null) {
                const usuario = JSON.parse(usuarioLogado)
                if (usuario.lembrar == true) {
                    setDadosLogin(JSON.parse(usuarioLogado))
                } 
            }
        }
        buscarUsuario()
    }, [])


    return (
        <View>
            <View style={{flexDirection: "row", justifyContent: "space-between", padding: 10}}>
                <Text>Usuario: {dadosLogin?.usuario?.nome}</Text>
                <TouchableOpacity style={{ width: 100, padding: 10, backgroundColor: "rgb(123, 123, 232)", borderRadius: 5, alignItems: "center" }} onPress={botaoLogout}>
                    <Text>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
} 
{/* <Text>Principal</Text> */}