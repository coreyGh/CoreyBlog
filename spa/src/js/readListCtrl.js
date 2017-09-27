/**
 * Created by gaohu on 2017/9/27.
 */
SPA_RESOLVE_INIT = function (transition) {
    var clientHeight = document.documentElement.clientHeight - 140;
    document.getElementById("readList").style.minHeight = clientHeight + "px";
};