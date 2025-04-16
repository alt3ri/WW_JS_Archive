"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceElementModel = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon"),
  ColorUtils_1 = require("../../Utils/ColorUtils");
class TraceElementModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.JJo = void 0),
      (this.uoe = void 0),
      (this.CommonStartLocation = Vector_1.Vector.Create()),
      (this.CommonEndLocation = Vector_1.Vector.Create()),
      (this.CommonHitLocation = Vector_1.Vector.Create()),
      (this.xEr = void 0),
      (this.wEr = void 0),
      (this.Xc1 = void 0),
      (this.ShowDebugTrace = !1);
  }
  OnClear() {
    if (this.Xc1) {
      for (const e of this.Xc1.values()) e.Dispose();
      this.Xc1.clear(), (this.Xc1 = void 0);
    }
    return (
      this.JJo && (this.JJo.Dispose(), (this.JJo = void 0)),
      this.xEr && (this.xEr.Dispose(), (this.xEr = void 0)),
      this.wEr && (this.wEr.Dispose(), (this.wEr = void 0)),
      !0
    );
  }
  GetActorTrace() {
    return this.JJo || this.zJo(), this.JJo;
  }
  ClearActorTrace() {
    this.JJo &&
      ((this.JJo.WorldContextObject = void 0), this.JJo.ActorsToIgnore.Empty());
  }
  zJo() {
    var e = UE.NewObject(UE.TraceSphereElement.StaticClass());
    (e.bIsSingle = !1),
      (e.bIgnoreSelf = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        e,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        e,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.JJo = e);
  }
  GetLineTrace() {
    return this.uoe || this.BEr(), this.uoe;
  }
  ClearLineTrace() {
    this.uoe &&
      ((this.uoe.WorldContextObject = void 0), this.uoe.ActorsToIgnore.Empty());
  }
  BEr() {
    var e = UE.NewObject(UE.TraceLineElement.StaticClass());
    (e.bIsSingle = !0),
      (e.bIgnoreSelf = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        e,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        e,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.uoe = e);
  }
  GetBoxTrace() {
    return this.xEr || this.bEr(), this.xEr;
  }
  ClearBoxTrace() {
    this.xEr &&
      ((this.xEr.WorldContextObject = void 0), this.xEr.ActorsToIgnore.Empty());
  }
  bEr() {
    var e = UE.NewObject(UE.TraceBoxElement.StaticClass());
    (e.bIsSingle = !0),
      (e.bIgnoreSelf = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        e,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        e,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.xEr = e);
  }
  GetCapsuleTrace() {
    return this.wEr || this.qEr(), this.wEr;
  }
  ClearCapsuleTrace() {
    this.wEr &&
      ((this.wEr.WorldContextObject = void 0), this.wEr.ActorsToIgnore.Empty());
  }
  qEr() {
    var e = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
    (e.bIsSingle = !0),
      (e.bIgnoreSelf = !0),
      e.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.IkGround),
      TraceElementCommon_1.TraceElementCommon.SetTraceColor(
        e,
        ColorUtils_1.ColorUtils.LinearGreen,
      ),
      TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
        e,
        ColorUtils_1.ColorUtils.LinearRed,
      ),
      (this.wEr = e);
  }
  Yc1(e, t, r, i) {
    void 0 === this.Xc1 && (this.Xc1 = new Map()),
      this.Xc1.has(e) ||
        ((o = UE.NewObject(e)),
        TraceElementCommon_1.TraceElementCommon.SetTraceColor(
          o,
          ColorUtils_1.ColorUtils.LinearGreen,
        ),
        TraceElementCommon_1.TraceElementCommon.SetTraceHitColor(
          o,
          ColorUtils_1.ColorUtils.LinearRed,
        ),
        this.Xc1.set(e, o));
    var o = this.Xc1.get(e);
    return (
      o.ClearCacheData(!0),
      o.ActorsToIgnore.Empty(),
      (o.bIsSingle = r),
      (o.bIgnoreSelf = i),
      (o.WorldContextObject = t),
      this.ShowDebugTrace && o.SetDrawDebugTrace(2),
      o
    );
  }
  GetTraceTypeElement(e, t, r, i = !0, o = !0) {
    e = this.Yc1(e, r, i, o);
    return e.SetTraceTypeQuery(t), e;
  }
  GetObjectTypeElement(e, t, r, i = !0, o = !0) {
    var e = this.Yc1(e, r, i, o),
      s = UE.NewArray(UE.BuiltinByte);
    if (t instanceof Array) for (const n of t) s.Add(n);
    else s.Add(t);
    return e.SetObjectTypesQuery((0, puerts_1.$ref)(s)), e;
  }
}
exports.TraceElementModel = TraceElementModel;
//# sourceMappingURL=TraceElementModel.js.map
