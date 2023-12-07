<html>
<head>
<title>音乐电台</title>
<style type="text/css">
html,body,div,iframe{margin:0;padding:0;overflow:hidden;}
.tv{margin:0;padding:0;width:100%;height:100%;}
iframe{v:expression(this.src='about:blank',this.outerHTML='');}
#aframe{v:expression() !important}
</style>
</script>
</head>
<body>
<script language="JavaScript"> 
if(top==self)top.location="http://tv.bingdou.net/";
document.oncontextmenu=new Function("event.returnValue=false;"); 
document.onselectstart=new Function("event.returnValue=false;");
function killErrors() {
return true;
}
window.onerror = killErrors; 
</script>
<script type="text/javascript">
function QueryString(){
var name,value,i;
var str=location.href;
var num=str.indexOf("?")
str=str.substr(num+1);
var arrtmp=str.split("&");
for(i=0;i < arrtmp.length;i++){
num=arrtmp[i].indexOf("=");
	if(num>0){
		name=arrtmp[i].substring(0,num);
		value=arrtmp[i].substr(num+1);
		this[name]=value;
	}
}
}
var Request=new QueryString();
url=Request["url"];
var w = '750'; //宽度
var h = '520'; //高度
var s = 'yes'; //是否显示滚动条，yes显示，no不显示
if (url=="wangyi") {document.write('<iframe class="tv" id="aframe" src="http://music.163.com/embedapp" width="745" height="515" frameborder="0" scrolling="no"></frame>');}
else if (url=="yyt")    {document.write('<iframe class="tv" id="aframe" src="http://www.yinyuetai.com/baidu/" height="450" width="800" frameborder="0" scrolling="no"></frame>');}
else if (url=="dbfm")   {document.write('<iframe class="tv" id="aframe" src="http://douban.fm/partner/player360" width="640" height="375" frameborder="0" scrolling="no"></frame>');}
else if (url=="bwdt")   {document.write('<iframe class="tv" id="aframe" src="http://app.beva.com/hao123/fm/index.html" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="sougou") {document.write('<iframe class="tv" id="aframe" src="http://player.mbox.sogou.com/player" height="540" width="630" frameborder="0" scrolling="no"></frame>');}
else if (url=="duole")  {document.write('<iframe class="tv" id="aframe" src="http://www.duole.fm/" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="xiami")  {document.write('<iframe class="tv" id="aframe" src="http://www.xiami.com/player/hao123/" width="750" height="520" scrolling="no"></frame>');}
else if (url=="kugou")  {document.write('<iframe class="tv" id="aframe" src="http://web.kugou.com/hao123.html" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="1ting")  {document.write('<iframe class="tv" id="aframe" src="http://www.1ting.com/api/hao123/" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="kuwo")   {document.write('<iframe class="tv" id="aframe" src="http://player.kuwo.cn/webmusic/webmusic2011/hao123/index.jsp?f=coobotv" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="qqmusic"){document.write('<iframe class="tv" id="aframe" src="http://y.qq.com/webplayer/index.html" width="750" height="720" frameborder="0" scrolling="no"></frame>');}
else if (url=="baidu")  {document.write('<iframe class="tv" id="aframe" src="http://fm.baidu.com/" height="550" width="740" frameborder="0" scrolling="no"></iframe>');}
else if (url=="duomi")  {document.write('<iframe class="tv" id="aframe" src="http://app.duomiyy.com/webradio/hao123/" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="jiuku")  {document.write('<iframe class="tv" id="aframe" src="http://www.jiuku.com/app/hao123" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="tingfm") {document.write('<iframe class="tv" id="aframe" src="http://ting.baidu.com/app/hao123/tingradio" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="sohu")   {document.write('<iframe class="tv" id="aframe" src="http://tv.sohu.com/upload/static/uvideo/yinyue/sogou.html" width="750" height="540" frameborder="0" scrolling="no"></frame>');}
else if (url=="a8")     {document.write('<iframe class="tv" id="aframe" src="http://space.a8.com/playbox/" style="MARGIN-TOP: -90px;margin-left:-20px;" width="780" height="590" frameborder="0" scrolling="no"></frame>');}
else if (url=="duole")  {document.write('<iframe class="tv" id="aframe" src="http://www.duole.com/application/qihu360" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="xiamidt") {document.write('<iframe class="tv" id="aframe" src="http://www.xiami.com/kuang/hao123/" width="560" height="320" frameborder="0" scrolling="no"></frame>');}
else if (url=="duoledt") {document.write('<iframe class="tv" id="aframe" src="http://www.duole.fm/fm" width="750" height="520" frameborder="0" scrolling="no"></frame>');}
else if (url=="kugoudt") {document.write('<iframe class="tv" id="aframe" src="http://topic.kugou.com/radio/" width="700" height="450" frameborder="0" scrolling="no"></frame>');}
else if (url=="xiamidt") {document.write('<iframe class="tv" id="aframe" src="http://www.xiami.com/kuang/hao123/" width="560" height="320" frameborder="0" scrolling="no"></frame>');}
else if (url=="fm") {document.write('<iframe class="tv" id="aframe" src="http://fm.baidu.com/" height="540" width="740" style="MARGIN-TOP: -125px" frameborder="0" scrolling="no"></frame>');}
else if (url=="dt") {document.write('<iframe class="tv" id="aframe" src="http://tv.x-99.cn/tv/music/dt/" height="520" width="310" frameborder="0" scrolling="no"></frame>');}
else if (url=="kuwodt") {document.write('<iframe class="tv" id="aframe" src="http://player.kuwo.cn/webmusic/kuwodt/diantai123.html" width="540" height="300" style="MARGIN-TOP: -50px" frameborder="0" scrolling="no"></frame>');}
else if (url=="9sky") {document.write('<iframe class="tv" id="aframe" src="http://co.9sky.com/mxplay/" width="580" height="540" frameborder="0" scrolling="no"></frame>');}
else if (url=="wochang") {document.write('<iframe class="tv" id="aframe" src="http://fm.5sing.com" style="MARGIN-TOP: -90px;margin-left:-60px;" width="850" height="600" frameborder="0" scrolling="no"></frame>');}
else if (url=="dongting") {document.write('<iframe class="tv" id="aframe" src="http://www.dongting.com/#a=taglist" width="740" height="520" frameborder="0" scrolling="no"></frame>');}
</script>
<div style="display:none;">
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=30775223" charset="UTF-8"></script>
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F0388e27ad00b627fe43bd8d8dea61a0b' type='text/javascript'%3E%3C/script%3E"));
</script>
</div>
</body>
</html>