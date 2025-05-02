import ReactPlayer from 'react-player';

const VideoPlayer = ({url,playref,sub , time}) => {
if(time >0 && playref.current){
  playref.current.seekTo(time, 'seconds');
}
  
  return (
   
      <div className="w-full     ">
        <ReactPlayer
        ref={playref}
          url={url} // Replace with your video URL
          controls={true}
          width="100%"
         height="40%"
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