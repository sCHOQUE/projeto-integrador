function formatarMoeda(valor) {
    return "R$ " + valor.toFixed(2).replace(".", ",");
}

function lerNumero(mensagem) {
    const entrada = prompt(mensagem);

    if (entrada === null) {
        return null;
    }

    const textoLimpo = entrada.trim();

    if (textoLimpo === "") {
        return NaN;
    }

    return Number(textoLimpo.replace(",", "."));
}

function calcularPrecoComDesconto(precoOriginal, percentualDesconto) {
    const valorDesconto = precoOriginal * (percentualDesconto / 100);
    return precoOriginal - valorDesconto;
}

function executarCalculadoraDescontos() {
    const saida = document.getElementById("resultado-descontos");

    const precoOriginal = lerNumero("Informe o preço original do produto (R$):");
    if (precoOriginal === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    const percentualDesconto = lerNumero("Informe o percentual de desconto (%):");
    if (percentualDesconto === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    if (isNaN(precoOriginal) || precoOriginal <= 0) {
        saida.textContent = "Erro: informe um preço original válido e maior que zero.";
        return;
    }

    if (isNaN(percentualDesconto) || percentualDesconto < 0 || percentualDesconto > 100) {
        saida.textContent = "Erro: informe um percentual de desconto válido (entre 0% e 100%).";
        return;
    }

    const precoFinal = calcularPrecoComDesconto(precoOriginal, percentualDesconto);
    const valorEconomizado = precoOriginal - precoFinal;

    const resumo =
        "Preço original: " + formatarMoeda(precoOriginal) + "\n" +
        "Percentual de desconto: " + percentualDesconto.toFixed(2).replace(".", ",") + "%\n" +
        "Valor economizado: " + formatarMoeda(valorEconomizado) + "\n" +
        "Preço final: " + formatarMoeda(precoFinal);

    saida.textContent = resumo;
    console.log("--- Calculadora de Descontos ---\n" + resumo);
}

function calcularValorParcela(valorTotal, quantidadeParcelas) {
    return valorTotal / quantidadeParcelas;
}

function executarCalculadoraParcelas() {
    const saida = document.getElementById("resultado-parcelas");

    const valorTotal = lerNumero("Informe o valor total da compra (R$):");
    if (valorTotal === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    const quantidadeParcelas = lerNumero("Informe a quantidade de parcelas (inteiro maior que zero):");
    if (quantidadeParcelas === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    if (isNaN(valorTotal) || valorTotal <= 0) {
        saida.textContent = "Erro: informe um valor total válido e maior que zero.";
        return;
    }

    if (isNaN(quantidadeParcelas) || quantidadeParcelas <= 0 || quantidadeParcelas % 1 !== 0) {
        saida.textContent = "Erro: quantidade de parcelas inválida. Informe um número inteiro maior que zero.";
        return;
    }

    const valorParcela = calcularValorParcela(valorTotal, quantidadeParcelas);

    const resumo =
        "Valor total da compra: " + formatarMoeda(valorTotal) + "\n" +
        "Quantidade de parcelas: " + quantidadeParcelas + "x (sem juros)\n" +
        "Valor de cada parcela: " + formatarMoeda(valorParcela);

    saida.textContent = resumo;
    console.log("--- Calculadora de Parcelas ---\n" + resumo);
}

function simularInvestimento(valorInicial, aporteMensal, taxaMensal, meses) {
    let saldo = valorInicial;
    const taxaDecimal = taxaMensal / 100;

    for (let mes = 1; mes <= meses; mes++) {
        // 1. Aplica o rendimento sobre o saldo acumulado
        saldo += saldo * taxaDecimal;
        // 2. Realiza o aporte mensal ao final do mês
        saldo += aporteMensal;
    }

    return saldo;
}

function executarSimuladorInvestimentos() {
    const saida = document.getElementById("resultado-investimentos");

    const valorInicial = lerNumero("Informe o valor inicial do investimento (R$):");
    if (valorInicial === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    const aporteMensal = lerNumero("Informe o valor do aporte mensal (R$):");
    if (aporteMensal === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    const taxaMensal = lerNumero("Informe a taxa de rendimento mensal (%):");
    if (taxaMensal === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    const meses = lerNumero("Informe o período do investimento (em meses):");
    if (meses === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    if (isNaN(valorInicial) || valorInicial < 0) {
        saida.textContent = "Erro: o valor inicial deve ser um número igual ou maior que zero.";
        return;
    }

    if (isNaN(aporteMensal) || aporteMensal < 0) {
        saida.textContent = "Erro: o aporte mensal deve ser um número igual ou maior que zero.";
        return;
    }

    if (valorInicial === 0 && aporteMensal === 0) {
        saida.textContent = "Erro: informe um valor inicial ou um aporte mensal maior que zero.";
        return;
    }

    if (isNaN(taxaMensal) || taxaMensal < 0) {
        saida.textContent = "Erro: a taxa de rendimento mensal deve ser igual ou maior que zero.";
        return;
    }

    if (isNaN(meses) || meses <= 0 || meses % 1 !== 0) {
        saida.textContent = "Erro: o período deve ser um número inteiro de meses maior que zero.";
        return;
    }

    const saldoFinal = simularInvestimento(valorInicial, aporteMensal, taxaMensal, meses);
    const totalInvestido = valorInicial + (aporteMensal * meses);
    const rendimentoObtido = saldoFinal - totalInvestido;

    const resumo =
        "Período: " + meses + " mês(es)\n" +
        "Total investido: " + formatarMoeda(totalInvestido) + "\n" +
        "Rendimento obtido: " + formatarMoeda(rendimentoObtido) + "\n" +
        "Saldo final: " + formatarMoeda(saldoFinal);

    saida.textContent = resumo;
    console.log("--- Simulador de Investimentos ---\n" + resumo);
}

function calcularValorPorPessoa(totalDespesas, quantidadePessoas) {
    return totalDespesas / quantidadePessoas;
}

function executarDivisorDespesas() {
    const saida = document.getElementById("resultado-despesas");

    let totalDespesas = 0;
    let quantidadeDespesas = 0;
    let valorDespesa;
    let cancelado = false;

    do {
        valorDespesa = lerNumero(
            "Informe o valor da despesa #" + (quantidadeDespesas + 1) + " (R$).\n" +
            "Digite 0 para encerrar:"
        );

        if (valorDespesa === null) {
            cancelado = true;
            break;
        }

        if (isNaN(valorDespesa) || valorDespesa < 0) {
            alert("Valor inválido! Digite um número maior que zero, ou 0 para encerrar.");
        } else if (valorDespesa > 0) {
            totalDespesas += valorDespesa;
            quantidadeDespesas++;
        }
    } while (valorDespesa !== 0);

    if (cancelado) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    if (quantidadeDespesas === 0) {
        saida.textContent = "Nenhuma despesa foi registrada para divisão.";
        return;
    }

    const quantidadePessoas = lerNumero(
        "Total acumulado: " + formatarMoeda(totalDespesas) + "\n" +
        "Informe a quantidade de pessoas na divisão:"
    );

    if (quantidadePessoas === null) {
        saida.textContent = "Operação cancelada pelo usuário.";
        return;
    }

    if (isNaN(quantidadePessoas) || quantidadePessoas <= 0 || quantidadePessoas % 1 !== 0) {
        saida.textContent = "Erro: informe uma quantidade válida de pessoas (número inteiro maior que zero).";
        return;
    }

    const valorPorPessoa = calcularValorPorPessoa(totalDespesas, quantidadePessoas);

    const resumo =
        "Despesas informadas: " + quantidadeDespesas + "\n" +
        "Total acumulado: " + formatarMoeda(totalDespesas) + "\n" +
        "Quantidade de pessoas: " + quantidadePessoas + "\n" +
        "Valor por pessoa: " + formatarMoeda(valorPorPessoa);

    saida.textContent = resumo;
    console.log("--- Divisor de Despesas ---\n" + resumo);
}