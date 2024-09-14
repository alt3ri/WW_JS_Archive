"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionContainer = exports.BulletActionCenter = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletActionAfterInit_1 = require("./BulletActionAfterInit"),
  BulletActionAttachActor_1 = require("./BulletActionAttachActor"),
  BulletActionAttachParentEffect_1 = require("./BulletActionAttachParentEffect"),
  BulletActionBase_1 = require("./BulletActionBase"),
  BulletActionChild_1 = require("./BulletActionChild"),
  BulletActionDelayDestroyBullet_1 = require("./BulletActionDelayDestroyBullet"),
  BulletActionDestroyBullet_1 = require("./BulletActionDestroyBullet"),
  BulletActionInfo_1 = require("./BulletActionInfo"),
  BulletActionInitBullet_1 = require("./BulletActionInitBullet"),
  BulletActionInitCollision_1 = require("./BulletActionInitCollision"),
  BulletActionInitHit_1 = require("./BulletActionInitHit"),
  BulletActionInitMove_1 = require("./BulletActionInitMove"),
  BulletActionInitRender_1 = require("./BulletActionInitRender"),
  BulletActionSummonBullet_1 = require("./BulletActionSummonBullet"),
  BulletActionSummonEntity_1 = require("./BulletActionSummonEntity"),
  BulletActionTimeScale_1 = require("./BulletActionTimeScale"),
  BulletActionUpdateAttackerFrozen_1 = require("./BulletActionUpdateAttackerFrozen"),
  BulletActionUpdateEffect_1 = require("./BulletActionUpdateEffect"),
  BulletActionUpdateLiveTime_1 = require("./BulletActionUpdateLiveTime");
