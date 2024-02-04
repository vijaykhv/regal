document.addEventListener('DOMContentLoaded', function () {
    // Attach event listener to the search button
    document.getElementById('searchButton').addEventListener('click', function () {
      searchBottles();
    });
  
    // Attach event listener to the add bottle form
    document.getElementById('addBottleForm').addEventListener('submit', function (event) {
      event.preventDefault();
      addBottle();
    });
  
    // Other initialization or event listeners as needed
  });
  
  // Define the addBottle function
  function addBottle() {
    const name = document.getElementById('bottleName').value;
    const location = document.getElementById('bottleLocation').value;
  
    fetch('http://localhost:3000/api/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, location }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        // Clear input fields after successful addition
        document.getElementById('bottleName').value = '';
        document.getElementById('bottleLocation').value = '';
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Define the searchBottles function
  function searchBottles() {
    const query = document.getElementById('searchInput').value;
    const searchResults = document.getElementById('searchResults');
  
    // Clear previous results
    searchResults.innerHTML = '';
  
    // Fetch data from the server
    fetch(`http://localhost:3000/api/search?query=${query}`)
      .then(response => response.json())
      .then(data => {
        data.forEach(bottle => {
          const li = document.createElement('li');
          li.textContent = `${bottle.name} - ${bottle.location}`;
          searchResults.appendChild(li);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  