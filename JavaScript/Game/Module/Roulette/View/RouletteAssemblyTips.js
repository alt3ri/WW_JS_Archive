
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RouletteTipsItemPanel=exports.RouletteAssemblyTips=void 0;const UE=require("ue"),MultiTextLang_1=require("../../../../Core/Define/ConfigQuery/MultiTextLang"),StringUtils_1=require("../../../../Core/Utils/StringUtils"),ConfigManager_1=require("../../../Manager/ConfigManager"),ModelManager_1=require("../../../Manager/ModelManager"),UiPanelBase_1=require("../../../Ui/Base/UiPanelBase"),CommonItemSmallItemGrid_1=require("../../Common/ItemGrid/CommonItemSmallItemGrid"),ItemTipsGetWay_1=require("../../Common/ItemTips/SubComponents/ItemTipsGetWay"),HelpController_1=require("../../Help/HelpController"),GridProxyAbstract_1=require("../../Util/Grid/GridProxyAbstract"),GenericLayout_1=require("../../Util/Layout/GenericLayout"),LguiUtil_1=require("../../Util/LguiUtil");class RouletteAssemblyTips extends UiPanelBase_1.UiPanelBase{constructor(){super(...arguments),this.Pe=void 0,this.LPt=void 0,this.u0o=void 0,this.c0o=void 0,this.XOe=()=>{var t=this.Pe.HelpId;0!==t&&HelpController_1.HelpController.OpenHelpById(t)}}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UITexture],[1,UE.UISprite],[2,UE.UITexture],[3,UE.UIText],[4,UE.UIButtonComponent],[5,UE.UIText],[6,UE.UIItem],[7,UE.UIText],[8,UE.UIItem],[9,UE.UIItem],[10,UE.UIItem],[11,UE.UIItem],[12,UE.UIItem],[13,UE.UIText]],this.BtnBindInfo=[[4,this.XOe]]}async OnBeforeStartAsync(){var t=this.GetItem(10),t=(this.u0o=new RouletteTipsItemPanel,await this.u0o.CreateByActorAsync(t.GetOwner()),this.GetItem(11));this.c0o=new RouletteTipsItemPanel,await this.c0o.CreateByActorAsync(t.GetOwner())}OnStart(){var t=this.GetItem(9);this.LPt=new ItemTipsGetWay_1.TipsGetWayPanel(t)}OnBeforeDestroy(){this.LPt&&(this.LPt.Destroy(),this.LPt=void 0),this.u0o&&(this.u0o.Destroy(),this.u0o=void 0),this.c0o&&(this.c0o.Destroy(),this.c0o=void 0)}Refresh(t){this.Pe=t,this.mGe(),this.m0o(),this.WNe(),this.d0o(),this.Kbe(),this.C0o(),this.g0o(),this.f0o(),this.p0o()}mGe(){this.GetText(3).ShowTextNew(this.Pe.Title)}m0o(){var t=this.Pe.HelpId;this.GetButton(4).RootUIComp.SetUIActive(0!==t)}WNe(){var t=this.GetTexture(0),e=ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(this.Pe.BgQuality);this.SetTextureByPath(e.RouletteTipsQualityTexPath,t)}d0o(){var t=""!==this.Pe.TextMain&&void 0!==this.Pe.TextMain,t=(this.GetText(5).SetUIActive(t),t&&this.GetText(5).ShowTextNew(this.Pe.TextMain),""!==this.Pe.TextSub&&void 0!==this.Pe.TextSub);this.GetItem(6).SetUIActive(t),t&&this.GetText(7).ShowTextNew(this.Pe.TextSub)}Kbe(){const t=this.GetTexture(2),e=(t.SetUIActive(!1),this.GetSprite(1));e.SetUIActive(!1),2===this.Pe.GridType?this.SetItemIcon(t,this.Pe.GridId,void 0,()=>{t.SetUIActive(!0)}):""!==this.Pe.IconPath&&(this.Pe.IsIconTexture?this.SetTextureByPath(this.Pe.IconPath,t,void 0,()=>{t.SetUIActive(!0)}):this.SetSpriteByPath(this.Pe.IconPath,e,!1,void 0,()=>{e.SetUIActive(!0)}))}C0o(){var t=this.Pe.GetWayData;this.LPt.SetActive(0<t.length),t&&this.LPt.Refresh(t)}g0o(){var[t,e]=this.Pe.CanSetItemNum;this.GetItem(12).SetUIActive(0!==e),0!==e&&(t=StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CollectProgress_Text"),t.toString(),e.toString()),LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13),"Explore_Count",t))}f0o(){var t=this.Pe.NeedItemMap;if(this.u0o.SetActive(0!==t.size),0!==t.size){const s=[];t.forEach((t,e)=>{var i=ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e),e={ItemId:e,NeedLock:!1,Text:StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CollectProgress_Text"),i.toString(),t.toString())};s.push(e)}),this.u0o.RefreshItemPanel(s)}}p0o(){var t=this.Pe.Authorization;if(this.c0o.SetActive(0<t.length),0!==t.length){var e=[];for(const s of t){var i=ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s),i={ItemId:s,NeedLock:i<=0};e.push(i)}this.c0o.RefreshItemPanel(e)}}}exports.RouletteAssemblyTips=RouletteAssemblyTips;class RouletteTipsItemPanel extends UiPanelBase_1.UiPanelBase{constructor(){super(...arguments),this.jFe=void 0,this.Rke=()=>{return new CommonItemSmallItemGridWrap}}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIGridLayout],[1,UE.UIItem],[2,UE.UIText]]}OnStart(){this.jFe=new GenericLayout_1.GenericLayout(this.GetGridLayout(0),this.Rke)}RefreshTitle(t){this.GetText(2).ShowTextNew(t)}RefreshItemPanel(t){this.jFe.RefreshByData(t)}}exports.RouletteTipsItemPanel=RouletteTipsItemPanel;class CommonItemSmallItemGridWrap extends GridProxyAbstract_1.GridProxyAbstract{constructor(){super(...arguments),this.GridItem=void 0}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIItem]]}Refresh(t,e,i){this.GridItem.RefreshByConfigId(t.ItemId),this.GridItem.SetLockVisible(t.NeedLock);var s=void 0!==t.Text;this.GridItem.SetBottomTextVisible(s),s&&this.GridItem.SetBottomText(t.Text)}OnStart(){this.GridItem=new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid;var t=this.GetItem(0);this.GridItem.Initialize(t.GetOwner())}OnBeforeDestroy(){this.GridItem.Destroy()}}
//# sourceMappingURL=RouletteAssemblyTips.js.map