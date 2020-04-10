import React from 'react';

const ImageSlider = ({data}) =>{
  const [imgs, setImgs] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState({});

  React.useEffect(() => {
    setImgs(data)
  }, [])

  return (
    <div className='image-slider'>
      {imgs.length>0&&<div>
        <div className='img-container'>
          {imgs.map(i=>(<div key={i.src} onClick={()=>setCurrentImage(i)} className='img-frame'>
            <img className='img' src={i.src} />
          </div>))}
        </div>
        <div className='img-big-image'>
          {currentImage.src && <img className='img' src={currentImage.src} />}
        </div>  
      </div>}
    </div>)
}

export default ImageSlider;
