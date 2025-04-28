
import ReactPlayer from 'react-player';

const VideoPlayer = ({url,playref,sub , time}) => {
  return (
   
      <div className="w-full  m-1  ">
        <ReactPlayer
        ref={playref}
          url={url} // Replace with your video URL
          controls={true}
          width="100%"
         height="400px"
         subtitle={sub}
         config={{
          file: {
            attributes: {
              start:time  // Start at 30 seconds
            }
          }
        }}
        
        />
      </div>
  
  );
};

export default VideoPlayer;