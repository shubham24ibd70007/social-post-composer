import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Composer from "./components/Composer";
import Preview from "./components/Preview";
import Validation from "./components/Validation";
import Background from "./components/Background";
import MouseGlow from "./components/MouseGlow";

import "./styles/dashboard.css";

function App() {
  const [platform, setPlatform] = useState("Instagram");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  return (
    <>
      {/* Animated Background */}
      <Background />

      {/* Mouse Glow */}
      <MouseGlow />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Dashboard */}
      <div className="dashboard">

        {/* Sidebar */}
        <Sidebar />

        {/* Composer */}
        <Composer
          platform={platform}
          setPlatform={setPlatform}
          text={text}
          setText={setText}
          image={image}
          setImage={setImage}
        />

        {/* Right Side */}
        <div className="right-panel">
          <Preview
            platform={platform}
            text={text}
            image={image}
          />

          <Validation
            platform={platform}
            text={text}
            image={image}
          />
        </div>

      </div>
    </>
  );
}

export default App;