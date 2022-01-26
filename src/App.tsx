import React from "react";
import "./App.css";
import "react-html5-camera-photo/build/css/index.css";
import Separator from "./page/components/Separator";
import DeviceInfo from "./page/components/DeviceInfo";
import UploadSectionV3 from "./page/UploadSectionV3";

function App() {
  if (!navigator.mediaDevices) {
    const msg = `MediaDevices getUserMedia are not supported`;
    console.error(msg);
    return <div>{msg}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App">
          <DeviceInfo />
          <Separator />
          {/*<UploadSectionV1/>*/}
          {/* <UploadSectionV2 /> */}
          <UploadSectionV3 />
        </div>
        {/*<Separator/>*/}
        {/*<PreviewSection/>*/}
      </header>
    </div>
  );
}

export default App;
