"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterCommon = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BulletCasterUtils_1 = require("./BulletCasterUtils"),
  IBulletCaster_1 = require("./IBulletCaster");
class BulletCasterCommon extends IBulletCaster_1.BulletCasterBase {
  constructor() {
    super(...arguments),
      (this.WarningEffectHandles = new Set()),
      (this.BulletWaitWarningTimers = new Set()),
      (this.DestroyBulletTimers = new Map());
  }
  OnStop() {
    for (const r of this.BulletWaitWarningTimers) r.Valid() && r.Remove();
    this.BulletWaitWarningTimers.clear();
    for (const o of this.WarningEffectHandles)
      EffectSystem_1.EffectSystem.IsValid(o) &&
        EffectSystem_1.EffectSystem.StopEffectById(
          o,
          "[BulletCaster] Stop",
          !1,
        );
    this.WarningEffectHandles.clear();
    for (var [e, t] of this.DestroyBulletTimers)
      t.Valid() && t.Remove(),
        ControllerHolder_1.ControllerHolder.BulletController.DestroyBullet(
          e,
          !0,
        );
    this.DestroyBulletTimers.clear();
  }
  OnSetTimeDilation(e) {
    for (const l of this.BulletWaitWarningTimers)
      l.Valid() &&
        BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(l, e);
    var t,
      r,
      o =
        0 < this.CasterConfig.WarningTime
          ? 1 /
            (this.CasterConfig.WarningTime *
              CommonDefine_1.SECOND_PER_MILLIONSECOND)
          : 1;
    for (const i of this.WarningEffectHandles)
      EffectSystem_1.EffectSystem.IsValid(i) &&
        EffectSystem_1.EffectSystem.SetTimeScale(i, e * o, !0);
    for ([t, r] of this.DestroyBulletTimers) {
      var s = ModelManager_1.ModelManager.BulletModel?.GetBulletEntityById(t);
      s?.Valid && s.SetTimeDilation(e),
        r.Valid() &&
          BulletCasterUtils_1.BulletCasterUtils.SetTimerHandleTimeDilation(
            r,
            e,
          );
    }
  }
}
exports.BulletCasterCommon = BulletCasterCommon;
//# sourceMappingURL=BulletCasterCommon.js.map
