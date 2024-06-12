
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.NavigationScrollbarData=void 0;const Log_1=require("../../../../Core/Common/Log"),UiNavigationViewManager_1=require("./UiNavigationViewManager");class NavigationScrollbarData{constructor(){this.Qxo=[],this.Xxo=void 0,this.$xo=void 0,this.Yxo=void 0}Jxo(){if(!this.Xxo?.IsListenerActive()){let i=void 0;for(const t of this.Qxo)if(t.IsListenerActive()){i=t;break}this.zxo(i)}}zxo(i){this.Xxo&&(this.Xxo.IsFocusScrollbar=!1),i&&(i.IsFocusScrollbar=!0),this.Yxo=this.Xxo,this.Xxo=i,this.$xo=i?.GetBehaviorComponent(),Log_1.Log.CheckDebug()&&Log_1.Log.Debug("UiNavigation",11,"设置当前的滚动区域对象",["名字",i?.RootUIComp.displayName])}AddScrollbar(r){this.Qxo=[];for(let i=0,t=r.Num();i<t;++i){var s=r.Get(i).ListenerList;for(let i=0,t=s.Num();i<t;++i){var e=s.Get(i);this.Qxo.push(e)}}this.Qxo.sort((i,t)=>i.ScrollbarIndex-t.ScrollbarIndex),this.Jxo()}DeleteScrollbar(i){var r=i.ListenerList;if(r){for(let i=0,t=r.Num();i<t;++i){var s=r.Get(i),e=this.Qxo.indexOf(s);this.Qxo.splice(e,1),this.Xxo===s&&this.zxo(void 0)}this.Jxo()}}ResumeLastListener(){this.Yxo?.IsValid()?this.zxo(this.Yxo):this.Jxo()}GetCurrentListener(){return this.Xxo}GetCurrentScrollbar(){return this.$xo}HasActiveScrollbarList(){return 1<this.Qxo.filter(i=>i.IsListenerActive()).length}FindNextScrollbar(){if(this.Xxo){var t=this.Qxo.length;if(1===t)return void this.zxo(void 0);var r=this.Qxo.indexOf(this.Xxo);let i=r+1<t?r+1:0;for(;r!==i;){if(this.Qxo[i].IsListenerActive()){this.zxo(this.Qxo[i]);break}i=i+1<t?i+1:0}}else this.Jxo();UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey()}FindPrevScrollbar(){if(this.Xxo){var t=this.Qxo.length;if(1===t)return;var r=this.Qxo.indexOf(this.Xxo);let i=0<=r-1?r-1:t-1;for(;r!==i;){if(this.Qxo[i].IsListenerActive()){this.zxo(this.Qxo[i]);break}i=0<=i-1?i-1:t-1}}else this.Jxo();UiNavigationViewManager_1.UiNavigationViewManager.RefreshCurrentHotKey()}TryFindScrollbar(){this.Jxo()}}exports.NavigationScrollbarData=NavigationScrollbarData;
//# sourceMappingURL=NavigationScrollbarData.js.map