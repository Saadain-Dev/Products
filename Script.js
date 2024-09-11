
let sidebars = document.querySelector(".responsive-sidebar");
let sidebarBtns = document.querySelectorAll(".sidebar-btn");
const toggleSidebar = () => {
  sidebars.classList.toggle("active");

}
sidebarBtns.forEach(button => button.addEventListener("click", toggleSidebar));

//////////////////////////////////////////////

const form = document.querySelector("form");
const searchProducts = document.querySelector(".inp");
const Search = () => {

    let inputValue = searchProducts.value.toLowerCase();
    let filteredProducts = productList.filter(item => item.title.toLowerCase().includes(inputValue));
    if (filteredProducts == 0) {
      cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>Not Available...</h1>"  
    }
    else{
      renderData(filteredProducts, cardContainer, productCard);
    }
}
searchProducts.addEventListener("input", Search);
form.addEventListener("submit", (e) => {
    e.preventDefault();
});

//////////////////////////////////////////////

const cardContainer = document.querySelector(".card");
const productCard = ({ title, img, price, desc, rating, brand}) => {
    return `
    <div class=" border border-gray-200 rounded-lg w-full">
    <a href="#">
      <div class="bg-white mb-3">
      <img class="w-full h-[200px] object-contain" loading="lazy" src="${img}" alt="" />
      </div>
      </a>
    <div class="p-6">
      <div class="space-y-3">
        <h2 class="font-bold text-lg leading-tight">${title}</h2>
        <p class="text-gray-600 ">${desc}</p>
        <div class="flex items-center space-x-2">
          <span
            class="inline-flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Rating:${rating}</span>
          <span class="font-bold text-xl">${price}</span>
        </div>
        <p class="text-gray-800 text-sm">Brand:${brand}</p>
      </div>
      <button class="mt-4 bg-teal-500 text-white py-2 px-4 rounded w-full hover:bg-teal-600">
        Add to Cart
      </button>
    </div>
  </div>
        `;
};

const productCardSkeleton = () => {
    return `
    <div class="skeleton-card border border-gray-200 rounded-lg w-full">
    <a href="#">
        <div class="bg-gray-200 mb-3 h-[200px] animate-pulse">
            <!-- Placeholder for image -->
        </div>
    </a>
    <div class="p-6">
        <div class="space-y-3">
            <div class="bg-gray-200 h-6 w-3/4 animate-pulse mb-3"></div> <!-- Placeholder for title -->
            <div class="bg-gray-200 h-4 w-1/2 animate-pulse mb-3"></div> <!-- Placeholder for description -->
            <div class="flex items-center space-x-2">
                <div class="bg-gray-200 h-4 w-24 animate-pulse rounded-full"></div> <!-- Placeholder for rating -->
                <div class="bg-gray-200 h-6 w-16 animate-pulse rounded-full"></div> <!-- Placeholder for price -->
            </div>
            <div class="bg-gray-200 h-4 w-1/2 animate-pulse mt-3"></div> <!-- Placeholder for brand -->
        </div>
        <div class="mt-4 bg-gray-200 h-10 w-full animate-pulse rounded"></div> <!-- Placeholder for button -->
    </div>
</div>`;
};

const length = document.querySelector(".Product-length");
let productList = [] ;
const renderData = (data, container, fun) => {
    container.innerHTML = `${data.map(fun).join("")}`;
};

const fetchDataByApi = async () => {
    renderData([1, 1, 1, 1, 1, 1], cardContainer, productCardSkeleton);
    let { data } = await axios.get("https://66d70f85006bfbe2e64fa810.mockapi.io/products");
    if (data.length == 0) {
        cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>No Products Available...</h1>"
    } else {
        length.innerHTML = data.length
        productList = data
        renderData(data, cardContainer, productCard);
    }
};
fetchDataByApi()



