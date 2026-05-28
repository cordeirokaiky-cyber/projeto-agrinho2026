// Lógica de Navegação entre Páginas
function mudarPagina(idPagina) {
    // Remove classe ativa de todas as seções
    const paginas = document.querySelectorAll('.page');
    paginas.forEach(p => p.classList.remove('active'));

    // Remove classe ativa dos links do menu
    const links = document.querySelectorAll('.nav-link');
    links.forEach(l => l.classList.remove('active'));

    // Ativa a página solicitada
    if (idPagina === 'jogo') {
        document.getElementById('pagina-jogo').classList.add('active');
        event.target.classList.add('active');
    } else if (idPagina === 'sobre-mim') {
        document.getElementById('pagina-sobre-mim').classList.add('active');
        event.target.classList.add('active');
    } else if (idPagina === 'agrinho') {
        document.getElementById('pagina-agrinho').classList.add('active');
        event.target.classList.add('active');
    }
}

// Lógica do Simulador "Jogo do Equilíbrio"
let producao = 50;
let ambiente = 50;

const barraProducao = document.getElementById('barra-producao');
const barraAmbiente = document.getElementById('barra-ambiente');
const txtProducao = document.getElementById('txt-producao');
const txtAmbiente = document.getElementById('txt-ambiente');
const feedbackJogo = document.getElementById('feedback-jogo');

function atualizarGraficos() {
    // Garante que os valores fiquem entre 0 e 100
    producao = Math.max(0, Math.min(100, producao));
    ambiente = Math.max(0, Math.min(100, ambiente));

    // Atualiza a largura das barras visuais
    barraProducao.style.width = producao + '%';
    barraAmbiente.style.width = ambiente + '%';

    // Atualiza o texto das porcentagens
    txtProducao.innerText = producao + '%';
    txtAmbiente.innerText = ambiente + '%';

    // Validação de condições de vitória ou derrota
    verificarFimDeJogo();
}

function jogar(acao) {
    if (producao <= 0 || ambiente <= 0 || producao >= 100 && ambiente >= 100) return;

    switch(acao) {
        case 'agrotoxico':
            producao += 20;
            ambiente -= 30;
            feedbackJogo.innerText = "⚠️ Você eliminou as pragas rápido, mas o excesso de químicos contaminou o lençol freático e reduziu a biodiversidade local!";
            feedbackJogo.style.color = "#d32f2f";
            break;
        case 'desmatar':
            producao += 25;
            ambiente -= 35;
            feedbackJogo.innerText = "⚠️ Mais espaço para plantar! Porém, sem árvores, o solo sofreu erosão com a primeira chuva forte e afugentou polinizadores.";
            feedbackJogo.style.color = "#d32f2f";
            break;
        case 'rotacao':
            producao += 15;
            ambiente += 10;
            feedbackJogo.innerText = "🌱 Excelente! A rotação de culturas quebrou o ciclo de pragas e nutriu o solo de forma natural.";
            feedbackJogo.style.color = "#2e7d32";
            break;
        case 'bioinsumo':
            producao += 10;
            ambiente += 15;
            feedbackJogo.innerText = "🦠 Muito bom! Os bioinsumos protegeram a lavoura agindo em harmonia com os microrganismos do ecossistema.";
            feedbackJogo.style.color = "#2e7d32";
            break;
        case 'app':
            producao -= 5; // Pequeno custo de espaço inicial
            ambiente += 25;
            feedbackJogo.innerText = "🌳 Parabéns! Proteger as APPs garantiu água limpa e preservou predadores naturais que ajudam no controle de pragas.";
            feedbackJogo.style.color = "#2e7d32";
            break;
    }

    atualizarGraficos();
}

function verificarFimDeJogo() {
    if (ambiente <= 0) {
        feedbackJogo.innerHTML = "❌ <strong>Fim de Jogo!</strong> O meio ambiente colapsou. A terra ficou infértil e sua fazenda teve que fechar.";
        feedbackJogo.style.color = "#d32f2f";
    } else if (producao <= 0) {
        feedbackJogo.innerHTML = "❌ <strong>Fim de Jogo!</strong> Sua produção despencou tanto que a propriedade faliu financeiramente.";
        feedbackJogo.style.color = "#d32f2f";
    } else if (producao >= 75 && ambiente >= 75) {
        feedbackJogo.innerHTML = "🏆 <strong>Vitória Sustentável!</strong> Você alcançou o equilíbrio perfeito! Sua fazenda é altamente produtiva e uma referência em conservação ambiental.";
        feedbackJogo.style.color = "#1b5e20";
    }
}

function reiniciarJogo() {
    producao = 50;
    ambiente = 50;
    feedbackJogo.innerText = "Simulador reiniciado. Faça suas escolhas com sabedoria!";
    feedbackJogo.style.color = "#333";
    atualizarGraficos();
}
