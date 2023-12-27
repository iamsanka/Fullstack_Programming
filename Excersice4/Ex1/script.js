// Function to fetch houses data
async function fetchHouses() {
    // Fetch the JSON data from a file 
    const response = await fetch('data/talotiedot.json');
    const jsonData = await response.json();
    return jsonData;
}

// Function to render houses on the page
async function renderHouses() {
    let houses = await fetchHouses();
    console.log('Houses:', houses);
    // Find the empty houses div
    let houseDiv = document.getElementById("houses");

    // Loop through the JSON data
    houses.forEach(house => {
        // Create a new house container
        let houseContainer = document.createElement('div');
        houseContainer.className = 'houseContainer';

        // Create an image
        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        // Create p element as a header
        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        // Creating p elements for other house data 
        let sizeParagraph = document.createElement('p');
        sizeParagraph.className = 'text';
        sizeParagraph.innerHTML = `Size: ${house.size} sqm`;

        let priceParagraph = document.createElement('p');
        priceParagraph.className = 'text';
        let formattedPrice = new Intl.NumberFormat('fi-FI').format(house.price);
        priceParagraph.innerHTML = `Price: €${formattedPrice}`;

        let textParagraph = document.createElement('p');
        textParagraph.className = 'text';
        textParagraph.innerHTML = house.text;

        // Add created elements to the container
        houseContainer.appendChild(image);
        houseContainer.appendChild(header);
        houseContainer.appendChild(sizeParagraph);
        houseContainer.appendChild(priceParagraph);
        houseContainer.appendChild(textParagraph);

        // Add the house container to the main div
        houseDiv.appendChild(houseContainer);
    });
}

// Call the renderHouses function to display the data
renderHouses();