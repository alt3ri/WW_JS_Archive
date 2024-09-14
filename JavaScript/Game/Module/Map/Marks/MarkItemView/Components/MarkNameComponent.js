"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkNameComponent = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MarkNameComponent extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetName(e, t, i, r) {
    var n = this.GetText(0);
    n &&
      (r && n.SetFontSize(r),
      (r = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
      n.SetText(StringUtils_1.StringUtils.Format(r, e, i)));
  }
}
exports.MarkNameComponent = MarkNameComponent;
//# sourceMappingURL=MarkNameComponent.js.map
