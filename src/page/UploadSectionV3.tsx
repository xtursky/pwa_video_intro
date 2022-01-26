// @ts-nocheck
import React, { useEffect, useMemo } from "react";
import useMediaRecorder from "@wmik/use-media-recorder";
import { formatSize } from "../service/utils";
import useKeyPress from "./components/useKeyPress";

// TODO blob naming for upload - https://stackoverflow.com/questions/6664967/how-to-give-a-blob-uploaded-as-formdata-a-file-name

function Player({ srcBlob }) {
  if (!srcBlob) {
    return null;
  }

  return (
    <>
      Size: {formatSize(srcBlob.size)}
      <div>
        <video
          src={URL.createObjectURL(srcBlob)}
          width={520}
          height={480}
          controls
          autoPlay
          playsInline
        />
      </div>
    </>
  );
}

function LiveStreamPreview({ stream }) {
  let videoPreviewRef = React.useRef();

  React.useEffect(() => {
    if (videoPreviewRef.current && stream) {
      videoPreviewRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return <div>No preview stream available</div>;
  }

  return (
    <video
      ref={videoPreviewRef}
      width={520}
      height={480}
      muted
      autoPlay
      playsInline
    />
  );
}

// https://github.com/wmik/use-media-recorder
function UploadSectionV3() {
  let {
    error,
    status,
    mediaBlob,
    liveStream,
    stopRecording,
    startRecording
  } = useMediaRecorder({
    recordScreen: false,
    blobOptions: { type: "video/mp4" },
    mediaStreamConstraints: {
      audio: true,
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        // frameRate: {min: 15, ideal: 24, max: 30},
        facingMode: { exact: "environment" }
      }
    }
  });

  const isRecording = status === "recording";

  useKeyPress("r", () => {
    console.log("r key was pressed");
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  });

  return (
    <div>
      <div>
        Option4: Use-media-recorder library utilizing MediaRecorder API
        providing react hook
      </div>

      <div>Recording: {error ? `${status} ${error.message}` : status}</div>
      <section>
        <button
          type="button"
          onClick={() => {
            startRecording();
          }}
          disabled={status === "recording"}
        >
          Start recording
        </button>
        <button
          type="button"
          onClick={() => {
            stopRecording();
          }}
          disabled={status !== "recording"}
        >
          Stop recording
        </button>
      </section>
      {isRecording ? <LiveStreamPreview stream={liveStream} /> : null}
      {!isRecording ? (
        <>
          <Player srcBlob={mediaBlob} />
        </>
      ) : null}
    </div>
  );
}

export default UploadSectionV3;
