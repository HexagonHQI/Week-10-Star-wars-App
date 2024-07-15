const apiKey = 'hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const gifContainer = document.getElementById('gif-container');
const deleteAllBtn = document.getElementById('delete-all-btn');

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${searchTerm}`);
            const data = await response.json();
            const gifUrl = data.data.images.original.url;
            const gifItem = document.createElement('div');
            gifItem.className = 'gif-item';
            gifItem.innerHTML = `
                <img src="${gifUrl}" alt="${searchTerm} gif">
                <button class="delete-btn" data-gif-url="${gifUrl}">DELETE</button>
            `;
            gifContainer.appendChild(gifItem);
        } catch (error) {
            console.error(error);
        }
    }
});

gifContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const gifUrl = e.target.dataset.gifUrl;
        const gifItem = e.target.parentNode;
        gifContainer.removeChild(gifItem);
    }
});

deleteAllBtn.addEventListener('click', () => {
    gifContainer.innerHTML = '';
});