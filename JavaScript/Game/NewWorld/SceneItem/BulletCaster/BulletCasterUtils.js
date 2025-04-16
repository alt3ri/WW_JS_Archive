"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletCasterUtils = void 0);
class BulletCasterUtils {
  static SetTimerHandleTimeDilation(e, t) {
    e.Valid() &&
      (0 === t
        ? e.IsPause() || e.Pause()
        : 0 < t && (e.IsPause() && e.Resume(), e.ChangeDilation(t)));
  }
}
exports.BulletCasterUtils = BulletCasterUtils;
//# sourceMappingURL=BulletCasterUtils.js.map
