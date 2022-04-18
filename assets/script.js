let usuario;


login();

function Conectar() {
    const promise =   axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
    promise.catch(erro)
}

function login() {
    usuario = {
        name: prompt('Qual seu nome?')
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", usuario);

    promise
        .then(() => {
            setInterval(Conectar, 5000);
            pegarMensagens();
            setInterval(pegarMensagens, 3000)
        })

        .catch(() => {
            alert('Esse nome já exite');
            login()
        })   
        document.addEventListener("keyup", enviarComEnter);                                                                                      
};
function erro()
{
alert('Ocorreu um erro!');
    window.location.reload();
}
function enviarComEnter(event)
{
    if(event.key === "Enter"){
        enviar()
    }
}
function enviar()
{
    let input = document.querySelector("#name");
    let textodigitado = input.value;
    
        const texto = {
            from: usuario.name,
            to: "Todos",
            text: textodigitado,
            type:  "message"}
        
       
        const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", texto)
        promise.then(pegarMensagens);
}

function pegarMensagens() {
    const Promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    Promise.then(renderizarMensagens)
}

function renderizarMensagens(mensagens) {
    const main = document.querySelector('main');

    mensagens.data.forEach(mensagem => {       
        if (mensagem.type === 'status') {
            main.innerHTML += `
                <article class="status">
                    <time>${mensagem.time}</time>  <strong>${mensagem.from}</strong>  <span>${mensagem.text}</span>
                </article>
            `
        }else if (mensagem.type === 'message') {
            main.innerHTML += `
                <article class="mensagem">
                    <time>${mensagem.time}</time> <strong>${mensagem.from}</strong> <span>para</span> <strong>${mensagem.to}</strong>: <span>${mensagem.text}</span>
                </article>                              
            `
        } else if (                      
            mensagem.type === 'private_message' && (
                mensagem.from === usuario.from ||
                mensagem.from === usuario.to
            )
        ) {         
            main.innerHTML += `      
                <article class="mensagem-privada">
                    <time>${mensagem.time}</time> <strong>${mensagem.from}</strong> <span>reservadamente para</span> <strong>${message.to}</strong>: <span>${message.text}</span>
                </article>
            `
        }
    })

    main.lastElementChild.scrollIntoView();
       
}
