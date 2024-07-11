"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletTraceElementPool = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const TraceElementCommon_1 = require("../../../../Core/Utils/TraceElementCommon");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../Utils/ColorUtils");
class BulletTraceElementPool {
  static GetTraceBoxElement(e, t, r) {
    return this.UHo(UE.TraceBoxElement.StaticClass(), this.AHo, e, t, r);
  }
  static GetTraceLineElement(e, t, r) {
    return this.UHo(UE.TraceLineElement.StaticClass(), this.PHo, e, t, r);
  }
  static GetTraceSphereElement(e, t, r) {
    return this.UHo(UE.TraceSphereElement.StaticClass(), this.xHo, e, t, r);
  }
  static UHo(e, t, r, l, a) {
    if (t.length > 0) {
      const n = t.pop();
      var t = UE.NewArray(UE.BuiltinByte);
      var t = (0, puerts_1.$ref)(t);
      n.SetObjectTypesQuery(t);
      for (let e = 0, t = r.Num(); e < t; e++) {
        const o = r.Get(e);
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
    const n = this.wHo(e, r, a);
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
    e && (e.ClearCacheData(), this.AHo.push(e));
  }
  static RecycleTraceLineElement(e) {
    e && (e.ClearCacheData(), this.PHo.push(e));
  }
  static RecycleTraceSphereElement(e) {
    e && (e.ClearCacheData(), this.xHo.push(e));
  }
  static wHo(e, r, l, t = !1) {
    const a = UE.NewObject(e);
    a.WorldContextObject = GlobalData_1.GlobalData.World;
    for (let e = 0, t = r.Num(); e < t; e++) {
      const o = r.Get(e);
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
    (this.AHo.length = 0), (this.PHo.length = 0), (this.xHo.length = 0);
  }
}
((exports.BulletTraceElementPool = BulletTraceElementPool).AHo = new Array()),
  (BulletTraceElementPool.PHo = new Array()),
  (BulletTraceElementPool.xHo = new Array());
// # sourceMappingURL=BulletTraceElementPool.js.map
