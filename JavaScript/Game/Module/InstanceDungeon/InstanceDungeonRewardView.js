
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InstanceDungeonRewardView=void 0;const ue_1=require("ue"),TimerSystem_1=require("../../../Core/Timer/TimerSystem"),ConfigManager_1=require("../../Manager/ConfigManager"),ModelManager_1=require("../../Manager/ModelManager"),UiViewBase_1=require("../../Ui/Base/UiViewBase"),LguiUtil_1=require("../Util/LguiUtil"),GenericScrollViewNew_1=require("../Util/ScrollView/GenericScrollViewNew"),InstanceDungeonRewardItem_1=require("./InstanceDungeonRewardItem");class InstanceDungeonRewardView extends UiViewBase_1.UiViewBase{constructor(){super(...arguments),this.Kli=void 0,this.sGe=()=>{return new InstanceDungeonRewardItem_1.InstanceDungeonRewardItem}}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,ue_1.UIText],[1,ue_1.UIText],[2,ue_1.UIScrollViewWithScrollbarComponent]]}OnStart(){this.Kli=new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(2),this.sGe)}OnBeforeShow(){LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0),"InstanceRewardTitle"),LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1),"InstanceRewardSubTitle");const e=ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId).RewardId;var r=ConfigManager_1.ConfigManager.ExchangeRewardConfig?.GetExchangeRewardConfig(e).RewardId,i=[],n=ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;let t=0,a=0;for(const[s,e]of r)i.push([s,e]),t<s&&n>=s&&(t=s,a=i.length-1);this.Kli.RefreshByData(i,()=>{for(const e of this.Kli.GetScrollItemList())e.SetCurrentItem(t);TimerSystem_1.TimerSystem.Next(()=>{this.Kli.ScrollToTop(a)})})}}exports.InstanceDungeonRewardView=InstanceDungeonRewardView;
//# sourceMappingURL=InstanceDungeonRewardView.js.map