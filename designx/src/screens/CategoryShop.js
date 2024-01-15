import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../components/CartContext';

function CategoryShop() {
    const { category } = useParams();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const handleShop = (productId) => {
        navigate(`/product/${productId}`)
      };

    useEffect(() => {
        // Fetch products from the backend when the component mounts
        const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/products/category/${category}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };

        fetchProducts();
    }, []);
  return (
    <div style={{display:'flex'}}>
        <Sidebar height={'100%'}/>

        {/* Shop */}
        <section className="shop-page">
            <h1 className='heading-text'>Shop</h1>
            <div style={{width:'145vh', display:'flex', flexDirection:'row', alignContent:'center', justifyContent:'center', marginTop: 50}}>
                <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={6}>
                {products.map((product) => (
                    <Grid key={product._id} item>
                        <div onClick={() => handleShop(product._id)} style={{width:'290px', height:'320px', backgroundColor:'white'}}>
                        <img src={product.productImage} alt={product.productName} style={{ width: '300px', height:'398.59px',marginBottom: '8px', }} />
                        </div>
                        <div style={{ margin: 0, padding: 0, color: 'white' }}>
                            <h4 style={{marginTop:10}}>{product.productName}</h4>
                            <h5 style={{ margin: 0, padding: 0, color: 'white' }}>Rs.{product.productPrice}</h5>
                        </div>
                    </Grid>
                ))}
                </Grid>
                </Grid>
            </div>
        </section>
    </div>
  )
}

export default CategoryShop