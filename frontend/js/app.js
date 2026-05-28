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
async function carregarUsuarios() {
    try {
        const resposta = await fetch(URL_API)
        const dados = await resposta.json()
        corpoTabela.innerHTML = ''

        dados.forEach(u => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${u.nome}</td>
                <td>${u.email}
                <td>
                <button class="btn-editar onclick="preencherForm(${u.id},'${u.email}')">
                Editar</button>
                <button class="btn-deletar onclick="removerUsuario(${u.id})">Excluir</button>
                `
            corpoTabela.appendChild(tr)
        })

    } catch (erro) {
        console.erro('erro ao renderizar os dados', erro)
    }
}
//criando o post e update
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    constis = inputid.value
    const payload = { nome: inputNome.value, email: inputEmail.value }
    const config = {
        method: id ? 'put' : 'post',
        Headers: { 'content-type': 'aplication/json' },
        body: json.stringify(payload)
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
        console.erro('erro na requisição externa', erro)

    }
})

//Excluir usuarios
async function removerUsuario(id) {
    if (!confirm('deseja excluir esse usuario permanentemente'))
        return
    try {
        await fetch(`${URL_API}/${id}`, { method: 'Delete' })
        carregarUsuarios()
    } catch (erro) {
        console.erro('Erro ao remover registro:', erro)
    }
}

//manipulando o estado do formulario
function preencherForm(id, nome, email){
    inputid.value = id
    inputNome.value = nome
    inputEmail.value = email
    btnCancelar.style.display = 'inline-block'
}
btnCancelar.addEventListener('click',limparFormulario)

//limpando formulario
function limpandoFormulario(){
    form.reset()
    inputid.value = ''
    btnCancelar.style.display ='nome'
}