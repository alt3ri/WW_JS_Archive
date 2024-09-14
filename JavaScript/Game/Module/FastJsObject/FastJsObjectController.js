"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FastJsObjectController = void 0);
const Cpp = require("cpp"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
class FastJsObjectController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      Cpp.FKuroFastJsObjectCommon.RegisterFastJsObjectCommonInfo(
        "Tuple",
        "X",
        "Y",
        "Z",
        "Pitch",
        "Yaw",
        "Roll",
      ),
      Cpp.FFastMoveReplaySample.RegisterMoveReplaySampleInfo(
        "KVn",
        "Proto_ControllerPitch",
        "rSs",
      ),
      !0
    );
  }
}
exports.FastJsObjectController = FastJsObjectController;
//# sourceMappingURL=FastJsObjectController.js.map
