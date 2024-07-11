"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WaitEntityTaskController_1 = require("../../Module/WaitEntityTask/WaitEntityTaskController"),
  CharacterController_1 = require("../../NewWorld/Character/CharacterController"),
  WAIT_TIME = 6e4;
class WaitEntityTask {
  constructor(t) {
    (this.SetAsyncLoadingTimeLimit = t),
      (this.Kvr = void 0),
      (this.Qvr = new Set()),
      (this.WaitType = void 0),
      (this.Xvr = void 0),
      (this.BOe = 0),
      (this.$vr = !1),
      (this.Gvr = void 0),
      (this.OnAddEntity = (t, i) => {
        "CreatureDataId" === this.WaitType
          ? this.Qvr.delete(t)
          : "PbDataId" === this.WaitType && this.Qvr.delete(i),
          0 < this.Qvr.size ||
            (this.SetAsyncLoadingTimeLimit &&
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "WaitEntityTask",
              ),
            this.Bto(!this.$vr));
      }),
      (this.OnRemoveEntity = (t, i) => {
        if ("CreatureDataId" === this.WaitType) {
          if (!this.Qvr.has(t)) return;
          this.Qvr.delete(t);
        } else if ("PbDataId" === this.WaitType) {
          if (!this.Qvr.has(i)) return;
          this.Qvr.delete(i);
        }
        (this.$vr = !0),
          this.Qvr.size ||
            (this.SetAsyncLoadingTimeLimit &&
              ResourceSystem_1.ResourceSystem.SetLoadModeInGame(
                GlobalData_1.GlobalData.World,
                "WaitEntityTask",
              ),
            this.Bto(!1));
      });
  }
  AddEntities(i, t, s = WAIT_TIME, e = !0, a = !1) {
    if (Array.isArray(i)) for (const r of i) this.Yvr(r), this.Qvr.add(r);
    else this.Yvr(i), this.Qvr.add(i);
    if (
      ((this.Gvr = t),
      (this.Xvr =
        0 <= s
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
                  : this.Bto(void 0);
            }, s)
          : void 0),
      Array.isArray(i))
    )
      for (const o of i) this.Wvr(o, e);
    else this.Wvr(i, e);
    if (this.Kvr) {
      for (const h of this.Kvr) this.Wvr(h, e);
      this.Kvr = void 0;
    }
    0 < this.Qvr.size
      ? this.SetAsyncLoadingTimeLimit &&
        ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
          GlobalData_1.GlobalData.World,
          "WaitEntityTask",
        )
      : this.Bto(!0);
  }
  AddEntitiesWithPbDataId(i, t, s = WAIT_TIME, e = !0, a = !1) {
    if (Array.isArray(i)) for (const r of i) this.Qvr.add(r);
    else this.Qvr.add(i);
    if (
      ((this.Gvr = t),
      (this.Xvr =
        0 <= s
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
                  : this.Bto(!1);
            }, s)
          : void 0),
      Array.isArray(i))
    )
      for (const o of i) this.Wvr(o, e);
    else this.Wvr(i, e);
    0 < this.Qvr.size
      ? this.SetAsyncLoadingTimeLimit &&
        ResourceSystem_1.ResourceSystem.SetLoadModeInLoading(
          GlobalData_1.GlobalData.World,
          "WaitEntityTask",
        )
      : this.Bto(!0);
  }
  Wvr(t, i = !0) {
    let s = void 0;
    !(s =
      "PbDataId" === this.WaitType
        ? ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)
        : ModelManager_1.ModelManager.CreatureModel.GetEntity(t)) && i
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Entity",
            34,
            "WaitEntityTask期望监听的实体未创建或已死亡",
            ["EntityId", t],
          ),
        this.Qvr.delete(t))
      : s &&
        (s.IsInit
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Entity",
                34,
                "WaitEntityTask期望监听的实体已创建",
                ["EntityId", t],
              ),
            this.Qvr.delete(t))
          : (s.Priority < 101 && (s.Priority = 101),
            CharacterController_1.CharacterController.SortItem(s)));
  }
  Bto(t) {
    void 0 !== this.Xvr &&
      (TimerSystem_1.TimerSystem.Remove(this.Xvr), (this.Xvr = void 0)),
      this.Qvr.clear(),
      WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe),
      this.Gvr(t);
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
    void 0 !== this.Xvr &&
      (TimerSystem_1.TimerSystem.Remove(this.Xvr), (this.Xvr = void 0)),
      this.Qvr.clear(),
      WaitEntityTaskController_1.WaitEntityTaskController.RemoveTask(this.BOe);
  }
  Yvr(t) {
    t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    if (t && t.Entity.GetComponent(1)?.IsAutonomousProxy && t) {
      var i = t.Entity.GetComponent(0)?.CustomServerEntityIds;
      if (i) {
        this.Kvr || (this.Kvr = new Set());
        for (const s of i) this.Kvr.add(s), this.Qvr.add(s);
      }
      i = t.Entity.GetComponent(0)?.GetSummonerId();
      i &&
        (this.Kvr || (this.Kvr = new Set()), this.Kvr.add(i), this.Qvr.add(i));
    }
  }
}
exports.WaitEntityTask = WaitEntityTask;
//# sourceMappingURL=WaitEntityTask.js.map
