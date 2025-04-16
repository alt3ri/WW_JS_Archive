"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixLguiUtils = void 0);
const UE = require("ue");
class HotFixLguiUtils {
  static CopyItem(t, e) {
    return this.DuplicateActor(t.GetOwner(), e).GetComponentByClass(
      UE.UIItem.StaticClass(),
    );
  }
  static DuplicateActor(t, e) {
    return UE.LGUIBPLibrary.DuplicateActor(t, e);
  }
}
exports.HotFixLguiUtils = HotFixLguiUtils;
//# sourceMappingURL=HotFixLguiUtils.js.map
