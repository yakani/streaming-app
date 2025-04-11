
import ReactPlayer from 'react-player';

const VideoPlayer = ({url,playref}) => {
  return (
   
      <div className="w-full max-w-4xl m-1  ">
        <ReactPlayer
        ref={playref}
          url={url} // Replace with your video URL
          controls={true}
          width="100%"
         height="400px"
        
        />
      </div>
  
  );
};

export default VideoPlayer;