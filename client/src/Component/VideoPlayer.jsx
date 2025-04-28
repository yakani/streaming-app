import ReactPlayer from 'react-player';

const VideoPlayer = ({url,playref,sub , time}) => {

  playref.current.seekTo(time, 'seconds');
  return (
   
      <div className="w-full  m-1  ">
        <ReactPlayer
        ref={playref}
          url={url} // Replace with your video URL
          controls={true}
          width="100%"
         height="400px"
         config={{
  file: {
    tracks: [
      { kind: 'subtitles', src: sub, srcLang: 'en', default: true }
    ]
  }
}}
        
        />
      </div>
  
  );
};

export default VideoPlayer;