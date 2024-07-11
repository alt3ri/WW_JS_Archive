"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityPreloadTask = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  WAIT_TIME = 6e4;
class WaitEntityPreloadTask {
  constructor(t, i) {
    (this.vJ = void 0),
      (this.Gvr = void 0),
      (this.Nvr = 0),
      (this.Ovr = void 0),
      (this.kvr = new Map()),
      (this.Fvr = new Map()),
      (this.YKo = new Map()),
      (this.Vvr = void 0),
      (this.Hvr = (i) => {
        if (!(8 & this.Nvr)) {
          var e = i.Entity.GetComponent(0),
            s = e.GetCreatureDataId(),
            e = e.GetPbDataId(),
            i = i.Id;
          let t = !1;
          this.kvr.has(s) && ((t = !0), this.kvr.delete(s)),
            this.Fvr.has(e) && ((t = !0), this.Fvr.delete(e)),
            this.YKo.has(i) && ((t = !0), this.YKo.delete(i)),
            !t || this.t6 || this.Bto();
        }
      }),
      (this.zpe = (t, i) => {
        if (!(8 & this.Nvr))
          if (i.Id === this.vJ.Id) (this.Nvr |= 4), this.Bto();
          else {
            var e = i.Entity.GetComponent(0),
              s = e.GetCreatureDataId(),
              e = e.GetPbDataId(),
              i = i.Id;
            let t = !1;
            this.kvr.has(s) &&
              ((t = !0),
              this.kvr.delete(s),
              ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "实体需要等待的实体被删了",
                    ["CreatureDataId", this.Ovr?.GetCreatureDataId()],
                    ["被删的实体CreatureDataId", s],
                    ["依赖的实体列表", this.Vvr],
                  ))),
              this.Fvr.has(e) &&
                ((t = !0),
                this.Fvr.delete(e),
                ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "实体需要等待的实体被删了",
                      ["CreatureDataId", this.Ovr?.GetCreatureDataId()],
                      ["被删的实体PbDataId", e],
                      ["依赖的实体列表", this.Vvr],
                    ))),
              this.YKo.has(i) &&
                ((t = !0),
                this.YKo.delete(i),
                ModelManager_1.ModelManager.CreatureModel.LeavingLevel ||
                  (Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "Entity",
                      3,
                      "实体需要等待的实体被删了",
                      ["CreatureDataId", this.Ovr?.GetCreatureDataId()],
                      ["被删的实体EntityId", i],
                      ["依赖的实体列表", this.Vvr],
                    ))),
              t && ((this.Nvr |= 1), this.t6 || this.Bto());
          }
      }),
      (this.vJ = t),
      (this.Gvr = i);
  }
  Init() {
    (this.Ovr = this.vJ.Entity.GetComponent(0)),
      (this.Vvr = this.Ovr.GetDependenceEntities().join()),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PreloadEntityFinished,
        this.Hvr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      TimerSystem_1.TimerSystem.Delay(() => {
        !this.vJ?.Valid ||
          8 & this.Nvr ||
          ((this.Nvr |= 2),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              3,
              "等待实体超时",
              ["CreatureDataId", this.Ovr.GetCreatureDataId()],
              ["依赖的实体", this.Vvr],
              ["没有预加载的实体", this.jvr()],
            ),
          this.Bto());
      }, WAIT_TIME),
      this.Wvr(),
      this.t6 || this.Bto();
  }
  get t6() {
    return this.YKo.size + this.Fvr.size + this.kvr.size;
  }
  Clear() {
    (this.vJ = void 0),
      this.kvr.clear(),
      this.Fvr.clear(),
      this.YKo.clear(),
      (this.Vvr = void 0),
      (this.Gvr = void 0);
  }
  Wvr() {
    var t, i, e, s, h;
    for ([t, i] of this.Ovr.GetDependenceEntities())
      0 === i
        ? this.kvr.has(t)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
              "CreatureDataId",
              t,
            ])
          : this.kvr.set(t, i)
        : 1 === i
          ? this.Fvr.has(t)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 3, "重复添加依赖实体", ["PbDataId", t])
            : this.Fvr.set(t, i)
          : 2 === i &&
            (this.YKo.has(t)
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 3, "重复添加依赖实体", [
                  "EntityId",
                  t,
                ])
              : this.YKo.set(t, i));
    for ([e] of this.kvr) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetEntity(e);
      r?.Valid &&
        (r.Entity.GetComponent(0).GetPreloadFinished() || r?.IsInit) &&
        this.kvr.delete(e);
    }
    for ([s] of this.Fvr) {
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      a?.Valid &&
        (a.Entity.GetComponent(0).GetPreloadFinished() || a?.IsInit) &&
        this.Fvr.delete(s);
    }
    for ([h] of this.YKo) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntityById(h);
      o?.Valid &&
        (o.Entity.GetComponent(0).GetPreloadFinished() || o?.IsInit) &&
        this.YKo.delete(h);
    }
  }
  Bto() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PreloadEntityFinished,
      this.Hvr,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      ),
      (this.Nvr |= 8),
      this.Gvr(this.Nvr),
      this.Clear();
  }
  jvr() {
    let t = "";
    if (this.kvr.size) for (var [i] of this.kvr) t += `CreatureDataId:${i},`;
    if (this.Fvr.size) for (var [e] of this.Fvr) t += `PbDataId:${e},`;
    if (this.YKo.size) for (var [s] of this.YKo) t += `EntityId:${s},`;
    return t;
  }
  static Create(t, i) {
    t = new WaitEntityPreloadTask(t, i);
    return t.Init(), t;
  }
}
exports.WaitEntityPreloadTask = WaitEntityPreloadTask;
//# sourceMappingURL=WaitEntityPreloadTask.js.map
