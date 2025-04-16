"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformActionPool = void 0);
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  AiContollerLibrary_1 = require("../../../../../AI/Controller/AiContollerLibrary"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  TURN_MAX_TIME = 3e3;
class PerformActionBase {
  constructor(t) {
    (this.Name = t),
      (this.Id = 0),
      (this.Param = void 0),
      (this.PerformComp = void 0),
      (this.OnFinish = void 0),
      (this.OnBeforeExecute = void 0),
      (this.OnAfterExecute = void 0),
      (this.Block = !1),
      (this.IsValid = !1);
  }
  Execute() {
    this.IsValid
      ? (this.OnBeforeExecute?.(this.Id), this.OnExecute())
      : this.OnFinish();
  }
  FinishExecute() {
    this.OnAfterExecute?.(this.Id), this.OnFinish();
  }
  Reset() {
    (this.IsValid = !1),
      (this.Id = 0),
      (this.Param = void 0),
      (this.PerformComp = void 0),
      (this.OnFinish = void 0),
      (this.OnBeforeExecute = void 0),
      this.OnReset();
  }
  OnReset() {}
  OnExecute() {}
}
class PlayMontageAction extends PerformActionBase {
  constructor() {
    super(...arguments),
      (this.yj_ = 0),
      (this.sDe = void 0),
      (this._j_ = (t) => {
        this.sDe &&
          EventSystem_1.EventSystem.HasWithTarget(
            this.sDe,
            EventDefine_1.EEventName.PerformMontageStop,
            this._j_,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.sDe,
            EventDefine_1.EEventName.PerformMontageStop,
            this._j_,
          ),
          this.yj_ === t && this.FinishExecute();
      });
  }
  OnExecute() {
    var t = this.PerformComp.Entity.GetComponent(43);
    t && (this.yj_ = t.MontageManager.PlayMontage(this.Param)),
      0 < this.yj_
        ? ((this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
            this.PerformComp.Entity.Id,
          )),
          this.sDe &&
            EventSystem_1.EventSystem.AddWithTarget(
              this.sDe,
              EventDefine_1.EEventName.PerformMontageStop,
              this._j_,
            ))
        : this.FinishExecute();
  }
  OnReset() {
    this.sDe &&
      EventSystem_1.EventSystem.HasWithTarget(
        this.sDe,
        EventDefine_1.EEventName.PerformMontageStop,
        this._j_,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.PerformMontageStop,
        this._j_,
      ),
      (this.yj_ = 0),
      (this.sDe = void 0);
  }
}
class StopMontageAction extends PerformActionBase {
  OnExecute() {
    var t = this.PerformComp.Entity.GetComponent(43);
    t && t.MontageManager.StopMontage(this.Param), this.FinishExecute();
  }
}
class TurnAction extends PerformActionBase {
  constructor() {
    super(...arguments),
      (this.Block = !0),
      (this.sDe = void 0),
      (this.Sj_ = void 0),
      (this.Mj_ = void 0),
      (this.Ej_ = () => {
        this.Mj_ = void 0;
        var t = this.PerformComp.Entity.GetComponent(3);
        this.Param.TargetLocation
          ? AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
              t,
              this.Param.TargetLocation,
              this.Param.TurnSpeed ?? 0,
              this.Param.ContainZ,
              this.Param.MinTurnTimeSeconds,
            )
          : this.Param.Direction &&
            AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
              t,
              this.Param.Direction,
              this.Param.TurnSpeed ?? 0,
              this.Param.ContainZ,
              this.Param.MinTurnTimeSeconds,
            );
      }),
      (this.Ij_ = () => {
        this.sDe?.Valid &&
          (EventSystem_1.EventSystem.HasWithTarget(
            this.sDe,
            EventDefine_1.EEventName.CharTurnEnd,
            this.Ij_,
          ) &&
            EventSystem_1.EventSystem.RemoveWithTarget(
              this.sDe,
              EventDefine_1.EEventName.CharTurnEnd,
              this.Ij_,
            ),
          this.Sj_?.Remove(),
          (this.Sj_ = void 0),
          (this.sDe = void 0),
          this.FinishExecute());
      });
  }
  OnExecute() {
    var t;
    this.PerformComp.Entity.GetComponent(3)
      ? ((t =
          this.PerformComp.Entity.GetComponent(
            43,
          )).MontageManager.IsMontagePlaying()
          ? (t.MontageManager.StopMontage({ Method: 0, BlendOutTime: 0.5 }),
            (this.Mj_ = TimerSystem_1.TimerSystem.Delay(this.Ej_, 250)))
          : this.Ej_(),
        (this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          this.PerformComp.Entity.Id,
        )),
        EventSystem_1.EventSystem.AddWithTarget(
          this.sDe,
          EventDefine_1.EEventName.CharTurnEnd,
          this.Ij_,
        ),
        (this.Sj_ = TimerSystem_1.TimerSystem.Delay(this.Ij_, TURN_MAX_TIME)))
      : this.FinishExecute();
  }
  OnReset() {
    this.sDe &&
      EventSystem_1.EventSystem.HasWithTarget(
        this.sDe,
        EventDefine_1.EEventName.CharTurnEnd,
        this.Ij_,
      ) &&
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.sDe,
        EventDefine_1.EEventName.CharTurnEnd,
        this.Ij_,
      ),
      this.Sj_?.Remove(),
      (this.Sj_ = void 0),
      (this.sDe = void 0),
      this.Mj_?.Remove(),
      (this.Mj_ = void 0);
  }
}
class PerformActionPool {
  static GetAction(t, i, s, e, h, n, o) {
    let r = void 0;
    return (
      ((r =
        this.RUe[t] && 0 < this.RUe[t].length
          ? this.RUe[t].pop()
          : new this.Tj_[t](t)).Id = i),
      (r.Param = s),
      (r.PerformComp = e),
      (r.OnFinish = h),
      (r.OnBeforeExecute = n),
      (r.OnAfterExecute = o),
      r
    );
  }
  static ReturnAction(t) {
    t.Reset();
    var i = t.Name;
    this.RUe[i] || (this.RUe[i] = []), this.RUe[i].push(t);
  }
  static Clear() {
    this.RUe = {};
  }
}
((exports.PerformActionPool = PerformActionPool).RUe = {}),
  (PerformActionPool.Tj_ = {
    [0]: PlayMontageAction,
    1: StopMontageAction,
    2: TurnAction,
  });
//# sourceMappingURL=PerformAction.js.map
