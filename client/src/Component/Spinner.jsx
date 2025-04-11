
import ClipLoader from 'react-spinners/ClipLoader';
const ovveride = {
    display:'block',
    margin: '100px auto'
}
const Spinner = ({loading,size=70}) => {
  const ride = size < 70 ? {display:"block" , margin:"2px auto"}: ovveride;
  return (
    <ClipLoader 
    color='#FFFFF'
    loading={loading}
    cssOverride={ride}
    size={size}
    />
  )
}

export default Spinner