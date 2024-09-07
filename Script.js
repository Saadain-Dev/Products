
// Select all sidebars and buttons
let sidebars = document.querySelector(".responsive-sidebar");
let sidebarBtns = document.querySelectorAll(".sidebar-btn");

// Function to toggle the sidebar
const toggleSidebar = () => {
  sidebars.classList.toggle("active");
}

// Add event listener to each button
sidebarBtns.forEach(button => button.addEventListener("click", toggleSidebar));



const cardContainer = document.querySelector(".card");
const productCard = ({ title, img, price, desc }) => {
    return `
        <div class="w-full max-w-sm border rounded-lg">
            <a href="#">
            <div class="bg-white mb-3">
            <img class="w-full h-[200px] object-contain" src="${img}" alt="" />
            </div>
            </a>
            <div class="px-3 pb-3 flex justify-between">
                <a href="#"><h5 class="text-lg font-semibold line-clamp-1">${title}</h5></a>
                <span class="text-xl font-bold">$${price}</span>
            </div>
        </div>
        `;
};

const productCardSkeleton = () => {
    return `
 <div class="w-full max-w-sm border rounded-lg bg-gray-200 animate-pulse">
    <div class="bg-gray-300 mb-3 h-[220px]"></div>
    <div class="px-3 pb-3 flex justify-between items-center">
        <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
        <div class="w-1/4 h-6 bg-gray-300 rounded"></div>
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
        cardContainer.innerHTML = "<h1 class='col-span-full text-2xl'>No Products Available...</h1>"
    } else {
        length.innerHTML = data.length
        productList = data
        renderData(data, cardContainer, productCard);
    }
};
fetchDataByApi()


const form = document.querySelector("form");
const searchProducts = document.querySelector(".inp");
const Search = (e) => {
    e.preventDefault();
    let inputValue = searchProducts.value.toLowerCase();
    let filteredProducts = productList.filter(item => item.title.toLowerCase().includes(inputValue));
    renderData(filteredProducts, cardContainer, productCard);
}
form.addEventListener("submit", Search);
