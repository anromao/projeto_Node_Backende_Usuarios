//conectando o frontend ao backend
const URL_API = 'http://localhost:3000/api/usuarios'

//declarando as variáveis globais
const form = document.getElementById('form-usuarios')
const inputId = document.getElementById('usuario-id')
const inputNome = document.getElementById('nome')
const inputEmail = document.getElementById('email')
const corpoTabela = document.getElementById('corpo-tabela')
const btnCancelar = document.getElementById('btn-cancelar')

//carregando os eventos
document.addEventListener('DOMContentLoaded', carregarUsuarios)

//CRUD
async function carregarUsuarios() {
    try {
        const resposta = await fetch(URL_API)
        const dados = await resposta.json()
        corpoTabela.innerHTML = ''

        dados.forEach(u => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
            <td>${u.nome}</td>
            <td>${u.email}</td>
            <td>
            <button class="btn-editar" 
            onclick="preencherForm(${u.id},'${u.nome}','${u.email}')">
            Editar</button>
            <button class="btn-deletar"
            onclick="removerUsuario(${u.id})">Excluir</button>
            `
            corpoTabela.appendChild(tr)
        })
    } catch (erro) {
        console.error('Erro ao renderizar os dados', erro)
    }
}
//criando o post e update
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const id = inputId.value
    const payload = {
        nome: inputNome.value,
        email: inputEmail.value
    }
    const config = {
        method: id ? 'PUT' : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }

    const urlFinal = id ? `${URL_API}/${id}` : URL_API
    try {
        const resposta = await fetch(urlFinal, config)
        if (!resposta.ok) {
            const erroAPI = await resposta.json()
            alert(erroAPI.erro)
            return
        }
        limparFormulario()
        carregarUsuarios()
    } catch (erro) {
        console.error('Erro na requisição externa', erro)
    }

})
//Excluir usuários
async function removerUsuario(id) {
    if (!confirm('Deseja excluir este usuário permanentemente')) return
    try {
        await fetch(`${URL_API}/${id}`, { method: 'DELETE' })
        carregarUsuarios()
    } catch (erro) {
        console.error('Erro ao remover registro: ', erro)
    }

}
//Manipulando o estado do formulário
function preencherForm(id, nome, email) {
    inputId.value = id
    inputNome.value = nome
    inputEmail.value = email
    btnCancelar.style.display = 'inline-block'
}

btnCancelar.addEventListener('click', limparFormulario)

//limpando o formulário
function limparFormulario() {
    form.reset()
    inputId.value = ''
    btnCancelar.style.display = 'nome'
}