import { response } from "express"

const documentacao = {
    openapi: '3.0.3',
    info: {
        title: 'API FinanControl',
        description: 'Documentação da API do sistema FinanControl',
        version: '1.0.0'
    },
    servers: [
        { url: 'http://localhost:3000', description: 'localhost' },
        { url: 'https://banco-financontrol.vercel.app', description: 'vercel' }

    ],
    tags: [  //! ==================  v  TAGS  v  ==================
        { name: 'Usuários', description: 'Operações relacionadas aos usuários' },
        { name: 'Categorias', description: 'Operações relacionadas as categorias' },
        { name: 'SubCategorias', description: 'Operações relacionadas as subcategorias' },
        { name: 'Transações', description: 'Operações relacionadas as transações' }
    ],
    paths: {
        //! =====================  v  USUARIO  v  =====================
        "/usuarios": {
            get: {
                tags: ["Usuários"],
                summary: "Listar todos os usuários",
                security: [
                    {
                        bearerAuth: []
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Usuarios' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Usuários'],
                summary: 'Cadastrar novo usuário',
                description: "Recebe nome, email, senha para cadastrar novo usuário",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário cadastrado com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/usuarios/{id_usuario}": {
            put: {
                tags: ['Usuários'],
                summary: 'Atualizar todos os dados do usuário',
                description: 'Atualiza todos os dados de um usuário existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Usuario" },
                            example: {
                                nome: "Ricardo Santos",
                                email: "ricardo5@sesisp.com",
                                senha: "senhaAtualizada"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Usuário atualizado com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Usuários'],
                summary: 'Remover Usuário',
                description: 'Remove usuário existente pelo ID',
                parameters: [
                    {
                        name: "id_usuario",
                        in: "path",
                        required: true,
                        description: "ID do usuário a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Usuário removido com sucesso!"
                    },
                    404: {
                        description: "Usuário não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "Usuário não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }
            },

        },
        "/login": {
            post: {
                tags: ['Autenticação'],
                summary: 'Realizar Login',
                description: "Autentica um usuario e retorna id e nome",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Login_Usuario"
                            }
                        }
                    }
                },
                responses: {
                    200: {
                        description: "Login realizado com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Resposta_Login"
                                }
                            }
                        }
                    },
                    400: { description: "Email e senha são obrigatorios" },
                    401: { description: "Credenciais inválidas" },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        //! =====================  v  CATEGORIA  v  =====================
        "/categorias": {
            get: {
                tags: ["Categorias"],
                summary: "Listar todos as categorias",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Categorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Categorias'],
                summary: 'Cadastrar nova categoria',
                description: "Recebe nome, descricao, cor, icone e tipo  para cadastrar nova categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Categoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "Categoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/categorias/{id_categoria}": {
            put: {
                tags: ['Categorias'],
                summary: 'Atualizar todos os dados do categoria',
                description: 'Atualiza todos os dados de um categoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Categoria" },
                            example: {
                                nome: "Automobilismo",
                                descricao: "Peça automobilistica",
                                cor: "blue",
                                icone: "icone",
                                tipo: "E"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "categoria atualizado com sucesso!"
                    },
                    404: {
                        description: "categoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "categoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['Categorias'],
                summary: 'Remover categoria',
                description: 'Remove categoria existente pelo ID',
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID do categoria a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "categoria removido com sucesso!"
                    },
                    404: {
                        description: "categoria não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "categoria não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            },
        },
        //! =====================  v  SUBCATEGORIA  v  =====================
        "/subcategorias": {
            get: {
                tags: ["SubCategorias"],
                summary: "Listar todos as subcategorias",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "apllication/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_SubCategorias' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['SubCategorias'],
                summary: 'Cadastrar nova subcategoria',
                description: "Recebe nome para cadastrar nova subcategoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_SubCategoria"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "SubCategoria cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/subcategorias/{id_subcategoria}": {
            put: {
                tags: ['SubCategorias'],
                summary: 'Atualizar todos os dados do subcategoria',
                description: 'Atualiza todos os dados de um subcategoria existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da categoria a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_SubCategoria" },
                            example: {
                                nome: "sal",
                                id_categoria: 1
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "subcategoria atualizado com sucesso!"
                    },
                    404: {
                        description: "subcategoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "subcategoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }

                }

            },
            delete: {
                tags: ['SubCategorias'],
                summary: 'Remover subcategoria',
                description: 'Remove subcategoria existente pelo ID',
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "subcategoria removido com sucesso!"
                    },
                    404: {
                        description: "subcategoria não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "subcategoria não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            },
        },
        //! =====================  v  TRANSAÇÕES  v  =====================
        "/transacoes": {
            get: {
                tags: ["Transações"],
                summary: "Listar todos as transações",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Transações'],
                summary: 'Cadastrar nova transaçao',
                description: "Recebe nome para cadastrar nova transaçao",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Cadastrar_Transacao"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "transaçoes cadastrada com sucesso!"
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            }
        },
        "/transacoes/tipo/{tipo}": {
            get: {
                tags: ["Transações"],
                summary: "Listar todos as transações por tipo (entrada ou saida)",
                parameters: [
                    {
                        name: "tipo",
                        in: "path",
                        requred: true,
                        description: "Topo trnsação (E = Entrada / S = Saida)",
                        schema: {type: "string", enum: ["E", "S"], example: "S"}
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/categoria/{id_categoria}": {
            get: {
                tags: ["Transações"],
                summary: "Listar todos as transações por categoria",
                parameters: [
                    {
                        name: "id_categoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser exibido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/subcategoria/{id_subcategoria}": {
            get: {
                tags: ["Transações"],
                summary: "Listar todos as transações por subcategoria",
                parameters: [
                    {
                        name: "id_subcategoria",
                        in: "path",
                        required: true,
                        description: "ID da subcategoria a ser exibido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/{id_transacao}": {
            delete: {
                tags: ['Transações'],
                summary: 'Remover transaçoes',
                description: 'Remove transaçoes existente pelo ID',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transaçoes a ser removido",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "transaçoes removido com sucesso!"
                    },
                    404: {
                        description: "transaçoes não encontrado",
                        content: {
                            "application/json": {
                                example: { message: "transaçoes não encontrado" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            },
            put: {
                tags: ['Transações'],
                summary: 'Atualizar todos os dados das transaçoes',
                description: 'Atualiza todos os dados de uma transaçao existente, é necessário enviar todos os campos',
                parameters: [
                    {
                        name: "id_transacao",
                        in: "path",
                        required: true,
                        description: "ID da transacao a ser atualizado",
                        schema: {
                            type: 'integer',
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/Atualizar_Transacao" },
                            example: {
                                valor: 150.00,
                                descricao: "Consulta medica",
                                data_registro: "06/04/2026",
                                data_vencimento: "16/04/2026",
                                data_pagamento: "20/04/2026",
                                tipo: "E",
                                nome_categoria: "Saúde",
                                nome_subcategoria: "Consulta medica"
                            }
                        }
                    }
                },
                responses: {
                    201: {
                        description: "subcategoria atualizado com sucesso!"
                    },
                    404: {
                        description: "subcategoria não encontrada",
                        content: {
                            "application/json": {
                                example: { message: "subcategoria não encontrada" }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor"
                    }
                }
            },
        },
        "/transacoes/periodo": {
            get: {
                tags: ["Transações"],
                summary: "Listar todos as transações",
                parameters: [
                    {name: 'inicio',
                        in: 'query',
                        requred: true,
                        description: 'data de inicio do periodo',
                        schema: {type: "string", example: '01/04/2026'}
                    },
                    {name: 'fim',
                        in: 'query',
                        requred: true,
                        description: 'data do fim do periodo',
                        schema: {type: "string", example: '13/04/2026'}
                    }
                ],
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: { $ref: '#/components/schemas/Listar_Transacoes' }
                                }
                            }
                        }
                    }
                }
            }
        },
        "/transacoes/agendar": {
            post: {
                tags: [ 'Transações' ],
                summary: "Agendar compromisso unico",
                description: 'Essa rota verifica se o usuario possui um registro para a mesma data',
                security: [{bearerAuth: []}],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {$ref: '#/components/schemas/Cadastrar_Transacao'}
                        }
                    }
                },
                responses: {201: {description: 'Agendamento realizado com sucesso'}}
            }
        },
        //! =================================================================
        "/dashboard": {
            get: {
                tags: ["Dashboard"],
                summary: "Obtem todos os dados consolidados do dashboard",
                description: "Retorna o resumo do mes, atual, gastos por categoria, maiores despezas",
                responses: {
                    200: {
                        description: "Dados obtidos com sucesso!",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        resumoMesAtual: {
                                            type: "object",
                                            properties: {
                                                entradas: {type: "number", example: 500},
                                                saidas: {type: "number", example: 259},
                                                saldo: {type: "number", example: 241}
                                            }
                                        },
                                        gastosCategorias: {
                                            type: "object",
                                            properties: {
                                                nome: {type: "string", example: "lazer"},
                                                total: {type: "number", example: "120"}
                                            }
                                        },
                                        resumoMaioresGastos: {
                                            type: "object",
                                            properties: {
                                                descricao: {type: "string", example: "aluguel"},
                                                valor: {type: "number", example: "1500"},
                                                data: {type: "string", example: "10/5/2026"}
                                            }
                                        },
                                        resumoUltimasTransacoes: {
                                            type: "object",
                                            properties: {
                                                descricao: {type: "string", example: "aluguel"},
                                                valor: {type: "number", example: "1500"},
                                                data: {type: "string", example: "10/5/2026"}
                                            }
                                        },
                                        resumoEvolucao: {
                                            type: "object",
                                            properties: {
                                                mes: {type: "string", example: "05/2026"},
                                                entradas: {type: "number", example: "1500"},
                                                saidas: {type: "number", example: "2000"}
                                            }
                                        },
                                    }
                                }
                            }
                        }
                    },
                    500: {
                        description: "Erro interno no servidor."
                    }
                },
            },
        }
    },
    components: {
        securitySchemes:{bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Insira o token jwt obtido do login'
        }},
        schemas: {
            //! ===  v  Usuario  v  ===
            Listar_Usuarios: {
                type: 'object',
                properties: {
                    id: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo@email.com" }
                }
            },
            Cadastrar_Usuario: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Ricardo" },
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "usuario/admin" }
                }
            },
            Atualizar_Usuario: {
                type: 'object',
                required: ["nome", "email", "senha", "tipo_acesso"],
                properties: {
                    nome: { type: "string", example: "Nina" },
                    email: { type: "string", example: "nina@email.com" },
                    senha: { type: "string", example: "Senha123" },
                    tipo_acesso: { type: "string", example: "usuario/admin" }
                }
            },
            Login_Usuario: {
                type: 'object',
                required: true,
                properties: {
                    email: { type: "string", example: "ricardo2@email.com" },
                    senha: { type: "string", example: "Senha123" }
                }
            },
            Reposta_Login: {
                type: 'object',
                properties: {
                    message: { type: 'string', example: 'Login realizado com sucesso' },
                    token: {
                        type: 'string',
                        description: 'Token JWT gerado',
                        example: 'jdfdfdjkdjfdfdjhdfdk'
                    },
                    usuario: {
                        type: 'object',
                        properties: {
                            id_usuario: { type: "string", example: 1 },
                            nome: { type: "string", example: "Ricardo" },
                        }
                    }
                }
            },
            //! ===  v  Categoria  v  ===
            Listar_Categorias: {
                type: 'object',
                properties: {
                    id_categoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Tipo alimentação" },
                    cor: { type: "string", example: "#fff" },
                    icone: { type: "string", example: "nomeicone" },
                    tipo: { type: "stirng", example: "E" }
                }
            },
            Cadastrar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Tipo alimentação" },
                    cor: { type: "string", example: "#fff" },
                    icone: { type: "string", example: "nomeicone" },
                    tipo: { type: "stirng", example: "E" }
                }
            },
            Atualizar_Categoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    descricao: { type: "string", example: "Tipo alimentação" },
                    cor: { type: "string", example: "#fff" },
                    icone: { type: "string", example: "nomeicone" },
                    tipo: { type: "stirng", example: "E" }
                }
            },
            //! ===  v  SubCategoria  v  ===
            Listar_SubCategorias: {
                type: 'object',
                properties: {
                    id_subcategoria: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Ingredientes" }
                }
            },
            Cadastrar_SubCategoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            Atualizar_SubCategoria: {
                type: 'object',
                properties: {
                    nome: { type: "string", example: "Alimentação" },
                    id_categoria: { type: "integer", example: 1 }
                }
            },
            //! ===  v  Transações  v  ===
            Listar_Transacoes: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", example: 150.00 },
                    descricao: { type: "string", example: "Consulta medica" },
                    data_registro: { type: "string", example: "06/04/2026" },
                    data_vencimento: { type: "string", example: "16/04/2026" },
                    data_pagamento: { type: "string", example: "20/04/2026" },
                    tipo: { type: "stirng", enum: ["E", "S"], example: "E" },
                    nome_categoria: { type: "string", example: "Saúde" },
                    nome_subcategoria: { type: "string", example: "Consulta medica" }
                }

            },
            Cadastrar_Transacao: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", example: 150.00 },
                    descricao: { type: "string", example: "Consulta medica" },
                    data_registro: { type: "string", example: "06/04/2026" },
                    data_vencimento: { type: "string", example: "16/04/2026" },
                    data_pagamento: { type: "string", example: "20/04/2026" },
                    tipo: { type: "stirng", enum: ["E", "S"], example: "E" },
                    id_categoria: { type: "integer", example: 1 },
                    id_subcategoria: { type: "integer", example: 1 }

            }

            },
            Atualizar_Transacao: {
                type: 'object',
                properties: {
                    id_transacao: { type: "integer", example: 1 },
                    valor: { type: "number", example: 150.00 },
                    descricao: { type: "string", example: "Consulta medica" },
                    data_registro: { type: "string", example: "06/04/2026" },
                    data_vencimento: { type: "string", example: "16/04/2026" },
                    data_pagamento: { type: "string", example: "20/04/2026" },
                    tipo: { type: "stirng", enum: ["E", "S"], example: "E" },
                    nome_categoria: { type: "string", example: "Saúde" },
                    nome_subcategoria: { type: "string", example: "Consulta medica" }

            }

            }
        }
    }
}
export default documentacao
