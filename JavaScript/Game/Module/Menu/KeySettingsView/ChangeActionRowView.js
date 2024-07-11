"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActionRowView = void 0);
const UE = require("ue"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeActionRowView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uPi = void 0),
      (this.IsRevert = !1),
      (this.q6e = void 0),
      (this.Jgt = (t) => {
        1 === t && this.q6e && this.q6e(this, this.IsRevert);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [0, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[0, this.Jgt]]);
  }
  OnBeforeDestroy() {
    this.uPi = void 0;
  }
  Refresh(t, e, i) {
    (this.uPi = t), (this.IsRevert = i);
    var t = this.uPi.BothActionName,
      s = t[0],
      t = t[1],
      s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(s),
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t),
      n = [],
      h = [],
      s =
        (s.GetKeyNameList(n), t.GetKeyNameList(h), n[this.uPi.GetKeyIndex(e)]),
      t = h[this.uPi.GetKeyIndex(e)],
      n = this.uPi.GetSettingName(),
      h =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n),
        i ? [t, s] : [s, t]),
      n = this.uPi.GetKeyNameRichTextByKeyNameList(e, h, "/");
    this.GetText(2)?.SetText(n);
  }
  BindOnSelected(t) {
    this.q6e = t;
  }
  SetSelected(t) {
    t
      ? this.GetExtendToggle(0)?.SetToggleState(1)
      : this.GetExtendToggle(0)?.SetToggleState(0);
  }
}
exports.ChangeActionRowView = ChangeActionRowView;
//# sourceMappingURL=ChangeActionRowView.js.map
