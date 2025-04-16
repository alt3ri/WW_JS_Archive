"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameSplineModel = exports.SplineAnalyzeData = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  GameSplineUtils_1 = require("./GameSplineUtils"),
  TsGameSplineActor_1 = require("./TsGameSplineActor"),
  TIMER_PERIOD = 5e3;
class ActorId {
  constructor(e, t) {
    (this.Id = e), (this.Type = t);
  }
}
class SplineAnalyzeData {
  constructor(t, i = 5) {
    (this.Qdl = i),
      (this.xdt = 0),
      (this.Kdl = new Array()),
      (this.xdt = t.GetNumberOfSplinePoints());
    let s = t.D_GetLocationAtSplineInputKey(0, 1);
    this.Kdl.push(0);
    for (let e = 1; e <= (this.xdt - 1) * this.Qdl; ++e) {
      var r = t.D_GetLocationAtSplineInputKey(e / i, 1);
      this.Kdl.push(this.Kdl[e - 1] + UE.VectorDouble.Dist(s, r)), (s = r);
    }
  }
  GetKeyTimeByLengthOffset(e, t) {
    if (0 === this.xdt) return 0;
    let i = e * this.Qdl,
      s = Math.floor(i),
      r = 0;
    s + 1 >= this.Kdl.length
      ? ((r = this.Kdl[this.Kdl.length - 1]), (s = this.Kdl.length - 1))
      : (r = MathUtils_1.MathUtils.Lerp(this.Kdl[s], this.Kdl[s + 1], i - s));
    var h = r + t;
    if (0 < t) {
      for (; s < this.Kdl.length && this.Kdl[s] < h; ) ++s;
      if (s === this.Kdl.length) return this.xdt - 1;
      i = s - (this.Kdl[s] - h) / (this.Kdl[s] - this.Kdl[s - 1]);
    } else {
      for (; 0 <= s && this.Kdl[s] > h; ) --s;
      if (s < 0) return 0;
      i = s + (h - this.Kdl[s]) / (this.Kdl[s + 1] - this.Kdl[s]);
    }
    return i / this.Qdl;
  }
}
exports.SplineAnalyzeData = SplineAnalyzeData;
class GameSplineModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Jye = new Map()),
      (this.j3 = void 0),
      (this.$dl = new Map()),
      (this.CurWindPipelineResistance = 0),
      (this.CurWindPipelineSpeedLimit = 0),
      (this.zye = () => {
        for (var [e, t] of this.Jye) {
          for (const i of t[2])
            switch (i.Type) {
              case 0:
                ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
                  i.Id,
                ) || t[2].delete(i);
                break;
              case 1:
                EntitySystem_1.EntitySystem.Get(i.Id) || t[2].delete(i);
            }
          t[2].size ||
            (ActorSystem_1.ActorSystem.Put(
              "GameSplineModel.CheckAndReleaseActor",
              t[0],
            ),
            this.Jye.delete(e),
            this.$dl.delete(e));
        }
        !this.Jye.size &&
          this.j3 &&
          (TimerSystem_1.TimerSystem.Remove(this.j3), (this.j3 = void 0));
      });
  }
  LoadAndGetSplineComponent(e, t, i = 0) {
    let s = this.Jye.get(e);
    var r;
    return (
      s ||
        ((r = ActorSystem_1.ActorSystem.Get(
          TsGameSplineActor_1.default.StaticClass(),
          new UE.TransformDouble(),
        )),
        (s = [
          r,
          GameSplineUtils_1.GameSplineUtils.InitGameSplineBySplineEntity(e, r),
          new Set(),
        ]),
        this.Jye.set(e, s),
        this.j3) ||
        (this.j3 = TimerSystem_1.TimerSystem.Forever(this.zye, TIMER_PERIOD)),
      s[2].add(new ActorId(t, i)),
      s[1]
    );
  }
  GetSplineActorBySplineId(e) {
    e = this.Jye.get(e);
    if (e) return e[0];
  }
  ReleaseSpline(e, t, i = 0) {
    var s = this.Jye.get(e);
    if (s) for (const r of s[2]) r.Id === t && r.Type === i && s[2].delete(r);
  }
  GetSplineAnalyzeData(e) {
    var t,
      i = this.$dl.get(e);
    return (
      i ||
      ((t = this.Jye.get(e))
        ? ((i = new SplineAnalyzeData(t[1])), this.$dl.set(e, i), i)
        : void 0)
    );
  }
}
exports.GameSplineModel = GameSplineModel;
//# sourceMappingURL=GameSplineModel.js.map
