"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkNameComponent = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  MarkComponent_1 = require("./MarkComponent");
class MarkNameComponent extends MarkComponent_1.MarkComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  SetName(e, t, r, n) {
    var i = this.GetText(0);
    i &&
      (n && i.SetFontSize(n),
      (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)),
      i.SetText(StringUtils_1.StringUtils.Format(n, e, r)));
  }
}
exports.MarkNameComponent = MarkNameComponent;
//# sourceMappingURL=MarkNameComponent.js.map
