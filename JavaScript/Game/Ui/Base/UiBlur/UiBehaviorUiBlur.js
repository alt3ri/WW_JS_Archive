"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviourUiBlur = void 0);
const UiLayerType_1 = require("../../Define/UiLayerType"),
  UiBlurLogic_1 = require("./UiBlurLogic");
class UiBehaviourUiBlur {
  constructor() {
    (this.A_r = void 0), (this.CurrentView = void 0), (this.fXn = !1);
  }
  OnAfterUiStart() {
    0 != (this.A_r & UiLayerType_1.UIBLUR_TYPE) &&
      ((this.fXn = !0),
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView));
  }
  OnAfterUiShow() {
    this.fXn &&
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
  }
  ChangeNeedBlurState(i) {
    this.fXn = i;
  }
  SetCurrentLayer(i) {
    this.A_r = i;
  }
  SetViewInfo(i) {
    this.CurrentView = i;
  }
  OnBeforeDestroy() {
    this.fXn &&
      this.A_r === UiLayerType_1.ELayerType.Pop &&
      UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
}
exports.UiBehaviourUiBlur = UiBehaviourUiBlur;
//# sourceMappingURL=UiBehaviorUiBlur.js.map
