
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.ChatExpressionGroupItem=void 0;const UE=require("ue"),UiPanelBase_1=require("../../../Ui/Base/UiPanelBase");class ChatExpressionGroupItem extends UiPanelBase_1.UiPanelBase{constructor(s){super(),this.Q9e=0,this.x$e=void 0,this.YMt=s=>{1===s&&this.x$e&&this.x$e(this.Q9e)},this.CreateThenShowByActor(s)}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UITexture],[1,UE.UIExtendToggle]],this.BtnBindInfo=[[1,this.YMt]]}Refresh(s){this.Q9e=s.Id;s=s.GroupTexturePath;const e=this.GetTexture(0);e.SetUIActive(!1),this.SetTextureByPath(s,e,void 0,()=>{e.SetUIActive(!0)})}SetState(s,e=!1){this.GetExtendToggle(1).SetToggleState(s,e)}BindOnClicked(s){this.x$e=s}}exports.ChatExpressionGroupItem=ChatExpressionGroupItem;
//# sourceMappingURL=ChatExpressionGroupItem.js.map