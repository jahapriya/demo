import React, { useState, useEffect } from "react";
import "../App.css";
import { useHistory } from "react-router-dom";

const ProductCard = ({ productCategory }) => {
  return (
    <div className="card">
      <img
        src={productCategory.productCategoryImage}
        alt={productCategory.productCategoryName}
      />
      <h3>{productCategory.productCategoryName}</h3>
    </div>
  );
};

const Child = ({ name }) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [filteredResponse, setFilteredResponse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.kalpav.com/api/v1/product/category/retail"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setApiResponse(data);
        setFilteredResponse(data.response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredCategories = apiResponse.response.filter((item) =>
      item.productCategory.productCategoryName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredResponse(filteredCategories);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apiResponse) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="Header" style={{ marginLeft: "20px" }}>
        <a href="#about">About</a>
        <div class="search-container">
          <div>
            <input
              type="text"
              placeholder="Search name"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>
              <i class="fa fa-search"></i>
            </button>
          </div>
          &nbsp;&nbsp;
          <div className="card-container">
            <h2>Product Categories</h2>
            {filteredResponse?.map((item) => (
              <ProductCard
                key={item.productCategory.productCategoryId}
                productCategory={item.productCategory}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="App">
        <h3>About</h3>
        <div id="about">
          First setup the vscode and i have used the react library to develop
          the website,node.js has to be installed in the system. to create react
          app and started developing the website. I have used the public folder
          for images,fonts,css styles,and for showing validations functions js
          file. In components there is the validations for the required
          fields,In pages the user visible contents are coded. I have faced the
          difficulty in the login page api.
        </div>
      </div>
    </div>
  );
};

export default Child;
