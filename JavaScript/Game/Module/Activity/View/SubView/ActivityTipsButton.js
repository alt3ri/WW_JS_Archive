"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTipsButton = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class ActivityTipsButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.jel = void 0),
      (this.Gke = void 0),
      (this.Wel = () => {
        this.jel &&
          ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
            this.jel,
          );
      }),
      (this.ije = () => {
        this.Gke?.();
      }),
      (this.jel = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PermanentActivityHelpId",
      )),
      (this.Gke = this.Wel);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnBeforeDestroy() {
    this.Gke = void 0;
  }
  SetFunction(t) {
    this.Gke = t;
  }
  SetDefaultFunction() {
    this.Gke = this.Wel;
  }
  SetText(t) {
    var e = this.GetText(2);
    e && e.SetText(t);
  }
  SetLocalTextNew(t, ...e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t, ...e);
  }
}
exports.ActivityTipsButton = ActivityTipsButton;
//# sourceMappingURL=ActivityTipsButton.js.map
