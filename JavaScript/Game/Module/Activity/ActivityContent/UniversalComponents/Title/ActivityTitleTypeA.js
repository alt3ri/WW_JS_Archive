
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ActivityTitleTypeA=void 0;const UE=require("ue"),UiPanelBase_1=require("../../../../../Ui/Base/UiPanelBase"),LguiUtil_1=require("../../../../Util/LguiUtil");class ActivityTitleTypeA extends UiPanelBase_1.UiPanelBase{OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIText],[1,UE.UIText],[2,UE.UITexture],[3,UE.UIText],[4,UE.UISprite]]}OnStart(){this.SetSubTitleVisible(!1)}SetTitleByTextId(t,...e){LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0),t,e)}SetTitleByText(t){this.GetText(0).SetText(t)}SetTimeTextByText(t){this.GetText(1).SetText(t)}SetTimeTextVisible(t){this.GetText(1).SetUIActive(t)}SetTimeTextByTextId(t,...e){LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1),t,e)}SetBgTextureByPath(t,e){this.SetTextureByPath(t,this.GetTexture(2),void 0,e)}SetBgTextureVisible(t){this.GetTexture(2).SetUIActive(t)}SetSubTitleVisible(t){this.GetText(3).SetUIActive(t)}SetSubTitleByTextId(t,...e){LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3),t,e)}SetSubTitleByText(t){this.GetText(3).SetText(t)}SetSubTitleIconVisible(t){this.GetSprite(4).SetUIActive(t)}SetSubTitleIconByPath(t,e){this.SetSpriteByPath(t,this.GetSprite(4),!1,void 0,e)}}exports.ActivityTitleTypeA=ActivityTitleTypeA;
//# sourceMappingURL=ActivityTitleTypeA.js.map