"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorDescComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorDescComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, s) {
    super(), (this.b1o = s), e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    var e = this.GetText(1),
      s = this.GetText(2);
    this.b1o
      ? (e.SetText(this.b1o.Title), s.SetText(this.b1o.Desc))
      : (e.SetText(""), s.SetText("")),
      this.GetScrollViewWithScrollbar(0).SetScrollProgress(0);
  }
}
exports.RoleFavorDescComponent = RoleFavorDescComponent;
//# sourceMappingURL=RoleFavorDescComponent.js.map
