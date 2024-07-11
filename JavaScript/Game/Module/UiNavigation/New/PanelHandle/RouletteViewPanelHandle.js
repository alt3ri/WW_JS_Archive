"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RouletteViewPanelHandle = void 0);
const UiNavigationLogic_1 = require("../UiNavigationLogic"),
  SpecialPanelHandleBase_1 = require("./SpecialPanelHandleBase");
class RouletteViewPanelHandle extends SpecialPanelHandleBase_1.SpecialPanelHandleBase {
  constructor() {
    super(...arguments), (this.aBo = void 0);
  }
  OnGetSuitableNavigationListenerList(e) {
    return e
      ? this.DefaultNavigationListener
      : ((e = this.GetNavigationGroup("Group2")),
        UiNavigationLogic_1.UiNavigationLogic.HasActiveListenerInGroup(e)
          ? (this.aBo ||
              ((this.aBo = [...this.DefaultNavigationListener]),
              2 <= this.aBo.length &&
                ((e = this.aBo[0]),
                (this.aBo[0] = this.aBo[1]),
                (this.aBo[1] = e))),
            this.aBo)
          : ((e = this.DefaultNavigationListener[0]).GetNavigationGroup()
              .LastSelectListener &&
              ((e = e.GetNavigationGroup().LastSelectListener),
              (this.DefaultNavigationListener[0] = e)),
            this.DefaultNavigationListener));
  }
}
exports.RouletteViewPanelHandle = RouletteViewPanelHandle;
//# sourceMappingURL=RouletteViewPanelHandle.js.map
