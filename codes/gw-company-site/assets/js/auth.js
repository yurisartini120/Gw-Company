// ====== Alternar abas Login / Cadastro ======
const tabs = document.querySelectorAll(".tab");
const forms = document.querySelectorAll(".auth-form");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    forms.forEach((f) => f.classList.remove("active"));

    tab.classList.add("active");
    const target = tab.dataset.tab;
    document.getElementById("form" + target.charAt(0).toUpperCase() + target.slice(1)).classList.add("active");
  });
});

// ====== Entrar com CPF ======
const loginCpfLink = document.getElementById("loginCpfLink");
const voltarLogin = document.getElementById("voltarLogin");
const formLogin = document.getElementById("formLogin");
const formCpf = document.getElementById("formCpf");

if (loginCpfLink) {
  loginCpfLink.addEventListener("click", (e) => {
    e.preventDefault();
    formLogin.classList.remove("active");
    formCpf.classList.remove("hidden");
    formCpf.classList.add("active");
  });
}

if (voltarLogin) {
  voltarLogin.addEventListener("click", (e) => {
    e.preventDefault();
    formCpf.classList.remove("active");
    formLogin.classList.add("active");
  });
}

// ====== Máscaras simples (CPF e telefone) ======
function maskCPF(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2")
    .slice(0, 15);
}

document.getElementById("cpf")?.addEventListener("input", (e) => {
  e.target.value = maskCPF(e.target.value);
});
document.getElementById("telefone")?.addEventListener("input", (e) => {
  e.target.value = maskPhone(e.target.value);
});
document.getElementById("cpfLogin")?.addEventListener("input", (e) => {
  e.target.value = maskCPF(e.target.value);
});

// ====== Simulação de login/cadastro ======
document.getElementById("formCadastro")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (!nome || !email || !senha) return alert("Preencha todos os campos!");
  alert(`Conta criada com sucesso! Bem-vindo(a), ${nome}.`);
  localStorage.setItem("usuarioGW", JSON.stringify({ nome, email }));
  window.location.href = "servicos.html";
});

document.getElementById("formLogin")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const user = JSON.parse(localStorage.getItem("usuarioGW"));
  if (user && user.email === email) {
    alert("Login efetuado com sucesso!");
    window.location.href = "servicos.html";
  } else {
    alert("Usuário não encontrado. Crie uma conta primeiro.");
  }
});

document.getElementById("formCpf")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const cpf = document.getElementById("cpfLogin").value;
  if (cpf.length < 14) return alert("CPF inválido!");
  alert("Login via CPF realizado com sucesso!");
  window.location.href = "servicos.html";
});
