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
    (this.XQe = !0),
      (this.j3 = void 0),
      (this.$Qe = !1),
      (this.YQe = !1),
      (this.JQe = new Map()),
      (this.zQe = []),
      (this.ZQe = 0),
      (this.eXe = 3e3),
      (this.tXe = !1),
      (this.iXe = !1),
      (this.q7e = () => {
        if (
          this.XQe &&
          !this.$Qe &&
          !this.YQe &&
          !(Time_1.Time.WorldTime < this.ZQe || this.tXe || this.iXe)
        ) {
          for (const i of this.zQe)
            if (i) {
              var t = this.zQe.length;
              for (let e = 0; e < t; e++) this.zQe[e] = !1;
              return void this.DelayExitBattleMode();
            }
          var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
          e &&
            e.EntityHandle &&
            (this.oXe(e) ||
              ((this.$Qe = !0),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.BattleUiExploreModeChanged,
                !0,
              )));
        }
      });
  }
  Init() {
    this.eXe = CommonParamById_1.configCommonParamById.GetIntConfig(
      "ExploreModeWaitTime",
    );
    for (let e = 0; e < actionNames.length; e++) {
      var t = actionNames[e];
      this.zQe.push(!1), this.JQe.set(t, e);
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
    return this.$Qe;
  }
  SetAutoSwitch(e) {
    (this.XQe = !1),
      this.XQe
        ? this.j3 ||
          (this.j3 = TimerSystem_1.TimerSystem.Forever(
            this.q7e,
            TIMER_INTERVAL,
          ))
        : (this.BCe(),
          this.$Qe &&
            ((this.$Qe = !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BattleUiExploreModeChanged,
              !1,
            )));
  }
  EnterBattleMode() {
    this.$Qe &&
      ((this.$Qe = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.BattleUiExploreModeChanged,
        !1,
      ));
  }
  DelayExitBattleMode() {
    this.ZQe = Time_1.Time.WorldTime + this.eXe;
  }
  UpdateGuidingState(e) {
    (this.tXe = e) ? this.EnterBattleMode() : this.DelayExitBattleMode();
  }
  UpdateBossState(e) {
    (this.iXe = e) ? this.EnterBattleMode() : this.DelayExitBattleMode();
  }
  InputAction(e, t) {
    e = this.JQe.get(e);
    void 0 === e ||
      (!(this.zQe[e] = t) && this.$Qe) ||
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
    (this.YQe = this.rXe()), this.YQe && this.$Qe && this.EnterBattleMode();
  }
  oXe(e) {
    return (
      e.EntityHandle.Entity.GetComponent(161).DirectionState ===
      CharacterUnifiedStateTypes_1.ECharDirectionState.AimDirection
    );
  }
  rXe() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return (
      0 !== e &&
      7 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          .InstSubType
    );
  }
  BCe() {
    this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
  }
}
exports.BattleUiExploreModeData = BattleUiExploreModeData;
//# sourceMappingURL=BattleUiExploreModeData.js.map
