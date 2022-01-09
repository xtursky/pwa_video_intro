import React from 'react';
import 'react-html5-camera-photo/build/css/index.css';
import Separator from "./components/Separator";

const UploadSectionV1 = () => {

  async function onTakeVideo() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        aspectRatio: 1.333,
        frameRate: 30,
        width: 1280,
        height: 720,
        facingMode: "environment",
      }
    })

    const video = document.querySelector("video");
    if (video) {
      console.log(video)
      video.srcObject = stream;
      video.play();
    }
  }

  return (
    <div>
      <p>
        <div>Option1: Video via Native MediaStream API</div>
        <div>
          <input type="button" value={"Preview camera stream"} onClick={() => onTakeVideo()}/>
        </div>
        <video id="video_record" width={600} controls/>
      </p>

      <Separator/>

      <p>
        <div>Option2: Utilize native phone camera for Upload/Record</div>
        Picture <input type="file" accept="image/x-png,image/jpeg,image/gif"/> <br/>
        Video <input type="file" accept="video/mp4,video/x-m4v,video/*"/>
      </p>

    </div>
  );
}

export default UploadSectionV1;
