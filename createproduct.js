const productForm = document.querySelector("form");
let loaderBtn = document.querySelector(".loader");
const product = { title: "", img: "", price: "", desc: "" };

const getData = (e) => {
 console.log(product[e.id] = e.value);
};

const Submit = (e) => {
  e.preventDefault(); 
  addProduct(product);
  productForm.reset();
};

productForm.addEventListener("submit", Submit);


const addProduct = async(product) => {
  loaderBtn.innerHTML =`<div class="spiner border-t-2 border-white border-solid rounded-full animate-spin h-4 w-4 mr-2"></div>Loading...`
  let url = "https://66d70f85006bfbe2e64fa810.mockapi.io/products"
  await axios.post(url,product);
  window.location.href = "/";
}


