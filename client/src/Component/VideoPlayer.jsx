
import ReactPlayer from 'react-player';

const VideoPlayer = ({url,playref,sub}) => {
  return (
   
      <div className="w-full  m-1  ">
        <ReactPlayer
        ref={playref}
          url={url} // Replace with your video URL
          controls={true}
          width="100%"
         height="400px"
         subtitle={sub}
        
        />
      </div>
  
  );
};

export default VideoPlayer;