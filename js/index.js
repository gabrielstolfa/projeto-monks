let currentNumbers = {};

function generaterandomNumbers() { 
  const randomOne = Math.floor(Math.random() * 1000);
  const randomTwo = Math.floor(Math.random() * 1000);

  const pOne = document.getElementById('numberOne');
  const pTwo = document.getElementById('numberTwo');

  if (pOne) pOne.textContent = randomOne;
  if (pTwo) pTwo.textContent = randomTwo;

  currentNumbers = { n1: randomOne, n2: randomTwo };
}

window.addEventListener('DOMContentLoaded', () => {
  generaterandomNumbers();

  // validação
  const validateBtn = document.getElementById('resultBtn');
  if (validateBtn) validateBtn.addEventListener('click', validateSum);

  // menu
  const menuOverlay = document.getElementById('menuOverlay');
  const btnMenus = document.querySelectorAll('.menu-btn'); // 
  const menuLinks = document.querySelectorAll('.menu-list a');
  const backToMenu = document.getElementById('backToMenu');

  if (!menuOverlay) return;

  function setExpanded(isOpen) {
    btnMenus.forEach(btn => btn.setAttribute('aria-expanded', String(isOpen)));
  }

  function openMenu() {
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    setExpanded(true);
  }

  function closeMenu() {
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    setExpanded(false);
  }

  function toggleMenu() {
    const isOpen = menuOverlay.classList.contains('active');
    if (isOpen) closeMenu();
    else openMenu();
  }

  btnMenus.forEach(btn => btn.addEventListener('click', toggleMenu));
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
  if (backToMenu) backToMenu.addEventListener('click', closeMenu);

  //Esc para sair do menu
  document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (menuOverlay.classList.contains('active')) closeMenu();
});

  // prevenir reload do form
  const form = document.querySelector('.form');
  if (form) form.addEventListener('submit', (e) => e.preventDefault());
});


function validateSum() {
  if (currentNumbers.n1 === undefined || currentNumbers.n2 === undefined) return;

  const { n1, n2 } = currentNumbers;
  const sum = n1 + n2;

  const resultInput = document.getElementById('result');
  const resultText = document.getElementById('resultText');
  const validateBtn = document.getElementById('resultBtn');

  if (!resultInput || !resultText || !validateBtn) return;

  const userValue = Number(resultInput.value);

  resultText.classList.remove('text-success', 'text-error');
  resultInput.classList.remove('error', 'validate');

  if (userValue === sum) {
    resultText.textContent = 'Validação Concluida!';
    resultText.classList.add('text-success');

    resultInput.classList.add('validate');
    validateBtn.disabled = true;
    validateBtn.textContent = "Validado";
  } else {
    resultText.textContent = 'Validação negada!';
    resultText.classList.add('text-error');
    resultInput.classList.add('error');
  }
}
