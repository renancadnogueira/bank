import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]"); //todos elementos que tiverem o atributo de required
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => { // submit = evento de envio 
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas)); // JSON.stringify para converter eles em JSON

    window.location.href = './abrir-conta-form-2.html';
})

camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

const tiposDeErro = [
    'valueMissing', // Campo de preenchimento vazio 
    'typeMismatch', // Exemplo do e-mail que está esperando um @ 
    'patternMismatch', // Se o CPF não seguir o padrão não será aceito
    'tooShort', // Muito pequeno (min-length)
    'customError' // Erros customizados 
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == "cpf" && campo.value.length >= 11) { // se o campo.name for IGUAL ao nome CPF e tiver a quantidade de valores maior ou igual a 11 chama a função ehUmCPF
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }
    tiposDeErro.forEach(erro => { // Para cada erro, ele vai olhar o campo.validity 
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro'); // parentNode faz com que pegue apenas o campo mais perto com a classe mensagem-erro
    const validadorDeInput = campo.checkValidity(); // checar se o campo está valido ou não

    if (!validadorDeInput) { // ! NÃO ou seja, if (se) ! = não, ou seja Se não
        mensagemErro.textContent = mensagem; // false = imprime a mensagem
    } else {
        mensagemErro.textContent = ""; // true = não imprime nada, pois os dados estão corretos
    }
}