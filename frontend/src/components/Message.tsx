type MessageProps = {
  error?: string;
  success?: string;
};

const Message: React.FC<MessageProps> = ({ error, success }) => {
  return (
    <>
      {error && <p className="text-red-500 w-full">{error}</p>}
      {success && <p className="text-green-400 w-full">{success}</p>}
    </>
  );
};

export default Message;
