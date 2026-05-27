//conectando frontend ao backend
const URL_API = 'http://localhost:3000/api/usuarios'

//declarando as variaveis globais
const form = document.getElementById('form-usuarios')
const inputid = document.getElementById('usuario-id')
const inputNome = document.getElementById('nome')
const inputEmail = document.getElementById('email')
const corpoTabela = document.getElementById('btn-cancelar')
const btnCancelar = document.getElementById('btn-cancelar')

// carregando os eventos

document.addEventListener('DOMContentLoaded', carregarUsuarios)

//CRUD
