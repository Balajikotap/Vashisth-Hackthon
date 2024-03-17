let searchInputEl = document.getElementById("searchInput");
//div for to store the results div
let searchResultsEl = document.getElementById("searchResults");
//acces of spinner
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        link,
        title,
        description
    } = result;
    //div for the results
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    //creating anchor title -- result-title
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);
    //creting title break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //creating anchor elemnt for url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);
    //url braek
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);
    //description of the result
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("line-description");
    resultItemEl.appendChild(descriptionEl);



    searchResultsEl.appendChild(resultItemEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    //looping through getting more elments related to user type
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }


}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        //here the spinner willbe hide after the displaying result
        spinnerEl.classList.toggle("d-none");
        //clearing previous text
        searchResultsEl.textContent = "";


        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);