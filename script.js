fetch("https://api.escuelajs.co/api/v1/products")
    .then(res => {
        if (!res.ok) {
            throw new Error("HTTP error " + res.status);
        }
        return res.json();
    })
    .then(data => {
        const tbody = document.getElementById("product-list");

        data.forEach(p => {
            const tr = document.createElement("tr");

            // Tạo các cells
            const idCell = document.createElement("td");
            idCell.textContent = p.id;

            const titleCell = document.createElement("td");
            titleCell.textContent = p.title;

            const slugCell = document.createElement("td");
            slugCell.textContent = p.slug;

            const priceCell = document.createElement("td");
            priceCell.textContent = "$" + p.price;

            const descCell = document.createElement("td");
            descCell.textContent = p.description;

            const catCell = document.createElement("td");
            catCell.textContent = p.category?.name || "";

            // Xử lý image - lấy từ p.images hoặc dùng placeholder
            const imgCell = document.createElement("td");
            const img = document.createElement("img");
            img.style.width = "100px";
            img.style.height = "auto";
            img.style.borderRadius = "4px";
            img.alt = p.slug;

            // Set src for image
            let imageUrl = "https://via.placeholder.com/100?text=No+Image";

            // Ưu tiên: Product images > Category images > Placeholder
            if (p.images && Array.isArray(p.images) && p.images.length > 0) {
                const imageLink = p.images[0];
                // Use direct URL, remove proxy which might be blocking or down
                imageUrl = imageLink;
            } else if (p.category?.image) {
                // Fallback to category image
                imageUrl = p.category.image;
            }

            img.src = imageUrl;

            // Xử lý error khi load image fail
            img.onerror = function () {
                this.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23ddd' width='100' height='100'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23999' font-size='12'%3ENo Image%3C/text%3E%3C/svg%3E";
            };

            imgCell.appendChild(img);

            tr.appendChild(idCell);
            tr.appendChild(titleCell);
            tr.appendChild(slugCell);
            tr.appendChild(priceCell);
            tr.appendChild(descCell);
            tr.appendChild(catCell);
            tr.appendChild(imgCell);

            tbody.appendChild(tr);
        });
    })
    .catch(err => console.error("Lỗi fetch:", err));
