import { Outlet, useNavigate } from "react-router-dom";
import LobbyLogo from "../LobbyLogo";
import LobbyTabs from "./LobbyTabs";
import { useRef, useState } from "react";
import axios from "axios";
import { UPLOAD_URL } from "../../../../constants";

const LobbyScreen: React.FC = () => {
  const navigate = useNavigate();
  const uploadFileRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  console.log(uploadFileRef.current);

  const handleFileClick = () => {
    if (uploadFileRef.current) {
      uploadFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  const handleSendReplay = async () => {
    const file = uploadFileRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("replay", file);
    try {
      const res = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-lobby-main-gradient">
      <nav className="bg-nav-gradient flex items-center justify-center px-5 border-b border-white relative h-52">
        <div className="absolute">
          <LobbyLogo />
        </div>
        <div className="flex items-center w-full">
          <div></div>

          <div className="flex gap-3 items-center ml-auto"></div>
        </div>
      </nav>

      <nav className="grid grid-cols-[10rem_1fr] gap-4 p-4">
        <div className="flex flex-col gap-4">
          <button className="btn" onClick={() => navigate("/")}>
            Homepage
          </button>

          <div className="flex flex-col gap-2 relative">
            {!selectedFileName ? (
              <button className="btn" onClick={handleFileClick}>
                Add replay
              </button>
            ) : (
              <button className="btn-success" onClick={handleSendReplay}>
                Send replay
              </button>
            )}
            <input
              type="file"
              ref={uploadFileRef}
              onChange={handleFileChange}
              id="replay"
              hidden
            />

            <p className="absolute -bottom-6 left-0 text-white self-center w-full text-center">
              {selectedFileName && selectedFileName}
            </p>
          </div>
        </div>
        <LobbyTabs />
      </nav>

      <main className="h-svh p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default LobbyScreen;
