"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletHitCountUtil = void 0);
class BulletHitCountUtil {
  static HitCountCondition(t, i) {
    if (t.CountByParent && t.ParentBulletInfo)
      return BulletHitCountUtil.HitCountCondition(t.ParentBulletInfo, i);
    let e = i;
    if (!e) return !1;
    (i = e.GetComponent(47)),
      i && (e = i.GetAttributeHolder()),
      (i = t.BulletDataMain);
    if (
      i.Base.VictimCount >= 0 &&
      t.EntityHitCount.size >= i.Base.VictimCount &&
      !t.EntityHitCount.has(e.Id)
    )
      return !1;
    if (i.Base.HitCountMax >= 0 && t.HitNumberAll >= i.Base.HitCountMax)
      return !1;
    const u = t.EntityHitCount.get(e.Id);
    if (u) {
      if (i.Base.HitCountPerVictim > 0 && u >= i.Base.HitCountPerVictim)
        return !1;
      t.EntityHitCount.set(e.Id, u + 1);
    } else t.EntityHitCount.set(e.Id, 1);
    return t.HitNumberAll++, !0;
  }
  static AddHitCount(t, i) {
    let e;
    t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.AddHitCount(t.ParentBulletInfo, i)
      : ((e = t.EntityHitCount.get(i.Id) ?? 0),
        t.EntityHitCount.set(i.Id, e + 1),
        t.HitNumberAll++);
  }
  static CheckHitCountPerVictim(t, i) {
    let e, u;
    return t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.CheckHitCountPerVictim(t.ParentBulletInfo, i)
      : ((u = t.EntityHitCount.size),
        !(
          ((e = t.BulletDataMain).Base.VictimCount >= 0 &&
            u >= e.Base.VictimCount &&
            !t.EntityHitCount.has(i.Id)) ||
          ((u = t.EntityHitCount.get(i.Id) ?? 0),
          e.Base.HitCountPerVictim >= 0 && u >= e.Base.HitCountPerVictim) ||
          (e.Base.HitCountMax > 0 && t.HitNumberAll >= e.Base.HitCountMax)
        ));
  }
  static CheckHitCountTotal(t) {
    let i;
    return t.CountByParent && t.ParentBulletInfo
      ? BulletHitCountUtil.CheckHitCountTotal(t.ParentBulletInfo)
      : (i = t.BulletDataMain).Logic.DestroyOnCountZero &&
          i.Base.HitCountMax > 0 &&
          t.HitNumberAll >= i.Base.HitCountMax;
  }
}
exports.BulletHitCountUtil = BulletHitCountUtil;
// # sourceMappingURL=BulletHitCountUtil.js.map
