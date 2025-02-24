let cart = [];

//陣列內的價格加總
function sumData(arr) {
  document.getElementById("total-price").value = arr.reduce(
    (sum, item) => sum + item
  );
}

//觸發加號按鍵時會做的動作
document.querySelectorAll(".plus").forEach((button) => {
  button.addEventListener("click", (e) => {
    //找到前一個兄弟節點(input type="number"的那個)
    let productElement = e.target.previousSibling;
    //使減號可以作用
    productElement.previousSibling.disabled = false;
    let sum = parseInt(productElement.value);
    productElement.value = sum + 1;
    //使加號不能作用
    if (productElement.value == 10) {
      productElement.nextSibling.disabled = true;
    }
    //找到最近的div.item父節點
    let item = e.target.closest("div.item");
    //拿到裡面的Attribute
    let items = {
      price: parseInt(item.getAttribute("data-price")),
      name: item.getAttribute("data-name"),
    };
    //一個一個把價格放進cart陣列裡
    cart.push(items.price);
    //計算總額
    sumData(cart);
  });
});

document.querySelectorAll(".minus").forEach((button) => {
  button.addEventListener("click", (e) => {
    let productElement = e.target.nextSibling;
    productElement.nextSibling.disabled = false;
    let sum = parseInt(productElement.value);
    productElement.value = sum - 1;
    if (productElement.value == 0) {
      productElement.previousSibling.disabled = true;
    }
    let item = e.target.closest("div.item");
    let items = {
      price: parseInt(item.getAttribute("data-price")),
      name: item.getAttribute("data-name"),
    };
    cart.push(-items.price);
    sumData(cart);
  });
});
