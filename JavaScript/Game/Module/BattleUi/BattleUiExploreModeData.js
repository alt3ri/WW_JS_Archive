"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiExploreModeData = void 0);
const Time_1 = require("../../../Core/Common/Time"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  AdventureDefine_1 = require("../AdventureGuide/AdventureDefine"),
  TIMER_INTERVAL = 1e3,
  actionNames = [
    InputMappingsDefine_1.actionMappings.攻击,
    InputMappingsDefine_1.actionMappings.技能1,
    InputMappingsDefine_1.actionMappings.幻象2,
    InputMappingsDefine_1.actionMappings.瞄准,
    InputMappingsDefine_1.actionMappings.大招,
  ];
class BattleUiExploreModeData {
  constructor() {
    (this.qKe = !0),
      (this.j3 = void 0),
      (this.GKe = !1),
      (this.NKe = !1),
      (this.OKe = new Map()),
      (this.kKe = []),
      (this.FKe = 0),
      (this.VKe = 3e3),
      (this.HKe = !1),
      (this.jKe = !1),
      (this.E9e = () => {
        if (
          this.qKe &&
          !this.GKe &&
          !this.NKe &&
          !(Time_1.Time.WorldTime < this.FKe || this.HKe || this.jKe)
        ) {
          for (const i of this.kKe)
            if (i) {
              var t = this.kKe.length;
              for (let e = 0; e < t; e++) this.kKe[e] = !1;
              return void this.DelayExitBattleMode();
            }
          var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
          e &&
            e.EntityHandle &&
            (this.WKe(e) ||
              ((this.GKe = !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.BattleUiExploreModeChanged,
                !0,
              )));
        }
      });
  }
  Init() {
    this.VKe = CommonParamById_1.configCommonParamById.GetIntConfig(
      "ExploreModeWaitTime",
    );
    for (let e = 0; e < actionNames.length; e++) {
      var t = actionNames[e];
      this.kKe.push(!1), this.OKe.set(t, e);
    }
    var e =
      ModelManager_1.ModelManager.BattleUiModel.GetIsAutoSwitchSkillButtonMode();
    this.SetAutoSwitch(e);
  }
  OnLeaveLevel() {}
  Clear() {
    this.SetAutoSwitch(!1);
  }
  GetActionNames() {
    return actionNames;
  }
  GetIsInExploreMode() {
    return this.GKe;
  }
  SetAutoSwitch(e) {
    (this.qKe = !1),
      this.qKe
        ? this.j3 ||
          (this.j3 = TimerSystem_1.TimerSystem.Forever(
            this.E9e,
            TIMER_INTERVAL,
          ))
        : (this.BCe(),
          this.GKe &&
            ((this.GKe = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleUiExploreModeChanged,
              !1,
            )));
  }
  EnterBattleMode() {
    this.GKe &&
      ((this.GKe = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        !1,
      ));
  }
  DelayExitBattleMode() {
    this.FKe = Time_1.Time.WorldTime + this.VKe;
  }
  UpdateGuidingState(e) {
    (this.HKe = e) ? this.EnterBattleMode() : this.DelayExitBattleMode();
  }
  UpdateBossState(e) {
    (this.jKe = e) ? this.EnterBattleMode() : this.DelayExitBattleMode();
  }
  InputAction(e, t) {
    e = this.OKe.get(e);
    void 0 === e ||
      (!(this.kKe[e] = t) && this.GKe) ||
      (this.EnterBattleMode(), this.DelayExitBattleMode());
  }
  BeHit(e) {
    var t = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    t &&
      t.EntityHandle &&
      t.EntityHandle.Entity === e &&
      (this.EnterBattleMode(), this.DelayExitBattleMode());
  }
  UpdateDungeonState() {
    (this.NKe = this.KKe()), this.NKe && this.GKe && this.EnterBattleMode();
  }
  WKe(e) {
    return (
      e.EntityHandle.Entity.GetComponent(158).DirectionState ===
      CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
    );
  }
  KKe() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return (
      0 !== e &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        .InstSubType === AdventureDefine_1.EDungeonSubType.RoleTrail
    );
  }
  BCe() {
    this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
}
exports.BattleUiExploreModeData = BattleUiExploreModeData;
//# sourceMappingURL=BattleUiExploreModeData.js.map
