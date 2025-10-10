const tabs = document.querySelectorAll(".tab");
const formSlider = document.querySelector(".form-slider");
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

// alternar abas com animação
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (tab.dataset.tab === "cadastro") {
      formSlider.style.transform = "translateX(-50%)";
    } else {
      formSlider.style.transform = "translateX(0)";
    }
  });
});

// máscaras de CPF e telefone
function maskCPF(value) {
  return value.replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function maskPhone(value) {
  return value.replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .slice(0, 15);
}

document.getElementById("cpf")?.addEventListener("input", e => e.target.value = maskCPF(e.target.value));
document.getElementById("telefone")?.addEventListener("input", e => e.target.value = maskPhone(e.target.value));

// cadastro
formCadastro.addEventListener("submit", e => {
  e.preventDefault();
  const nome = nome.value.trim();
  const email = email.value.trim();
  const senha = senha.value.trim();
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !email || !senha || !cpf || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  localStorage.setItem("usuarioGW", JSON.stringify({ nome, email, senha, cpf, telefone }));
  alert(`Conta criada com sucesso! Bem-vindo(a), ${nome}`);
  window.location.href = "servicos.html";
});

// login
formLogin.addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();
  const user = JSON.parse(localStorage.getItem("usuarioGW"));

  if (user && user.email === email && user.senha === senha) {
    alert(`Bem-vindo(a) de volta, ${user.nome}!`);
    window.location.href = "servicos.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
});
