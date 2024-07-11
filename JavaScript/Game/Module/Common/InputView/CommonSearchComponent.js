"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonSearchComponent = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class CommonSearchComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super(),
      (this.SearchFunction = i),
      (this.ClearFunction = s),
      (this.yAt = void 0),
      (this.IAt = void 0),
      (this.TAt = void 0),
      (this.LAt = (t) => {
        t && this.yAt.ActivateInputText();
      }),
      (this.DAt = () => {
        var t = this.yAt.GetText();
        this.SearchFunction?.(t), this.RAt(!1), (this.UAt = !0);
      }),
      (this.AAt = () => {
        this.ResetSearch(!0);
      }),
      (this.ZGe = (t) => {
        StringUtils_1.StringUtils.IsEmpty(t)
          ? (this.RAt(!0),
            this.IAt.SetSelfInteractive(!1),
            this.ClearFunction?.())
          : (this.UAt && this.RAt(!0), this.IAt.SetSelfInteractive(!0));
      }),
      (this.UAt = !1),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITextInputComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [0, this.LAt],
        [1, this.DAt],
        [2, this.AAt],
      ]);
  }
  OnStart() {
    (this.IAt = this.GetButton(1)),
      (this.TAt = this.GetButton(2)),
      (this.yAt = this.GetInputText(0)),
      this.yAt.OnTextChange.Bind(this.ZGe),
      this.yAt.OnTextSubmit.Bind(this.DAt),
      this.ResetSearch(!1),
      this.RAt(!0),
      this.IAt.SetSelfInteractive(!1);
  }
  OnBeforeDestroy() {
    (this.yAt = void 0), (this.IAt = void 0), (this.TAt = void 0);
  }
  RAt(t) {
    this.IAt.RootUIComp.SetUIActive(t),
      this.TAt.RootUIComp.SetUIActive(!t),
      (this.UAt = !t);
  }
  ResetSearch(t) {
    this.yAt.SetText("", t);
  }
}
exports.CommonSearchComponent = CommonSearchComponent;
//# sourceMappingURL=CommonSearchComponent.js.map
