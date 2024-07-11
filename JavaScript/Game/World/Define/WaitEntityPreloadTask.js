"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityPreloadTask = void 0);
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const WAIT_TIME = 6e4;
class WaitEntityPreloadTask {
  constructor(t, i) {
    (this.vJ = void 0),
      (this.kpr = void 0),
      (this.Fpr = 0),
      (this.Vpr = void 0),
      (this.Hpr = new Map()),
      (this.jpr = new Map()),
      (this.ZWo = new Map()),
      (this.Wpr = void 0),
      (this.Kpr = (i) => {
        if (!(8 & this.Fpr)) {
          var e = i.Entity.GetComponent(0);
          const s = e.GetCreatureDataId();
          var e = e.GetPbDataId();
          var i = i.Id;
          let t = !1;
          this.Hpr.has(s) && ((t = !0), this.Hpr.delete(s)),
            this.jpr.has(e) && ((t = !0), this.jpr.delete(e)),
            this.ZWo.has(i) && ((t = !0), this.ZWo.delete(i)),
            !t || this.t6 || this.Neo();
        }
      }),
      (this.zpe = (t, i) => {
        if (!(8 & this.Fpr))
          if (i.Id === this.vJ.Id) (this.Fpr |= 4), this.Neo();
          else {
            var e = i.Entity.GetComponent(0);
            const s = e.GetCreatureDataId();
            var e = e.GetPbDataId();
            var i = i.Id;
            let t = !1;
            this.Hpr.has(s) &&
              ((t = !0),
              this.Hpr.delete(s),
              ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "实体需要等待的实体被删了",
                    ["CreatureDataId", this.Vpr?.GetCreatureDataId()],
                    ["被删的实体CreatureDataId", s],
                    ["依赖的实体列表", this.Wpr],
                  ))),
              this.jpr.has(e) &&
                ((t = !0),
                this.jpr.delete(e),
                ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "实体需要等待的实体被删了",
                      ["CreatureDataId", this.Vpr?.GetCreatureDataId()],
                      ["被删的实体PbDataId", e],
                      ["依赖的实体列表", this.Wpr],
                    ))),
              this.ZWo.has(i) &&
                ((t = !0),
                this.ZWo.delete(i),
                ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "实体需要等待的实体被删了",
                      ["CreatureDataId", this.Vpr?.GetCreatureDataId()],
                      ["被删的实体EntityId", i],
                      ["依赖的实体列表", this.Wpr],
                    ))),
              t && ((this.Fpr |= 1), this.t6 || this.Neo());
          }
      }),
      (this.vJ = t),
      (this.kpr = i);
  }
  Init() {
    (this.Vpr = this.vJ.Entity.GetComponent(0)),
      (this.Wpr = this.Vpr.GetDependenceEntities().join()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PreloadEntityFinished,
        this.Kpr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      TimerSystem_1.TimerSystem.Delay(() => {
        !this.vJ?.Valid ||
          8 & this.Fpr ||
          ((this.Fpr |= 2),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "等待实体超时",
              ["CreatureDataId", this.Vpr.GetCreatureDataId()],
              ["依赖的实体", this.Wpr],
              ["没有预加载的实体", this.Qpr()],
            ),
          this.Neo());
      }, WAIT_TIME),
      this.Xpr(),
      this.t6 || this.Neo();
  }
  get t6() {
    return this.ZWo.size + this.jpr.size + this.Hpr.size;
  }
  Clear() {
    (this.vJ = void 0),
      this.Hpr.clear(),
      this.jpr.clear(),
      this.ZWo.clear(),
      (this.Wpr = void 0),
      (this.kpr = void 0);
  }
  Xpr() {
    let t, i, e, s, h;
    for ([t, i] of this.Vpr.GetDependenceEntities())
      i === 0
        ? this.Hpr.has(t)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
              "CreatureDataId",
              t,
            ])
          : this.Hpr.set(t, i)
        : i === 1
          ? this.jpr.has(t)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "重复添加依赖实体", ["PbDataId", t])
            : this.jpr.set(t, i)
          : i === 2 &&
            (this.ZWo.has(t)
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
                  "EntityId",
                  t,
                ])
              : this.ZWo.set(t, i));
    for ([e] of this.Hpr) {
      const r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
      r?.Valid &&
        (r.Entity.GetComponent(0).GetPreloadFinished() || r?.IsInit) &&
        this.Hpr.delete(e);
    }
    for ([s] of this.jpr) {
      const a =
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      a?.Valid &&
        (a.Entity.GetComponent(0).GetPreloadFinished() || a?.IsInit) &&
        this.jpr.delete(s);
    }
    for ([h] of this.ZWo) {
      const o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(h);
      o?.Valid &&
        (o.Entity.GetComponent(0).GetPreloadFinished() || o?.IsInit) &&
        this.ZWo.delete(h);
    }
  }
  Neo() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PreloadEntityFinished,
      this.Kpr,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      (this.Fpr |= 8),
      this.kpr(this.Fpr),
      this.Clear();
  }
  Qpr() {
    let t = "";
    if (this.Hpr.size) for (const [i] of this.Hpr) t += `CreatureDataId:${i},`;
    if (this.jpr.size) for (const [e] of this.jpr) t += `PbDataId:${e},`;
    if (this.ZWo.size) for (const [s] of this.ZWo) t += `EntityId:${s},`;
    return t;
  }
  static Create(t, i) {
    t = new WaitEntityPreloadTask(t, i);
    return t.Init(), t;
  }
}
exports.WaitEntityPreloadTask = WaitEntityPreloadTask;
// # sourceMappingURL=WaitEntityPreloadTask.js.map
