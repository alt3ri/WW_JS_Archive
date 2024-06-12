
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GiftPackageSupplyPackItem=void 0;const UE=require("ue"),ConfigManager_1=require("../../../../Manager/ConfigManager"),UiPanelBase_1=require("../../../../Ui/Base/UiPanelBase"),LguiUtil_1=require("../../../Util/LguiUtil"),GenericScrollView_1=require("../../../Util/ScrollView/GenericScrollView"),GiftPackageItem_1=require("./GiftPackageItem"),COLOR="FED12E";class GiftPackageSupplyPackItem extends UiPanelBase_1.UiPanelBase{constructor(i,t,e){super(),this.m3i=!1,this.d3i=!1,this.C3i=void 0,this.xqe=void 0,this.ZNi=new Array,this.g3i=0,this.sGe=(i,t,e)=>{var s=new GiftPackageItem_1.GiftPackageItem;return s.Initialize(t),s.SetBelongViewName("GiftPackageDetailsView"),i&&2<=i.length&&s.UpdateItem(i[0],i[1]),{Key:e,Value:s}},this.SetEndTime=()=>{var i,t=this.C3i.GetCountDownData();0===t[2]?(this.GetItem(3).SetUIActive(!1),this.d3i=!1):(i=this.C3i.GetCountDownData()[1],3===t[0]?(this.GetText(4).ShowTextNew("DownShopItem"),this.GetText(4).SetUIActive(!0)):2===t[0]?(this.GetText(4).ShowTextNew("ReUpShopItem"),this.GetText(4).SetUIActive(!0)):1===t[0]?(this.GetText(4).ShowTextNew("DiscountItem"),this.GetText(4).SetUIActive(!0)):this.GetText(4).SetUIActive(!1),this.d3i=void 0!==i,i?(this.GetItem(3).SetUIActive(!0),t=this.GetText(5),"string"==typeof i?t.SetText(i):LguiUtil_1.LguiUtil.SetLocalText(t,i.TextId,i.TimeValue)):this.GetItem(3).SetUIActive(!1))},this.g3i=i,this.C3i=e,this.CreateThenShowByResourceIdAsync("UiItem_GiftPackageSupplyPack",t)}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIScrollViewWithScrollbarComponent],[1,UE.UIItem],[2,UE.UIText],[3,UE.UIItem],[4,UE.UIText],[5,UE.UIText],[6,UE.UIItem],[7,UE.UIText]]}OnStart(){this.xqe=new GenericScrollView_1.GenericScrollView(this.GetScrollViewWithScrollbar(0),this.sGe),this.Refresh()}Update(i){this.g3i=i,this.Refresh()}Refresh(){if(!this.InAsyncLoading()){var i,t;for([i,t]of ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.g3i).Content)this.ZNi.push([i,t]);this.xqe.RefreshByData(this.ZNi),this.SetEndTime(),this.mGe(),this.KFi(),this.f3i()}}mGe(){}f3i(){this.GetItem(6).SetUIActive(this.m3i||this.d3i)}KFi(){this.GetText(2).SetUIActive(!1),this.GetText(7).SetUIActive(!1);var i=this.C3i.GetExchangeViewShopTipsText();let t=void 0;(t=this.d3i?this.GetText(2):this.GetText(7)).SetUIActive(""!==i),t.SetText(i),t.SetColor(UE.Color.FromHex(COLOR)),this.m3i=""!==i}OnBeforeDestroy(){}}exports.GiftPackageSupplyPackItem=GiftPackageSupplyPackItem;
//# sourceMappingURL=GiftPackageSupplyPackItem.js.map