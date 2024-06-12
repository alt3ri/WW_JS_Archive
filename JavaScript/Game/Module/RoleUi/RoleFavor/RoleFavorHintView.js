
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.RoleFavorHintView=exports.initFavorExpItem=void 0;const UE=require("ue"),EventDefine_1=require("../../../Common/Event/EventDefine"),EventSystem_1=require("../../../Common/Event/EventSystem"),ModelManager_1=require("../../../Manager/ModelManager"),UiTickViewBase_1=require("../../../Ui/Base/UiTickViewBase"),UiManager_1=require("../../../Ui/UiManager"),GenericLayoutNew_1=require("../../Util/Layout/GenericLayoutNew"),RoleFavorHintItem_1=require("./RoleFavorHintItem"),initFavorExpItem=(e,t,i)=>{return{Key:i,Value:new RoleFavorHintItem_1.RoleFavorHintItem(e,t)}};exports.initFavorExpItem=initFavorExpItem;class RoleFavorHintView extends UiTickViewBase_1.UiTickViewBase{constructor(){super(...arguments),this.O1o=[],this.k1o=void 0,this.F1o=0,this.V1o=e=>{var t,i=this.H1o(e),r=i.length;for(let e=0;e<r;e++){var s=i[e];this.O1o.push(s)}this.k1o.ClearChildren(),this.k1o.RebuildLayoutByDataNew(this.O1o),this.F1o=this.O1o.length;for([,t]of this.k1o.GetLayoutItemMap())t.SetSequenceFinishCallBack(this.q1o)},this.q1o=()=>{this.F1o=this.F1o-1,0===this.F1o&&UiManager_1.UiManager.CloseView("RoleFavorHintView")}}OnRegisterComponent(){this.ComponentRegisterInfos=[[0,UE.UIItem],[1,UE.UIVerticalLayout]]}OnStart(){this.O1o=this.OpenParam,this.O1o=this.H1o(this.O1o),this.k1o=new GenericLayoutNew_1.GenericLayoutNew(this.GetVerticalLayout(1),exports.initFavorExpItem),this.k1o.RebuildLayoutByDataNew(this.O1o),this.F1o=this.O1o.length;for(var[,e]of this.k1o.GetLayoutItemMap())e.SetSequenceFinishCallBack(this.q1o)}OnAddEventListener(){EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateRoleFavorHintView,this.V1o)}OnRemoveEventListener(){EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateRoleFavorHintView,this.V1o)}H1o(n){if(ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData){var o=ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData.GetRoleIdList;if(0!==o.length){const _=o.length;var a=new Set;let i=0,r=!0,s=void 0;for(let e=0;e<_;e++){var h=o[e],v=n.length;let t=!1;for(let e=0;e<v;e++){var u=n[e];if(u.RoleConfig.Id===h){0===i?(i=u.Exp,t=!0,s=u):t=u.Exp===i,a.add(e);break}}t||(r=!1)}if(r){const _=n.length;var t,l=[];l.push(s);for(let e=0;e<_;e++)a.has(e)||(t=n[e],l.push(t));return l}}}return n}OnBeforeDestroy(){this.O1o=[],this.k1o&&(this.k1o.ClearChildren(),this.k1o=void 0),this.F1o=0}}exports.RoleFavorHintView=RoleFavorHintView;
//# sourceMappingURL=RoleFavorHintView.js.map