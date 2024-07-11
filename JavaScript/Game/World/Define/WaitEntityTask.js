"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityTask = void 0);
const Log_1 = require("../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const WaitEntityTaskController_1 = require("../../Module/WaitEntityTask/WaitEntityTaskController");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const WAIT_TIME = 6e4;
class WaitEntityTask {
  constructor(t) {
    (this.SetAsyncLoadingTimeLimit = t),
      (this.$pr = void 0),
      (this.Ypr = new Set()),
      (this.WaitType = void 0),
      (this.Jpr = void 0),
      (this.BOe = 0),
      (this.zpr = !1),
      (this.kpr = void 0),
      (this.OnAddEntity = (t, i) => {
        this.WaitType === "CreatureDataId"
          ? this.Ypr.delete(t)
          : this.WaitType === "PbDataId" && this.Ypr.delete(i),
          this.Ypr.size > 0 ||
            (this.SetAsyncLoadingTimeLimit &&
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "WaitEntityTask",
              ),
            this.Neo(!this.zpr));
      }),
      (this.OnRemoveEntity = (t, i) => {
        if (this.WaitType === "CreatureDataId") {
          if (!this.Ypr.has(t)) return;
          this.Ypr.delete(t);
        } else if (this.WaitType === "PbDataId") {
          if (!this.Ypr.has(i)) return;
          this.Ypr.delete(i);
        }
        (this.zpr = !0),
          this.Ypr.size ||
            (this.SetAsyncLoadingTimeLimit &&
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "WaitEntityTask",
              ),
            this.Neo(!1));
      });
  }
  AddEntities(i, t, s = WAIT_TIME, e = !0, a = !1) {
    if (Array.isArray(i)) for (const r of i) this.Zpr(r), this.Ypr.add(r);
    else this.Zpr(i), this.Ypr.add(i);
    if (
      ((this.kpr = t),
      (this.Jpr =
        s >= 0
          ? TimerSystem_1.TimerSystem.Delay((t) => {
              this.SetAsyncLoadingTimeLimit &&
                ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                  GlobalData_1.GlobalData.World,
                  "WaitEntityTask",
                ),
                a
                  ? Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Entity",
                      3,
                      "等待实体超时",
                      ["Id类型", "CreatureDataId"],
                      ["实体列表", JSON.stringify(i)],
                    )
                  : this.Neo(void 0);
            }, s)
          : void 0),
      Array.isArray(i))
    )
      for (const o of i) this.Xpr(o, e);
    else this.Xpr(i, e);
    if (this.$pr) {
      for (const h of this.$pr) this.Xpr(h, e);
      this.$pr = void 0;
    }
    this.Ypr.size > 0
      ? this.SetAsyncLoadingTimeLimit &&
        ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
          GlobalData_1.GlobalData.World,
          "WaitEntityTask",
        )
      : this.Neo(!0);
  }
  AddEntitiesWithPbDataId(i, t, s = WAIT_TIME, e = !0, a = !1) {
    if (Array.isArray(i)) for (const r of i) this.Ypr.add(r);
    else this.Ypr.add(i);
    if (
      ((this.kpr = t),
      (this.Jpr =
        s >= 0
          ? TimerSystem_1.TimerSystem.Delay((t) => {
              this.SetAsyncLoadingTimeLimit &&
                ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                  GlobalData_1.GlobalData.World,
                  "WaitEntityTask",
                ),
                a
                  ? Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "Entity",
                      3,
                      "等待实体超时",
                      ["Id类型", "PbDataId"],
                      ["实体列表", JSON.stringify(i)],
                    )
                  : this.Neo(!1);
            }, s)
          : void 0),
      Array.isArray(i))
    )
      for (const o of i) this.Xpr(o, e);
    else this.Xpr(i, e);
    this.Ypr.size > 0
      ? this.SetAsyncLoadingTimeLimit &&
        ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
          GlobalData_1.GlobalData.World,
          "WaitEntityTask",
        )
      : this.Neo(!0);
  }
  Xpr(t, i = !0) {
    let s = void 0;
    !(s =
      this.WaitType === "PbDataId"
        ? ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
        : ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) && i
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            34,
            "WaitEntityTask期望监听的实体未创建或已死亡",
            ["EntityId", t],
          ),
        this.Ypr.delete(t))
      : s &&
        (s.IsInit
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Entity",
                34,
                "WaitEntityTask期望监听的实体已创建",
                ["EntityId", t],
              ),
            this.Ypr.delete(t))
          : (s.Priority < 101 && (s.Priority = 101),
            CharacterController_1.CharacterController.SortItem(s)));
  }
  Neo(t) {
    void 0 !== this.Jpr &&
      (TimerSystem_1.TimerSystem.Remove(this.Jpr), (this.Jpr = void 0)),
      this.Ypr.clear(),
      WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe),
      this.kpr(t);
  }
  static Create(t, i, s = !1, e = WAIT_TIME, a = !0, r = !1) {
    s = new WaitEntityTask(s);
    return (
      (s.WaitType = "CreatureDataId"),
      (s.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(s)),
      s.AddEntities(t, i, e, a, r),
      s
    );
  }
  static CreateWithPbDataId(t, i, s = !1, e = WAIT_TIME, a = !0, r = !1) {
    s = new WaitEntityTask(s);
    return (
      (s.WaitType = "PbDataId"),
      (s.BOe = WaitEntityTaskController_1.WaitEntityTaskController.AddTask(s)),
      s.AddEntitiesWithPbDataId(t, i, e, a, r),
      s
    );
  }
  Cancel() {
    void 0 !== this.Jpr &&
      (TimerSystem_1.TimerSystem.Remove(this.Jpr), (this.Jpr = void 0)),
      this.Ypr.clear(),
      WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe);
  }
  Zpr(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t && t.Entity.GetComponent(1)?.IsAutonomousProxy && t) {
      let i = t.Entity.GetComponent(0)?.CustomServerEntityIds;
      if (i) {
        this.$pr || (this.$pr = new Set());
        for (const s of i) this.$pr.add(s), this.Ypr.add(s);
      }
      i = t.Entity.GetComponent(0)?.GetSummonerId();
      i &&
        (this.$pr || (this.$pr = new Set()), this.$pr.add(i), this.Ypr.add(i));
    }
  }
}
exports.WaitEntityTask = WaitEntityTask;
// # sourceMappingURL=WaitEntityTask.js.map
