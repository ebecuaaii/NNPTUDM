fetch("https://api.escuelajs.co/api/v1/products")
    .then((Response) => Response.json())
    .then((data) => {
        console.log(data);
        let productList = document.getElementById("product-list");
        data.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("product-card");
        });
    })
    .catch((error) => console.log(error));