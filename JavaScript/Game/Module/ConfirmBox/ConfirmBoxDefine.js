"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfirmBoxDataNew = exports.BUTTON_DELAYTIME = void 0);
const UiLayerType_1 = require("../../Ui/Define/UiLayerType"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
exports.BUTTON_DELAYTIME = 1e3;
class ConfirmBoxDataNew extends UiPopViewData_1.UiPopViewData {
  constructor(t) {
    super(),
      (this.IsMultipleView = !1),
      (this.ConfigId = -1),
      (this.ItemIdMap = new Map()),
      (this.FunctionMap = new Map()),
      (this.InteractionMap = new Map()),
      (this.CanvasLayer = UiLayerType_1.ELayerType.Pop),
      (this.Title = ""),
      (this.HasToggle = !1),
      (this.ToggleText = ""),
      (this.Tip = void 0),
      (this.TextArgs = void 0),
      (this.CanClickDuringTimer = !0),
      (this.IsEscViewTriggerCallBack = !0),
      (this.ShowPowerItem = !1),
      (this.AttachView = void 0),
      (this.dqt = void 0),
      (this.Cqt = void 0),
      (this.j5e = void 0),
      (this.FinishOpenFunction = void 0),
      (this.DestroyFunction = void 0),
      (this.BeforePlayCloseFunction = void 0),
      (this.ConfigId = t);
  }
  SetTitle(t) {
    this.Title = t;
  }
  GetTitle() {
    return this.Title;
  }
  SetTextArgs(...t) {
    this.TextArgs = t;
  }
  SetCloseFunction(t) {
    this.dqt = t;
  }
  GetCloseFunction() {
    return this.dqt;
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  GetToggleFunction() {
    return this.j5e;
  }
  SetAfterShowFunction(t) {
    this.Cqt = t;
  }
  GetAfterShowFunction() {
    return this.Cqt;
  }
}
exports.ConfirmBoxDataNew = ConfirmBoxDataNew;
//# sourceMappingURL=ConfirmBoxDefine.js.map
