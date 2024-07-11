"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletHitCountUtil = void 0);
class BulletHitCountUtil {
  static HitCountCondition(t, i) {
    if (t.CountByParent && t.ParentBulletInfo)
      return BulletHitCountUtil.HitCountCondition(t.ParentBulletInfo, i);
    let e = i;
    if (!e) return !1;
    (i = e.GetComponent(48)),
      i && (e = i.GetAttributeHolder()),
      (i = t.BulletDataMain);
    if (
      0 <= i.Base.VictimCount &&
      t.EntityHitCount.size >= i.Base.VictimCount &&
      !t.EntityHitCount.has(e.Id)
    )
      return !1;
    if (0 <= i.Base.HitCountMax && t.HitNumberAll >= i.Base.HitCountMax)
      return !1;
    var u = t.EntityHitCount.get(e.Id);
    if (u) {
      if (0 < i.Base.HitCountPerVictim && u >= i.Base.HitCountPerVictim)
        return !1;
      t.EntityHitCount.set(e.Id, u + 1);
    } else t.EntityHitCount.set(e.Id, 1);
    return t.HitNumberAll++, !0;
  }
  static AddHitCount(t, i) {
    var e;
    t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.AddHitCount(t.ParentBulletInfo, i)
      : ((e = t.EntityHitCount.get(i.Id) ?? 0),
        t.EntityHitCount.set(i.Id, e + 1),
        t.HitNumberAll++);
  }
  static CheckHitCountPerVictim(t, i) {
    var e, u;
    return t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.CheckHitCountPerVictim(t.ParentBulletInfo, i)
      : ((u = t.EntityHitCount.size),
        !(
          (0 <= (e = t.BulletDataMain).Base.VictimCount &&
            u >= e.Base.VictimCount &&
            !t.EntityHitCount.has(i.Id)) ||
          ((u = t.EntityHitCount.get(i.Id) ?? 0),
          0 <= e.Base.HitCountPerVictim && u >= e.Base.HitCountPerVictim) ||
          (0 < e.Base.HitCountMax && t.HitNumberAll >= e.Base.HitCountMax)
        ));
  }
  static CheckHitCountTotal(t) {
    var i;
    return t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.CheckHitCountTotal(t.ParentBulletInfo)
      : (i = t.BulletDataMain).Logic.DestroyOnCountZero &&
          0 < i.Base.HitCountMax &&
          t.HitNumberAll >= i.Base.HitCountMax;
  }
}
exports.BulletHitCountUtil = BulletHitCountUtil;
//# sourceMappingURL=BulletHitCountUtil.js.map
