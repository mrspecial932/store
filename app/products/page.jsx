"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useCartStore from "@/store/cartStore";
import {
  Heart,
  ShoppingCart,
  Edit,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";
import Image from "next/image";

//logic here

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const addItem = useCartStore((state) => state.addItem);
  const { data: session } = useSession();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  

  //logic here

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Products - Admin Panel
        </h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl relative"
              >
                <Image
                  width={500}
                  height={500}
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <Button
                  onClick={() => handleFeature(product._id)}
                  variant="outline"
                  size="icon"
                  className={`absolute top-2 left-2 bg-white hover:bg-gray-100 ${
                    product.featured ? "text-yellow-500" : "text-gray-500"
                  }`}
                >
                  <Star className="h-4 w-4" />
                </Button>
                <EditProductButton productId={product._id} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex justify-between items-center">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center flex-grow mr-2"
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                    </Button>
                    <Button
                      onClick={() => toggleWishlist(product._id)}
                      variant="outline"
                      className={`border-2 font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center w-12 h-12
                        ${
                          wishlist.includes(product._id)
                            ? "border-red-500 bg-red-500 text-white hover:bg-red-600"
                            : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        }`}
                    >
                      <Heart className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {products.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
