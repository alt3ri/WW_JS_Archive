"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadController = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Global_1 = require("../../Global");
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.XKt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "FKHitForceFeedbackPath",
        ),
      ),
      this.XKt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "LightHitForceFeedbackPath",
        ),
      ),
      this.XKt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "HeavyHitForceFeedbackPath",
        ),
      ),
      !0
    );
  }
  static PlayForceFeedbackByHit(e) {
    var o;
    Info_1.Info.IsInGamepad() &&
      ((o = this.$Kt[e])
        ? Global_1.Global.CharacterController.PlayKuroForceFeedback(
            o,
            void 0,
            !1,
            !1,
            !1,
          )
        : ((o = this.XKt[e]),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            o,
            UE.KuroForceFeedbackEffect,
            (e) => {
              e &&
                Global_1.Global.CharacterController.PlayKuroForceFeedback(
                  e,
                  void 0,
                  !1,
                  !1,
                  !1,
                );
            },
          )));
  }
}
((exports.GamepadController = GamepadController).XKt = []),
  (GamepadController.$Kt = []);
//# sourceMappingURL=GamepadController.js.map
