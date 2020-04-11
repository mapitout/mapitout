import React from 'react';

const ImageSlider = ({data, activeIndex, group}) =>{
  const [imgs, setImgs] = React.useState([]);
  const [currentImage, setCurrentImage] = React.useState({});

  React.useEffect(() => {
    const imagesOfGroup = data[group];
    if(imagesOfGroup){
      setImgs(imagesOfGroup)
      if(activeIndex.length>0) {
        const imageFiltered = imagesOfGroup.filter(d=>d._id==activeIndex)[0];
        setCurrentImage(imageFiltered)
      }
    }
  }, [data, group])

  return (
    <div className='image-slider'>
      {imgs.length>0&&<div>
        <div className='img-big-image'>
          {currentImage.src && <img className='img' src={currentImage.src} />}
        </div>
        <div className='img-container'>
          {imgs.map(i=>(<div key={i.src} onClick={()=>setCurrentImage(i)} className={`img-frame ${i._id===currentImage._id}`}>
            <img className='img' src={i.src} />
          </div>))}
        </div>  
      </div>}
    </div>)
}

export default ImageSlider;
