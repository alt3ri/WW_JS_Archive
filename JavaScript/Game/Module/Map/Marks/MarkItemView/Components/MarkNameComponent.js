"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkNameComponent = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  MarkPanelBase_1 = require("../MarkPanelBase");
class MarkNameComponent extends MarkPanelBase_1.MarkPanelBase {
  constructor() {
    super(...arguments), (this.OPt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnBeforeShow() {
    this.oCo();
  }
  SetNameParam(e) {
    (this.OPt = e), this.IsShowOrShowing && this.oCo();
  }
  oCo() {
    void 0 !== this.OPt &&
      this.SetName(
        this.OPt.FormatStr,
        this.OPt.Name,
        this.OPt.Progress,
        this.OPt.FontSize,
      );
  }
  SetName(e, t, i, s) {
    var r = this.GetText(0);
    r &&
      (s && r.SetFontSize(s),
      (s = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
      r.SetText(StringUtils_1.StringUtils.Format(s, e, i)));
  }
}
exports.MarkNameComponent = MarkNameComponent;
//# sourceMappingURL=MarkNameComponent.js.map
