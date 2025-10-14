document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chatContainer");
  const btnChat = document.getElementById("chatSuporte");
  const btnFechar = document.getElementById("fecharChat");
  const input = document.getElementById("chatInput");
  const enviarBtn = document.getElementById("enviarMsg");
  const mensagens = document.getElementById("chatMensagens");

  // Abrir o chat
  btnChat.addEventListener("click", () => {
    chatContainer.style.display = "block";
  });

  // Fechar o chat
  btnFechar.addEventListener("click", () => {
    chatContainer.style.display = "none";
  });

  // Enviar mensagem no chat
  enviarBtn.addEventListener("click", enviarMensagem);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") enviarMensagem();
  });

  function enviarMensagem() {
    const texto = input.value.trim();
    if (!texto) return;

    const msgUser = document.createElement("div");
    msgUser.classList.add("msg-user");
    msgUser.textContent = texto;
    mensagens.appendChild(msgUser);
    input.value = "";

    // Simula resposta automática
    setTimeout(() => {
      const msgBot = document.createElement("div");
      msgBot.classList.add("msg-bot");
      msgBot.textContent = "Nossa equipe responderá em breve! 😊";
      mensagens.appendChild(msgBot);
      mensagens.scrollTop = mensagens.scrollHeight;
    }, 700);
  }

  // WhatsApp
  const wppBtn = document.getElementById("whatsappSuporte");
  wppBtn.addEventListener("click", () => {
    const numero = "5511999999999"; // <-- coloque aqui o número da empresa
    window.open(`https://wa.me/${numero}?text=Olá!%20Preciso%20de%20suporte%20na%20GW%20Company.`, "_blank");
  });

  // E-mail
  const emailBtn = document.getElementById("emailSuporte");
  emailBtn.addEventListener("click", () => {
    window.location.href = "mailto:suporte@gwcompany.com?subject=Suporte%20GW%20Company";
  });
});
