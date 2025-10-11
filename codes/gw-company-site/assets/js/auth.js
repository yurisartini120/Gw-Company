// ======= TROCA ENTRE LOGIN E CADASTRO =======
const tabs = document.querySelectorAll(".tab");
const formLogin = document.getElementById("formLogin");
const formCadastro = document.getElementById("formCadastro");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    if (tab.dataset.tab === "cadastro") {
      formLogin.classList.remove("active");
      formCadastro.classList.add("active");
    } else {
      formCadastro.classList.remove("active");
      formLogin.classList.add("active");
    }
  });
});

// ======= MÁSCARAS =======
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

document.getElementById("cpf")?.addEventListener("input", e => {
  e.target.value = maskCPF(e.target.value);
});
document.getElementById("telefone")?.addEventListener("input", e => {
  e.target.value = maskPhone(e.target.value);
});

// ======= CADASTRO =======
formCadastro.addEventListener("submit", e => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();

  if (!nome || !email || !senha || !cpf || !telefone) {
    return alert("Por favor, preencha todos os campos!");
  }

  const novoUsuario = { nome, email, senha, cpf, telefone };
  localStorage.setItem("usuarioGW", JSON.stringify(novoUsuario));
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

  alert(`Conta criada com sucesso! Bem-vindo(a), ${nome}`);
  window.location.href = "servicos.html";
});

// ======= LOGIN =======
formLogin.addEventListener("submit", e => {
  e.preventDefault();

  const loginIdentificador = document.getElementById("loginIdentificador").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  const user = JSON.parse(localStorage.getItem("usuarioGW"));

  if (!user) return alert("Nenhum usuário cadastrado ainda!");

  const loginValido =
    (user.email === loginIdentificador ||
     user.cpf === loginIdentificador ||
     user.nome === loginIdentificador) &&
    user.senha === senha;

  if (loginValido) {
    localStorage.setItem("usuarioLogado", JSON.stringify(user));
    alert(`Bem-vindo(a) de volta, ${user.nome}!`);
    window.location.href = "servicos.html";
  } else {
    alert("Usuário, e-mail, CPF ou senha incorretos!");
  }
});
