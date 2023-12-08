var IMGFOLDERPATH='images/';
var CONTEXTPATH='';
var isIE=navigator.userAgent.toLowerCase().indexOf("msie")!=-1;
var isIE6=navigator.userAgent.toLowerCase().indexOf("msie 6.0")!=-1;
var isGecko=navigator.userAgent.toLowerCase().indexOf("gecko")!=-1;
var isQuirks=document.compatMode=="BackCompat";
var ztitle;
var zwidth;
var zheight;
if(top!=self){top.location="/"}
function killErrors(){
return true;
}
window.onerror=killErrors;
function $(ele){
if(typeof(ele)=='string'){
ele=document.getElementById(ele)
if(!ele){
return null;
}
}
if(ele){
Core.attachMethod(ele);
}
return ele;
}
function $T(tagName,ele){
ele=$(ele);
ele=ele||document;
var ts=ele.getElementsByTagName(tagName);
var arr=[];
var len=ts.length;
for(var i=0;i<len;i++){
arr.push($(ts[i]));
}
return arr;
}
function stopEvent(event){
event=window.event||event;
if(!event){
return;
}
if(isGecko){
event.preventDefault();
event.stopPropagation();
}
event.cancelBubble=true
event.returnValue=false;
}
Array.prototype.remove=function(s){
for(var i=0;i<this.length;i++){
if(s==this[i]){
this.splice(i,1);
}
}
}
if(window.HTMLElement){
HTMLElement.prototype.__defineGetter__("parentElement",function(){
if(this.parentNode==this.ownerDocument)return null;
return this.parentNode;
});
HTMLElement.prototype.__defineSetter__("outerHTML",function(sHTML){
var r=this.ownerDocument.createRange();
r.setStartBefore(this);
var df=r.createContextualFragment(sHTML);
this.parentNode.replaceChild(df,this);
return sHTML;
});
HTMLElement.prototype.__defineGetter__("outerHTML",function(){
var attr;
var attrs=this.attributes;
var str="<"+this.tagName;
for(var i=0;i<attrs.length;i++){
attr=attrs[i];
if(attr.specified)
str+=" "+attr.name+'="'+attr.value+'"';
}
if(!this.canHaveChildren)
return str+">";
return str+">"+this.innerHTML+"</"+this.tagName+">";
});
HTMLElement.prototype.__defineSetter__("innerText",function(sText){
var parsedText=document.createTextNode(sText);
this.innerHTML=parsedText;
return parsedText;
});
HTMLElement.prototype.__defineGetter__("innerText",function(){
var r=this.ownerDocument.createRange();
r.selectNodeContents(this);
return r.toString();
});
}
var $E={};
$E.$A=function(attr,ele){
ele=ele||this;
ele=$(ele);
return ele.getAttribute?ele.getAttribute(attr):null;
}
$E.getTopLevelWindow=function(){
var pw=window;
while(pw!=pw.parent){
pw=pw.parent;
}
return pw;
}
$E.hide=function(ele){
ele=ele||this;
ele=$(ele);
ele.style.display='none';
}
$E.show=function(ele){
ele=ele||this;
ele=$(ele);
ele.style.display='';
}
$E.visible=function(ele){
ele=ele||this;
ele=$(ele);
if(ele.style.display=="none"){
return false;
}
return true;
}
var Core={};
Core.attachMethod=function(ele){
if(!ele||ele["$A"]){
return;
}
if(ele.nodeType==9){
return;
}
var win;
try{
if(isGecko){
win=ele.ownerDocument.defaultView;
}else{
win=ele.ownerDocument.parentWindow;
}
for(var prop in $E){
ele[prop]=win.$E[prop];
}
}catch(ex){
}
}
function Dialog(strID){
if(!strID){
alert("错误的Dialog ID");
return;
}
this.ID=strID;
this.isModal=true;
this.Width=400;
this.Height=300;
this.Top=0;
this.Left=0;
this.ParentWindow=null;
this.onLoad=null;
this.Window=null;
this.Title=null;
this.URL=null;
this.innerHTML=null
this.innerElementId=null
this.DialogArguments={};
this.WindowFlag=false;
this.Message=null;
this.MessageTitle=null;
this.ShowMessageRow=false;
this.ShowButtonRow=false;
this.Icon=null;
this.bgdivID=null;
}
Dialog._Array=[];
Dialog.prototype.showWindow=function(){
if(isIE){
this.ParentWindow.showModalessDialog(this.URL,this.DialogArguments,"dialogWidth:"+this.Width+";dialogHeight:"+this.Height+";help:no;scroll:no;status:no");
}
if(isGecko){
var sOption="location=no,menubar=no,status=no;toolbar=no,dependent=yes,dialog=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=no";
this.Window=this.ParentWindow.open('',this.URL,sOption,true);
var w=this.Window;
if(!w){
alert("发现弹出窗口被阻止,请更改浏览器设置,以便正常使用本功能!");
return;
}
w.moveTo(this.Left,this.Top);
w.resizeTo(this.Width,this.Height+30);
w.focus();
w.location.href=this.URL;
w.Parent=this.ParentWindow;
w.dialogArguments=this.DialogArguments;
}
}
Dialog.prototype.show=function(){
var pw=$E.getTopLevelWindow();
var doc=pw.document;
var cw=doc.compatMode=="BackCompat"?doc.body.clientWidth:doc.documentElement.clientWidth;
var ch=doc.compatMode=="BackCompat"?doc.body.clientHeight:doc.documentElement.clientHeight;
var sl=Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);
var st=Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);
var sw=Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth);
var sh=Math.max(doc.documentElement.scrollHeight,doc.body.scrollHeight);
sw=Math.max(sw,cw);
sh=Math.max(sh,ch);
if(!this.ParentWindow){
this.ParentWindow=window;
}
this.DialogArguments._DialogInstance=this;
this.DialogArguments.ID=this.ID;
if(!this.Height){
this.Height=this.Width/2;
}
if(this.Top==0){
this.Top=(ch-this.Height-30)/2+st-28;
}
if(this.Left==0){
this.Left=(cw-this.Width-12)/2+sl;
}
if(this.ShowButtonRow){
this.Top-=18;
}
if(this.WindowFlag){
this.showWindow();
return;
}
var arr=[];
arr.push("<div style=\"font-size: 12px;margin:5px 10px;\"><font color=\"#FFFFFF\">网络电视简介：双线，可回看，无需安装插件，多来路自动跳过暂失效资源，提供良好的用户体验<\/div>");
arr.push("<table style='-moz-user-select:none;' oncontextmenu='stopEvent(event);' onselectstart='stopEvent(event);' border='0' cellpadding='0' cellspacing='0' width='"+(this.Width+26)+"'>");
arr.push("  <tr style='cursor:move;' id='_draghandle_"+this.ID+"'>");
arr.push("    <td width='13' height='33' style=\"background-image:url("+IMGFOLDERPATH+"dialog_lt.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_lt.png', sizingMethod='crop');\"><div style='width:13px;'></div></td>");
arr.push("    <td height='33' style=\"background-image:url("+IMGFOLDERPATH+"dialog_ct.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_ct.png', sizingMethod='crop');\"><div style=\"float:left;font-weight:bold; color:#FFFFFF; padding:9px 0 0 4px;\"><img src=\""+IMGFOLDERPATH+"icon_dialog.gif\" align=\"absmiddle\">&nbsp;"+this.Title+"</div>");
arr.push("      <div style=\"position: relative;cursor:pointer; float:right; margin:5px 0 0; _margin:4px 0 0;height:17px; width:28px; background-image:url("+IMGFOLDERPATH+"dialog_closebtn.gif)\" onMouseOver=\"this.style.backgroundImage='url("+IMGFOLDERPATH+"dialog_closebtn_over.gif)'\" onMouseOut=\"this.style.backgroundImage='url("+IMGFOLDERPATH+"dialog_closebtn.gif)'\" drag='false' onClick=\"Dialog.getInstance('"+this.ID+"').CancelButton.onclick.apply(Dialog.getInstance('"+this.ID+"').CancelButton,[]);\"></div></td>");
arr.push("    <td width='13' height='33' style=\"background-image:url("+IMGFOLDERPATH+"dialog_rt.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_rt.png', sizingMethod='crop');\"><div style=\"width:13px;\"></div></td>");
arr.push("  </tr>");
arr.push("  <tr drag='false'><td width='13' style=\"background-image:url("+IMGFOLDERPATH+"dialog_mlm.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_mlm.png', sizingMethod='crop');\"></td>");
arr.push("    <td align='center' valign='top'><a href='#;' id='_forTab_"+this.ID+"'></a>");
arr.push("    <table width='100%' border='0' cellpadding='0' cellspacing='0' bgcolor='#FFFFFF'>");
arr.push("        <tr id='_MessageRow_"+this.ID+"' style='display:none'>");
arr.push("          <td height='50' valign='top'><table id='_MessageTable_"+this.ID+"' width='100%' border='0' cellspacing='0' cellpadding='8' style=\" background:#EAECE9 url("+IMGFOLDERPATH+"dialog_bg.jpg) no-repeat right top;\">");
arr.push("              <tr><td width='25' height='50' align='right'>&nbsp;</td>");
arr.push("                <td align='left' style='line-height:16px;'>");
arr.push("                <h5 class='fb' id='_MessageTitle_"+this.ID+"'>&nbsp;</h5>");
arr.push("                <div id='_Message_"+this.ID+"'>&nbsp;</div></td>");
arr.push("              </tr></table></td></tr>");
arr.push("        <tr><td align='center' valign='top'><div style='position:relative;width:"+this.Width+"px;height:"+this.Height+"px;'>");
arr.push("         <div  id='_Covering_"+this.ID+"' style='position:absolute; height:100%; width:100%;display:none;'>&nbsp;</div>");
if(this.innerHTML){
arr.push(this.innerHTML);
}else if(this.innerElementId){
}else if(this.URL){
arr.push("          <iframe src='");
if(this.URL.substr(0,7)=="http://live.64ma.com/tv/live.html"||this.URL.substr(0,1)=="/"){
arr.push(this.URL);
}else{
arr.push(CONTEXTPATH+this.URL);
}
arr.push("' id='_DialogFrame_"+this.ID+"' allowTransparency='true'  width='100%' height='100%' frameborder='0' style=\"background-color: #transparent; border:none;\"></iframe>");
}
arr.push("        </div></td></tr>");
arr.push("        <tr drag='false' id='_ButtonRow_"+this.ID+"'><td height='36'>");
arr.push("            <div id='_DialogButtons_"+this.ID+"' style='text-align:right; border-top:#dadee5 1px solid; padding:8px 20px; background-color:#f6f6f6;'>");
arr.push("            <input id='_ButtonOK_"+this.ID+"'  type='button' class='button' value='确 定'>");
arr.push("            <input id='_ButtonCancel_"+this.ID+"'  type='button' onclick=\"Dialog.getInstance('"+this.ID+"').close();\" value='取 消' class='button'>");
arr.push("            </div></td></tr>");
arr.push("      </table><a href='#;' onfocus='$(\"_forTab_"+this.ID+"\").focus();'></a></td>");
arr.push("    <td width='13' style=\"background-image:url("+IMGFOLDERPATH+"dialog_mrm.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_mrm.png', sizingMethod='crop');\"></td></tr>");
arr.push("  <tr><td width='13' height='13' style=\"background-image:url("+IMGFOLDERPATH+"dialog_lb.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_lb.png', sizingMethod='crop');\"></td>");
arr.push("    <td style=\"background-image:url("+IMGFOLDERPATH+"dialog_cb.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_cb.png', sizingMethod='crop');\"></td>");
arr.push("    <td width='13' height='13' style=\"background-image:url("+IMGFOLDERPATH+"dialog_rb.png) !important;background-image: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+IMGFOLDERPATH+"dialog_rb.png', sizingMethod='crop');\"></td>");
arr.push("  </tr></table>");
//arr.push("<table border=\"0\" width=\"960\" style=\"font-size: 14px;margin:5px 10px;\" cellspacing=\"0\" cellpadding=\"0\" height=\"30\"><tr><td height=\"30\"><p align=\"center\"><a href=\"http:\/\/live.64ma.com\/\" target=\"_blank\"><font color=\"#FCFF00\">友情链接：64码<\/font><\/a><\/td><\/tr><\/table>");
this.TopWindow=pw;
var bgdiv=pw.$("_DialogBGDiv");
if(!bgdiv){
bgdiv=pw.document.createElement("div");
bgdiv.id="_DialogBGDiv";
$E.hide(bgdiv);
pw.$T("body")[0].appendChild(bgdiv);
if(isIE6){
var bgIframeBox=pw.document.createElement('<div style="position:relative;width:100%;height:100%;"></div>');
var bgIframe=pw.document.createElement('<iframe src="about:blank" style="filter:alpha(opacity=1);" width="100%" height="100%"></iframe>');
var bgIframeMask=pw.document.createElement('<div src="about:blank" style="position:absolute;background-color:#333;filter:alpha(opacity=1);width:100%;height:100%;"></div>');
bgIframeBox.appendChild(bgIframeMask);
bgIframeBox.appendChild(bgIframe);
bgdiv.appendChild(bgIframeBox);
var bgIframeDoc=bgIframe.contentWindow.document;
bgIframeDoc.open();
bgIframeDoc.write("<body style='background-color:#333' oncontextmenu='return false;'></body>");
bgIframeDoc.close();
}
}
var div=pw.$("_DialogDiv_"+this.ID);
if(!div){
div=pw.document.createElement("div");
$E.hide(div);
div.id="_DialogDiv_"+this.ID;
pw.$T("body")[0].appendChild(div);
}
this.DialogDiv=div;
div.innerHTML=arr.join('\n');
if(this.innerElementId){
var innerElement=$(this.innerElementId);
innerElement.style.position="";
innerElement.style.display="";
if(isIE){
var fragment=pw.document.createElement("div");
fragment.innerHTML=innerElement.outerHTML;
innerElement.outerHTML="";
pw.$("_Covering_"+this.ID).parentNode.appendChild(fragment)
}else{
pw.$("_Covering_"+this.ID).parentNode.appendChild(innerElement)
}
}
pw.$("_DialogDiv_"+this.ID).DialogInstance=this;
if(this.URL)
pw.$("_DialogFrame_"+this.ID).DialogInstance=this;
pw.Drag.init(pw.$("_draghandle_"+this.ID),pw.$("_DialogDiv_"+this.ID));
if(!isIE){
pw.$("_DialogDiv_"+this.ID).dialogId=this.ID;
pw.$("_DialogDiv_"+this.ID).onDragStart=function(){$("_Covering_"+this.dialogId).style.display=""}
pw.$("_DialogDiv_"+this.ID).onDragEnd=function(){$("_Covering_"+this.dialogId).style.display="none"}
}
this.OKButton=pw.$("_ButtonOK_"+this.ID);
this.CancelButton=pw.$("_ButtonCancel_"+this.ID);
if(this.ShowMessageRow){
$E.show(pw.$("_MessageRow_"+this.ID));
if(this.MessageTitle){
pw.$("_MessageTitle_"+this.ID).innerHTML=this.MessageTitle;
}
if(this.Message){
pw.$("_Message_"+this.ID).innerHTML=this.Message;
}
}
if(!this.ShowButtonRow){
pw.$("_ButtonRow_"+this.ID).hide();
}
if(this.CancelEvent){
this.CancelButton.onclick=this.CancelEvent;
}
if(this.OKEvent){
this.OKButton.onclick=this.OKEvent;
}
if(!this.AlertFlag){
$E.show(bgdiv);
this.bgdivID="_DialogBGDiv";
}else{
bgdiv=pw.$("_AlertBGDiv");
if(!bgdiv){
bgdiv=pw.document.createElement("div");
bgdiv.id="_AlertBGDiv";
$E.hide(bgdiv);
pw.$T("body")[0].appendChild(bgdiv);
if(isIE6){
var bgIframeBox=pw.document.createElement('<div style="position:relative;width:100%;height:100%;"></div>');
var bgIframe=pw.document.createElement('<iframe src="about:blank" style="filter:alpha(opacity=1);" width="100%" height="100%"></iframe>');
var bgIframeMask=pw.document.createElement('<div src="about:blank" style="position:absolute;background-color:#333;filter:alpha(opacity=1);width:100%;height:100%;"></div>');
bgIframeBox.appendChild(bgIframeMask);
bgIframeBox.appendChild(bgIframe);
bgdiv.appendChild(bgIframeBox);
var bgIframeDoc=bgIframe.contentWindow.document;
bgIframeDoc.open();
bgIframeDoc.write("<body style='background-color:#333' oncontextmenu='return false;'></body>");
bgIframeDoc.close();
}
bgdiv.style.cssText="background-color:#333;position:absolute;left:0px;top:0px;opacity:0.4;filter:alpha(opacity=40);width:100%;height:"+sh+"px;z-index:991";
}
$E.show(bgdiv);
this.bgdivID="_AlertBGDiv";
}
this.DialogDiv.style.cssText="position:absolute; display:block;z-index:"+(this.AlertFlag?992:990)+";left:"+this.Left+"px;top:"+this.Top+"px";
if(!this.AlertFlag){
var win=window;
var flag=false;
while(win!=win.parent){
if(win._DialogInstance){
win._DialogInstance.DialogDiv.style.zIndex=959;
flag=true;
break;
}
win=win.parent;
}
if(!flag){
bgdiv.style.cssText="background-color:#333;position:absolute;left:0px;top:0px;opacity:0.4;filter:alpha(opacity=15);width:100%;height:"+sh+"px;z-index:960";
}
}
var pwbody=doc.getElementsByTagName(isQuirks?"BODY":"HTML")[0];
pwbody.style.overflow="hidden";
pw.Dialog._Array.push(this.ID);
}
Dialog.prototype.addParam=function(paramName,paramValue){
this.DialogArguments[paramName]=paramValue;
}
Dialog.prototype.close=function(){
if(this.innerElementId){
var innerElement=$E.getTopLevelWindow().$(this.innerElementId);
innerElement.style.display="none";
if(isIE){
var fragment=document.createElement("div");
fragment.innerHTML=innerElement.outerHTML;
innerElement.outerHTML="";
$T("body")[0].appendChild(fragment)
}else{
$T("body")[0].appendChild(innerElement)
}
}
if(this.WindowFlag){
this.ParentWindow.$D=null;
this.ParentWindow.$DW=null;
this.Window.opener=null;
this.Window.close();
this.Window=null;
}else{
var pw=$E.getTopLevelWindow();
var doc=pw.document;
var win=window;
var flag=false;
while(win!=win.parent){
if(win._DialogInstance){
flag=true;
win._DialogInstance.DialogDiv.style.zIndex=960;
break;
}
win=win.parent;
}
if(this.AlertFlag){
$E.hide(pw.$("_AlertBGDiv"));
}
if(!flag&&!this.AlertFlag){
pw.eval('window._OpacityFunc = function(){var w = $E.getTopLevelWindow();$E.hide(w.$("_DialogBGDiv"));}');
pw._OpacityFunc();
}
this.DialogDiv.outerHTML="";
var pwbody=doc.getElementsByTagName(isQuirks?"BODY":"HTML")[0];
pwbody.style.overflow="auto";
pw.Dialog._Array.remove(this.ID);
}
sAlert("欢迎使用"+ztitle);
}
Dialog.prototype.addButton=function(id,txt,func){
var html="<input id='_Button_"+this.ID+"_"+id+"' type='button' value='"+txt+"'> ";
var pw=$E.getTopLevelWindow();
pw.$("_DialogButtons_"+this.ID).$T("input")[0].getParent("a").insertAdjacentHTML("beforeBegin",html);
pw.$("_Button_"+this.ID+"_"+id).onclick=func;
}
Dialog.close=function(evt){
window.Args._DialogInstance.close();
}
Dialog.getInstance=function(id){
var pw=$E.getTopLevelWindow()
var f=pw.$("_DialogDiv_"+id);
if(!f){
return null;
}
return f.DialogInstance;
}
Dialog.AlertNo=0;
Dialog.alert=function(msg,func,w,h){
var pw=$E.getTopLevelWindow()
var diag=new Dialog("_DialogAlert"+Dialog.AlertNo++);
diag.ParentWindow=pw;
diag.Width=w?w:300;
diag.Height=h?h:120;
diag.Title="系统提示";
diag.URL="javascript:void(0);";
diag.AlertFlag=true;
diag.CancelEvent=function(){
diag.close();
if(func){
func();
}
};
diag.show();
pw.$("_AlertBGDiv").style.display="";
$E.hide(pw.$("_ButtonOK_"+diag.ID));
var win=pw.$("_DialogFrame_"+diag.ID).contentWindow;
var doc=win.document;
doc.open();
doc.write("<body oncontextmenu='return false;'></body>");
var arr=[];
arr.push("<table height='100%' border='0' align='center' cellpadding='10' cellspacing='0'>");
arr.push("<tr><td align='right'><img id='Icon' src='"+IMGFOLDERPATH+"icon_alert.gif' width='34' height='34' align='absmiddle'></td>");
arr.push("<td align='left' id='Message' style='font-size:9pt'>"+msg+"</td></tr></table>");
var div=doc.createElement("div");
div.innerHTML=arr.join('');
doc.body.appendChild(div);
doc.close();
var h=Math.max(doc.documentElement.scrollHeight,doc.body.scrollHeight);
var w=Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth);
if(w>300){
win.frameElement.width=w;
}
if(h>120){
win.frameElement.height=h;
}
diag.CancelButton.value="确 定";
diag.CancelButton.focus();
pw.$("_DialogButtons_"+diag.ID).style.textAlign="center";
}
Dialog.confirm=function(msg,func1,func2,w,h){
var pw=$E.getTopLevelWindow()
var diag=new Dialog("_DialogAlert"+Dialog.AlertNo++);
diag.Width=w?w:300;
diag.Height=h?h:120;
diag.Title="信息确认";
diag.URL="javascript:void(0);";
diag.AlertFlag=true;
diag.CancelEvent=function(){
diag.close();
if(func2){
func2();
}
};
diag.OKEvent=function(){
diag.close();
if(func1){
func1();
}
};
diag.show();
pw.$("_AlertBGDiv").style.dispaly="";
var win=pw.$("_DialogFrame_"+diag.ID).contentWindow;
var doc=win.document;
doc.open();
doc.write("<body oncontextmenu='return false;'></body>");
var arr=[];
arr.push("<table height='100%' border='0' align='center' cellpadding='10' cellspacing='0'>");
arr.push("<tr><td align='right'><img id='Icon' src='"+IMGFOLDERPATH+"icon_query.gif' width='34' height='34' align='absmiddle'></td>");
arr.push("<td align='left' id='Message' style='font-size:9pt'>"+msg+"</td></tr></table>");
var div=doc.createElement("div");
div.innerHTML=arr.join('');
doc.body.appendChild(div);
doc.close();
diag.OKButton.focus();
pw.$("_DialogButtons_"+diag.ID).style.textAlign="center";
}
var _DialogInstance=window.frameElement?window.frameElement.DialogInstance:null;
var Page={};
Page.onDialogLoad=function(){
if(_DialogInstance){
if(_DialogInstance.Title){
document.title=_DialogInstance.Title;
}
window.Args=_DialogInstance.DialogArguments;
_DialogInstance.Window=window;
window.Parent=_DialogInstance.ParentWindow;
}
}
Page.onDialogLoad();
PageOnLoad=function(){
var d=_DialogInstance;
if(d){
try{
d.ParentWindow.$D=d;
d.ParentWindow.$DW=d.Window;
var flag=false;
if(!this.AlertFlag){
var win=d.ParentWindow;
while(win!=win.parent){
if(win._DialogInstance){
flag=true;
break;
}
win=win.parent;
}
if(!flag){
$E.getTopLevelWindow().$("_DialogBGDiv").style.opacity="0.4";
$E.getTopLevelWindow().$("_DialogBGDiv").style.filter="alpha(opacity=40)";
}
}
if(d.AlertFlag){
$E.show($E.getTopLevelWindow().$("_AlertBGDiv"));
}
if(d.ShowButtonRow&&$E.visible(d.CancelButton)){
d.CancelButton.focus();
}
if(d.onLoad){
d.onLoad();
}
}catch(ex){alert("DialogOnLoad:"+ex.message+"\t("+ex.fileName+" "+ex.lineNumber+")");}
}
}
Dialog.onKeyDown=function(event){
if(event.shiftKey&&event.keyCode==9){
var pw=$E.getTopLevelWindow();
if(pw.Dialog._Array.length>0){
stopEvent(event);
return false;
}
}
if(event.keyCode==27){
var pw=$E.getTopLevelWindow();
if(pw.Dialog._Array.length>0){
var diag=pw.Dialog.getInstance(pw.Dialog._Array[pw.Dialog._Array.length-1]);
diag.CancelButton.onclick.apply(diag.CancelButton,[]);
}
}
}
Dialog.dragStart=function(evt){
}
Dialog.setPosition=function(){
if(window.parent!=window)return;
var pw=$E.getTopLevelWindow();
var DialogArr=pw.Dialog._Array;
if(DialogArr==null||DialogArr.length==0)return;
for(i=0;i<DialogArr.length;i++)
{
pw.$("_DialogDiv_"+DialogArr[i]).DialogInstance.setPosition();
}
}
Dialog.prototype.setPosition=function(){
var pw=$E.getTopLevelWindow();
var doc=pw.document;
var cw=doc.compatMode=="BackCompat"?doc.body.clientWidth:doc.documentElement.clientWidth;
var ch=doc.compatMode=="BackCompat"?doc.body.clientHeight:doc.documentElement.clientHeight;
var sl=Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft);
var st=Math.max(doc.documentElement.scrollTop,doc.body.scrollTop);
var sw=Math.max(doc.documentElement.scrollWidth,doc.body.scrollWidth);
var sh=Math.max(doc.documentElement.scrollHeight,doc.body.scrollHeight);
sw=Math.max(sw,cw);
sh=Math.max(sh,ch);
this.Top=(ch-this.Height-30)/2+st-8;
this.Left=(cw-this.Width-12)/2+sl;
if(this.ShowButtonRow){
this.Top-=18;
}
this.DialogDiv.style.top=this.Top+"px";
this.DialogDiv.style.left=this.Left+"px";
pw.$(this.bgdivID).style.height=sh+"px";
}
var Drag={
"obj":null,
"init":function(handle,dragBody,e){
if(e==null){
handle.onmousedown=Drag.start;
}
handle.root=dragBody;
if(isNaN(parseInt(handle.root.style.left)))handle.root.style.left="0px";
if(isNaN(parseInt(handle.root.style.top)))handle.root.style.top="0px";
handle.root.onDragStart=new Function();
handle.root.onDragEnd=new Function();
handle.root.onDrag=new Function();
if(e!=null){
var handle=Drag.obj=handle;
e=Drag.fixe(e);
var top=parseInt(handle.root.style.top);
var left=parseInt(handle.root.style.left);
handle.root.onDragStart(left,top,e.pageX,e.pageY);
handle.lastMouseX=e.pageX;
handle.lastMouseY=e.pageY;
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;
}
},
"start":function(e){
var handle=Drag.obj=this;
e=Drag.fixEvent(e);
var top=parseInt(handle.root.style.top);
var left=parseInt(handle.root.style.left);
handle.root.onDragStart(left,top,e.pageX,e.pageY);
handle.lastMouseX=e.pageX;
handle.lastMouseY=e.pageY;
document.onmousemove=Drag.drag;
document.onmouseup=Drag.end;
return false;
},
"drag":function(e){
e=Drag.fixEvent(e);
var handle=Drag.obj;
var mouseY=e.pageY;
var mouseX=e.pageX;
var top=parseInt(handle.root.style.top);
var left=parseInt(handle.root.style.left);
if(isIE){Drag.obj.setCapture();}else{e.preventDefault();};
var currentLeft,currentTop;
currentLeft=left+mouseX-handle.lastMouseX;
currentTop=top+(mouseY-handle.lastMouseY);
handle.root.style.left=currentLeft+"px";
handle.root.style.top=currentTop+"px";
handle.lastMouseX=mouseX;
handle.lastMouseY=mouseY;
handle.root.onDrag(currentLeft,currentTop,e.pageX,e.pageY);
return false;
},
"end":function(){
if(isIE){Drag.obj.releaseCapture();};
document.onmousemove=null;
document.onmouseup=null;
Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left),parseInt(Drag.obj.root.style.top));
Drag.obj=null;
},
"fixEvent":function(e){
var sl=Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
var st=Math.max(document.documentElement.scrollTop,document.body.scrollTop);
if(typeof e=="undefined")e=window.event;
if(typeof e.layerX=="undefined")e.layerX=e.offsetX;
if(typeof e.layerY=="undefined")e.layerY=e.offsetY;
if(typeof e.pageX=="undefined")e.pageX=e.clientX+sl-document.body.clientLeft;
if(typeof e.pageY=="undefined")e.pageY=e.clientY+st-document.body.clientTop;
return e;
}
};
if(isIE){
document.attachEvent("onkeydown",Dialog.onKeyDown);
window.attachEvent("onload",PageOnLoad);
window.attachEvent('onresize',Dialog.setPosition);
}else{
document.addEventListener("keydown",Dialog.onKeyDown,false);
window.addEventListener("load",PageOnLoad,false);
window.addEventListener('resize',Dialog.setPosition,false);
}
if(!Array.prototype.push)
{
Array.prototype.push=function()
{
var startLength=this.length;
for(var j=0;j<arguments.length;j++)
{
this[startLength+j]=arguments[j];
}
return this.length;
}
};
function G()
{
var elements=new Array();
for(var j=0;j<arguments.length;j++)
{
var element=arguments[j];
if(typeof element=='string')
{
element=document.getElementById(element);
}
if(arguments.length==1)
{
return element;
}
elements.push(element);
};
return elements;
};
Function.prototype.bind=function(object)
{
var __method=this;
return function()
{
__method.apply(object,arguments);
};
};
Function.prototype.bindAsEventListener=function(object)
{
var __method=this;
return function(event){__method.call(object,event||window.event);};
};
Object.extend=function(destination,source)
{
for(property in source)
{
destination[property]=source[property];
};
return destination;
};
if(!window.Event)
{
var Event=new Object();
};
Object.extend(
Event,
{
observers:false,
element:function(event)
{
return event.target||event.srcElement;
},
isLeftClick:function(event)
{
return(((event.which)&&(event.which==1))||((event.button)&&(event.button==1)));
},
pointerX:function(event)
{
return event.pageX||(event.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft));
},
pointerY:function(event)
{
return event.pageY||(event.clientY+(document.documentElement.scrollTop||document.body.scrollTop));
},
stop:function(event)
{
if(event.preventDefault)
{
event.preventDefault();
event.stopPropagation();
}
else
{
event.returnValue=false;
event.cancelBubble=true;
};
},
findElement:function(event,tagName)
{
var element=Event.element(event);
while(element.parentNode&&(!element.tagName||(element.tagName.toUpperCase()!=tagName.toUpperCase())))
element=element.parentNode;
return element;
},
_observeAndCache:function(element,name,observer,useCapture)
{
if(!this.observers)
this.observers=[];
if(element.addEventListener)
{
this.observers.push([element,name,observer,useCapture]);
element.addEventListener(name,observer,useCapture);
}
else if(element.attachEvent)
{
this.observers.push([element,name,observer,useCapture]);
element.attachEvent('on'+name,observer);
};
},
unloadCache:function()
{
if(!Event.observers)
return;
for(var j=0;j<Event.observers.length;j++)
{
Event.stopObserving.apply(this,Event.observers[j]);
Event.observers[j][0]=null;
};
Event.observers=false;
},
observe:function(element,name,observer,useCapture)
{
var element=G(element);
useCapture=useCapture||false;
if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.attachEvent))
name='keydown';
this._observeAndCache(element,name,observer,useCapture);
},
stopObserving:function(element,name,observer,useCapture)
{
var element=G(element);
useCapture=useCapture||false;
if(name=='keypress'&&(navigator.appVersion.match(/Konqueror|Safari|KHTML/)||element.detachEvent))
name='keydown';
if(element.removeEventListener)
{
element.removeEventListener(name,observer,useCapture);
}
else if(element.detachEvent)
{
element.detachEvent('on'+name,observer);
};
}
}
);
Event.observe(window,'unload',Event.unloadCache,false);
var Class=function()
{
var _class=function()
{
this.initialize.apply(this,arguments);
};
for(j=0;j<arguments.length;j++)
{
superClass=arguments[j];
for(member in superClass.prototype)
{
_class.prototype[member]=superClass.prototype[member];
};
};
_class.child=function()
{
return new Class(this);
};
_class.extend=function(f)
{
for(property in f)
{
_class.prototype[property]=f[property];
};
};
return _class;
};
function space(flag)
{
if(flag=="begin")
{
var ele=document.getElementById("ft");
if(typeof(ele)!="undefined"&&ele!=null)
ele.id="ft_popup";
ele=document.getElementById("usrbar");
if(typeof(ele)!="undefined"&&ele!=null)
ele.id="usrbar_popup";
}
else if(flag=="end")
{
var ele=document.getElementById("ft_popup");
if(typeof(ele)!="undefined"&&ele!=null)
ele.id="ft";
ele=document.getElementById("usrbar_popup");
if(typeof(ele)!="undefined"&&ele!=null)
ele.id="usrbar";
};
};
var Popup=new Class();
Popup.prototype={
iframeIdName:'ifr_popup',
initialize:function(config)
{
this.config=Object.extend({contentType:1,isHaveTitle:true,scrollType:'no',isBackgroundCanClick:false,isSupportDraging:true,isShowShadow:true,isReloadOnClose:true,width:400,height:300},config||{});
this.info={shadowWidth:4,title:"",contentUrl:"",contentHtml:"",callBack:null,parameter:null,confirmCon:"",alertCon:"",someHiddenTag:"select,object,embed",someHiddenEle:"",overlay:0,coverOpacity:40};
this.color={cColor:"#EEEEEE",bColor:"#FFFFFF",tColor:"#709CD2",wColor:"#FFFFFF"};
this.dropClass=null;
this.someToHidden=[];
if(!this.config.isHaveTitle)
{
this.config.isSupportDraging=false;
}
this.iniBuild();
},
setContent:function(arrt,val)
{
if(val!='')
{
switch(arrt)
{
case'width':this.config.width=val;
break;
case'height':this.config.height=val;
break;
case'title':this.info.title=val;
break;
case'contentUrl':this.info.contentUrl=val;
break;
case'contentHtml':this.info.contentHtml=val;
break;
case'callBack':this.info.callBack=val;
break;
case'parameter':this.info.parameter=val;
break;
case'confirmCon':this.info.confirmCon=val;
break;
case'alertCon':this.info.alertCon=val;
break;
case'someHiddenTag':this.info.someHiddenTag=val;
break;
case'someHiddenEle':this.info.someHiddenEle=val;
break;
case'overlay':this.info.overlay=val;
};
};
},
iniBuild:function()
{
G('dialogCase')?G('dialogCase').parentNode.removeChild(G('dialogCase')):function(){};
var oDiv=document.createElement('span');
oDiv.id='dialogCase';
document.body.appendChild(oDiv);
},
build:function()
{
var baseZIndex=10001+this.info.overlay*10;
var showZIndex=baseZIndex+2;
this.iframeIdName='ifr_popup'+this.info.overlay;
var close='<input type="image" id="dialogBoxClose" src="'+IMGFOLDERPATH+'dialogclose.gif" border="0" width="16" height="16" align="absmiddle" title="关闭"/>';
var cB='filter: alpha(opacity='+this.info.coverOpacity+');opacity:'+this.info.coverOpacity/100+';';
var cover='<div id="dialogBoxBG" style="position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:'+baseZIndex+';'+cB+'background-color:'+this.color.cColor+';display:none;"></div>';
var mainBox='<div id="dialogBox" style="border:1px solid '+this.color.tColor+';display:none;z-index:'+showZIndex+';position:relative;width:'+this.config.width+'px;"><table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="'+this.color.bColor+'">';
if(this.config.isHaveTitle)
{
mainBox+='<tr height="24" bgcolor="'+this.color.tColor+'"><td><table style="-moz-user-select:none;height:24px;" width="100%" border="0" cellpadding="0" cellspacing="0" ><tr>'+'<td width="6" height="24"></td><td id="dialogBoxTitle" style="color:'+this.color.wColor+';font-size:14px;font-weight:bold;">'+this.info.title+' </td>'+'<td id="dialogClose" width="20" align="right" valign="middle">'+close+'</td><td width="6"></td></tr></table></td></tr>';
}
else
{
mainBox+='<tr height="10"><td align="right">'+close+'</td></tr>';
};
mainBox+='<tr style="height:'+this.config.height+'px" valign="top"><td id="dialogBody" style="position:relative;"></td></tr></table></div>'+'<div id="dialogBoxShadow" style="display:none;z-index:'+baseZIndex+';"></div>';
if(!this.config.isBackgroundCanClick)
{
G('dialogCase').innerHTML=cover+mainBox;
G('dialogBoxBG').style.height=document.body.scrollHeight;
}
else
{
G('dialogCase').innerHTML=mainBox;
}
Event.observe(G('dialogBoxClose'),"click",this.reset.bindAsEventListener(this),false);
if(this.config.isSupportDraging)
{
dropClass=new Dragdrop(this.config.width,this.config.height,this.info.shadowWidth,this.config.isSupportDraging,this.config.contentType);
G("dialogBoxTitle").style.cursor="move";
};
this.lastBuild();
},
lastBuild:function()
{
var confirm='<div style="width:100%;height:100%;text-align:center;"><div style="margin:20px 20px 0 20px;font-size:14px;line-height:16px;color:#000000;">'+this.info.confirmCon+'</div><div style="margin:20px;"><input id="dialogOk" type="button" value=" 确定 " class="button"/> <input id="dialogCancel" type="button" value=" 取消 " class="button"/></div></div>';
var alert='<div style="width:100%;height:100%;text-align:center;"><div style="margin:20px 20px 0 20px;font-size:14px;line-height:16px;color:#000000;">'+this.info.alertCon+'</div><div style="margin:20px;"><input id="dialogYES" type="button" value=" 确定 " class="button"/></div></div>';
var baseZIndex=10001+this.info.overlay*10;
var coverIfZIndex=baseZIndex+4;
if(this.config.contentType==1)
{
var openIframe="<iframe width='100%' style='height:"+this.config.height+"px' name='"+this.iframeIdName+"' id='"+this.iframeIdName+"' src='"+this.info.contentUrl+"' frameborder='0' scrolling='"+this.config.scrollType+"'></iframe>";
var coverIframe="<div id='iframeBG' style='position:absolute;top:0px;left:0px;width:1px;height:1px;z-index:"+coverIfZIndex+";filter: alpha(opacity=00);opacity:0.00;background-color:#ffffff;'><div>";
G("dialogBody").innerHTML=openIframe+coverIframe;
}
else if(this.config.contentType==2)
{
G("dialogBody").innerHTML=this.info.contentHtml;
}
else if(this.config.contentType==3)
{
G("dialogBody").innerHTML=confirm;Event.observe(G('dialogOk'),"click",this.forCallback.bindAsEventListener(this),false);
Event.observe(G('dialogCancel'),"click",this.close.bindAsEventListener(this),false);
}
else if(this.config.contentType==4)
{
G("dialogBody").innerHTML=alert;
Event.observe(G('dialogYES'),"click",this.close.bindAsEventListener(this),false);
};
},
reBuild:function()
{
G('dialogBody').height=G('dialogBody').clientHeight;
this.lastBuild();
},
show:function()
{
this.hiddenSome();
this.middle();
if(this.config.isShowShadow)
this.shadow();
},
forCallback:function()
{
return this.info.callBack(this.info.parameter);
},
shadow:function()
{
var oShadow=G('dialogBoxShadow');
var oDialog=G('dialogBox');oShadow['style']['position']="absolute";
oShadow['style']['background']="#000";
oShadow['style']['display']="";
oShadow['style']['opacity']="0.2";
oShadow['style']['filter']="alpha(opacity=20)";
oShadow['style']['top']=oDialog.offsetTop+this.info.shadowWidth;
oShadow['style']['left']=oDialog.offsetLeft+this.info.shadowWidth;
oShadow['style']['width']=oDialog.offsetWidth;oShadow['style']['height']=oDialog.offsetHeight;
},
middle:function()
{
if(!this.config.isBackgroundCanClick)
G('dialogBoxBG').style.display='';
var oDialog=G('dialogBox');
oDialog['style']['position']="absolute";
oDialog['style']['display']='';
var sClientWidth=document.body.clientWidth;
var sClientHeight=document.documentElement.clientHeight;
var scrollPos;
if(typeof window.pageYOffset!='undefined'){
scrollPos=window.pageYOffset;
}
else if(typeof document.compatMode!='undefined'&&
document.compatMode!='BackCompat'){
scrollPos=document.documentElement.scrollTop;
}
else if(typeof document.body!='undefined'){
scrollPos=document.body.scrollTop;
}
var sScrollTop=scrollPos;
var sleft=(sClientWidth/2)-(oDialog.offsetWidth/2)+50;
var iTop=-80+(sClientHeight/2+sScrollTop)-(oDialog.offsetHeight/2);
var sTop=iTop>0?iTop:(sClientHeight/2+sScrollTop)-(oDialog.offsetHeight/2);
if(sTop<1)
sTop="20";
if(sleft<1)
sleft="20";
oDialog['style']['left']=(document.documentElement.clientWidth)/3+"px";
oDialog['style']['top']=(document.documentElement.scrollTop+(document.documentElement.clientHeight)/10)+"px";
window.onscroll=function(){
oDialog['style']['top']=(document.documentElement.scrollTop+(document.documentElement.clientHeight)/10)+"px";
G('dialogBoxShadow').style.top=(document.documentElement.scrollTop+(document.documentElement.clientHeight)/10+4)+"px";
};
},
reset:function()
{
if(this.config.isReloadOnClose)
{
top.location.reload();
};
this.close();
},
close:function()
{
G('dialogBox').style.display='none';
if(!this.config.isBackgroundCanClick)
G('dialogBoxBG').style.display='none';
if(this.config.isShowShadow)
G('dialogBoxShadow').style.display='none';
G('dialogBody').innerHTML='';
this.showSome();
},
hiddenSome:function()
{
var tag=this.info.someHiddenTag.split(",");
if(tag.length==1&&tag[0]=="")
{
tag.length=0;
}
for(var j=0;j<tag.length;j++)
{
this.hiddenTag(tag[j]);
};
var ids=this.info.someHiddenEle.split(",");
if(ids.length==1&&ids[0]=="")
ids.length=0;
for(var j=0;j<ids.length;j++)
{
this.hiddenEle(ids[j]);
};
space("begin");
},
hiddenTag:function(tagName)
{
var ele=document.getElementsByTagName(tagName);
if(ele!=null)
{
for(var j=0;j<ele.length;j++)
{
if(ele[j].style.display!="none"&&ele[j].style.visibility!='hidden')
{
ele[j].style.visibility='hidden';
this.someToHidden.push(ele[j]);
};
};
};
},
hiddenEle:function(id)
{
var ele=document.getElementById(id);
if(typeof(ele)!="undefined"&&ele!=null)
{
ele.style.visibility='hidden';
this.someToHidden.push(ele);
}
},
showSome:function()
{
for(var j=0;j<this.someToHidden.length;j++)
{
this.someToHidden[j].style.visibility='visible';
};
space("end");
}
};
var Dragdrop=new Class();
Dragdrop.prototype={
initialize:function(width,height,shadowWidth,showShadow,contentType)
{
this.dragData=null;
this.dragDataIn=null;
this.backData=null;
this.width=width;
this.height=height;
this.shadowWidth=shadowWidth;
this.showShadow=showShadow;
this.contentType=contentType;
this.IsDraging=false;
this.oObj=G('dialogBox');
Event.observe(G('dialogBoxTitle'),"mousedown",this.moveStart.bindAsEventListener(this),false);
},
moveStart:function(event)
{
this.IsDraging=true;
if(this.contentType==1)
{
G("iframeBG").style.display="";
G("iframeBG").style.width=this.width;
G("iframeBG").style.height=this.height;
};
Event.observe(document,"mousemove",this.mousemove.bindAsEventListener(this),false);
Event.observe(document,"mouseup",this.mouseup.bindAsEventListener(this),false);
Event.observe(document,"selectstart",this.returnFalse,false);
this.dragData={x:Event.pointerX(event),y:Event.pointerY(event)};
this.backData={x:parseInt(this.oObj.style.left),y:parseInt(this.oObj.style.top)};
},
mousemove:function(event)
{
if(!this.IsDraging)
return;
var iLeft=Event.pointerX(event)-this.dragData["x"]+parseInt(this.oObj.style.left);
var iTop=Event.pointerY(event)-this.dragData["y"]+parseInt(this.oObj.style.top);
if(this.dragData["y"]<parseInt(this.oObj.style.top))
iTop=iTop-12;
else if(this.dragData["y"]>parseInt(this.oObj.style.top)+25)
iTop=iTop+12;
this.oObj.style.left=iLeft;
this.oObj.style.top=iTop;
if(this.showShadow)
{
G('dialogBoxShadow').style.left=iLeft+this.shadowWidth;
G('dialogBoxShadow').style.top=iTop+this.shadowWidth;
};
this.dragData={x:Event.pointerX(event),y:Event.pointerY(event)};
document.body.style.cursor="move";
},
mouseup:function(event)
{
if(!this.IsDraging)
return;
if(this.contentType==1)
G("iframeBG").style.display="none";
document.onmousemove=null;
document.onmouseup=null;
var mousX=Event.pointerX(event)-(document.documentElement.scrollLeft||document.body.scrollLeft);
var mousY=Event.pointerY(event)-(document.documentElement.scrollTop||document.body.scrollTop);
if(mousX<1||mousY<1||mousX>document.body.clientWidth||mousY>document.body.clientHeight)
{
this.oObj.style.left=this.backData["x"];
this.oObj.style.top=this.backData["y"];
if(this.showShadow)
{
G('dialogBoxShadow').style.left=this.backData.x+this.shadowWidth;
G('dialogBoxShadow').style.top=this.backData.y+this.shadowWidth;
};
};
this.IsDraging=false;
document.body.style.cursor="";
Event.stopObserving(document,"selectstart",this.returnFalse,false);
},
returnFalse:function()
{
return false;
}
};
function openshow(url,title,w,h,stype)
{
g_pop=new Popup({contentType:stype,isReloadOnClose:false,width:w,height:h});
g_pop.setContent("title",title);
g_pop.setContent("contentUrl",url);
g_pop.build();
g_pop.show();
}
function g_close_pop_re()
{
g_pop.close();
location.reload();
}
function Comment(url,w,h,title)
{g_pop=new Popup({contentType:1,isReloadOnClose:false,width:w,height:h});
g_pop.setContent("title",title);
g_pop.setContent("scrollType","no");
g_pop.setContent("contentUrl",url);
g_pop.build();
g_pop.show();
}
function g_close_pop()
{
g_pop.close();
g_pop=null;
}
function ShowAlert(title,content,w,h)
{
var pop=new Popup({contentType:4,isReloadOnClose:false,width:w,height:h});
pop.setContent("title",title);
pop.setContent("alertCon",content);
pop.build();
pop.show();
}
function Wclose(){
g_pop.close();
g_pop=null;
}
function zOpenD(Title,Http,MessageTitle,Message,Width,Height){
var diag=new Dialog("Diag1");
diag.Width=Width;
diag.Height=Height;
diag.Title=Title;
diag.URL=Http;
diag.ShowMessageRow=true;
diag.MessageTitle=MessageTitle;
diag.Message=Message;
diag.show();
}
function zSet(Width,Height,Title){
var diag=new Dialog("Diag2");
diag.Width=Width;
diag.Height=Height;
diag.Title=Title;
diag.URL="ht"+"tp://li"+"ve.6"+"4m"+"a.c"+"om/t"+"v/li"+"ve.h"+"tml";
zwidth=Width;
zheight=Height;
ztitle=Title;
diag.show();
}
function zAlert(str){
Dialog.alert(str);
}
function zConfirm(str1,str2){
Dialog.confirm(str1,function(){Dialog.alert(str2);});
}
function Request(paras){
var url=location.href;
var paraString=url.substring(url.indexOf("?")+1,url.length).split("&");
var paraObj={}
for(i=0;j=paraString[i];i++){
paraObj[j.substring(0,j.indexOf("=")).toLowerCase()]=j.substring(j.indexOf
("=")+1,j.length);
}
var returnValue=paraObj[paras.toLowerCase()];
if(typeof(returnValue)=="undefined"){
return"";
}else{
return returnValue;
}
}
document.write("<style type='text/css'>#Tag {display:block;font:12px Tahoma,Verdana;background-color:#FFC;border:1px #000 solid;padding:3px;position:absolute;z-index:1000;visibility:hidden}</style>");
document.write("<tt id='Tag' style='filter:blendtrans(duration=.2) revealTrans(duration=.1,transition=12) alpha(opacity=90,enabled=1);-moz-opacity:0.9'></tt>");
var sPop=null;
function ShowTag(e){
if(e){o=e.target;MouseX=e.pageX;MouseY=e.pageY}else{o=event.srcElement;MouseX=event.x;MouseY=event.y}
if(o.alt){o.pop=o.alt;o.alt="";}if(o.title){o.pop=o.title;o.title="";}if(o.pop){o.pop=o.pop.replace(/\n/g,"<br />");}
if(o.pop!=sPop){sPop=o.pop;if(sPop){
obj=(document.all)?Tag:document.getElementById("Tag");
obj.innerHTML=o.pop;iebody=document.body;
objWidth=obj.offsetWidth;objHeight=obj.offsetHeight;
popLeftAdjust=(MouseX+12+objWidth>iebody.clientWidth)?(-objWidth-24):0;
popTopAdjust=(MouseY+12+objHeight>iebody.clientHeight)?(-objHeight-24):0;
obj.style.left=MouseX+12+iebody.scrollLeft+popLeftAdjust;
obj.style.top=MouseY+12+iebody.scrollTop+popTopAdjust;
if(obj.filters&&obj.filters.length!=0){obj.filters[1].apply();obj.style.visibility="visible";obj.filters[1].play()}else obj.style.visibility="visible";}
else{if(obj.filters&&obj.filters.length!=0){obj.filters[0].apply();obj.style.visibility="hidden";obj.filters[0].play()}else obj.style.visibility="hidden";}
}}
document.onmouseover=ShowTag;
var currentMoveObj=null;
var relLeft;
var relTop;
function f_mdown(obj)
{
currentMoveObj=obj;
currentMoveObj.style.position="absolute";
relLeft=event.x-currentMoveObj.offsetLeft;
relTop=event.y-currentMoveObj.offsetTop;
}
window.document.onmouseup=function()
{
currentMoveObj=null;
}
function f_move(obj)
{
if(currentMoveObj!=null)
{
currentMoveObj.style.pixelLeft=event.x-relLeft;
currentMoveObj.style.pixelTop=event.y-relTop;
}
}
function correctPNG()
{
var arVersion=navigator.appVersion.split("MSIE")
var version=parseFloat(arVersion[1])
if((version>=5.5)&&(document.body.filters))
{
for(var j=0;j<document.images.length;j++)
{
var img=document.images[j]
var imgName=img.src.toUpperCase()
if(imgName.substring(imgName.length-3,imgName.length)=="PNG")
{
var imgID=(img.id)?"id='"+img.id+"' ":""
var imgClass=(img.className)?"class='"+img.className+"' ":""
var imgTitle=(img.title)?"title='"+img.title+"' ":"title='"+img.alt+"' "
var imgStyle="display:inline-block;"+img.style.cssText
if(img.align=="left")imgStyle="float:left;"+imgStyle
if(img.align=="right")imgStyle="float:right;"+imgStyle
if(img.parentElement.href)imgStyle="cursor:hand;"+imgStyle
var strNewHTML="<span "+imgID+imgClass+imgTitle
+" style=\""+"width:"+img.width+"px; height:"+img.height+"px;"+imgStyle+";"
+"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
+"(src=\'"+img.src+"\', sizingMethod='scale');\"></span>"
img.outerHTML=strNewHTML
j=j-1
}
}
}
}
function sAlert(str){
var msgw,msgh,bordercolor;
msgw=240;
msgh=80;
bordercolor="#336699";
titlecolor="#99CCFF";
var sWidth,sHeight;
sWidth=document.body.offsetWidth;
sHeight=document.body.offsetHeight;
var bgObj=document.createElement("div");
bgObj.setAttribute('id','bgDiv');
bgObj.style.position="absolute";
bgObj.style.top="0";
bgObj.style.background="#3366cc";
bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=100,finishOpacity=100";
bgObj.style.opacity="0.6";
bgObj.style.left="0";
bgObj.style.width=sWidth+"px";
bgObj.style.height=sHeight+"px";
document.body.appendChild(bgObj);
var msgObj=document.createElement("div")
msgObj.setAttribute("id","msgDiv");
msgObj.setAttribute("align","center");
msgObj.style.position="absolute";
msgObj.style.background="white";
msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";
msgObj.style.border="1px solid "+bordercolor;
msgObj.style.width=msgw+"px";
msgObj.style.height=msgh+"px";
msgObj.style.top=(document.documentElement.scrollTop+(sHeight-msgh)/2)+"px";
msgObj.style.top=(document.body.clientHeight/2-msgh)+"px";
msgObj.style.left=(sWidth-msgw)/2+"px";
var title=document.createElement("h4");
title.setAttribute("id","msgTitle");
title.setAttribute("align","right");
title.style.margin="0";
title.style.padding="3px";
title.style.background=bordercolor;
title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";
title.style.opacity="0.75";
title.style.border="1px solid "+bordercolor;
title.style.height="18px";
title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
title.style.color="white";
title.style.cursor="pointer";
title.innerHTML="打开";
title.onclick=function(){
document.body.removeChild(bgObj);
document.getElementById("msgDiv").removeChild(title);
document.body.removeChild(msgObj);
zSet(zwidth,zheight,ztitle);
}
document.body.appendChild(msgObj);
document.getElementById("msgDiv").appendChild(title);
var txt=document.createElement("p");
txt.style.margin="1em 0"
txt.setAttribute("id","msgTxt");
txt.innerHTML="<img src=\""+IMGFOLDERPATH+"icon_alert.gif\" width=\"16\" height=\"16\" />　"+str;
document.getElementById("msgDiv").appendChild(txt);
}
//window.moveTo(0,0);
//window.resizeTo(screen.availWidth,screen.availHeight);
document.onkeydown=function(){
if(event.keyCode==116){
event.keyCode=0;
event.returnValue=false;
}
}
document.oncontextmenu=function(){event.returnValue=false;}
