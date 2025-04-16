"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorDescComponent = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class RoleFavorDescComponent extends UiPanelBase_1.UiPanelBase {
  constructor(e, r) {
    super(), (this.P_o = r), e && this.CreateThenShowByActor(e.GetOwner());
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
      r = this.GetText(2);
    this.P_o
      ? (e.SetText(this.P_o.Title), r.SetText(this.P_o.Desc))
      : (e.SetText(""), r.SetText("")),
      this.GetScrollViewWithScrollbar(0).SetScrollProgress(0),
      ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(
        r,
      ) ||
        ControllerHolder_1.ControllerHolder.TermExplanationController.RegisterTextHyperlink(
          r,
          1,
          1,
        );
  }
  OnBeforeDestroy() {
    var e = this.GetText(2);
    ControllerHolder_1.ControllerHolder.TermExplanationController.IsUiTextRegistered(
      e,
    ) &&
      ControllerHolder_1.ControllerHolder.TermExplanationController.UnRegisterTextHyperlink(
        e,
      );
  }
}
exports.RoleFavorDescComponent = RoleFavorDescComponent;
//# sourceMappingURL=RoleFavorDescComponent.js.map
