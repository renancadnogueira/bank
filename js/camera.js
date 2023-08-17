const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");

let imagemURL = "";

botaoIniciarCamera.addEventListener("click", async function () {
    const iniciarVideo = await navigator.mediaDevices // pede pro navegador iniciar a camera 
    .getUserMedia({video: true, audio: false}) // solicitando apenas o vídeo 

    botaoIniciarCamera.style.display = "none"; // para o botão desaparecer 
    campoCamera.style.display = "block";

    video.srcObject = iniciarVideo; // a tag de vídeo recebeu o navigator. 
})

botaoTirarFoto.addEventListener("click", function() {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height) // criou um canvas em 2d

    imagemURL = canvas.toDataURL("image/jpeg"); //Transforma a imagem que foi gerada no canvas em jpeg que possibilita a gente salvar essa imagem posteriormente.

    campoCamera.style.display = "none"; // retirar o campo de camera
    mensagem.style.display = "block";
})

botaoEnviarFoto.addEventListener("click", () => {
    const receberDadosExistentes = localStorage.getItem("cadastro"); //retornamos objeto com as chaves cadastro 
    const converteRetorno = JSON.parse(receberDadosExistentes); // converte do JSON para verificamos em JSON em objeto JS

    converteRetorno.imagem = imagemURL; // criamos o atributo que recebeu a URL da imagem que foi tirada

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    window.location.href = "./abrir-conta-form-3.html";
})