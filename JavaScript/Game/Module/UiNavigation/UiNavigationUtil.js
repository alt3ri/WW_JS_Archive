"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  GlobalData_1 = require("../../GlobalData");
class UiNavigationUtil {
  static GetFullPathOfActor(t) {
    var e;
    return t
      ? ((e = (0, puerts_1.$ref)("")),
        UE.LGUIBPLibrary.GetFullPathOfActor(
          GlobalData_1.GlobalData.World,
          t,
          e,
        ),
        (0, puerts_1.$unref)(e))
      : "null";
  }
}
(exports.UiNavigationUtil = UiNavigationUtil).IncId = 0;
//# sourceMappingURL=UiNavigationUtil.js.map
