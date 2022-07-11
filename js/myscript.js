$(function () {
    var token = 'be2a4088291293d807d134e681bd5bcc';
    var limit = 5;
    var lang = 'en';

    var baseUrl = `https://gnews.io/api/v4/top-headlines?`;
    baseUrl += `&token=${token}`;
    baseUrl += `&lang=${lang}`;
    baseUrl += `&max=${limit}`;

    // todo: show a loading spinner while waiting on an getting data from a service

    // call api
    fetch(baseUrl)
        .then(function (response) {
            return response.json(); // parse data as json
        })
        .then(function (data) {
            // loop list of articles
            var singleWidgetAreaElement = $(".single-widget-area");

            for (let i = 0; i < limit; i++) {
                var title = data.articles[i].title;
                var description = data.articles[i].description;
                var url = data.articles[i].url;
                var imageSrc = data.articles[i].image;

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
        });
});
