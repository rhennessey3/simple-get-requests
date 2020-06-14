
function getDataFromApi(searchTerm, callback) {
    let URL = `https://dog.ceo/api/breed/${searchTerm}/images/random`;
    $.getJSON(URL, callback);

    console.log(URL);
}

function getDogImage(inputValue) {
    let url = `https://dog.ceo/api/breed/${inputValue}/images/random`;
    fetch(url)
        .then(response => response.json())
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
    console.log(responseJson);
    if (responseJson.status == 'error' && responseJson.code == '404') {
        $('.results-img').html(`<p> Error code :'404', message :'Breed not found'</p>`);
    } else {
        $('.results-img').html(
            `<img src="${responseJson.message}">`);
    }
}

    function displaySearchData(data) {
        let results;
        if (data.status == "success") {
            results = `
    <img src="${data.message}">
  `;
        }
        else {
            results = "Sorry! I don't recognize that breed."
        }
        $('.js-search-results').html(results).prop('hidden', false);
    }

    function watchSubmit() {
        $('.js-search-form').submit(event => {
            event.preventDefault();
            let queryTarget = $(event.currentTarget).find('.js-query');
            let query = queryTarget.val();
            // clear out the input
            queryTarget.val("");
            getDataFromApi(query, displaySearchData);
        });
    }

    $(watchSubmit);