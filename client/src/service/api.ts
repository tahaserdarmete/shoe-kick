import axios from "axios";
import {authService} from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, //çerezleri backend'e göndermek için
});

// axios interceptor
// api'a atılan her istekte veya api'dan gelen her cevapta fonksiyon çalıştırmaya yarar
api.interceptors.response.use(
  // res olumlu cevap geldiğinde çalışır
  (res) => res,

  // err olumsuz cevap geldiğinde çalışır
  async (err) => {
    // hata aldığımız isteğin bilgilerini al
    const originalRequest = err.config;

    // hata access tokenin süresi dolmasından kaynaklanıyorsa
    if (
      err.response.status === 401 &&
      err.response.data.message === "Access token expired"
    ) {
      try {
        // access tokenini yenile
        await authService.refresh();

        // ilk adımda hata aldığımız isteği tekrar at
        return api.request(originalRequest);
      } catch (error) {
        // refresh token süresi dolmuşsa çıkış yap
        authService.logout();

        // login sayfasına yönlendir
        window.location.href = "/login";
      }
    }

    // hatayı fırlat
    return Promise.reject(err.response);
  },
);

export default api;
