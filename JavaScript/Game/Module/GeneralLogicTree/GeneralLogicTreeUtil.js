
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.GeneralLogicTreeUtil=void 0;const Log_1=require("../../../Core/Common/Log"),QuestChapterById_1=require("../../../Core/Define/ConfigQuery/QuestChapterById"),Protocol_1=require("../../../Core/Define/Net/Protocol"),Rotator_1=require("../../../Core/Utils/Math/Rotator"),Vector_1=require("../../../Core/Utils/Math/Vector"),KuroSdkReport_1=require("../../KuroSdk/KuroSdkReport"),ConfigManager_1=require("../../Manager/ConfigManager"),ControllerHolder_1=require("../../Manager/ControllerHolder"),ModelManager_1=require("../../Manager/ModelManager"),LguiUtil_1=require("../Util/LguiUtil");class GeneralLogicTreeUtil{static GetEntityConfigPosition(e){let r=void 0;e=ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);return r=e?Vector_1.Vector.Create(e.Transform?.Pos.X??0,e.Transform?.Pos.Y??0,e.Transform?.Pos.Z??0):r}static GetEntityConfigRotator(e){let r=void 0;e=ModelManager_1.ModelManager.CreatureModel.GetEntityData(e);return r=e?Rotator_1.Rotator.Create(e.Transform?.Rot?.Y??0,e.Transform?.Rot?.Z??0,e.Transform?.Rot?.X??0):r}static GetPlayerLocation(){var e=ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;if(e){e=e.Entity.GetComponent(3);if(e)return e.ActorLocationProxy}}static GetNodeConfig(e,r,o){let t=void 0;switch(e){case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:t=ModelManager_1.ModelManager.QuestNewModel.GetQuestNodeConfig(r,o);break;case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:t=ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayNodeConfig(r,o)}return t}static GetLogicTreeContainer(e,r){let o=void 0;switch(e){case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest:o=ModelManager_1.ModelManager.QuestNewModel.GetQuest(r);break;case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeLevelPlay:o=ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(r);break;case Protocol_1.Aki.Protocol.NCs.Proto_BtTypeInst:o=ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()}return o}static OpenQuestChapterView(e,r,o){var t;e&&((t=ModelManager_1.ModelManager.QuestNewModel.GetShowQuestChapterIdFromConfig(r))||Log_1.Log.CheckError()&&Log_1.Log.Error("LevelEvent",19,"任务没有配章节ID，章节内容显示不对找策划同学补上章节Id，目前章节提示需要读取“r.任务章节”的ID来显示内容",["出问题的任务Id",r]),r=ModelManager_1.ModelManager.QuestNewModel.GetShowQuestConditionFromConfig(r),GeneralLogicTreeUtil.OpenChapterViewV2(e.ChapterState,t,!1,r),KuroSdkReport_1.KuroSdkReport.OnChapterStart(t,e.ChapterState))}static OpenChapterViewV2(e,r,o=!1,t){let a=0;var i,l=[r.toString()];switch(e){case 2:a=o?16:10,t&&l.push(t);break;case 0:a=o?16:10;break;case 1:a=o?17:11;var n=ConfigManager_1.ConfigManager.TextConfig.GetTextById("QuestChapterFinish");l.push(n)}a?(i=QuestChapterById_1.configQuestChapterById.GetConfig(r),i=new LguiUtil_1.TableTextArgNew(i.ActName),ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(a,i,void 0,[],l),KuroSdkReport_1.KuroSdkReport.OnChapterStart(r,e)):Log_1.Log.CheckError()&&Log_1.Log.Error("LevelEvent",19,"配置了客户端还未支持的状态",["ChapterState",e])}}exports.GeneralLogicTreeUtil=GeneralLogicTreeUtil;
//# sourceMappingURL=GeneralLogicTreeUtil.js.map