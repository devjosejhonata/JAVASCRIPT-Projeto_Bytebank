
//dados do grafico
const graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart(graficoDolar, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Dolar',
                data: [],
                borderWidth: 1
            }]
        },
});

//conectando com a api AwesomeAPI
setInterval(() => conectaAPI(), 5000);
async function conectaAPI() {
    const conecta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL");
    const conectaTraduzido = await conecta.json();
    let tempo = geraHorario();
    let valor = conectaTraduzido.USDBRL.ask;
    adicionarDados(graficoParaDolar, tempo, valor);
}

//horarios
function geraHorario() {
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    console.log(horario);
    return horario;
}


//adicionando dados e tornando o grafico dinamico
function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
}
