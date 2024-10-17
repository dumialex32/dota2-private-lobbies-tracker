import Button from "../../Button";
import LobbyLogo from "../LobbyLogo";
import { useNavigate } from "react-router-dom";
import LobbyTabs from "./LobbyTabs";
import Loader from "../../Loader";
import Message from "../../Message";
import useUploadReplay from "../../../hooks/useUploadReplay";
import { IoMdCloseCircle } from "react-icons/io";

const LobbyScreen: React.FC = () => {
  const navigate = useNavigate();
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
    <div className="bg-lobby-main-gradient h-screen">
      <nav className="flex items-center justify-center">
        <LobbyLogo />
      </nav>

      <nav className="bg-nav-gradient grid grid-cols-[8rem_1fr] p-6 items-center border-y-2">
        <div className="flex flex-col items-center gap-4">
          <Button onClick={() => navigate("/")}>Homepage</Button>

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
                      <IoMdCloseCircle
                        color="red"
                        onClick={handleRemoveFileInput}
                      />
                    </button>
                    <p>{selectedFile.name}</p>
                  </div>
                )}

                {notification && (
                  <Message
                    error={
                      notification.type === "error"
                        ? notification.message
                        : undefined
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
        </div>

        <div className="container mx-auto">
          <LobbyTabs />
        </div>
      </nav>
    </div>
  );
};

export default LobbyScreen;
