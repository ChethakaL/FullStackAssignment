import React from 'react'

function ProductComponent() {
  return (
    <div>
        <h1 className='heading-text'>Update Products</h1>
        <div className='add-container'>
            <div className='form-container'>
                <form class="ui form">
                    <h2 class="ui dividing header">Product Details</h2>
                    <div class="field">
                        <div class="four fields">
                            <div className='five wide field'>
                                <label>Product Code</label>
                                <div class="field">
                                    <input type="text" name="shipping[first-name]" placeholder="Product Code"/>
                                </div>
                            </div>
                            <div className='five wide field'>
                                <label>Product Name</label>
                                <div class="field">
                                    <input type="text" name="shipping[first-name]" placeholder="Product Name"/>
                                </div>
                            </div>
                            <div className='two wide field'>
                                <label>Colors</label>
                                <div class="field">
                                    <select class="ui fluid dropdown">
                                        <option value="">Color</option>
                                        <option value="red">Red</option>
                                        <option value="blue">Blue</option>
                                        <option value="yellow">Yellow</option>
                                        <option value="cyan">Cyan</option>
                                    </select>
                                </div>
                            </div>
                            <div className='two wide field'>
                                <label>Size</label>
                                <div class="field">
                                    <select class="ui fluid dropdown">
                                        <option value="">Sizes</option>
                                        <option value="l">Large</option>
                                        <option value="m">Medium</option>
                                        <option value="sm">Small</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="three fields">
                            <div className='five wide field'>
                                <label>Product Brand</label>
                                <div class="field">
                                    <input type="text" name="shipping[first-name]" placeholder="Product Code"/>
                                </div>
                            </div>
                            <div className='twelve wide field'>
                                <label>Product Description</label>
                                <div class="field">
                                    <input type="text" name="shipping[first-name]" placeholder="Product Name"/>
                                </div>
                            </div>
                            <div className='two wide field'>
                                <label>Product Price</label>
                                <div class="field">
                                <input type="text" name="shipping[first-name]" placeholder="Product Code"/>
                                </div>
                            </div>
                        </div>
                        <div class="one field">
                            <div className='fifteen wide field'>
                                <label>Product Image</label>
                                <div className='field'>
                                    <div class="ui icon input">
                                        <input type="file" placeholder="upload..."/>
                                        <i class="upload icon"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button class="ui secondary button">
                      Submit
                    </button>
                </form>
                <form class="ui form">
                    <div className='row' style={{alignItems:'center', justifyContent:'space-between'}}>
                        <h2 class="ui dividing header" style={{marginTop:20}}>Quantity Details</h2>
                        <button class="ui labeled icon button btn-size">
                          <i class="add icon"></i>
                            Add
                        </button>
                    </div>
                    
                    <div class="field">
                        <div class="three fields">
                            <div className='two wide field'>
                                <label>Colors</label>
                                <div class="field">
                                    <select class="ui fluid dropdown">
                                        <option value="">Color</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                    </select>
                            </div>
                        </div>
                        <div className='two wide field'>
                            <label>Colors</label>
                            <div class="field">
                                <select class="ui fluid dropdown">
                                    <option value="">Color</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                </select>
                            </div>
                        </div>
                        <div className='two wide field'>
                            <label>Quantity</label>
                            <input placeholder='Quantity'/>
                        </div>
                    </div>
                    <button class="ui secondary button">
                      Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ProductComponent