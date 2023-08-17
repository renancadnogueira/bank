export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, ""); // está buscando os pontos e hífen do CPF e substituindo por nada
    if (validaNumeroRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse CPF não é válido');
    } 
}

function validaNumeroRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    return numerosRepetidos.includes(cpf); 
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10; // décimo digito do CPF

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--; // 311 soma de todos os valores 
    }

    soma = (soma * 10) % 11; // 3110 % 11 = 8

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf [9]; // comparação com a posição 9 
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--; // 311 soma de todos os valores 
    }

    soma = (soma * 10) % 11; // 3110 % 11 = 8

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf [10];
}