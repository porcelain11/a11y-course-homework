import * as yup from 'yup';

export const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Пожалуйста ведите корректный e-mail, пример: ivan.ivanov@mail.ru')
    .required('Пожалуйста укажите e-mail'),
  consent: yup.bool().oneOf([true], 'Необходимо согласие на обработку персональных данных')
});

const firstAndLastNameRules = /[а-яa-z]+\s+[а-яa-z]+/gi;
const adressRules1 = /\d{6}/gi;
const adressRules2 = /[а-яa-z ]/gi;

export const orderSchema = yup.object().shape({
  fullname: yup
    .string()
    .min(3, { message: 'Имя и фамилия должны содержать хотя бы по одному символу' })
    .matches(firstAndLastNameRules, { message: 'Пожалуйста ведите имя и фамилию' })
    .required('Пожалуйста ведите имя и фамилию'),
  email: yup
    .string()
    .email('Пожалуйста ведите корректный e-mail, пример: ivan.ivanov@mail.ru')
    .required('Пожалуйста укажите e-mail'),
  adress: yup
    .string()
    .matches(adressRules1, {
      message: 'Пожалуйста, укажите индекс'
    })
    .matches(adressRules2, {
      message: 'Адрес может содержать только цифры, буквы, запятые и пробелы'
    })
    .required('Пожалуйста укажите адрес'),
  pay: yup.string().oneOf(['card', 'cash']).required('Пожалуйста выберите способ оплаты')
});
