"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FlowAction = exports.FlowActionCenter = void 0);
const ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const FlowActionAddPlayBubble_1 = require("../FlowActions/FlowActionAddPlayBubble");
const FlowActionAwakeEntity_1 = require("../FlowActions/FlowActionAwakeEntity");
const FlowActionBeginFlowTemplate_1 = require("../FlowActions/FlowActionBeginFlowTemplate");
const FlowActionCameraLookAt_1 = require("../FlowActions/FlowActionCameraLookAt");
const FlowActionChangeActorTalker_1 = require("../FlowActions/FlowActionChangeActorTalker");
const FlowActionChangeEntityPerformanceState_1 = require("../FlowActions/FlowActionChangeEntityPerformanceState");
const FlowActionChangeEntitySelfState_1 = require("../FlowActions/FlowActionChangeEntitySelfState");
const FlowActionChangeEntityState_1 = require("../FlowActions/FlowActionChangeEntityState");
const FlowActionChangeFormation_1 = require("../FlowActions/FlowActionChangeFormation");
const FlowActionChangeInteractOptionText_1 = require("../FlowActions/FlowActionChangeInteractOptionText");
const FlowActionChangeState_1 = require("../FlowActions/FlowActionChangeState");
const FlowActionCloseFlowTemplate_1 = require("../FlowActions/FlowActionCloseFlowTemplate");
const FlowActionDestroyEntity_1 = require("../FlowActions/FlowActionDestroyEntity");
const FlowActionFadeInScreen_1 = require("../FlowActions/FlowActionFadeInScreen");
const FlowActionFadeOutScreen_1 = require("../FlowActions/FlowActionFadeOutScreen");
const FlowActionFinishState_1 = require("../FlowActions/FlowActionFinishState");
const FlowActionFinishTalk_1 = require("../FlowActions/FlowActionFinishTalk");
const FlowActionHideByRangeInFlow_1 = require("../FlowActions/FlowActionHideByRangeInFlow");
const FlowActionJumpTalk_1 = require("../FlowActions/FlowActionJumpTalk");
const FlowActionLevelSyncAction_1 = require("../FlowActions/FlowActionLevelSyncAction");
const FlowActionLockTodTime_1 = require("../FlowActions/FlowActionLockTodTime");
const FlowActionOpenQuestChapterView_1 = require("../FlowActions/FlowActionOpenQuestChapterView");
const FlowActionOpenSystemBoard_1 = require("../FlowActions/FlowActionOpenSystemBoard");
const FlowActionPlayMovie_1 = require("../FlowActions/FlowActionPlayMovie");
const FlowActionPlaySequenceData_1 = require("../FlowActions/FlowActionPlaySequenceData");
const FlowActionServerAction_1 = require("../FlowActions/FlowActionServerAction");
const FlowActionSetCameraAnim_1 = require("../FlowActions/FlowActionSetCameraAnim");
const FlowActionSetEntityVisible_1 = require("../FlowActions/FlowActionSetEntityVisible");
const FlowActionSetFlowTemplate_1 = require("../FlowActions/FlowActionSetFlowTemplate");
const FlowActionSetHeadIconVisible_1 = require("../FlowActions/FlowActionSetHeadIconVisible");
const FlowActionSetPlayerPos_1 = require("../FlowActions/FlowActionSetPlayerPos");
const FlowActionSetPlotMode_1 = require("../FlowActions/FlowActionSetPlotMode");
const FlowActionSetTime_1 = require("../FlowActions/FlowActionSetTime");
const FlowActionShowCenterText_1 = require("../FlowActions/FlowActionShowCenterText");
const FlowActionShowTalk_1 = require("../FlowActions/FlowActionShowTalk");
const FlowActionSwitchSubLevels_1 = require("../FlowActions/FlowActionSwitchSubLevels");
const FlowActionTakePlotPhoto_1 = require("../FlowActions/FlowActionTakePlotPhoto");
const FlowActionUnlockEntity_1 = require("../FlowActions/FlowActionUnlockEntity");
const FlowActionWait_1 = require("../FlowActions/FlowActionWait");
class FlowActionCenter extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments), (this.yQi = new Map());
  }
  OnInit() {
    this.LTe();
  }
  OnDestroy() {
    this.yQi?.clear();
  }
  LTe() {
    this.IQi("ShowTalk", FlowActionShowTalk_1.FlowActionShowTalk),
      this.IQi("ChangeState", FlowActionChangeState_1.FlowActionChangeState),
      this.IQi("FinishState", FlowActionFinishState_1.FlowActionFinishState),
      this.IQi("JumpTalk", FlowActionJumpTalk_1.FlowActionJumpTalk),
      this.IQi("FinishTalk", FlowActionFinishTalk_1.FlowActionFinishTalk),
      this.IQi(
        "PlaySequenceData",
        FlowActionPlaySequenceData_1.FlowActionPlaySequenceData,
      ),
      this.IQi("SetPlotMode", FlowActionSetPlotMode_1.FlowActionSetPlotMode),
      this.IQi(
        "ShowCenterText",
        FlowActionShowCenterText_1.FlowActionShowCenterText,
      ),
      this.IQi(
        "SetHeadIconVisible",
        FlowActionSetHeadIconVisible_1.FlowActionSetHeadIconVisible,
      ),
      this.IQi("Wait", FlowActionWait_1.FlowActionWait),
      this.IQi("PlayMovie", FlowActionPlayMovie_1.FlowActionPlayMovie),
      this.IQi(
        "ChangeInteractOptionText",
        FlowActionChangeInteractOptionText_1.FlowActionChangeInteractOptionText,
        !0,
      ),
      this.IQi("FadeInScreen", FlowActionFadeInScreen_1.FlowActionFadeInScreen),
      this.IQi(
        "FadeOutScreen",
        FlowActionFadeOutScreen_1.FlowActionFadeOutScreen,
      ),
      this.IQi(
        "BeginFlowTemplate",
        FlowActionBeginFlowTemplate_1.FlowActionBeginFlowTemplate,
      ),
      this.IQi(
        "SetFlowTemplate",
        FlowActionSetFlowTemplate_1.FlowActionSetFlowTemplate,
      ),
      this.IQi(
        "CloseFlowTemplate",
        FlowActionCloseFlowTemplate_1.FlowActionCloseFlowTemplate,
      ),
      this.IQi("SetPlayerPos", FlowActionSetPlayerPos_1.FlowActionSetPlayerPos),
      this.IQi("AwakeEntity", FlowActionAwakeEntity_1.FlowActionAwakeEntity),
      this.IQi(
        "DestroyEntity",
        FlowActionDestroyEntity_1.FlowActionDestroyEntity,
      ),
      this.IQi(
        "PlayerLookAt",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.IQi(
        "PostAkEvent",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.IQi("CameraLookAt", FlowActionCameraLookAt_1.FlowActionCameraLookAt),
      this.IQi(
        "PlayBubble",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.IQi(
        "AddPlayBubble",
        FlowActionAddPlayBubble_1.FlowActionAddPlayBubble,
        !0,
      ),
      this.IQi(
        "SetCameraAnim",
        FlowActionSetCameraAnim_1.FlowActionSetCameraAnim,
        !0,
      ),
      this.IQi(
        "TakePlotPhoto",
        FlowActionTakePlotPhoto_1.FlowActionTakePlotPhoto,
      ),
      this.IQi("SetTime", FlowActionSetTime_1.FlowActionSetTime, !0),
      this.IQi(
        "HideByRangeInFlow",
        FlowActionHideByRangeInFlow_1.FlowActionHideByRangeInFlow,
        !0,
      ),
      this.IQi(
        "ChangeActorTalker",
        FlowActionChangeActorTalker_1.FlowActionChangeActorTalker,
        !0,
      ),
      this.IQi("SetWeather", FlowActionServerAction_1.FlowActionServerAction),
      this.IQi(
        "SetTimeLockState",
        FlowActionLockTodTime_1.FlowActionLockTodTime,
        !0,
      ),
      this.IQi(
        "SetWeatherLockState",
        FlowActionServerAction_1.FlowActionServerAction,
      ),
      this.IQi(
        "PromptQuestChapterUI",
        FlowActionOpenQuestChapterView_1.FlowActionOpenQuestChapterView,
      ),
      this.IQi(
        "OpenSystemBoard",
        FlowActionOpenSystemBoard_1.FlowActionOpenSystemBoard,
      ),
      this.IQi(
        "ChangeEntityState",
        FlowActionChangeEntityState_1.FlowActionChangeEntityState,
      ),
      this.IQi(
        "UnlockEntity",
        FlowActionUnlockEntity_1.FlowActionUnlockEntity,
        !0,
      ),
      this.IQi(
        "AdjustPlayerCamera",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.IQi(
        "RestorePlayerCameraAdjustment",
        FlowActionLevelSyncAction_1.FlowActionLevelSyncAction,
        !0,
      ),
      this.IQi(
        "ChangeEntityPrefabPerformance",
        FlowActionChangeEntityPerformanceState_1.FlowActionChangeEntityPerformanceState,
        !0,
      ),
      this.IQi(
        "ChangeSelfEntityState",
        FlowActionChangeEntitySelfState_1.FlowActionChangeEntitySelfState,
        !0,
      ),
      this.IQi(
        "SetEntityVisible",
        FlowActionSetEntityVisible_1.FlowActionSetEntityVisible,
      ),
      this.IQi(
        "ChangePhantomFormation",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.IQi(
        "RestorePhantomFormation",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.IQi(
        "AddTrialCharacter",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.IQi(
        "RemoveTrialCharacter",
        FlowActionChangeFormation_1.FlowActionChangeFormation,
      ),
      this.IQi(
        "SwitchSubLevels",
        FlowActionSwitchSubLevels_1.FlowActionSwitchSubLevels,
      );
  }
  IQi(t, o, e = !1) {
    let i;
    this.yQi.has(t) ||
      ((i = new FlowAction()).Init(t, o, e), this.yQi.set(t, i));
  }
  GetFlowAction(t) {
    return this.yQi.get(t);
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
    const t = new this.ActionClass();
    return (t.Type = this.Type), t;
  }
  GetAction() {
    const t = this.TQi();
    return (t.Owner = this), t;
  }
  TQi() {
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
// # sourceMappingURL=FlowActionCenter.js.map
