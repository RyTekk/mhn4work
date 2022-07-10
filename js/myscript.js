$(function() {
    fetch('https://gnews.io/api/v4/top-headlines?&token=be2a4088291293d807d134e681bd5bcc&lang=en&max=5')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        for (let i = 0; i <= data.totalArticles; ++i) {
            var title = data.articles[i].title;
            var description = data.articles[i].description;
            var url = data.articles[i].url;
            var image = data.articles[i].image;
            $(".post-thumb").eq(i).html('<img src="' + image + '" alt="">');
            $(".post-title").eq(i).html("<h6>" + title + "</h6>");
            $(".post-title").eq(i).attr("href", url);
            $(".post-description").eq(i).html(description);
        }
    });
});
