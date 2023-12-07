(function(){function e(e){if(!e||e==u)return;var t=$("#iframeContainer"),n=$("#playerFrame"),i=o[e];l.css("top",260-Math.floor(i.height/2)+"px"),l.css("left",420-Math.floor(i.width/2)+"px"),l.html(i.src),$("#tabs .active").removeClass("active"),$("#tabs ."+e).parent().addClass("active"),t.css("display","block"),t.css("width",i.width+"px"),t.css("height",i.height+"px"),t.css("marginTop","-"+Math.floor(i.height/2)+"px"),t.css("marginLeft","-"+Math.floor(i.width/2)+"px"),n.attr("src",i.src);var s=a;do s=Math.ceil(Math.random()*10);while(s===a);var t=$("#container");t.removeClass("theme-"+a),t.addClass("theme-"+s),a=s,r(e);var f=+(new Date);c&&typeof monitor!="undefined"&&monitor.log({player:u,staytime:f-c},"detail"),c=f,u=e}function t(){$("#tabs").delegate("a","click",function(t){t.preventDefault();var n=$(this).attr("data-tab");e(n)})}function n(){var e=[
"images/t014439b223eca35ef8.jpg",
"images/t01941db9b20de3b2e5.jpg",
"images/t01ec370095f50e4483.jpg",
"images/t012d3f20c2519f4f86.jpg",
"images/t01b18538d42b01208e.jpg",
"images/t01ba8333bb6cb57cfb.jpg",
"images/t0148fa8fff31ac193e.jpg",
"images/t01d596c11794c17457.jpg",
"images/t0116cdde771d9fa032.jpg",
"images/t0174cb413b626b2b42.jpg"
];for(var t=0,n=e.length;t<n;t++)(new Image).src=e[t]}function r(e){window.localStorage&&(localStorage[f]=e)}function i(){var e="xiami",t="notset",n=location.href,r={
douban:1,
kugou:1,
kuwo:1,
cbdt:1,
xiami:1,
FIFM:1,
beiwa:1,
duole:1
};return n.indexOf("#")!=-1&&r[n.split("#")[1]]==1?t=e=n.split("#")[1]:window.localStorage&&localStorage[f]&&(t=e=localStorage[f]),typeof monitor!="undefined"&&monitor.log({defaultplayer:t},"detail"),e}function s(){t(),e(i()),setTimeout(n,1e4)}var o=
{douban:{src:"url.php?url=dbfm",width:640,height:380},
kuwo:{src:"url.php?url=kuwodt",width:540,height:400},
xiami:{src:"url.php?url=xiamidt",width:560,height:320},
kugou:{src:"url.php?url=kugoudt",width:700,height:450},
cbdt:{src:"url.php?url=dt",width:310,height:520},
FIFM:{src:"url.php?url=fm",width:740,height:480},
beva:{src:"url.php?url=bwdt",width:740,height:515},
duole:{src:"url.php?url=duoledt",width:740,height:513}},u=null,a=0,f="playerTab",l=$("#url"),c=0;s()})();