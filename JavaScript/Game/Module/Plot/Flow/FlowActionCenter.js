"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowAction = exports.FlowActionCenter = void 0);
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  FlowActionAddPlayBubble_1 = require("../FlowActions/FlowActionAddPlayBubble"),
  FlowActionAwakeEntity_1 = require("../FlowActions/FlowActionAwakeEntity"),
  FlowActionBeginFlowTemplate_1 = require("../FlowActions/FlowActionBeginFlowTemplate"),
  FlowActionCameraLookAt_1 = require("../FlowActions/FlowActionCameraLookAt"),
  FlowActionChangeActorTalker_1 = require("../FlowActions/FlowActionChangeActorTalker"),
  FlowActionChangeEntityPerformanceState_1 = require("../FlowActions/FlowActionChangeEntityPerformanceState"),
  FlowActionChangeEntitySelfState_1 = require("../FlowActions/FlowActionChangeEntitySelfState"),
  FlowActionChangeEntityState_1 = require("../FlowActions/FlowActionChangeEntityState"),
  FlowActionChangeFormation_1 = require("../FlowActions/FlowActionChangeFormation"),
  FlowActionChangeInteractOptionText_1 = require("../FlowActions/FlowActionChangeInteractOptionText"),
  FlowActionChangeState_1 = require("../FlowActions/FlowActionChangeState"),
  FlowActionCloseFlowTemplate_1 = require("../FlowActions/FlowActionCloseFlowTemplate"),
  FlowActionDestroyEntity_1 = require("../FlowActions/FlowActionDestroyEntity"),
  FlowActionFadeInScreen_1 = require("../FlowActions/FlowActionFadeInScreen"),
  FlowActionFadeOutScreen_1 = require("../FlowActions/FlowActionFadeOutScreen"),
  FlowActionFinishState_1 = require("../FlowActions/FlowActionFinishState"),
  FlowActionFinishTalk_1 = require("../FlowActions/FlowActionFinishTalk"),
  FlowActionHideByRangeInFlow_1 = require("../FlowActions/FlowActionHideByRangeInFlow"),
  FlowActionJumpTalk_1 = require("../FlowActions/FlowActionJumpTalk"),
  FlowActionLevelSyncAction_1 = require("../FlowActions/FlowActionLevelSyncAction"),
  FlowActionLockTodTime_1 = require("../FlowActions/FlowActionLockTodTime"),
  FlowActionOpenQuestChapterView_1 = require("../FlowActions/FlowActionOpenQuestChapterView"),
  FlowActionOpenSystemBoard_1 = require("../FlowActions/FlowActionOpenSystemBoard"),
  FlowActionPlayMovie_1 = require("../FlowActions/FlowActionPlayMovie"),
  FlowActionPlaySequenceData_1 = require("../FlowActions/FlowActionPlaySequenceData"),
  FlowActionServerAction_1 = require("../FlowActions/FlowActionServerAction"),
  FlowActionSetCameraAnim_1 = require("../FlowActions/FlowActionSetCameraAnim"),
  FlowActionSetEntityVisible_1 = require("../FlowActions/FlowActionSetEntityVisible"),
  FlowActionSetFlowTemplate_1 = require("../FlowActions/FlowActionSetFlowTemplate"),
  FlowActionSetHeadIconVisible_1 = require("../FlowActions/FlowActionSetHeadIconVisible"),
  FlowActionSetPlayerPos_1 = require("../FlowActions/FlowActionSetPlayerPos"),
  FlowActionSetPlotMode_1 = require("../FlowActions/FlowActionSetPlotMode"),
  FlowActionSetTime_1 = require("../FlowActions/FlowActionSetTime"),
  FlowActionShowCenterText_1 = require("../FlowActions/FlowActionShowCenterText"),
  FlowActionShowTalk_1 = require("../FlowActions/FlowActionShowTalk"),
  FlowActionSwitchSubLevels_1 = require("../FlowActions/FlowActionSwitchSubLevels"),
  FlowActionTakePlotPhoto_1 = require("../FlowActions/FlowActionTakePlotPhoto"),
  FlowActionUnlockEntity_1 = require("../FlowActions/FlowActionUnlockEntity"),
  FlowActionWait_1 = require("../FlowActions/FlowActionWait");
class FlowActionCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments), (this.EXi = new Map());
  }
  OnInit() {
    this.LTe();
  }
  OnDestroy() {
    this.EXi?.clear();
  }
  LTe() {
    this.SXi("ShowTalk", FlowActionShowTalk_1.FlowActionShowTalk),
      this.SXi("ChangeState", FlowActionChangeState_1.FlowActionChangeState),
      this.SXi("FinishState", FlowActionFinishState_1.FlowActionFinishState),
      this.SXi("JumpTalk", FlowActionJumpTalk_1.FlowActionJumpTalk),
      this.SXi("FinishTalk", FlowActionFinishTalk_1.FlowActionFinishTalk),
      this.SXi(
        "PlaySequenceData",
        FlowActionPlaySequenceData_1.FlowActionPlaySequenceData,
      ),
      this.SXi("SetPlotMode", FlowActionSetPlotMode_1.FlowActionSetPlotMode),
      this.SXi(
        "ShowCenterText",
        FlowActionShowCenterText_1.FlowActionShowCenterText,
      ),
      this.SXi(
        "SetHeadIconVisible",
        FlowActionSetHeadIconVisible_1.FlowActionSetHeadIconVisible,
      ),
      this.SXi("Wait", FlowActionWait_1.FlowActionWait),
      this.SXi("PlayMovie", FlowActionPlayMovie_1.FlowActionPlayMovie),
      this.SXi(
        "ChangeInteractOptionText",
        FlowActionChangeInteractOptionText_1.FlowActionChangeInteractOptionText,
        !0,
      ),
      this.SXi("FadeInScreen", FlowActionFadeInScreen_1.FlowActionFadeInScreen),
      this.SXi(
        "FadeOutScreen",
        FlowActionFadeOutScreen_1.FlowActionFadeOutScreen,
      ),
      this.SXi(
        "BeginFlowTemplate",
        FlowActionBeginFlowTemplate_1.FlowActionBeginFlowTemplate,
      ),
      this.SXi(
        "SetFlowTemplate",
        FlowActionSetFlowTemplate_1.FlowActionSetFlowTemplate,
      ),
      this.SXi(
        "CloseFlowTemplate",
        FlowActionCloseFlowTemplate_1.FlowActionCloseFlowTemplate,
      ),
      this.SXi("SetPlayerPos", FlowActionSetPlayerPos_1.FlowActionSetPlayerPos),
      this.SXi("AwakeEntity", FlowActionAwakeEntity_1.FlowActionAwakeEntity),
      this.SXi(
        "DestroyEntity",
        FlowActionDestroyEntity_1.FlowActionDestroyEntity,
      ),
      this.SXi(
        "PlayerLookAt",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.SXi(
        "PostAkEvent",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.SXi("CameraLookAt", FlowActionCameraLookAt_1.FlowActionCameraLookAt),
      this.SXi(
        "PlayBubble",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.SXi(
        "AddPlayBubble",
        FlowActionAddPlayBubble_1.FlowActionAddPlayBubble,
        !0,
      ),
      this.SXi(
        "SetCameraAnim",
        FlowActionSetCameraAnim_1.FlowActionSetCameraAnim,
        !0,
      ),
      this.SXi(
        "TakePlotPhoto",
        FlowActionTakePlotPhoto_1.FlowActionTakePlotPhoto,
      ),
      this.SXi("SetTime", FlowActionSetTime_1.FlowActionSetTime, !0),
      this.SXi(
        "HideByRangeInFlow",
        FlowActionHideByRangeInFlow_1.FlowActionHideByRangeInFlow,
        !0,
      ),
      this.SXi(
        "ChangeActorTalker",
        FlowActionChangeActorTalker_1.FlowActionChangeActorTalker,
        !0,
      ),
      this.SXi("SetWeather", FlowActionServerAction_1.FlowActionServerAction),
      this.SXi(
        "SetTimeLockState",
        FlowActionLockTodTime_1.FlowActionLockTodTime,
        !0,
      ),
      this.SXi(
        "SetWeatherLockState",
        FlowActionServerAction_1.FlowActionServerAction,
      ),
      this.SXi(
        "PromptQuestChapterUI",
        FlowActionOpenQuestChapterView_1.FlowActionOpenQuestChapterView,
      ),
      this.SXi(
        "OpenSystemBoard",
        FlowActionOpenSystemBoard_1.FlowActionOpenSystemBoard,
      ),
      this.SXi(
        "ChangeEntityState",
        FlowActionChangeEntityState_1.FlowActionChangeEntityState,
      ),
      this.SXi(
        "UnlockEntity",
        FlowActionUnlockEntity_1.FlowActionUnlockEntity,
        !0,
      ),
      this.SXi(
        "AdjustPlayerCamera",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.SXi(
        "RestorePlayerCameraAdjustment",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.SXi(
        "ChangeEntityPrefabPerformance",
        FlowActionChangeEntityPerformanceState_1.FlowActionChangeEntityPerformanceState,
        !0,
      ),
      this.SXi(
        "ChangeSelfEntityState",
        FlowActionChangeEntitySelfState_1.FlowActionChangeEntitySelfState,
        !0,
      ),
      this.SXi(
        "SetEntityVisible",
        FlowActionSetEntityVisible_1.FlowActionSetEntityVisible,
      ),
      this.SXi(
        "ChangePhantomFormation",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.SXi(
        "RestorePhantomFormation",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.SXi(
        "AddTrialCharacter",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.SXi(
        "RemoveTrialCharacter",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.SXi(
        "SwitchSubLevels",
        FlowActionSwitchSubLevels_1.FlowActionSwitchSubLevels,
      );
  }
  SXi(t, o, e = !1) {
    var i;
    this.EXi.has(t) ||
      ((i = new FlowAction()).Init(t, o, e), this.EXi.set(t, i));
  }
  GetFlowAction(t) {
    return this.EXi.get(t);
  }
}
exports.FlowActionCenter = FlowActionCenter;
class FlowAction {
  constructor() {
    (this.Type = ""),
      (this.ActionClass = void 0),
      (this.IsAutoFinish = !1),
      (this.ActionInstanceList = void 0);
  }
  Init(t, o, e = !1) {
    (this.Type = t),
      (this.ActionClass = o),
      (this.IsAutoFinish = e),
      (this.ActionInstanceList = new Array());
    t = this.dZ();
    this.ActionInstanceList.push(t);
  }
  dZ() {
    var t = new this.ActionClass();
    return (t.Type = this.Type), t;
  }
  GetAction() {
    var t = this.yXi();
    return (t.Owner = this), t;
  }
  yXi() {
    return this.IsAutoFinish
      ? this.ActionInstanceList[0]
      : this.ActionInstanceList.length <= 0
        ? this.dZ()
        : this.ActionInstanceList.pop();
  }
  RecycleAction(t) {
    (t.Owner = void 0), this.IsAutoFinish || this.ActionInstanceList.push(t);
  }
}
exports.FlowAction = FlowAction;
//# sourceMappingURL=FlowActionCenter.js.map
