import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, Button, TextInput, TouchableOpacity, Image, Switch } from 'react-native'
import { enderoServidor } from "../utils.js"
import { useState, useEffect } from "react"

import { LinearGradient } from 'expo-linear-gradient'
import { EstilosLogin, coresLogin } from '../styles/EstiloLogin.js'
import { MaterialIcons } from '@expo/vector-icons'
import { corFundo2, corPrincipal } from '../styles/Estilos.js'

export default function Login({ navigation }) {
   const [email, setEmail] = useState('meo@email.com')
   const [senha, setSenha] = useState('deos')
   const [mensagem, setMensagem] = useState('')

   const [lembrar, setLembrar] = useState(false)
   const [mostrarSenha, setMostrarSenha] = useState(false)

   async function botaoEntrar() {
      try {
         // Verificando se email e senha estao vazios
         if (email == '' || senha == '') {
            setMensagem('Preencha todos os campos')
            return //* Sai da funcao e nao executa o resto do try
         }
         // Criando objeto para enviar para a API conforme o Swagger
         const dadosLogin = {
            "email": email,
            "senha": senha
         }
         // Chamando o endpoint do login enviando o email e senha digitados
         const resposta = await fetch(`${enderoServidor}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosLogin)
         })
         // Verificando se o end point da API existe
         if (resposta.status == 404) {
            setMensagem(`Rota não encontrada: ${resposta.url}`)
            return
         }
         // Convertendo os dados da resposta da API
         const dados = await resposta.json()
         // Verificando se a API retornou algum erro interno dela
         if (resposta.status == 500) {
            setMensagem(`Erro no servidor: ${dados.message}`)
            return
         }
         // Se a resposta for sucesso
         if (resposta.ok) {
            AsyncStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }))
            navigation.navigate('MenuDrawer')
         } else {
            setMensagem('Email ou senha incorretos')
         }

      }
      catch (error) {
         setMensagem(`Erro ao realizar login: ${error.message}`)
      }
   }

   useEffect(() => {
      async function buscarUsuario() {
         const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado')
         if (usuarioLogado != null) {
            const usuario = JSON.parse(usuarioLogado)
            if (usuario.lembrar == true) {
               navigation.navigate('MenuDrawer')
            }
         }
      }
      buscarUsuario()
   }, [])


   return (
      <View style={EstilosLogin.container}>
         <LinearGradient
            colors={[corFundo2, corPrincipal]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={EstilosLogin.gradiente}
         >
            <View style={EstilosLogin.cabecalho}>
               <Image source={require('../../assets/logo.png')} style={EstilosLogin.iconeLogo} />
               <View>
                  <Text style={EstilosLogin.nomeApp}>FinanControl</Text>
                  <Text style={EstilosLogin.subtituloApp}>O Seu Controle Financeiro</Text>
               </View>
            </View>

            <View style={EstilosLogin.conteudoPrincipal}>
               <View style={EstilosLogin.formularioLogin}>
                  <Text style={EstilosLogin.titulo}>Acesse sua conta</Text>

                  <View style={EstilosLogin.grupoInput}>
                     <MaterialIcons name='email' size={22} style={EstilosLogin.iconeInput} />
                     <TextInput style={EstilosLogin.input} placeholder="Digite seu email" placeholderTextColor={coresLogin.placeholder} value={email} onChangeText={setEmail} keyboardType='email-address' autoCapitalize='none' />
                  </View>

                  <View style={EstilosLogin.grupoInput}>
                     <MaterialIcons name='lock' size={22} style={EstilosLogin.iconeInput} />
                     <TextInput style={EstilosLogin.input} placeholder="Digite sua senha" placeholderTextColor={coresLogin.placeholder} value={senha} onChangeText={setSenha} secureTextEntry={!mostrarSenha} />
                     <TouchableOpacity style={EstilosLogin.alternarVisibilidade}
                        onPress={() => setMostrarSenha(!mostrarSenha)}>
                        <MaterialIcons size={24} colors={coresLogin.icone} name={mostrarSenha == false ? 'visibility-off' : 'visibility'} />
                     </TouchableOpacity>
                  </View>

                  <View style={EstilosLogin.entreOpcoes}>
                     <View style={EstilosLogin.containerCheckbox}>
                        <Switch value={lembrar} onValueChange={setLembrar} />
                        <Text style={EstilosLogin.rotuloCheckbox} >Lembrar-me</Text>
                     </View>
                     <Text style={EstilosLogin.esqueceuSenha}>Esqueci a senha</Text>
                  </View>

                  <TouchableOpacity onPress={botaoEntrar} style={EstilosLogin.botaoEntrar}>
                     <Text style={EstilosLogin.textoBotaoEntrar}>Entrar</Text>
                  </TouchableOpacity>

                  <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>
               </View>
            </View>

         </LinearGradient>
      </View>
   )
} 