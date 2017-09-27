(function () {
    gRouter.init();
    var aClick = function () {
        gRouter.go("#/read");
    };
    aClick();
    gRouter.map('/blog', function (transition) {
        gRouter.asyncFun('js/blogListCtrl.js', 'views/blogList.html', 'content', transition)
    });
    gRouter.map('/read', function (transition) {
        gRouter.asyncFun('js/readListCtrl.js', 'views/readList.html', 'content', transition)
    });
})();