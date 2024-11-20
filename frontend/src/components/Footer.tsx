const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex items-center p-8 justify-center">
      <p className="text-white">
        Copyright © <span className="font-semibold">{year}</span>{" "}
      </p>
    </footer>
  );
};

export default Footer;
