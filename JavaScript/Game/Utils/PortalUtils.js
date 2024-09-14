"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalUtils = void 0);
const UE = require("ue"),
  Quat_1 = require("../../Core/Utils/Math/Quat"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../Manager/ModelManager");
class PortalUtils {
  static GetMappingPosToOtherPortal(t, r, e, a) {
    if (!r) return a.DeepCopy(t), a;
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [e, r] = e
        ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
        : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (e && r)
        return (
          (e = e.InverseTransformPosition(t.ToUeVector())),
          (t = PortalUtils.HWs.TransformPosition(e)),
          (e = r.TransformPosition(t)),
          a.DeepCopy(e),
          a
        );
    }
  }
  static GetMappingTransformToOtherPortal(t, r, e) {
    if (!r) return t;
    r = ModelManager_1.ModelManager.PortalModel?.GetPortal(r);
    if (r && r.Portal1Enable && r.Portal2Enable) {
      var [e, r] = e
        ? [r.PortalWorldTransform1, r.PortalWorldTransform2]
        : [r.PortalWorldTransform2, r.PortalWorldTransform1];
      if (e && r)
        return t
          .GetRelativeTransform(e)
          .op_Multiply(PortalUtils.HWs)
          .op_Multiply(r);
    }
  }
  static GetPlayerTransformAfterPortalTeleport(t, r, e) {
    var a = this.GetMappingTransformToOtherPortal(t, r, e);
    if (a) {
      for (; this.r7a.length < 4; ) this.r7a.push(Vector_1.Vector.Create());
      var t = Quat_1.Quat.Create(t.GetRotation()),
        i = Quat_1.Quat.Create(a.GetRotation()),
        s = this.r7a[0],
        t = (t.GetUpVector(s), this.r7a[1]),
        o = (i.GetForwardVector(t), this.r7a[2]),
        l = (i.GetRightVector(o), this.r7a[3]),
        M = (s.CrossProduct(t, l), l.SizeSquared()),
        l = (s.CrossProduct(o, l), l.SizeSquared()),
        t =
          (l < M
            ? MathUtils_1.MathUtils.LookRotationUpFirst(t, s, i)
            : (MathUtils_1.MathUtils.LookRotationUpFirst(o, s, i),
              (l = this.r7a[3]),
              i.GetForwardVector(l),
              (M = l.CrossProductEqual(s)),
              MathUtils_1.MathUtils.LookRotationUpFirst(M, s, i)),
          a.SetRotation(i.ToUeQuat()),
          ModelManager_1.ModelManager.PortalModel.GetPortal(r)),
        o = (e ? t.PortalWorldTransform2 : t.PortalWorldTransform1)
          .GetRotation()
          .GetForwardVector()
          .op_Multiply(200);
      return a.AddToTranslation(o), a;
    }
  }
}
((exports.PortalUtils = PortalUtils).HWs = new UE.Transform(
  new UE.Quat(Vector_1.Vector.ZAxisVector, Math.PI),
)),
  (PortalUtils.r7a = []);
//# sourceMappingURL=PortalUtils.js.map
