"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ChangeActionRowView = void 0);
const UE = require("ue");
const InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class ChangeActionRowView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.uAi = void 0),
      (this.IsRevert = !1),
      (this.EVe = void 0),
      (this.OCt = (t) => {
        t === 1 && this.EVe && this.EVe(this, this.IsRevert);
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
    var t = this.uAi.BothActionName;
    var s = t[0];
    var t = t[1];
    var s = InputSettingsManager_1.InputSettingsManager.GetActionBinding(s);
    var t = InputSettingsManager_1.InputSettingsManager.GetActionBinding(t);
    var n = [];
    var h = [];
    var s =
      (s.GetKeyNameList(n), t.GetKeyNameList(h), n[this.uAi.GetKeyIndex(e)]);
    var t = h[this.uAi.GetKeyIndex(e)];
    var n = this.uAi.GetSettingName();
    var h =
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), n),
      i ? [t, s] : [s, t]);
    var n = this.uAi.GetKeyNameRichTextByKeyNameList(e, h, "/");
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
// # sourceMappingURL=ChangeActionRowView.js.map
