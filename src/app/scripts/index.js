/**
 * Created by gaohu on 2017/8/13.
 */
var yesNum = 0;
function yes() {
    alert("推荐成功！");
    yesNum++;
    document.getElementById('yesNum').innerHTML = yesNum;
}

function loadBlogList() {
    var xmlhttp;
    var listItemHtml = '';
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open('GET', 'server/blogList.json', true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            for (var i = 0; i < JSON.parse(xmlhttp.responseText).length; i++) {
                var listsHtml = '';
                listsHtml = '<li class="row" style="margin-bottom:25px;">'
                    + '<div class="col-lg-1 col-sm-1" style="padding:0;">'
                    + '<div id="yesNum" style="background:#fff7dd;width:50px;height:40px;margin:20px 5px 2px 0;text-align: center;line-height: 40px;">'
                    + JSON.parse(xmlhttp.responseText)[i].recommend
                    + '</div>'
                    + '<div onclick="yes()" style="width:50px;padding:5px 0;background: #f1f8fa;font-size: 12px;cursor:pointer">'
                    + '<span class="glyphicon glyphicon-thumbs-up" style="display:inline-block;padding-left:5px;"></span>'
                    + '推荐'
                    + '</div>'
                    + '</div>'
                    + '<div class="col-lg-11 col-sm-11" style="padding-left:0;">'
                    + '<h3><a href="views/detail.html" style="color:#169fe6">'
                    + JSON.parse(xmlhttp.responseText)[i].name
                    + '</a></h3>'
                    + '<div style="height:30px;line-height: 30px;margin-bottom:10px;font-size:12px;">'
                    + '<a href="#" style="text-decoration:none;">'
                    + '<img src="./img/man.png" alt="logo" style="width:30px;border-radius:30px;margin-right:10px;">'
                    + '</a>'
                    + '<span style="margin-right:10px;"><a href="#" style="color:#169fe6">'
                    + JSON.parse(xmlhttp.responseText)[i].creator
                    + '</a></span>'
                    + '<span style="margin-right:10px;">'
                    + JSON.parse(xmlhttp.responseText)[i].create_at
                    + '</span>'
                    + '<span style="margin-right:10px;">'
                    + '<span style="padding:3px 5px;background: #00a8e6;color:#fff">技术</span>'
                    + '<span style="padding:3px 5px;background: #337ab7;color:#fff;margin-left:5px;">前端</span>'
                    + '</span>'
                    + '<span style="margin-right:10px;">评论（<span>' + JSON.parse(xmlhttp.responseText)[i].comment + '</span>）</span>'
                    + '<span style="margin-right:10px;">阅读（<span>' + JSON.parse(xmlhttp.responseText)[i].readed + '</span>）</span>'
                    + '</div>'
                    + '<div class="row">'
                    + '<div class="col-lg-3" style="padding-right:0">'
                    + '<a href="views/detail.html"><img src="' + JSON.parse(xmlhttp.responseText)[i].img + '" alt="" style="width:100%;height:100%;cursor:pointer"></a>'
                    + '</div>'
                    + '<div class="col-lg-9">'
                    + JSON.parse(xmlhttp.responseText)[i].description
                    + '</div>'
                    + '</div>'
                    + '</div>'
                    + '</li>';
                listItemHtml += listsHtml;
            }
            document.getElementById('blogListContent').innerHTML = listItemHtml;
            filterBlogList(JSON.parse(xmlhttp.responseText));
        }
    };
}
loadBlogList();

function filterBlogList(blogListData) {
    var newBlogListData = blogListData;
    for (var i = 0; i < newBlogListData.length; i++) {
        for (var j = 0; j < newBlogListData.length - i - 1; j++) {
            if (newBlogListData[j].recommend < newBlogListData[j + 1].recommend) {
                var t = newBlogListData[j];
                newBlogListData[j] = newBlogListData[j + 1];
                newBlogListData[j + 1] = t;
            }
        }
    }
    var sliderHtml = '';
    var index = 1;
    for (var k = 0; k < 5; k++) {
        var sliderItemHtml = '';
        sliderItemHtml = '<li style="cursor: pointer;list-style:none;padding:15px;border:1px solid #ccc;border-top:none;font-size:16px;">'
            + '<a href="#" style="color:#999;">' + index + '. ' + newBlogListData[k].name + '</a></li>';
        sliderHtml += sliderItemHtml;
        index++;
    }
    document.getElementById('bestFive').innerHTML = '<li style="list-style:none;padding:15px;border:1px solid #169fe6;background: #169fe6;font-size:18px;color:#fff;">'
        + '推荐排行榜：'
        + '</li>' + sliderHtml;
}





