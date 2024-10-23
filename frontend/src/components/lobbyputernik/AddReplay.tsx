import { IoMdCloseCircle } from "react-icons/io";
import useUploadReplay from "../../hooks/useUploadReplay";
import Button from "../Button";
import Loader from "../Loader";
import Message from "../Message";

const AddReplay: React.FC = () => {
  const {
    uploadFileRef,
    selectedFile,
    isLoading,
    notification,
    handleUploadFileClick,
    handleAddReplay,
    handleRemoveFileInput,
    handleFileInputChange,
  } = useUploadReplay();

  return (
    <div>
      <input
        type="file"
        accept=".dem"
        id="replay"
        ref={uploadFileRef}
        onChange={handleFileInputChange}
        hidden
      />
      <div className="flex flex-col gap-2 relative">
        {!selectedFile ? (
          <Button onClick={handleUploadFileClick}>Add replay</Button>
        ) : isLoading ? (
          <Loader height="42" width="42" />
        ) : (
          <Button onClick={handleAddReplay}>Send Replay</Button>
        )}

        <div className="absolute -bottom-3 left-0 text-sm transform translate-y-1/2 whitespace-nowrap w-full text-center">
          {selectedFile && !isLoading && !notification?.message && (
            <div className="flex gap-1 items-center">
              <button>
                <IoMdCloseCircle color="red" onClick={handleRemoveFileInput} />
              </button>
              <p>{selectedFile.name}</p>
            </div>
          )}

          {notification && (
            <Message
              error={
                notification.type === "error" ? notification.message : undefined
              }
              success={
                notification.type === "success"
                  ? notification.message
                  : undefined
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddReplay;
