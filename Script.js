// SideBar //
let sidebars = document.querySelector(".responsive-sidebar");
let sidebarBtns = document.querySelectorAll(".sidebar-btn");
const toggleSidebar = () => sidebars.classList.toggle("active");
sidebarBtns.forEach(button => button.addEventListener("click", toggleSidebar));
// SideBar //

// Products Search //
const form = document.querySelector("form");
const searchProducts = document.querySelector(".inp");
const Search = () => {
    let inputValue = searchProducts.value.toLowerCase();
    let filteredProducts = productList.filter(item => item.title.toLowerCase().includes(inputValue));
    if (filteredProducts == 0) {
      cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>Not Available...</h1>"  
      cardContainer2.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>Not Available...</h1>"  
    }else{
      renderData(filteredProducts, cardContainer, productCard);
      renderData(filteredProducts, cardContainer2, productCard2);
      length.innerHTML = filteredProducts.length;
    }
  }
searchProducts.addEventListener("input", Search);
form.addEventListener("submit", (e) => e.preventDefault());
// Products Search //

const cardContainer = document.querySelector(".card1");
const productCard = ({ title, img, price, desc, rating, brand}) => {
    return `
    <div class=" border border-gray-200 rounded-lg w-full">
    <a href="#">
      <div class="bg-white mb-3">
      <img class="w-full h-[200px] object-contain" loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8AAxAr9ZNr9JCwn2QZ35rSWWuiayhh0ayQ&s" alt="" />
      </div>
      </a>
    <div class="p-6">
      <div class="space-y-3">
        <h2 class="font-bold text-lg leading-tight">${title}</h2>
        <p class="text-gray-600 line-clamp-2 ">${desc}</p>
        <div class="flex justify-between items-center space-x-2">
          <span
            class="flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">Rating: ${rating}</span>
          <span class="font-bold text-xl"> ${price}</span>
        </div>
        <p class="text-gray-800 text-sm">Brand: ${brand}</p>
      </div>
      <button class="mt-4 bg-teal-500 text-white py-2 px-4 rounded w-full hover:bg-teal-600">
        Add to Cart
      </button>
    </div>
  </div>
        `;
};
const cardContainer2  = document.querySelector(".card2");
const productCard2 = ({ title, img, price, desc, rating, brand}) => {
  return `
          <div class="flex flex-col md:flex-row border border-gray-200 rounded-lg w-full p-4 md:px-8 card">
            <a href="#">
                <div class="bg-white mb-3">
                    <img class="w-full h-[300px]" loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO8AAxAr9ZNr9JCwn2QZ35rSWWuiayhh0ayQ&s" alt="" />
                </div>
            </a>
            <div class="p-4 md:p-6 w-full">
                <div class="space-y-3 flex flex-col gap-5">
                    <h2 class="font-bold text-lg leading-tight">${title}</h2>
                    <p class="text-gray-600 line-clamp-2">${desc}</p>
                    <div class="flex flex-row justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                        <span class="flex items-center px-2 py-1 text-sm font-medium text-green-800 bg-green-100 rounded-full">
                            Rating: ${rating}
                        </span>
                        <span class="font-bold text-xl">${price}</span>
                    </div>
                    <p class="text-gray-800 text-sm">Brand: ${brand}</p>
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

// Map funcation //
const renderData = (data, container, fun) => container.innerHTML = `${data.map(fun).join("")}`;
// Map funcation //

// fetchDataByApi //
const fetchDataByApi = async () => {
    renderData([1, 1, 1, 1, 1, 1], cardContainer, productCardSkeleton);
    let { data } = await axios.get("https://66d70f85006bfbe2e64fa810.mockapi.io/products");
    if (data.length == 0) {
        cardContainer.innerHTML = "<h1 class='col-span-full text-lg md:text-2xl'>No Products Available...</h1>"
    } else {
        length.innerHTML = data.length
        productList = data
        renderData(data, cardContainer, productCard);
        renderData(data, cardContainer2, productCard2);
      }
    };
    fetchDataByApi()
// fetchDataByApi //


// Categories Handel //

const categories = ["All","Mobile Phones","Laptops","Accessories","Watches"];
const catContainer = document.getElementById("catContainer");
renderData(categories,catContainer,(item)=>`<button class="px-3 py-1 bg-gray-50 hover:bg-gray-100 rounded-md text-left shadow-md" id="${item}">${item}</button>`)
const handleCatogery = (e) =>{
  if(e.target.tagName == "BUTTON"){
    const filterByCat = productList.filter(item=>item.category == e.target.id || e.target.id == "All" );
    renderData(filterByCat,cardContainer,productCard)
    length.innerHTML = filterByCat.length
  }
}
catContainer.addEventListener("click",handleCatogery);
    // Categories Handel //
    
    const btn1 = document.querySelector(".btn1");
    const change1 = () => {
      cardContainer.classList.remove("hidden");
      cardContainer2.classList.add("hidden");
    };
    btn1.addEventListener("click", change1);

    
    const btn2 = document.querySelector(".btn2");
    const change2 = () => {
  cardContainer.classList.add("hidden");
cardContainer2.classList.remove("hidden");
}
btn2.addEventListener("click", change2);


// const toggleVisibility = (showFirst) => {
//     if (showFirst) {
//       cardContainer.classList.remove("hidden");
//       cardContainer2.classList.add("hidden");
//     } else {
//       cardContainer.classList.add("hidden");
//         cardContainer2.classList.remove("hidden");
//     }
// };

// document.querySelector(".btn1").addEventListener("click", () => toggleVisibility(true));
// document.querySelector(".btn2").addEventListener("click", () => toggleVisibility(false));



// const arr = ["a","d","c","b"];
// const sortArr = arr.sort();
// console.log(sortArr);

// const arr = [3,33,12,1,22];
// const sortArr = arr.sort((a,b)=>b-a);
// console.log(sortArr);

// const arr = [
  //   {name:"ali",age:18},
  //   {name:"alina",age:12},
  //   {name:"alif",age:28},
//   {name:"bay",age:22},
// ]

// const sortedArrByAge = arr.sort((a,b)=>a.age-b.age);
// console.log(sortedArrByAge);


// const arr = [1,2,3,4];
// const UnSortedArr = arr.map(item=>({num:item,idx:(Math.random()*100)+1})).sort((a,b)=>a.idx-b.idx).map(item=>item.num);
// console.log(UnSortedArr);
// const sorted = productList.sort((a,b)=>a.price - b.price).map(item=>item.price);/