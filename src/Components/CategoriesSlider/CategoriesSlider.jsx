import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import imdSlider1 from "../../Assets/img/grocery-banner-2.jpeg";
import imdSlider2 from '../../Assets/img/grocery-banner3.png';
import imdSlider3 from '../../Assets/img/slider-image-1.jpeg';
import imdSlider4 from '../../Assets/img/slider-image-2.jpeg';
import imdSlider5 from '../../Assets/img/slider-image-3.jpeg';

export default function CategoriesSlider() {

    const [categories, setCategories] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    async function getAllCategories() {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        setCategories(data.data);
    }

    useEffect(() => {
        getAllCategories()
    }, [])




    return (
        <div class="row g-0">
        <div className="col-md-8">
        <Slider {...settings}>
        <img src={imdSlider3} class="w-100" alt='imgSlider' height={500}/>
        <img src={imdSlider4} class="w-100" alt='imgSlider' height={500}/>
        <img src={imdSlider5} class="w-100" alt='imgSlider' height={500}/>
        </Slider>
        </div>
        <div className="col-md-4">
        <img src={imdSlider1} class="w-100" alt='imgSlider' height={250}/>
        <img src={imdSlider2} class="w-100" alt='imgSlider' height={250}/>
        </div>
        </div>
        )
}
