"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterBatch = void 0),
  require("./BulletCasterSprint"),
  require("./BulletCasterStationary");
const Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  IComponent_1 = require("../../../../UniverseEditor/Interface/IComponent"),
  BulletCasterFactory_1 = require("./BulletCasterFactory"),
  BulletCasterUtils_1 = require("./BulletCasterUtils"),
  IBulletCaster_1 = require("./IBulletCaster");
class BulletCasterBatch {
  constructor(t, e, s, i, r, o, l, h) {
    (this.OwnerEntity = t),
      (this.LoopInterval = e),
      (this.DelayTime = s),
      (this.BulletCasters = []),
      (this.cCl = void 0),
      (this.mCl = void 0),
      (this.dCl = () => {
        for (const t of this.BulletCasters) t.Start();
      });
    for (const m of i) {
      var a = m.BulletIndex - 1,
        a = new IBulletCaster_1.BulletCasterInitParam(t, m, l[a], o, r),
        u = BulletCasterFactory_1.BulletCasterClassFactory.GetInstance(
          h ?? IComponent_1.EBatchBulletMovementType.Sprint,
          a,
        );
      u
        ? this.BulletCasters.push(u)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            72,
            "构建批量发射子弹的时候工厂里面没拿出来",
            ["movementType", h],
            ["bulletCasterInitParam", a],
          );
    }
  }
  Start() {
    this.DelayTime < TimerSystem_1.MIN_TIME
      ? this._Cl()
      : (this.cCl = TimerSystem_1.TimerSystem.Delay(() => {
          this._Cl();
        }, this.DelayTime)),
      this.SetTimeDilationRespectOwnerEntity();
  }
  Stop() {
    for (const t of this.BulletCasters) t.Stop();
    this.mCl?.Valid() && this.mCl.Remove(),
      (this.mCl = void 0),
      this.cCl?.Valid() && this.cCl.Remove(),
      (this.cCl = void 0);
  }
  SetTimeDilationRespectOwnerEntity() {
    var t = this.OwnerEntity.GetComponent(120),
      t = this.OwnerEntity.TimeDilation * (t?.CurrentTimeScale ?? 1);
    this.SetTimeDilation(t);
  }
  SetTimeDilation(t) {
    this.cCl?.Valid() &&
      BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(
        this.cCl,
        t,
      ),
      this.mCl?.Valid() &&
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(
          this.mCl,
          t,
        );
    for (const e of this.BulletCasters) e.SetTimeDilation(t);
  }
  _Cl() {
    this.LoopInterval < TimerSystem_1.MIN_TIME
      ? this.dCl()
      : (this.dCl(),
        (this.mCl = TimerSystem_1.TimerSystem.Forever(
          this.dCl,
          this.LoopInterval,
        ))),
      this.SetTimeDilationRespectOwnerEntity();
  }
}
exports.BulletCasterBatch = BulletCasterBatch;
//# sourceMappingURL=BulletCasterBatch.js.map
