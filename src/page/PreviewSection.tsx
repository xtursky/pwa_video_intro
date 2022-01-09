import React from 'react';

const GET_URL = '';

const PreviewSection = () => {

  return (
    <div className="App">

      <p>
        <div>Preview Video</div>
        <video id={"video_preview"} height={400} controls={true}>
          <source
            src={GET_URL}
            type={"video/mp4"}/>
        </video>
      </p>

      <p>
        <a
          download={true}
          href={GET_URL}>
          Download Video
        </a>
      </p>
    </div>
  );
}

export default PreviewSection;
