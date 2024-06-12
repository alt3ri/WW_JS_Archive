
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GeneralLogicTreeModel=void 0;const Log_1=require("../../../Core/Common/Log"),Protocol_1=require("../../../Core/Define/Net/Protocol"),ModelBase_1=require("../../../Core/Framework/ModelBase"),MathUtils_1=require("../../../Core/Utils/MathUtils"),EventDefine_1=require("../../Common/Event/EventDefine"),EventSystem_1=require("../../Common/Event/EventSystem"),TimeUtil_1=require("../../Common/TimeUtil"),ConfigManager_1=require("../../Manager/ConfigManager"),ModelManager_1=require("../../Manager/ModelManager"),BaseBehaviorTree_1=require("./BaseBehaviorTree/BaseBehaviorTree"),GeneralLogicTreeDefine_1=require("./Define/GeneralLogicTreeDefine");class GeneralLogicTreeModel extends ModelBase_1.ModelBase{constructor(){super(...arguments),this.d$t=void 0,this.C$t=void 0,this.g$t=void 0,this.B5s=void 0,this.f$t=void 0,this.IsWakeUp=!1,this.ExpressionOccupationTreeIncId=void 0,this.TimeStop=!1,this.CountDownViewClosing=!1,this.DisableInput=!1,this.lro=0}OnInit(){return this.d$t=BigInt(0),this.C$t=new Map,this.g$t=new Map,this.f$t=new Map,this.B5s=new Map,!0}OnLeaveLevel(){return this.p$t(),!0}OnChangeMode(){return this.p$t(),!0}p$t(){for(var[,e]of this.C$t)e.SetSleep(!0);this.IsWakeUp=!1}OnClear(){return this.C$t?.clear(),this.C$t=void 0,this.g$t?.clear(),this.g$t=void 0,this.f$t?.clear(),!(this.f$t=void 0)}SetTimerUiOwnerId(e){this.d$t=e}IsTimerUiOwner(e){return this.d$t===e}CreateBehaviorTree(i){var r=MathUtils_1.MathUtils.LongToBigInt(i.L5n);let t=this.C$t.get(r);if(t)return t.Recover(i),t;let o=!this.IsWakeUp;switch(i.NCs){case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:var n=ModelManager_1.ModelManager.QuestNewModel.GetQuest(i.qfs);n?(t=new BaseBehaviorTree_1.BaseBehaviorTree(r,i.qfs,i.NCs,n.DungeonId,n.QuestMarkId),n.SetUpBehaviorTree(t)):Log_1.Log.CheckError()&&Log_1.Log.Error("GeneralLogicTree",19,"创建任务行为树时：任务不存在",["任务Id",i.qfs]);break;case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:n=ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(i.qfs);n?(t=new BaseBehaviorTree_1.BaseBehaviorTree(r,i.qfs,i.NCs,ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID),n.SetUpBehaviorTree(t)):Log_1.Log.CheckError()&&Log_1.Log.Error("GeneralLogicTree",19,"创建玩法行为树时：玩法不存在",["玩法Id",i.qfs]);break;case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:{n=ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo();if(!n){Log_1.Log.CheckError()&&Log_1.Log.Error("GeneralLogicTree",19,"创建副本行为树时：副本不存在",["副本Id",i.qfs]);break}let e=GeneralLogicTreeDefine_1.COMMONLEVELPLAY_TRACKICONID;switch(n.SubType){case 2:e=ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(1);break;case 1:e=ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestTypeMarkId(3)}o=!ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed,t=new BaseBehaviorTree_1.BaseBehaviorTree(r,i.qfs,i.NCs,ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),e),n.SetUpBehaviorTree(t);break}default:Log_1.Log.CheckError()&&Log_1.Log.Error("GeneralLogicTree",19,"创建行为树时找不到对应的行为树类型",["行为树类型Id",i.NCs])}if(t){this.C$t.set(r,t),this.f$t.set(r,i.T5n);let e=this.g$t.get(i.NCs);return e||(e=new Map,this.g$t.set(i.NCs,e)),e.set(r,t),t.InitTree(i,o),t}Log_1.Log.CheckError()&&Log_1.Log.Error("GeneralLogicTree",19,"创建行为树失败",["行为树类型Id",i.NCs],["行为树Id",i.qfs])}RemoveBehaviorTree(e){var i=this.C$t.get(e);i&&(i.Destroy(),this.C$t.delete(e),this.g$t.get(i.BtType)?.delete(e))}GetBehaviorTree(e){return this.C$t.get(e)}GetBehaviorTrees(e){return this.g$t.get(e)}GetBehaviorTreeOwnerId(e){if(void 0!==e)return this.f$t.get(e)}GetAllBehaviorTrees(){return this.C$t}SaveUpdateInfo(e,i,r){var t="Disabled"!==ModelManager_1.ModelManager.AutoRunModel.GetAutoRunMode(),e=new GeneralLogicTreeDefine_1.NodeStatusChangeInfo(e,i,t,r);EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.QuestUpdateInfoAdd,e)}ForceShowDailyQuestInfo(e,i){var r=this.GetBehaviorTree(e);r&&this.SaveUpdateInfo(e,i,r.CreateShowBridge())}ApplyExpressionOccupation(e){e&&this.ExpressionOccupationTreeIncId!==e&&(this.ExpressionOccupationTreeIncId=e,EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeApplyExpressionOccupation,e))}IsExpressionInOccupying(){return void 0!==this.ExpressionOccupationTreeIncId}IsExpressionOccupyingByTree(e){return void 0!==this.ExpressionOccupationTreeIncId&&this.ExpressionOccupationTreeIncId===e}TryReleaseExpressionOccupation(e){this.ExpressionOccupationTreeIncId&&this.ExpressionOccupationTreeIncId===e&&(EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GeneralLogicTreeReleaseExpressionOccupation,e),this.ExpressionOccupationTreeIncId=void 0)}UpdateGuideLineStartShowTime(){this.lro=TimeUtil_1.TimeUtil.GetServerTime()}GetGuideLineStartShowTime(){return this.lro}AddOccupationInfo(e){this.B5s.set(e.cvs,MathUtils_1.MathUtils.LongToBigInt(e.Ykn))}RemoveOccupationInfo(e){this.B5s.delete(e)}IsOccupationExist(e){return void 0!==this.B5s.get(e)}GetOccupationTreeId(e){return this.B5s.get(e)}GetOccupationQuestName(e){var e=this.B5s.get(e);return(e=e&&this.GetBehaviorTree(e))&&e.BtType===Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest?ModelManager_1.ModelManager.QuestNewModel.GetQuest(e.TreeConfigId)?.Name??"":""}}exports.GeneralLogicTreeModel=GeneralLogicTreeModel;
//# sourceMappingURL=GeneralLogicTreeModel.js.map