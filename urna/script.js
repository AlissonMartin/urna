let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')

let etapaAtual = 0
let numero = ''
let votoBranco = false

function comecarEtapa () {
    etapa = etapas[etapaAtual]

    numeroHtml = ''
    votoBranco = false
    for(i=0; i<etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>'
        } else {
        numeroHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    descricao.innerHTML = ''
    lateral.innerHTML = ''
    aviso.style.display = 'none'
    numeros.innerHTML = numeroHtml
    numero = ''
}

function atualizaInterface() {
    let candidato = etapa.candidatos.filter((item)=> {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })
    if (candidato.length > 0) {
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `nome: ${candidato.nome} <br>Partido: ${candidato.partido}`
        fotosHtml = ''
        for (i in candidato.fotos) {
            fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
        }

        lateral.innerHTML = fotosHtml
    } else {
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = '<div class ="aviso--grande pisca">VOTO NULO</div>'
    }
}


function clicou (n) {
    elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== 'null') {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        if (elNumero.nextElementSibling !==null) {
        elNumero.classList.remove('pisca')
        elNumero.nextElementSibling.classList.add('pisca')
        } else {
            elNumero.classList.remove('pisca')
            atualizaInterface()
        }
    }
}

function corrige() {
    comecarEtapa()
}

function branco() {
    votoBranco = true
    numero = ''
    numeros.innerHTML = ''
    lateral.style.display = 'none'
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = '<div class ="aviso--grande pisca">VOTO EM BRANCO</div>'
}

function confirma () {
    votoConfirmado = false
    if (votoBranco == true) {
        votoConfirmado = true
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true
    }

    if (votoConfirmado = true) {
        etapaAtual++
        if (etapas[etapaAtual] !== undefined) {
            comecarEtapa()
        } else {
            descricao.innerHTML = '<div class ="aviso--grande">FIM</div>'
        }
    }
}

comecarEtapa ()