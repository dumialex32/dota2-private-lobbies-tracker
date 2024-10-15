type MessageProps = {
  error?: string;
  success?: string;
};

const Message: React.FC<MessageProps> = ({ error, success }) => {
  return (
    <>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-400 w-full">{success}</p>}
    </>
  );
};

export default Message;
