"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MeshComponentUtils = void 0);
const FNameUtil_1 = require("../../../../../../Core/Utils/FNameUtil");
class MeshComponentUtils {
  static RelativeAttachComponent(t, e, i = FNameUtil_1.FNameUtil.EMPTY) {
    t.K2_AttachToComponent(e, i, 0, 0, 0, !0);
  }
  static RelativeAttachComponentOnSafe(t, e, i = FNameUtil_1.FNameUtil.EMPTY) {
    return (
      e !== t.GetAttachParent() &&
      (MeshComponentUtils.RelativeAttachComponent(t, e, i), !0)
    );
  }
  static HideBone(t, e, i) {
    e = FNameUtil_1.FNameUtil.GetDynamicFName(e);
    FNameUtil_1.FNameUtil.IsEmpty(t.GetParentBone(e))
      ? t.SetHiddenInGame(i)
      : t.IsBoneHiddenByName(e) !== i &&
        (i ? t.HideBoneByName(e, 0) : t.UnHideBoneByName(e));
  }
}
exports.MeshComponentUtils = MeshComponentUtils;
// # sourceMappingURL=MeshComponentUtils.js.map
