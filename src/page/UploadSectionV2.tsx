import React, {useEffect, useRef} from 'react';
import {ReactMediaRecorder} from 'react-media-recorder';

const VideoPreview = ({stream}: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef}
                height={520}
                width={480}
                muted
                autoPlay
                playsInline/>;
};

// https://github.com/0x006F/react-media-recorder
const UploadSectionV2 = () => {
  return (
    <div>
      <p>
        <div>Option3: React-media-recorder library utilizing MediaRecorder API providing react component</div>
        <ReactMediaRecorder
          video={{
            width: { ideal: 1280 },
            height: { ideal: 720 },
            // frameRate: {min: 15, ideal: 24, max: 30},
            facingMode: { exact: "environment" }
          }}
          audio
          // mediaRecorderOptions={{mimeType: "video/mp4"}}
          render={({
                     status,
                     startRecording,
                     stopRecording,
                     pauseRecording,
                     resumeRecording,
                     mediaBlobUrl,
                     previewStream
                   }) => (
            <div>
              <div>Status {status} </div>
              <div>
                <button onClick={startRecording}>Start Recording</button>
                &nbsp;
                <button onClick={pauseRecording}>Pause Recording</button>
                &nbsp;
                <button onClick={resumeRecording}>Resume Recording</button>
                &nbsp;
                <button onClick={stopRecording}>Stop Recording</button>
              </div>

              {status === "recording" ? (
                <>
                  <div>Preview</div>
                  <VideoPreview stream={previewStream}/>
                </>
              ) : null}

              {mediaBlobUrl ? (
                <>
                  <div>Recorded</div>
                  <video src={mediaBlobUrl}
                         width={480}
                         height={520}
                         controls autoPlay/>

                  <div>Download</div>
                  <a download={new Date().toISOString() + ".mp4"} href={mediaBlobUrl} type="button">Download video</a>
                </>
              ) : null}
            </div>
          )}
        />
      </p>

    </div>
  );
}

export default UploadSectionV2;
