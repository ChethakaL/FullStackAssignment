// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';

// export default function Grid() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/products/all');
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const columns = [
//     { field: 'productCode', headerName: 'Product Code', width: 130, editable: true },
//     { field: 'productName', headerName: 'Product Name', width: 180, editable: true },
//     { field: 'productDescription', headerName: 'Product Description', width: 550, editable: true },
//     {
//       field: 'color',
//       headerName: 'Product Color',
//       width: 180,
//       editable: true,
//       valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].color : '',
//     },
//     {
//       field: 'size',
//       headerName: 'Product Size',
//       width: 120,
//       editable: true,
//       valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].size : '',
//     },
//     {
//       field: 'stock',
//       headerName: 'Stock',
//       type: 'number',
//       width: 180,
//       editable: true,
//       valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].stock : 0,
//     },    
//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 150,
//       sortable: false,
//       renderCell: (params) => (
//         <div>
//           <button onClick={() => handleEdit(params.row._id)}>
//             Edit
//           </button>
//           <button onClick={() => handleDelete(params.row._id)}>
//             Delete
//           </button>
//         </div>
//       ),
//     },
//   ];

//   const handleEdit = (id) => {
//     // Implement your edit logic here
//     console.log(`Editing item with ID: ${id}`);
//   };

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`http://localhost:4000/api/products/${id}`);

//       if (response.status === 204) {
//         setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
//         console.log(`Deleted item with ID: ${id}`);
//       } else {
//         console.error('Error deleting product:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <div style={{ height: '80vh', width: '100%' }}>
//       <DataGrid
//         rows={products.map((row) => ({ ...row, id: row._id }))}
//         columns={columns}
//         pageSize={10}
//         checkboxSelection
//         getRowId={(row) => row.id}
//         onCellDoubleClick={} //open a modal
//       />


//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Modal from 'react-modal'; // Import the modal library

Modal.setAppElement('#root'); // Set the root element for accessibility

export default function Grid() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    { field: 'productCode', headerName: 'Product Code', width: 130, editable: true },
    { field: 'productName', headerName: 'Product Name', width: 180, editable: true },
    { field: 'productDescription', headerName: 'Product Description', width: 550, editable: true },
    {
      field: 'color',
      headerName: 'Product Color',
      width: 180,
      editable: true,
      valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].color : '',
    },
    {
      field: 'size',
      headerName: 'Product Size',
      width: 120,
      editable: true,
      valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].size : '',
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      width: 180,
      editable: true,
      valueGetter: (params) => params.row.quantity && params.row.quantity[0] ? params.row.quantity[0].stock : 0,
    }, 
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEdit(params.row)}>
            Edit
          </button>
          <button onClick={() => handleDelete(params.row._id)}>
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (row) => {
    setSelectedProduct(row);
    setIsModalOpen(true);
  };
  const handleDelete = async (id) => {
        try {
          const response = await axios.delete(`http://localhost:4000/api/products/delete${id}`);
    
          if (response.status === 204) {
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
            console.log(`Deleted item with ID: ${id}`);
          } else {
            console.error('Error deleting product:', response.data.error);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      };

  const handleModalClose = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/products/update/${selectedProduct._id}`, {
        // Update with your edited values
        // For example, if you have a form in the modal, get the form values and send them here
      });

      if (response.status === 200) {
        console.log('Row updated successfully');
        // Close the modal and update the state or perform any additional actions after a successful update
        handleModalClose();
        // You may want to refetch the products or update the state in another way
      } else {
        console.error('Error updating product:', response.data.error);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <DataGrid
        rows={products.map((row) => ({ ...row, id: row._id }))}
        columns={columns}
        pageSize={10}
        checkboxSelection
        getRowId={(row) => row.id}
      />

      {/* Modal for editing */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Edit Product Modal"
        style={{ content: { width: '50%', margin: 'auto' } }}
      >
        {/* Your form or input fields for editing */}
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleModalClose}>Cancel</button>
      </Modal>
    </div>
  );
}
