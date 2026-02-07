import type {FC} from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center bg-white text-dark-grey. p-3 rounded-[16px] md:rounded-[24px] xl:rounded-[32px] font-semibold">
      <p>Tüm Hakları Saklıdır &copy; {new Date().getFullYear()} * KICK SHOES</p>
    </footer>
  );
};

export default Footer;
