$(function () {
    // env
    var production = true;

    var token = 'be2a4088291293d807d134e681bd5bcc';
    var limit = 5;
    var lang = 'en';
    var loading = true;
    var articles = [];

    var baseUrl = `https://gnews.io/api/v4/top-headlines?`;
    baseUrl += `&token=${token}`;
    baseUrl += `&lang=${lang}`;
    baseUrl += `&max=${limit}`;

    if (production) {
        fetchTopHeadlinesApi(baseUrl);
    } else {
        baseUrl = `./js/mock/articles.json`;
        readJson(baseUrl);
    }

    // todo: show a loading spinner while waiting on an getting data from a service

    function fetchTopHeadlinesApi(path) {
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
        var keyword = $(".search-text").val();
        let searchUrl = `https://gnews.io/api/v4/search?`;
        searchUrl += `q=${keyword}`;
        searchUrl += `&token=${token}`;
        searchUrl += `&lang=${lang}`;
        searchUrl += `&max=${limit}`; // still need limit here?

        if (keyword.length > 0) {
            fetch(searchUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    articles = data.articles;
                    loading = false;
                    $(".widget-title").html(`<h6>Search Results For: ${keyword}</h6>`);
                    $(".single-latest-post").detach();
                    appendToSingleLatestPostElements();
                    $(".search-text").val("");
                });
        } else {
            alert("Keyword is empty!");
        }
        close();
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

    function show() {
        $(".backdrop, .box").animate({"opacity":".50"}, 300, "linear");
        $(".box").animate({"opacity":"1.00"}, 300, "linear");
        $(".backdrop, .box").css("display", "block");
    }

    function close() {
        $(".backdrop, .box").animate({"opacity":".0"}, 300, "linear");
        $(".backdrop, .box").css("display", "none");
    }

    $("button.search-btn").click(show);
    $(".backdrop").click(close);
    $(".searching").click(searchApi);
});
