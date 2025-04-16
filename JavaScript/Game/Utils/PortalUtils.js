"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalUtils = void 0);
const UE = require("ue"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../Manager/ModelManager");
class PortalUtils {
  static GetMappingPosToOtherPortal(t, r, a, i) {
    if (!r) return i.DeepCopy(t), i;
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a
        ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
        : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r) return PortalUtils.GetMappingPosByPortalTransform(t, a, r, i);
    }
  }
  static GetMappingPosByPortalTransform(t, r, a, i) {
    if (r && a)
      return (
        (r = r.InverseTransformPosition(t.ToUeVector())),
        (t = PortalUtils.HWs.TransformPosition(r)),
        (r = a.TransformPosition(t)),
        i.DeepCopy(r),
        i
      );
  }
  static GetMappingVecByPortalTransform(t, r, a, i) {
    if (r && a)
      return (
        (r = r.InverseTransformVector(t.ToUeVector())),
        (t = PortalUtils.HWs.TransformVector(r)),
        (r = a.TransformVector(t)),
        i.DeepCopy(r),
        i
      );
  }
  static GetMappingTransformToOtherPortal(t, r, a) {
    if (!r) return t;
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a
        ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
        : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r)
        return PortalUtils.GetMappingTransformByPortalTransform(t, a, r);
    }
  }
  static GetMappingTransformByPortalTransform(t, r, a) {
    if (r && a && t)
      return t
        .GetRelativeTransform(r)
        .op_Multiply(PortalUtils.HWs)
        .op_Multiply(a);
  }
  static GetMappingOffsetTransformToOtherPortal(t, r, a, i = void 0, e = 0) {
    if (!r) return t;
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [a, r] = a
        ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
        : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (a && r)
        return PortalUtils.GetMappingOffsetTransformByPortalTransform(
          t,
          a,
          r,
          void 0,
          i,
          e,
        );
    }
  }
  static GetMappingOffsetTransformByPortalTransform(
    t,
    r,
    a,
    i = Vector_1.Vector.DownVectorProxy,
    e = void 0,
    s = 200,
  ) {
    t = PortalUtils.GetMappingTransformByPortalTransform(t, r, a);
    if (t) {
      for (; this.oWa.length < 6; ) this.oWa.push(Vector_1.Vector.Create());
      var o = Quat_1.Quat.Create(t.GetRotation()),
        l = this.oWa[0],
        i = (l.FromConfigVector(i), l.UnaryNegation(l), this.oWa[1]),
        n = (o.GetForwardVector(i), this.oWa[2]),
        M = (o.GetRightVector(n), this.oWa[3]),
        f = (l.CrossProduct(i, M), M.SizeSquared()),
        M = (l.CrossProduct(n, M), M.SizeSquared());
      return (
        M < f
          ? MathUtils_1.MathUtils.LookRotationUpFirst(i, l, o)
          : (MathUtils_1.MathUtils.LookRotationUpFirst(n, l, o),
            (M = this.oWa[3]),
            o.GetForwardVector(M),
            (f = M.CrossProductEqual(l)),
            MathUtils_1.MathUtils.LookRotationUpFirst(f, l, o)),
        t.SetRotation(o.ToUeQuat()),
        e &&
          0 !== s &&
          ((i = this.oWa[4]),
          MathUtils_1.MathUtils.CommonTempVector.FromUeVector(e),
          PortalUtils.GetMappingVecByPortalTransform(
            MathUtils_1.MathUtils.CommonTempVector,
            r,
            a,
            i,
          ),
          i.GetSafeNormal(i),
          (n = i.IsNearlyZero()
            ? a.GetRotation().GetForwardVector().op_Multiply(s)
            : i.Multiply(s, this.oWa[5]).ToUeVector()),
          t.AddToTranslation(new UE.VectorDouble(n.X, n.Y, n.Z))),
        t
      );
    }
  }
}
((exports.PortalUtils = PortalUtils).HWs = new UE.TransformDouble(
  new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
)),
  (PortalUtils.oWa = []);
//# sourceMappingURL=PortalUtils.js.map
