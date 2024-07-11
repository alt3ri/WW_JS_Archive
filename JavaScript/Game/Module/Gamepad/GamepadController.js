"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamepadController = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Global_1 = require("../../Global"),
  ModelManager_1 = require("../../Manager/ModelManager");
class GamepadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.XWt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "FKHitForceFeedbackPath",
        ),
      ),
      this.XWt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "LightHitForceFeedbackPath",
        ),
      ),
      this.XWt.push(
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "HeavyHitForceFeedbackPath",
        ),
      ),
      !0
    );
  }
  static PlayForceFeedbackByHit(e) {
    var r;
    ModelManager_1.ModelManager.PlatformModel?.IsGamepad() &&
      ((r = this.$Wt[e])
        ? Global_1.Global.CharacterController.PlayKuroForceFeedback(
            r,
            void 0,
            !1,
            !1,
            !1,
          )
        : ((r = this.XWt[e]),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            r,
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
((exports.GamepadController = GamepadController).XWt = []),
  (GamepadController.$Wt = []);
//# sourceMappingURL=GamepadController.js.map
