// Оголоси поза будь-якими функціями об’єкт formData з
// полями email та message, які спочатку мають порожні
// рядки як значення: { email: "", message: "" }.

const formData = {
  email: '',
  message: '',
};

// Використовуй метод делегування для відстеження змін
// у формі через подію input. Зберігай актуальні дані з
// полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ
// "feedback-form-state" для зберігання даних у сховищі.

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

// При завантаженні сторінки перевір,
// чи є дані у локальному сховищі. Якщо так,
//  використовуй їх для заповнення форми та об'єкта formData.
// Якщо ні, залиш поля форми порожніми.

const getData = localStorage.getItem(STORAGE_KEY);

if (getData) {
  const parseData = JSON.parse(getData);

  if (parseData.email) {
    form.elements.email.value = parseData.email;
    formData.email = parseData.email;
  }

  if (parseData.message) {
    form.elements.message.value = parseData.message;
    formData.message = parseData.message;
  }
}
// ВІДСЛІДКОВУЄМО ЗМІНИ (делегування)

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name in formData) {
    formData[name] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

// ОБРОБКА ВІДПРАВЛЕННЯ

form.addEventListener('submit', event => {
  event.preventDefault();

  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }

  console.log('Form data:', formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
});
