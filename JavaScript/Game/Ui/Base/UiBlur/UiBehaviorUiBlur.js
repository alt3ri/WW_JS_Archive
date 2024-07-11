"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiBehaviourUiBlur = void 0);
const UiLayerType_1 = require("../../Define/UiLayerType"),
  UiBlurLogic_1 = require("./UiBlurLogic");
class UiBehaviourUiBlur {
  constructor() {
    (this.w1r = void 0), (this.CurrentView = void 0), (this.uFs = !1);
  }
  OnAfterUiStart() {
    0 != (this.w1r & UiLayerType_1.UIBLUR_TYPE) &&
      ((this.uFs = !0),
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView));
  }
  OnAfterUiShow() {
    this.uFs &&
      UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this.CurrentView);
  }
  ChangeNeedBlurState(i) {
    this.uFs = i;
  }
  SetCurrentLayer(i) {
    this.w1r = i;
  }
  SetViewInfo(i) {
    this.CurrentView = i;
  }
  OnBeforeDestroy() {
    this.uFs &&
      this.w1r === UiLayerType_1.ELayerType.Pop &&
      UiBlurLogic_1.UiBlurLogic.ResumeTopUiRenderAfterBlur();
  }
}
exports.UiBehaviourUiBlur = UiBehaviourUiBlur;
//# sourceMappingURL=UiBehaviorUiBlur.js.map
