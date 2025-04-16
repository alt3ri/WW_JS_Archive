"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerSoarMonitorController =
    exports.ENABLE_SLOW_STREAMING_ENTITY_FILTER =
    exports.SLOW_STREAMING_HEIGHT_THRESHOULD =
      void 0);
const UE = require("ue"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  PlayerSoarMonitorFilter_1 = require("../../Utils/Filter/EntityToLoad/PlayerSoarMonitorFilter"),
  SLOW_STREAMING_HEIGHT_THRESHOULD_CVAR =
    ((exports.SLOW_STREAMING_HEIGHT_THRESHOULD = 1500),
    "wp.Runtime.SoraGridBlackListHeight");
exports.ENABLE_SLOW_STREAMING_ENTITY_FILTER = !0;
class PlayerSoarMonitorController extends ControllerBase_1.ControllerBase {
  static set IsPlayerSoar(e) {
    this.OJl !== e &&
      ((this.OJl = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayerSoarChanged,
        e,
      ));
  }
  static get IsPlayerSoar() {
    return this.OJl;
  }
  static get EnableSlowStreaming() {
    return this.kJl;
  }
  static OnInit() {
    return this.InitTickOptimize(60, -1), this.DEa(), super.OnInit();
  }
  static DEa() {
    (this.HeightThreshould = UE.KismetSystemLibrary.GetConsoleVariableIntValue(
      SLOW_STREAMING_HEIGHT_THRESHOULD_CVAR,
    )),
      this.HeightThreshould <= 0 &&
        (this.HeightThreshould = exports.SLOW_STREAMING_HEIGHT_THRESHOULD);
  }
  static OnTick(e) {
    this.GA_(), this.GJl();
  }
  static OnClear() {
    return this.kkc.Cleanup(), super.OnClear();
  }
  static GA_() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    e
      ? ((e = e.Entity.GetComponent(173)),
        (this.IsPlayerSoar =
          !!e &&
          e.MoveState === CharacterUnifiedStateTypes_1.ECharMoveState.Soar))
      : (this.IsPlayerSoar = !1);
  }
  static GJl() {
    var e = this.IsPlayerSoar && this.FJl();
    this.kJl !== e &&
      ((this.kJl = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.SlowStreamingBySoar,
        this.kJl,
      ));
  }
  static FJl() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    return (
      !!e &&
      !!(
        (e = e.Entity.GetComponent(176)) &&
        e.GetHeightAboveGround(this.HeightThreshould + 1) >
          this.HeightThreshould
      )
    );
  }
}
((exports.PlayerSoarMonitorController = PlayerSoarMonitorController).OJl = !1),
  (PlayerSoarMonitorController.kJl = !1),
  (PlayerSoarMonitorController.kkc =
    PlayerSoarMonitorFilter_1.PlayerSoarMonitorFilter.Create());
//# sourceMappingURL=PlayerSoarMonitorController.js.map
