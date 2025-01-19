import React, { useEffect } from 'react'
import dubai from '../Dubai/dubai.mov';
import Carousel from 'react-multi-carousel';
import jahaj from '../Dubai/dubaiJahaj.jpeg';
import camel from '../Dubai/dubaiCamel.jpeg';
import museum from '../Dubai/dubaiMuseum.jpg';
import hotel from '../Dubai/dubaiHotel.jpg';
import BurjKhalifa from './Landmarks/LandMarks';
import burj from '../Dubai/Landmarks/burjKhalifavideo.mp4'
import khalifa1 from '../Dubai/Landmarks/burjKhalifa1.jpg'
import khalifa2 from '../Dubai/Landmarks/burjKhalifa2.jpg'
import LandMarks from './Landmarks/LandMarks';

const Dubai=()=>{
    useEffect(() => {
      window.scrollTo(0,0);
    }, []);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      }

    return(
        <div className='w-full overflow-hidden'>
            {/* <Carousel
                    className='md:mx-24 md:my-10 md:h-[550px] mx-10 mt-4'
                    swipeable={false}
                    draggable={false}
                    showDots={false}
                    responsive={responsive}
                    ssr={true} // means to render carousel on server-side.
                    infinite
                    autoPlay={false}
                    autoPlaySpeed={1000}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    arrows={true}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
            >
              <video src={dubai} autoPlay infinite className='rounded-md'/> */}
              <img src={jahaj} className='rounded-md md:mx-56 md:my-10 md:h-[550px] mx-10 mt-4'/>
              {/* <img src={camel} className='rounded-md'/>
              <img src={museum} className='rounded-md' />
              <img src={hotel} className='rounded-md' />
            </Carousel> */}
            <ul className='flex flex-row justify-around space-x-4'>
              <li className='border-[1px] border-white text-white cursor-pointer py-2 px-4 rounded-md'>Landmarks</li>
              <li className='border-[1px] border-gray-200 text-gray-200 cursor-pointer py-2 px-4 rounded-md '>Theme Parks</li>
              <li className='border-[1px] border-gray-200 text-gray-200 cursor-pointer py-2 px-4 rounded-md'>Adventures</li>
              <li className='border-[1px] border-gray-200 text-gray-200 cursor-pointer py-2 px-4 rounded-md'>Water Parks</li>
            </ul>
            {/* landmarks */}
            {/* <h1 className='text-start my-4 mx-10 text-xl font-semibold text-headingcolor'>Landmarks in Dubai : </h1> */}
            <LandMarks/>
        </div>
    )
}

export default Dubai;