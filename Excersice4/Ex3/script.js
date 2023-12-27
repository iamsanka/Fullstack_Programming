const nameInput = document.getElementById("nameInput");
const suggestionList = document.getElementById("suggestionList");

let names = []; // makin a variable for Store the JSON data

// Fetch the JSON data from the file
fetch("data/names.json")
  .then(response => response.json())
  .then(data => {
    names = data.names;
  })
  .catch(error => console.error("Error fetching JSON data: " + error));

// Event listener for user input
nameInput.addEventListener("input", function() {
    const input = nameInput.value.toLowerCase();
    const filteredNames = names.filter(name => name.toLowerCase().startsWith(input));
    renderSuggestions(filteredNames);
});

// Event listener for arrow keys and Enter key
nameInput.addEventListener("keydown", function(e) {
    const suggestions = suggestionList.children;
    if (e.key === "ArrowDown" && suggestions.length > 0) {
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].classList.contains("highlight")) {
                suggestions[i].classList.remove("highlight");
                const nextIndex = (i + 1) % suggestions.length;
                suggestions[nextIndex].classList.add("highlight");
                break;
            }
        }
    } else if (e.key === "ArrowUp" && suggestions.length > 0) {
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].classList.contains("highlight")) {
                suggestions[i].classList.remove("highlight");
                const prevIndex = (i - 1 + suggestions.length) % suggestions.length;
                suggestions[prevIndex].classList.add("highlight");
                break;
            }
        }
    } else if (e.key === "Enter") {
        for (let i = 0; i < suggestions.length; i++) {
            if (suggestions[i].classList.contains("highlight")) {
                nameInput.value = suggestions[i].innerText;
                suggestionList.innerHTML = "";
                break;
            }
        }
    }
});

// Function to render name suggestions
function renderSuggestions(suggestions) {
    suggestionList.innerHTML = "";
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const listItem = document.createElement("li");
            listItem.innerText = suggestion;
            suggestionList.appendChild(listItem);
        });
        suggestionList.firstChild.classList.add("highlight");
    }
}

// Clicking a suggestion
suggestionList.addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "LI") {
        nameInput.value = e.target.innerText;
        suggestionList.innerHTML = "";
    }
});
