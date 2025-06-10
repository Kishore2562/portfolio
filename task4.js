function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('note-list');
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <div>
                <strong>${note.title}</strong>
                <p>${note.content}</p>
            </div>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        noteList.appendChild(noteItem);
    });
}

function addNote() {
    const title = document.getElementById('note-title').value.trim();
    const content = document.getElementById('note-content').value.trim();
    if (title && content) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ title, content });
        localStorage.setItem('notes', JSON.stringify(notes));
        document.getElementById('note-title').value = '';
        document.getElementById('note-content').value = '';
        loadNotes();
    } else {
        alert('Please enter both a title and content.');
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

const products = [
    {
        name: 'Dell XPS 13',
        category: 'electronics',
        price: 125000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
    },
    {
        name: 'SG Cricket Kit Elite',
        category: 'sports',
        price: 8500,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1625121902529-4f3d14e70e2b'
    },
    {
        name: 'HP Spectre x360',
        category: 'electronics',
        price: 145000,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
    },
    {
        name: 'Kookaburra Junior Cricket Kit',
        category: 'sports',
        price: 6500,
        rating: 4.3,
        image: 'https://images.unsplash.com/photo-1625121902529-4f3d14e70e2b'
    },
    {
        name: 'Lenovo ThinkPad X1',
        category: 'electronics',
        price: 165000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45'
    },
    {
        name: 'MRF Genius Cricket Kit',
        category: 'sports',
        price: 9500,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1625121902529-4f3d14e70e2b'
    }
];

function displayProducts(filteredProducts) {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p>Price: ₹${product.price.toLocaleString()}</p>
            <p>Rating: ${product.rating}/5</p>
        `;
        productGrid.appendChild(productCard);
    });
}

function filterAndSortProducts() {
    const category = document.getElementById('category-filter').value;
    const sortOption = document.getElementById('sort-option').value;
    let filteredProducts = [...products];

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (sortOption === 'name-asc') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'name-desc') {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'price-asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    displayProducts(filteredProducts);
}

document.getElementById('category-filter').addEventListener('change', filterAndSortProducts);
document.getElementById('sort-option').addEventListener('change', filterAndSortProducts);

loadNotes();
displayProducts(products);