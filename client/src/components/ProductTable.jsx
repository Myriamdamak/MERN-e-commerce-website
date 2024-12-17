import  { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListAction,productDeleteAction } from "../Redux/Actions/Product";

export default function ProductTable() {
   

    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this product?",id)) {
        dispatch(productDeleteAction(id));
      }
    };

         const [searchQuery, setSearchQuery] = useState("");
   
        const dispatch = useDispatch();
        const {  products = [] } = useSelector((state) => state.productListReducer);
      
        useEffect(() => {
          dispatch(productListAction());
        }, [dispatch]);

        const filteredProducts = products.filter((product) => {
            const searchLower = searchQuery.toLowerCase();
              return (
                (product.name && product.name.toLowerCase().includes(searchLower)) ||
                (product.countInStock && product.countInStock.toLowerCase().includes(searchLower)) ||
                (product.price && product.price.toLowerCase().includes(searchLower))
              );
            });
    return (

        
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="pb-4 bg-white dark:bg-gray-900">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search for products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} 
          />
                </div>
            </div>
           
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
            
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr
                                key={product._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">{product.countInStock}</td>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4">
                                <button onClick={() => handleDelete(product._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
          
        </div>
    );
}