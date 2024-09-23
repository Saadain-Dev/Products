        // Toggle Sidebar
        document.querySelectorAll(".sidebar-btn").forEach(button => {
          button.addEventListener("click", () => document.querySelector(".responsive-sidebar").classList.toggle("active"));
        });
        
        // Product Data
        let productList = [];
      const cardContainer = document.querySelector(".card1");
      const cardContainer2 = document.querySelector(".card2");
      const length = document.querySelector(".Product-length");
      const form = document.querySelector("form");
      const searchProducts = document.querySelector(".inp");

      const renderData = (data, container, templateFn) => container.innerHTML = data.map(templateFn).join("");

      const fetchDataByApi = async () => {
          renderData([1, 1, 1, 1, 1, 1], cardContainer, () => `
              <div class="skeleton-card border border-gray-200 rounded-lg w-full">
                  <a href="#"><div class="bg-gray-200 mb-3 h-[200px] animate-pulse"></div></a>
                  <div class="p-6">
                  <div class="space-y-3">
                          <div class="bg-gray-200 h-6 w-3/4 animate-pulse mb-3"></div>
                          <div class="bg-gray-200 h-4 w-1/2 animate-pulse mb-3"></div>
                          <div class="flex items-center space-x-2">
                          <div class="bg-gray-200 h-4 w-24 animate-pulse rounded-full"></div>
                              <div class="bg-gray-200 h-6 w-16 animate-pulse rounded-full"></div>
                          </div>
                          <div class="bg-gray-200 h-4 w-1/2 animate-pulse mt-3"></div>
                      </div>
                      <div class="mt-4 bg-gray-200 h-10 w-full animate-pulse rounded"></div>
                      </div>
              </div>
              `);
              
              const { data } = await axios.get("https://66d70f85006bfbe2e64fa810.mockapi.io/products");
              
              if (data.length === 0) {
                  cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>No Products Available...</h1>";
                  cardContainer2.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>No Products Available...</h1>";
                } else {
                    productList = data;
                    length.innerHTML = data.length;
                    renderData(data, cardContainer, productCard);
                    renderData(data, cardContainer2, productCard2);
                }
            };
            
            const productCard = ({ title, img, price, desc, rating, brand }) => `
            <div class="border border-gray-200 rounded-lg w-full">
              <a href="#"><div class="bg-white mb-3"><img class="w-full h-[200px] object-contain" loading="lazy" src="https://www.cityguide-dubai.com/fileadmin/_processed_/3/3/csm_img-worlds-of-adventures-teaser_40e4184da1.jpg" alt="" /></div></a>
              <div class="p-6">
                  <div class="space-y-3">
                      <h2 class="font-bold text-lg leading-tight line-clamp-1">${title}</h2>
                      <p class="text-gray-600 line-clamp-2">${desc}</p>
                      <div class="flex justify-between items-center space-x-2">
                          <span class="flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Rating: ${rating}</span>
                          <span class="font-bold text-xl">$${price}</span>
                      </div>
                      <p class="text-gray-800 text-sm">Brand: ${brand}</p>
                  </div>
                  <button class="mt-4 bg-teal-500 text-white py-2 px-4 rounded w-full hover:bg-teal-600">Add to Cart</button>
              </div>
          </div>
          `;

      const productCard2 = ({ title, img, price, desc, rating, brand }) => `
      <div class="flex flex-col md:flex-row border border-gray-200 rounded-lg w-full p-4 md:px-8 card">
              <a href="#"><div class="bg-white mb-3"><img class="w-full h-[300px] object-contain" loading="lazy" src="https://www.cityguide-dubai.com/fileadmin/_processed_/3/3/csm_img-worlds-of-adventures-teaser_40e4184da1.jpg" alt="" /></div></a>
              <div class="p-4 md:p-6 w-full">
                  <div class="space-y-3 flex flex-col gap-5">
                      <h2 class="font-bold text-lg leading-tight">${title}</h2>
                      <p class="text-gray-600 line-clamp-2">${desc}</p>
                      <div class="flex flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                          <span class="flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Rating: ${rating}</span>
                          <span class="font-bold text-xl">$${price}</span>
                          </div>
                      <p class="text-gray-800 text-sm">Brand: ${brand}</p>
                  </div>
                  <button class="mt-4 bg-teal-500 text-white py-2 px-4 rounded w-full hover:bg-teal-600">Add to Cart</button>
              </div>
              </div>
      `;
      
      const Search = () => {
          const inputValue = searchProducts.value.toLowerCase();
          const filteredProducts = productList.filter(item => item.title.toLowerCase().includes(inputValue));

          if (filteredProducts.length === 0) {
              cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>Not Available...</h1>";
              cardContainer2.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>Not Available...</h1>";
            } else {
                renderData(filteredProducts, cardContainer, productCard);
                renderData(filteredProducts, cardContainer2, productCard2);
                length.innerHTML = filteredProducts.length;
            }
        };

        searchProducts.addEventListener("input", Search);
        form.addEventListener("submit", (e) => e.preventDefault());

        // Categories
        const categories = ["All", "Mobile Phones", "Laptops", "Accessories", "Watches"];
        const catContainer = document.getElementById("catContainer");
      renderData(categories, catContainer, (item) => `<button class="px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-md text-left shadow-md" id="${item}">${item}</button>`);
      
      catContainer.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") {
              const filterByCat = productList.filter(item => item.category === e.target.id || e.target.id === "All");
              renderData(filterByCat, cardContainer, productCard);
              renderData(filterByCat, cardContainer2, productCard2);
              length.innerHTML = filterByCat.length;
            }
        });
         
      document.querySelector(".btn1").addEventListener("click", () => {
          cardContainer.classList.remove("hidden");
          cardContainer2.classList.add("hidden");
      });
      
      document.querySelector(".btn2").addEventListener("click", () => {
          cardContainer.classList.add("hidden");
          cardContainer2.classList.remove("hidden");
      });
      fetchDataByApi();


      const select = document.querySelector("select");
      select.addEventListener("change", () => {
          const sortedArrByAge = productList.sort((a, b) => select.value === 'low' ? a.price - b.price : b.price - a.price);
            renderData(sortedArrByAge, cardContainer, productCard);
            renderData(sortedArrByAge, cardContainer2, productCard2);
      });



const clearFilter = document.querySelector(".clearFilters");
clearFilter.addEventListener("click", () => {
    select.value = "Select"
    renderData(productList, cardContainer, productCard);
    renderData(productList, cardContainer2, productCard2);
    length.innerHTML = productList.length;
});


 