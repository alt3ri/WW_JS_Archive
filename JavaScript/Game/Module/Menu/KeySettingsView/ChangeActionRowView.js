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
      (this.uAi = void 0),
      (this.IsRevert = !1),
      (this.EVe = void 0),
      (this.OCt = (t) => {
        1 === t && this.EVe && this.EVe(this, this.IsRevert);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [0, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[0, this.OCt]]);
  }
  OnBeforeDestroy() {
    this.uAi = void 0;
  }
  Refresh(t, e, i) {
    (this.uAi = t), (this.IsRevert = i);
    var t = this.uAi.BothActionName,
      s = t[0],
      t = t[1],
      s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(s),
      t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t),
      n = [],
      h = [],
      s =
        (s.GetKeyNameList(n), t.GetKeyNameList(h), n[this.uAi.GetKeyIndex(e)]),
      t = h[this.uAi.GetKeyIndex(e)],
      n = this.uAi.GetSettingName(),
      h =
        (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n),
        i ? [t, s] : [s, t]),
      n = this.uAi.GetKeyNameRichTextByKeyNameList(e, h, "/");
    this.GetText(2)?.SetText(n);
  }
  BindOnSelected(t) {
    this.EVe = t;
  }
  SetSelected(t) {
    t
      ? this.GetExtendToggle(0)?.SetToggleState(1)
      : this.GetExtendToggle(0)?.SetToggleState(0);
  }
}
exports.ChangeActionRowView = ChangeActionRowView;
//# sourceMappingURL=ChangeActionRowView.js.map
