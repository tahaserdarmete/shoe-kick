import type {FC, ReactNode} from "react";
import {useProfile} from "../../service/auth";
import Loader from "../loader";
import {Navigate} from "react-router-dom";

interface Props {
  children: ReactNode;
  allowedRoles?: ("admin" | "user")[];
}

const Protected: FC<Props> = ({children, allowedRoles}) => {
  //   oturumu açık kullanıcının profil bilglerini al
  const {user, isLoading} = useProfile();

  //   kullanıcı yüklenene kadar loader göster
  if (isLoading) return <Loader />;

  //   oturumu açık değilse login sayfasına yönlendir (replace ile geçmişi silerek login sayfasına yönlendirecek)
  if (!user) return <Navigate to="/login" replace />;

  //   eğer rolü yetersiz ise anasayfaya yönlendir
  if (allowedRoles && !allowedRoles?.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  //   yetkisi olan kullanıcı sayfa içeriğini görebilir
  return children;
};

export default Protected;
