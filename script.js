const inputCidade = document.getElementById("cidade");
const listaCidades = document.getElementById("lista-cidades");
const dadosPrevisao = document.getElementById("dados-previsao");

inputCidade.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        const cidade = inputCidade.value.trim();

        if (cidade !== "") {
            buscarCidade(cidade);
        }

    }

});

async function buscarCidade(cidade) {

    listaCidades.innerHTML = "Buscando...";
    dadosPrevisao.innerHTML = "";

    try {

        const resposta = await fetch(
            `https://brasilapi.com.br/api/cptec/v1/cidade/${encodeURIComponent(cidade)}`
        );

        const cidades = await resposta.json();

        mostrarCidades(cidades);

    } catch (erro) {

        listaCidades.innerHTML = "Erro ao buscar cidades.";

    }

}

function mostrarCidades(cidades) {

    listaCidades.innerHTML = "";

    if (cidades.length === 0) {
        listaCidades.innerHTML = "Nenhuma cidade encontrada.";
        return;
    }

    cidades.forEach(cidade => {

        const botao = document.createElement("button");

        botao.textContent = `${cidade.nome} - ${cidade.estado}`;
        botao.classList.add("cidade-item");

        botao.addEventListener("click", () => {
            buscarPrevisao(cidade.id);
        });

        listaCidades.appendChild(botao);

    });

}

async function buscarPrevisao(id) {

    dadosPrevisao.innerHTML = "Buscando...";

    try {

        const resposta = await fetch(
            `https://brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`
        );

        const previsao = await resposta.json();

        mostrarPrevisao(previsao);

    } catch (erro) {

        dadosPrevisao.innerHTML = "Erro ao buscar previsão.";

    }

}

function mostrarPrevisao(previsao) {

    dadosPrevisao.innerHTML = `<h3>${previsao.cidade} - ${previsao.estado}</h3>`;

    previsao.clima.forEach(dia => {

        const div = document.createElement("div");

        div.classList.add("card-clima");

        div.innerHTML = `
            <p><strong>Data:</strong> ${dia.data}</p>
            <p>${dia.condicao_desc}</p>
            <p>Mín: ${dia.min}°C</p>
            <p>Máx: ${dia.max}°C</p>
            <p>UV: ${dia.indice_uv}</p>
        `;

        dadosPrevisao.appendChild(div);

    });

}