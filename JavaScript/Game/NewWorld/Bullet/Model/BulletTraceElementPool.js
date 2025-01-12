"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletTraceElementPool = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon"),
  GlobalData_1 = require("../../../GlobalData"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../Utils/ColorUtils");
class BulletTraceElementPool {
  static GetTraceBoxElement(e, t, r) {
    return this.Ljo(UE.TraceBoxElement.StaticClass(), this.Djo, e, t, r);
  }
  static GetTraceLineElement(e, t, r) {
    return this.Ljo(UE.TraceLineElement.StaticClass(), this.Rjo, e, t, r);
  }
  static GetTraceSphereElement(e, t, r) {
    return this.Ljo(UE.TraceSphereElement.StaticClass(), this.Ujo, e, t, r);
  }
  static Ljo(e, t, r, l, a) {
    if (0 < t.length) {
      const n = t.pop();
      var t = UE.NewArray(UE.BuiltinByte),
        t = (0, puerts_1.$ref)(t);
      n.SetObjectTypesQuery(t);
      for (let e = 0, t = r.Num(); e < t; e++) {
        var o = r.Get(e);
        a?.has(o) || n.AddObjectTypeQuery(o);
      }
      return (
        Info_1.Info.IsBuildDevelopmentOrDebug &&
          ((t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l)),
          n.SetDrawDebugTrace(t ? 2 : 0),
          t) &&
          (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
            n,
            ColorUtils_1.ColorUtils.LinearGreen,
          ),
          TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
            n,
            ColorUtils_1.ColorUtils.LinearRed,
          )),
        n
      );
    }
    const n = this.Ajo(e, r, a);
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        ((t = ModelManager_1.ModelManager.BulletModel.ShowBulletTrace(l)),
        n.SetDrawDebugTrace(t ? 2 : 0),
        t) &&
        (TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          n,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          n,
          ColorUtils_1.ColorUtils.LinearRed,
        )),
      n
    );
  }
  static RecycleTraceBoxElement(e) {
    e && (e.ClearCacheData(), this.Djo.push(e));
  }
  static RecycleTraceLineElement(e) {
    e && (e.ClearCacheData(), this.Rjo.push(e));
  }
  static RecycleTraceSphereElement(e) {
    e && (e.ClearCacheData(), this.Ujo.push(e));
  }
  static Ajo(e, r, l, t = !1) {
    var a = UE.NewObject(e);
    a.WorldContextObject = GlobalData_1.GlobalData.World;
    for (let e = 0, t = r.Num(); e < t; e++) {
      var o = r.Get(e);
      l?.has(o) || a.AddObjectTypeQuery(o);
    }
    return (a.bTraceComplex = !1), (a.bIgnoreSelf = !0), (a.bIsSingle = t), a;
  }
  static NewTraceElementByTraceChannel(e, t, r = !1) {
    e = UE.NewObject(e);
    return (
      (e.WorldContextObject = GlobalData_1.GlobalData.World),
      e.SetTraceTypeQuery(t),
      (e.bTraceComplex = !1),
      (e.bIgnoreSelf = !0),
      (e.bIsSingle = r),
      e
    );
  }
  static Clear() {
    (this.Djo.length = 0), (this.Rjo.length = 0), (this.Ujo.length = 0);
  }
}
((exports.BulletTraceElementPool = BulletTraceElementPool).Djo = new Array()),
  (BulletTraceElementPool.Rjo = new Array()),
  (BulletTraceElementPool.Ujo = new Array());
//# sourceMappingURL=BulletTraceElementPool.js.map
