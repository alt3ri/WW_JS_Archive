"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSplineModel = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GameSplineUtils_1 = require("./GameSplineUtils"),
  TsGameSplineActor_1 = require("./TsGameSplineActor"),
  TIMER_PERIOD = 5e3;
class ActorId {
  constructor(e, t) {
    (this.Id = e), (this.Type = t);
  }
}
class GameSplineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Jye = new Map()),
      (this.j3 = void 0),
      (this.zye = () => {
        for (var [e, t] of this.Jye) {
          for (const r of t[2])
            switch (r.Type) {
              case 0:
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  r.Id,
                ) || t[2].delete(r);
                break;
              case 1:
                EntitySystem_1.EntitySystem.Get(r.Id) || t[2].delete(r);
            }
          t[2].size ||
            (ActorSystem_1.ActorSystem.Put(t[0]), this.Jye.delete(e));
        }
        !this.Jye.size &&
          this.j3 &&
          (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
      });
  }
  LoadAndGetSplineComponent(e, t, r = 0) {
    let s = this.Jye.get(e);
    var i;
    return (
      s ||
        ((i = ActorSystem_1.ActorSystem.Get(
          TsGameSplineActor_1.default.StaticClass(),
          new UE.Transform(),
        )),
        (s = [
          i,
          GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e, i),
          new Set(),
        ]),
        this.Jye.set(e, s),
        this.j3) ||
        (this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD)),
      s[2].add(new ActorId(t, r)),
      s[1]
    );
  }
  GetSplineActorBySplineId(e) {
    e = this.Jye.get(e);
    if (e) return e[0];
  }
  ReleaseSpline(e, t, r = 0) {
    var s = this.Jye.get(e);
    if (s) for (const i of s[2]) i.Id === t && i.Type === r && s[2].delete(i);
  }
}
exports.GameSplineModel = GameSplineModel;
//# sourceMappingURL=GameSplineModel.js.map
