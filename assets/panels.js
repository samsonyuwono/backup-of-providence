/*
* scotchPanels - v1.0.3 - 2014-09-25
* https://github.com/scotch-io/scotch-panels
* Copyright (c) 2014 Nicholas Cerminara <nick@scotch.io>
*/
// Start with Semicolon to block
;(function($){'use strict';var panels=[];var browserSupportTest=!1;var has3d=!1;var hasTransitions=!1;var defaults={containerSelector:'body',type:'html',direction:'top',duration:300,transition:'ease',easingPluginTransition:'easeInCirc',useCSS:!0,useEasingPlugin:!1,imageURL:!1,iframeURL:!1,autoPlayVideo:!0,youtubeID:!1,youTubeTheme:'light',distanceX:'70%',forceMinHeight:!1,minHeight:'200px',closeAfter:0,startOpened:!1,startOpenedDelay:0,clickSelector:!1,enableEscapeKey:!0,hoverSelector:!1,touchSelector:!1,beforePanelOpen:function(){},afterPanelOpen:function(){},beforePanelClose:function(){},afterPanelClose:function(){}};$.fn.scotchPanel=function(options){if(typeof options==='undefined'){options={}}
if(this.length===0)return this;if(this.length>1){this.each(function(){panels.push($(this).scotchPanel(options))});panels.open=function(){for(var i=0;i<panels.length;i++){panels[i].open()}};panels.close=function(){for(var i=0;i<panels.length;i++){panels[i].close()}};panels.toggle=function(){for(var i=0;i<panels.length;i++){panels[i].toggle()}};return panels}
var panel={};panel=this;var init=function(){if(!browserSupportTest){browserSupportTest=!0;has3d=browserSupport.transition();hasTransitions=browserSupport.translate3d()}
for(var key in defaults){if(defaults.hasOwnProperty(key)){if(panel.attr('data-'+key.toLowerCase())){options[key]=panel.data(key.toLowerCase())}}}
panel.settings=$.extend({},defaults,options);setup()};var setup=function(){var container=$(panel.settings.containerSelector);if(!container.hasClass('scotchified')){container.wrapInner('<div class="scotch-panel-wrapper"><div class="scotch-panel-canvas"></div></div>').addClass('scotchified')}
$('.scotch-panel-wrapper').css({'position':'relative','overflow':'hidden','width':'100%'});$('.scotch-panel-canvas').css({'position':'relative','height':'100%','width':'100%'});if(panel.settings.useCSS){$('.scotch-panel-canvas').css({'-moz-transform':'translate3d(0, 0, 0)','-ms-transform':'translate3d(0, 0, 0)','-o-transform':'translate3d(0, 0, 0)','-webkit-transform':'translate3d(0, 0, 0)','transform':'translate3d(0, 0, 0)','-moz-backface-visibility':'hidden','-ms-backface-visibility':'hidden','-o-backface-visibility':'hidden','-webkit-backface-visibility':'hidden','backface-visibility':'hidden'})}
if(panel.settings.direction=='top'){panel.height=panel.height();panel.addClass('scotch-panel-top');panel.css({'bottom':'100%','left':'0','width':'100%','position':'absolute','z-index':'888888','overflow':'hidden'})}
if(panel.settings.direction=='bottom'){panel.height=panel.height();panel.addClass('scotch-panel-bottom');panel.css({'top':'100%','left':'0','width':'100%','position':'absolute','z-index':'888888','overflow':'hidden'})}
if(panel.settings.direction=='left'){panel.addClass('scotch-panel-left');panel.css({'top':'0','left':'-'+panel.settings.distanceX,'width':panel.settings.distanceX,'height':'100%','position':'absolute','z-index':'888888','overflow':'hidden'})}
if(panel.settings.direction=='right'){panel.addClass('scotch-panel-right');panel.css({'top':'0','right':'-'+panel.settings.distanceX,'width':panel.settings.distanceX,'height':'100%','position':'absolute','z-index':'888888','overflow':'hidden'})}
panel.css({'-moz-backface-visibility':'hidden','-ms-backface-visibility':'hidden','-o-backface-visibility':'hidden','-webkit-backface-visibility':'hidden','backface-visibility':'hidden'});if(panel.settings.type=='image'&&panel.settings.imageURL){panel.css({'-o-background-size':'cover','-ms-background-size':'cover','-moz-background-size':'cover','-webkit-background-size':'cover','background-size':'cover','background-position':'50% 0','background-repeat':'no-repeat','background-image':'url('+panel.settings.imageURL+')'});if(panel.settings.direction=='top'||panel.settings.direction=='bottom'){panel.css('min-height',panel.settings.minHeight);panel.height=$(panel).height()}}
if(panel.settings.type=='iframe'&&panel.settings.iframeURL){panel.iframeIsLoaded=!1;panel.append('<iframe frameborder="0" style="width: 100%; height: 100%; display: block; position: relative; min-height: '+panel.settings.minHeight+'" allowfullscreen></iframe>');if(panel.settings.direction=='top'||panel.settings.direction=='bottom'){panel.height=$(panel).height()}}
if(panel.settings.type=='video'&&panel.settings.youtubeID){panel.append('<div id="video-id-'+panel.settings.youtubeID+'" style="min-height: '+panel.settings.minHeight+'; display: block !important;"><iframe src="//www.youtube.com/embed/'+panel.settings.youtubeID+'?enablejsapi=1&theme='+panel.settings.youTubeTheme+'" frameborder="0" style="width: 100%; height: 100%; display: block; position: absolute; left: 0; top: 0;" allowfullscreen></iframe></div>');if(panel.settings.direction=='top'||panel.settings.direction=='bottom'){panel.height=$(panel).height()}}
if(has3d&&hasTransitions){applyTransition(panel.settings.transition,panel.settings.duration)}
if(panel.settings.startOpened){setTimeout(function(){panel.open()},panel.settings.startOpenedDelay)}
if(panel.settings.closeAfter!=0){setTimeout(function(){panel.close()},panel.settings.closeAfter)}};var browserSupport={transition:function(){if(!window.getComputedStyle){return!1}
var b=document.body||document.documentElement,s=b.style,p='transition';if(typeof s[p]=='string'){return!0}
var v=['Moz','webkit','Webkit','Khtml','O','ms'];p=p.charAt(0).toUpperCase()+p.substr(1);for(var i=0;i<v.length;i++){if(typeof s[v[i]+p]=='string'){return!0}}
return!1},translate3d:function(){if(!window.getComputedStyle){return!1}
var el,has3d;el=document.createElement('p');el.style.transform='matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';el.style.margin='0';document.body.insertBefore(el,document.body.lastChild);has3d=window.getComputedStyle(el).getPropertyValue('transform');if(has3d!==undefined){return has3d!=='none'}else{return!1}}};var toggleVideoState=function(element,state){var div=document.getElementById(element);var iframe=div.getElementsByTagName('iframe')[0].contentWindow;div.style.display=state=='hide'?'none':'';var func=state=='hide'?'pauseVideo':'playVideo';iframe.postMessage('{"event":"command","func":"'+func+'","args":""}','*');div.style.display='block'};var applyTransition=function(transition,duration){panel.parents('.scotch-panel-canvas:first').css({'-ms-transition':'all '+duration+'ms '+transition,'-moz-transition':'all '+duration+'ms '+transition,'-o-transition':'all '+duration+'ms '+transition,'-webkit-transition':'all '+duration+'ms '+transition,'transition':'all '+duration+'ms '+transition})};var translateY=function(distanceY){if(panel.settings.forceMinHeight){panel.parents('.scotch-panel-canvas:first').css('min-height',distanceY)}
if(has3d&&hasTransitions&&panel.settings.useCSS){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.beforePanelOpen()}else{panel.settings.beforePanelClose()}
panel.parents('.scotch-panel-canvas:first').css({'-ms-transform':'translate3d(0, '+distanceY+'px, 0)','-moz-transform':'translate3d(0, '+distanceY+'px, 0)','-o-transform':'translate3d(0, '+distanceY+'px, 0)','-webkit-transform':'translate3d(0, '+distanceY+'px, 0)','transform':'translate3d(0, '+distanceY+'px, 0)'});setTimeout(function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}},panel.settings.duration)}else{if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.beforePanelOpen()}else{panel.settings.beforePanelClose()}
if(panel.settings.useEasingPlugin){panel.parents('.scotch-panel-canvas:first').animate({top:distanceY+'px'},{duration:panel.settings.duration,easing:panel.settings.easingPluginTransition,complete:function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}}})}else{panel.parents('.scotch-panel-canvas:first').animate({top:distanceY+'px'},panel.settings.duration,function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}})}}};var translateX=function(distanceX){if(has3d&&hasTransitions&&panel.settings.useCSS){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.beforePanelOpen()}else{panel.settings.beforePanelClose()}
panel.parents('.scotch-panel-canvas:first').css({'-ms-transform':'translate3d('+distanceX+', 0, 0)','-moz-transform':'translate3d('+distanceX+', 0, 0)','-o-transform':'translate3d('+distanceX+', 0, 0)','-webkit-transform':'translate3d('+distanceX+', 0, 0)','transform':'translate3d('+distanceX+', 0, 0)'});setTimeout(function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}},panel.settings.duration)}else{if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.beforePanelOpen()}else{panel.settings.beforePanelClose()}
if(panel.settings.useEasingPlugin){panel.parents('.scotch-panel-canvas:first').animate({left:distanceX},{duration:panel.settings.duration,easing:panel.settings.easingPluginTransition,complete:function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}}})}else{panel.parents('.scotch-panel-canvas:first').animate({left:distanceX},panel.settings.duration,function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.settings.afterPanelOpen()}else{panel.settings.afterPanelClose()}})}}};panel.open=function(){panel.parents('.scotch-panel-canvas:first').addClass('scotch-is-showing');if(panel.settings.type=='iframe'&&panel.settings.iframeURL&&!panel.iframeIsLoaded){panel.iframeIsLoaded=!0;panel.find('iframe').attr('src',panel.settings.iframeURL)}
if(panel.settings.type=='video'&&panel.settings.youtubeID&&panel.settings.autoPlayVideo){toggleVideoState('video-id-'+panel.settings.youtubeID,'')}
if(panel.settings.direction=='top'){translateY(panel.height)}
if(panel.settings.direction=='bottom'){translateY('-'+panel.height)}
if(panel.settings.direction=='left'){translateX(panel.settings.distanceX)}
if(panel.settings.direction=='right'){translateX('-'+panel.settings.distanceX)}};panel.close=function(){panel.parents('.scotch-panel-canvas:first').removeClass('scotch-is-showing');setTimeout(function(){if(panel.settings.type=='video'&&panel.settings.youtubeID&&panel.settings.autoPlayVideo){toggleVideoState('video-id-'+panel.settings.youtubeID,'hide')}},panel.settings.duration);if(panel.settings.direction=='top'||panel.settings.direction=='bottom'){translateY(0)}
if(panel.settings.direction=='left'||panel.settings.direction=='right'){translateX(0)}};panel.toggle=function(){if(panel.parents('.scotch-panel-canvas:first').hasClass('scotch-is-showing')){panel.close()}else{panel.open()}};init();$(document).keyup(function(e){if(e.keyCode==27&&panel.settings.enableEscapeKey){panel.close()}});if(panel.settings.hoverSelector){$(panel.settings.hoverSelector).hover(function(){panel.open()},function(){panel.close()})}
if(panel.settings.clickSelector){$(panel.settings.clickSelector).click(function(){panel.toggle();return!1})}
if(panel.settings.touchSelector){$(panel.settings.touchSelector).on('touchstart',function(){panel.toggle();return!1})}
return panel}}(jQuery))
