import React, { useEffect, useState } from 'react'
import {register} from 'swiper/element/bundle'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Sunrise } from 'react-feather';

function Home() {
    register();
    const [latestProducts, setLatestProducts] = useState([]);
    const navigate = useNavigate();
    const handleShop = (productId) => {
        navigate(`/product/${productId}`)
    };

    const handleCategory = (productCategory) => {
        navigate(`/category-shop/${productCategory}`);
      };      

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/latest');
        setLatestProducts(response.data);
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchLatestProducts();
  }, []);
  
  return (
    <div className='App'>
        <header className='App-header'>
            <div className="HomeCover">
                <h1 className='LevelText'>LEVEL <span className='gradientText'>UP</span></h1>
                <h1 className='LevelText' >IN <span classNasme='gradientText'>STYLE</span></h1>
                <button className='gearUpBtn'>Gear Up</button>
            </div>
            <div className='gradientBox' style={{marginTop:'-120px'}}>
                <div className='gradientItem'>
                    <div>
                        <h1>100% Cotton</h1>
                    </div>
                </div>
                <div className='gradientItem'>
                    <h1>Premium Clothing</h1>
                </div>
                <div className='gradientItem'>
                    <h1>Free Shipping</h1>
                </div>
            </div>
        </header>
        <main>
            <section className='new-arrivals'>
                <h1 className='heading-text'>New Arrivals</h1>
                <div className='arrvals-slider'>
                {/* Check if there are latest products before mapping */}
                {latestProducts.length > 0 && (
                    <swiper-container className="mySwiper" pagination="true" pagination-clickable="true" space-between="30" slides-per-view="4">
                    {latestProducts.map((product) => (
                        <swiper-slide key={product._id} onClick={() => handleShop(product._id)}>
                        <img src={product.productImage} alt={product.productName} style={{width:'429.25px', height:'570.31px'}}/>
                        <p className='prod-name'>{product.productName}</p>
                        <h4 style={{margin:0, padding:0}}>Rs. {product.productPrice}</h4>
                        <p>5 Stars</p>
                        </swiper-slide>
                    ))}
                    </swiper-container>
                )}
                </div>
            </section>
            <section>
                <h1 className='heading-text' style={{marginTop:20}}>Categories</h1>
                <div className='category-selector'>
                    <div className='women' onClick={() => handleCategory('Women')}></div>
                    <div className='men' onClick={() => handleCategory('Men')}></div>
                </div>
            </section>
            <section>
                <h1 className='heading-text'>Deals & Promotions</h1>
                <div className='deals-container'>
                    <img src='./assets/deals.png' width='80%' height='441px'/>
                </div>
            </section>
        </main>
    </div>
  )
}

export default Home