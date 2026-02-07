import * as yup from "yup";

const nameRegex = /^[a-zA-ZçğıöşüÇĞİÖŞÜ\s]+$/;

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;

export const REGISTER_SCHEMA = yup.object().shape({
  firstName: yup
    .string()
    .required("Adınızı giriniz")
    .matches(nameRegex, "Adınız sadece harf içerebilir"),

  lastName: yup
    .string()
    .matches(nameRegex, "Soyadınız sadece harf içerebilir")
    .required("Soyadınız giriniz"),

  email: yup
    .string()
    .email("Geçersiz e-posta adresi")
    .required("E-posta adresinizi giriniz"),

  password: yup
    .string()
    .required("Şifrenizi giriniz")
    .min(6, "Şifreniz en az 6 karakterden az olamaz")
    .matches(passwordRegex, "Şifreniz yeterince güçlü değil"),

  confirmPassword: yup
    .string()
    .required("Şifrenizi tekrar giriniz")
    .oneOf([yup.ref("password")], "Şifre tekrarının doğru girmediniz"),
  // oneOf([]) dizi içerisinde verilen değerler girilmedikçe hata fırlatır
  // ref() formddaki bir alanın değerine erişmeye yarar
  // password alanına girilen değer ile confirmPassword alanına girilen değerlerin aynı olup olmadığını kontrol edip olmama durumunda hata fırlattık

  terms: yup
    .boolean()
    .oneOf([true], "Sözleşmeyi onaylamadan devam edemezsiniz"),
});

export const LOGIN_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir e-posta adresi giriniz")
    .required("E-posta adresinizi giriniz"),

  password: yup.string().required("Şifrenizi giriniz"),
});
