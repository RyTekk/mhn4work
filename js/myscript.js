$(function () {
    // env
    var production = false;

    var token = 'be2a4088291293d807d134e681bd5bcc';
    var limit = 5;
    var lang = 'en';
    var loading = true;
    var articles = [];

    var baseUrl = `https://gnews.io/api/v4/top-headlines?`;
    var searchUrl = `https://gnews.io/api/v4/search?`;
    baseUrl += `&token=${token}`;
    baseUrl += `&lang=${lang}`;
    baseUrl += `&max=${limit}`;

    if (production) {
        fetchApi(baseUrl);
    } else {
        baseUrl = `./js/mock/articles.json`;
        readJson(baseUrl);
    }

    // todo: show a loading spinner while waiting on an getting data from a service

    function fetchApi(path) {
        fetch(path)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                articles = data.articles;
                loading = false;
                appendToSingleLatestPostElements();
            });
    }

    function searchApi() {
        var keyword = $(".form-control").val();
        searchUrl += `q=${keyword}`;
        searchUrl += `&token=${token}`;
        searchUrl += `&lang=${lang}`;

        fetch(searchUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                articles = data.articles;
                loading = false;
                $(".widget-title").html("<h6>Search Results</h6>");
                $(".single-latest-post").detach();
                appendToSingleLatestPostElements();
            });
    }

    function readJson(path) {
        fetch(path)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // set array length
                articles = data.articles;
                articles = articles.slice(0, limit);
                loading = false;
                appendToSingleLatestPostElements();
            });
    }

    function appendToSingleLatestPostElements() {
        var singleWidgetAreaElement = $(".single-widget-area");

        for (let i = 0; i < limit; i++) {
            var title = articles[i].title;
            var description = articles[i].description;
            var url = articles[i].url;
            var imageSrc = articles[i].image;

            var singleLatestPostBuilder = `
                <div class="single-latest-post d-flex">
                    <div class="post-thumb">
                        <img src="${imageSrc}" alt="${title}" >
                    </div>
                    <div class="post-content">
                        <a class="post-title" href="${url}" target="_blank">
                            <h6> ${title} </h6>
                        </a>
                        <div class="post-description">
                            ${description}
                        </div>
                    </div>
                </div>
            `;
            singleWidgetAreaElement.append(singleLatestPostBuilder);
        }
    }

    $("button.search-btn").click(searchApi);
});
