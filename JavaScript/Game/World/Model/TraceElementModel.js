"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TraceElementModel = void 0);
const UE = require("ue");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const ColorUtils_1 = require("../../Utils/ColorUtils");
class TraceElementModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.eJo = void 0),
      (this.uoe = void 0),
      (this.CommonStartLocation = Vector_1.Vector.Create()),
      (this.CommonEndLocation = Vector_1.Vector.Create()),
      (this.CommonHitLocation = Vector_1.Vector.Create()),
      (this.bMr = void 0),
      (this.qMr = void 0);
  }
  GetActorTrace() {
    return this.eJo || this.tJo(), this.eJo;
  }
  ClearActorTrace() {
    this.eJo &&
      ((this.eJo.WorldContextObject = void 0), this.eJo.ActorsToIgnore.Empty());
  }
  tJo() {
    const e = UE.NewObject(UE.TraceSphereElement.StaticClass());
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
      (this.eJo = e);
  }
  GetLineTrace() {
    return this.uoe || this.GMr(), this.uoe;
  }
  ClearLineTrace() {
    this.uoe &&
      ((this.uoe.WorldContextObject = void 0), this.uoe.ActorsToIgnore.Empty());
  }
  GMr() {
    const e = UE.NewObject(UE.TraceLineElement.StaticClass());
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
    return this.bMr || this.NMr(), this.bMr;
  }
  ClearBoxTrace() {
    this.bMr &&
      ((this.bMr.WorldContextObject = void 0), this.bMr.ActorsToIgnore.Empty());
  }
  NMr() {
    const e = UE.NewObject(UE.TraceBoxElement.StaticClass());
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
      (this.bMr = e);
  }
  GetCapsuleTrace() {
    return this.qMr || this.OMr(), this.qMr;
  }
  ClearCapsuleTrace() {
    this.qMr &&
      ((this.qMr.WorldContextObject = void 0), this.qMr.ActorsToIgnore.Empty());
  }
  OMr() {
    const e = UE.NewObject(UE.TraceCapsuleElement.StaticClass());
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
      (this.qMr = e);
  }
}
exports.TraceElementModel = TraceElementModel;
// # sourceMappingURL=TraceElementModel.js.map
