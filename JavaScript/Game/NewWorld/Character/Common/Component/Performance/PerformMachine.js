"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformMachine = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  PerformAction_1 = require("./PerformAction"),
  PerformMode_1 = require("./PerformMode");
class PerformMachine {
  constructor(i) {
    (this.ph_ = i),
      (this.NUe = 0),
      (this.Modes = new Map()),
      (this.bj_ = 0),
      (this.Lj_ = new Map()),
      (this.CurrentAction = void 0),
      (this.EntityHandle = void 0),
      (this.wj_ = () => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "BasePerform",
            26,
            "[PerformMachine] 执行行为-完毕",
            ["id", this.CurrentAction.Id],
            ["name", this.CurrentAction.constructor.name],
            ["PbDataId", this.EntityHandle.PbDataId],
            ["valid", this.CurrentAction.IsValid],
          ),
          PerformAction_1.PerformActionPool.ReturnAction(this.CurrentAction),
          (this.CurrentAction = void 0),
          this.bl();
      });
  }
  Init() {
    this.Modes.set(1, new PerformMode_1.PlotMode(1, this.ph_, this)),
      this.Modes.set(2, new PerformMode_1.ActionMode(2, this.ph_, this)),
      this.Modes.set(3, new PerformMode_1.EcologyMode(3, this.ph_, this)),
      (this.EntityHandle =
        ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          this.ph_.Entity.Id,
        ));
  }
  Clear() {
    this.Modes.forEach((i) => {
      i.Clear();
    }),
      this.Modes.clear(),
      this.CurrentAction &&
        PerformAction_1.PerformActionPool.ReturnAction(this.CurrentAction),
      (this.CurrentAction = void 0),
      this.Lj_.clear(),
      (this.EntityHandle = void 0);
  }
  CleanAction() {
    this.CurrentAction &&
      (PerformAction_1.PerformActionPool.ReturnAction(this.CurrentAction),
      (this.CurrentAction = void 0)),
      this.Modes.forEach((i) => {
        i.Clear();
      }),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("BasePerform", 26, "[PerformMachine] 清理所有行为", [
          "PbDataId",
          this.EntityHandle.PbDataId,
        ]);
  }
  GetCurrentMode() {
    return this.bj_;
  }
  DoAction(i, t, e, s, o) {
    this.NUe++;
    var r = this.NUe,
      t = PerformAction_1.PerformActionPool.GetAction(
        t,
        r,
        e,
        this.ph_,
        this.wj_,
        s,
        o,
      );
    return (
      (t.IsValid = !0),
      this.Lj_.set(r, t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BasePerform",
          26,
          "[PerformMachine] 行为入队",
          ["id", t.Id],
          ["mode", i],
          ["PbDataId", this.EntityHandle.PbDataId],
        ),
      this.Modes.get(i).PushAction(t),
      this.bl(),
      r
    );
  }
  EnableAction(i, t) {
    return (
      !!this.Lj_.has(i) &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BasePerform",
          26,
          "[PerformMachine] 禁用行为",
          ["id", i],
          ["PbDataId", this.EntityHandle.PbDataId],
        ),
      (this.Lj_.get(i).IsValid = t),
      !0)
    );
  }
  Update() {
    0 < this.Lj_.size && this.bl();
  }
  bl() {
    if (!this.CurrentAction?.Block) {
      let i = !0;
      var t;
      0 !== this.bj_ &&
        this.Modes.get(this.bj_).CheckExit() &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "BasePerform",
            26,
            "[PerformMachine] 状态切换-退出 [1-Plot 2-Action 3-Ecology]",
            ["mode", this.bj_],
            ["PbDataId", this.EntityHandle.PbDataId],
          ),
        (this.bj_ = 0)),
        (i = 0 === this.bj_ ? this.Rj_(1) || this.Rj_(2) || this.Rj_(3) : i) &&
          (t = this.Modes.get(this.bj_).PopAction()) &&
          (this.Lj_.delete(t.Id),
          this.CurrentAction &&
            (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "BasePerform",
                26,
                "[PerformMachine] 执行行为-中止",
                ["id", this.CurrentAction.Id],
                ["name", this.CurrentAction.constructor.name],
                ["PbDataId", this.EntityHandle.PbDataId],
              ),
            PerformAction_1.PerformActionPool.ReturnAction(this.CurrentAction)),
          this.Aj_(t));
    }
  }
  Rj_(i) {
    return (
      !!this.Modes.get(i).CheckEnter() &&
      ((this.bj_ = i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BasePerform",
          26,
          "[PerformMachine] 状态切换-进入 [1-Plot 2-Action 3-Ecology]",
          ["mode", this.bj_],
          ["PbDataId", this.EntityHandle.PbDataId],
        ),
      !0)
    );
  }
  Aj_(i) {
    (this.CurrentAction = i),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "BasePerform",
          26,
          "[PerformMachine] 执行行为-开始",
          ["id", this.CurrentAction.Id],
          ["name", this.CurrentAction.constructor.name],
          ["PbDataId", this.EntityHandle.PbDataId],
        ),
      i.Execute();
  }
}
exports.PerformMachine = PerformMachine;
//# sourceMappingURL=PerformMachine.js.map
