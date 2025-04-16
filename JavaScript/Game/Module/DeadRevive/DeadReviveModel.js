"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DeadReviveModel = void 0);
const ReviveById_1 = require("../../../Core/Define/ConfigQuery/ReviveById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager");
class ReviveCooldownData {
  constructor() {
    (this.Index = -1),
      (this.RemainMilliseconds = 0),
      (this.TimerHandle = void 0);
  }
}
class DeadReviveModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ReviveMode = 0),
      (this.IsAutoRevive = !1),
      (this.IsShowRevive = !1),
      (this.ReviveLimitTime = 0),
      (this.RevivePosition = void 0),
      (this.ReviveRotator = void 0),
      (this.ReviveGravity = void 0),
      (this.ReviveConfig = void 0),
      (this.DeadDelayTimer = void 0),
      (this.ReviveCooldownCreatureMap = new Map()),
      (this.CurrentShareReviveTimes = 0),
      (this.MaxShareReviveTimes = 0),
      (this.ChangeRoleIdAfterRevive = 0),
      (this.OpenedViewName = void 0),
      (this.BlockAllInput = !1),
      (this.SkipFallInjure = !1),
      (this.SkipDeathAnim = !1),
      (this.ReviveFlowIncId = 0),
      (this.HandleOnClickGiveUpExternal = void 0);
  }
  InitReviveConfig(e) {
    (this.ReviveConfig && this.ReviveConfig.Id === e) ||
      (this.ReviveConfig = ReviveById_1.configReviveById.GetConfig(e));
  }
  OnClear() {
    return this.qFt(), !0;
  }
  OnLeaveLevel() {
    return this.qFt(), !0;
  }
  OnChangeMode() {
    return this.qFt(), !0;
  }
  qFt() {
    this.ClearReviveData(),
      this.ClearExternalHandles(),
      (this.ReviveMode = 0),
      (this.CurrentShareReviveTimes = 0),
      (this.MaxShareReviveTimes = 0),
      (this.RevivePosition = void 0),
      (this.ReviveRotator = void 0),
      (this.ReviveGravity = void 0),
      (this.ReviveFlowIncId = 0),
      (this.BlockAllInput = !1),
      (this.ChangeRoleIdAfterRevive = 0);
    for (var [e, t] of this.ReviveCooldownCreatureMap) this.gLc(e, t);
    this.ReviveCooldownCreatureMap.clear();
  }
  ClearReviveData() {
    (this.ReviveLimitTime = 0),
      (this.IsShowRevive = !1),
      (this.IsAutoRevive = !1),
      this.DeadDelayTimer &&
        (this.DeadDelayTimer.Remove(), (this.DeadDelayTimer = void 0));
  }
  ClearExternalHandles() {
    this.HandleOnClickGiveUpExternal = void 0;
  }
  RegisterCooldown(i, e) {
    if (!this.ReviveCooldownCreatureMap.has(i)) {
      const o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(i, {
        ParamType: 3,
      });
      if (o) {
        const n = o.GetPlayerId();
        var t =
          ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
            n,
            o.GetConfigId,
          );
        if (t && !(t < 1)) {
          const r = e * MathUtils_1.MathUtils.MillisecondToSecond;
          var s,
            t = t - 1;
          const h = TimerSystem_1.TimerSystem.Forever((e) => {
            var t = this.ReviveCooldownCreatureMap.get(i);
            t
              ? (e = t.RemainMilliseconds - e) <= 0
                ? this.UnRegisterCooldown(i)
                : ((t =
                    (t.RemainMilliseconds = e) *
                    MathUtils_1.MathUtils.MillisecondToSecond),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .OnRefreshFormationCooldownExternalInBattleView,
                    n,
                    o.GetConfigId,
                    t,
                    r,
                  ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnRoleReviveCooldownChange,
                    i,
                    t,
                  ))
              : (EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName
                    .OnRefreshFormationCooldownExternalInBattleView,
                  n,
                  o.GetConfigId,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnRoleReviveCooldownChange,
                  i,
                  0,
                ),
                h?.Remove());
          }, 100);
          h &&
            (((s = new ReviveCooldownData()).Index = t),
            (s.RemainMilliseconds = e),
            (s.TimerHandle = h),
            this.ReviveCooldownCreatureMap.set(i, s));
        }
      }
    }
  }
  UnRegisterCooldown(e) {
    var t = this.ReviveCooldownCreatureMap.get(e);
    t && (this.gLc(e, t), this.ReviveCooldownCreatureMap.delete(e));
  }
  gLc(e, t) {
    t.TimerHandle?.Remove();
    t = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItem(e, {
      ParamType: 3,
    });
    t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshFormationCooldownExternalInBattleView,
        t.GetPlayerId(),
        t.GetConfigId,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRoleReviveCooldownChange,
        e,
        0,
      );
  }
}
exports.DeadReviveModel = DeadReviveModel;
//# sourceMappingURL=DeadReviveModel.js.map