class BulletActionCenter {
  constructor() {
    this.f5o = void 0;
  }
  Init() {
    this.LTe();
  }
  Clear() {
    this.f5o = void 0;
  }
  LTe() {
    (this.f5o = new Array(18)),
      this.SXi(
        0,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionBase_1.BulletActionTest,
      ),
      this.SXi(
        1,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionInitBullet_1.BulletActionInitBullet,
      ),
      this.SXi(
        2,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionInitHit_1.BulletActionInitHit,
      ),
      this.SXi(
        3,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionInitMove_1.BulletActionInitMove,
      ),
      this.SXi(
        4,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionInitRender_1.BulletActionInitRender,
        !0,
      ),
      this.SXi(
        5,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionTimeScale_1.BulletActionTimeScale,
        !0,
      ),
      this.SXi(
        9,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionAfterInit_1.BulletActionAfterInit,
      ),
      this.SXi(
        6,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionInitCollision_1.BulletActionInitCollision,
      ),
      this.SXi(
        7,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionUpdateEffect_1.BulletActionUpdateEffect,
        !0,
      ),
      this.SXi(
        15,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionUpdateAttackerFrozen_1.BulletActionUpdateAttackerFrozen,
        !0,
      ),
      this.SXi(
        8,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionUpdateLiveTime_1.BulletActionUpdateLiveTime,
        !0,
      ),
      this.SXi(
        10,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionChild_1.BulletActionChild,
        !0,
      ),
      this.SXi(
        11,
        BulletActionInfo_1.BulletActionInfoSummonBullet,
        BulletActionSummonBullet_1.BulletActionSummonBullet,
      ),
      this.SXi(
        12,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionSummonEntity_1.BulletActionSummonEntity,
      ),
      this.SXi(
        13,
        BulletActionInfo_1.BulletActionInfoDestroyBullet,
        BulletActionDestroyBullet_1.BulletActionDestroyBullet,
      ),
      this.SXi(
        14,
        BulletActionInfo_1.BulletActionInfoAttachActor,
        BulletActionAttachActor_1.BulletActionAttachActor,
      ),
      this.SXi(
        16,
        BulletActionInfo_1.BulletActionInfoSimple,
        BulletActionAttachParentEffect_1.BulletActionAttachParentEffect,
        !0,
      ),
      this.SXi(
        17,
        BulletActionInfo_1.BulletActionInfoDestroyBullet,
        BulletActionDelayDestroyBullet_1.BulletActionDelayDestroyBullet,
        !0,
      );
  }
  SXi(t, e, i, l = !1) {
    var n;
    this.f5o[t] ||
      ((n = new BulletActionContainer()).Init(t, e, i, l), (this.f5o[t] = n));
  }
  GetBulletActionContainer(t) {
    return this.f5o[t];
  }
  CreateBulletActionInfo(t) {
    return this.GetBulletActionContainer(t).GetActionInfo();
  }
  RecycleBulletActionInfo(t) {
    this.GetBulletActionContainer(t.Type).RecycleActionInfo(t);
  }
  CreateBulletAction(t) {
    return this.GetBulletActionContainer(t).GetAction();
  }
  RecycleBulletAction(t) {
    this.GetBulletActionContainer(t.Type).RecycleAction(t);
  }
}
exports.BulletActionCenter = BulletActionCenter;
class BulletActionContainer {
  constructor() {
    (this.E9 = 0),
      (this.p5o = void 0),
      (this.v5o = void 0),
      (this.M5o = !1),
      (this.E5o = void 0),
      (this.TXi = void 0),
      (this.S5o = void 0),
      (this.y5o = void 0),
      (this.I5o = !1);
  }
  Init(t, e, i, l = !1) {
    (this.E9 = t),
      (this.p5o = e),
      (this.v5o = i),
      (this.M5o = l),
      (this.I5o = this.p5o === BulletActionInfo_1.BulletActionInfoSimple),
      (this.E5o = new Array()),
      (this.TXi = new Array());
    (t = this.T5o()),
      (t.IsInPool = !0),
      this.TXi.push(t),
      (this.S5o = new Array()),
      (this.y5o = new Array()),
      (e = this.dZ());
    (e.IsInPool = !0), this.y5o.push(e);
  }
  get ActionType() {
    return this.E9;
  }
  T5o() {
    var t = new this.p5o(this.E9);
    return (t.Index = this.E5o.length), this.E5o.push(t), t;
  }
  GetActionInfo() {
    var t;
    return this.I5o
      ? this.TXi[0]
      : this.TXi.length <= 0
        ? this.T5o()
        : (((t = this.TXi.pop()).IsInPool = !1), t);
  }
  dZ() {
    var t = new this.v5o(this.E9);
    return (t.Index = this.S5o.length), this.S5o.push(t), t;
  }
  GetAction() {
    var t;
    return this.M5o
      ? this.y5o.length <= 0
        ? this.dZ()
        : (((t = this.y5o.pop()).IsInPool = !1), t)
      : this.y5o[0];
  }
  RecycleActionInfo(t) {
    this.I5o ||
      (t.IsInPool
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 18, "BulletActionInfo重复入池")
        : (t.Clear(), (t.IsInPool = !0), this.TXi.push(this.E5o[t.Index])));
  }
  RecycleAction(t) {
    var e = t.GetActionInfo();
    if (
      (this.RecycleActionInfo(e),
      t.Clear(),
      BulletConstant_1.BulletConstant.OpenClearCheck)
    ) {
      for (const u in e) {
        var i = e[u],
          l = typeof i;
        ("number" == l && 0 === i) ||
          ("boolean" == l && !1 === i) ||
          (void 0 !== i &&
            "Type" !== u &&
            "Index" !== u &&
            "IsInPool" !== u &&
            "function" != l &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "BulletActionInfo回收时，该变量不为undefined",
              ["type", e.Type],
              ["key", u],
            ));
      }
      for (const c in t) {
        var n = t[c],
          o = typeof n;
        ("number" == o && 0 === n) ||
          ("boolean" == o && !1 === n) ||
          (void 0 !== n &&
            "Type" !== c &&
            "Index" !== c &&
            "IsInPool" !== c &&
            "Stat" !== c &&
            "TickStat" !== c &&
            "function" != o &&
            Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              18,
              "BulletAction回收时，该变量不为undefined",
              ["type", t.Type],
              ["key", c],
            ));
      }
    }
    this.M5o &&
      (t.IsInPool
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 18, "BulletAction重复入池")
        : ((t.IsInPool = !0), this.y5o.push(this.S5o[t.Index])));
  }
}
exports.BulletActionContainer = BulletActionContainer;
//# sourceMappingURL=BulletActionCenter.js.map
