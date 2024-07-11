"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviourUiBlur = void 0);
const UiLayerType_1 = require("../../Define/UiLayerType"),
  UiBlurLogic_1 = require("./UiBlurLogic");
class UiBehaviourUiBlur {
  constructor() {
    (this.A_r = void 0), (this.CurrentView = void 0), (this.hXn = !1);
  }
  OnAfterUiStart() {
    0 != (this.A_r & UiLayerType_1.UIBLUR_TYPE) &&
      ((this.hXn = !0),
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView));
  }
  OnAfterUiShow() {
    this.hXn &&
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
  }
  ChangeNeedBlurState(i) {
    this.hXn = i;
  }
  SetCurrentLayer(i) {
    this.A_r = i;
  }
  SetViewInfo(i) {
    this.CurrentView = i;
  }
  OnBeforeDestroy() {
    this.hXn &&
      this.A_r === UiLayerType_1.ELayerType.Pop &&
      UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
}
exports.UiBehaviourUiBlur = UiBehaviourUiBlur;
//# sourceMappingURL=UiBehaviorUiBlur.js.map
