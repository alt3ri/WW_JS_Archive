"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardTakeComponent = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class RewardTakeComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments), (this.N5_ = 0), (this.Nxo = void 0);
  }
  OnPress(e) {
    var t;
    this.Nxo &&
      ((t = this.Nxo.GetBehaviorComponent().RootUIComp),
      UiNavigationNewController_1.UiNavigationNewController.SimulateClickItem(
        t,
      ));
  }
  OnRefreshSelfHotKeyState(e) {
    var t = this.GetBindButtonTag();
    if (t) {
      var o = ModelManager_1.ModelManager.DailyActivityModel.GetLastNotTaken();
      if (o <= 0) this.SetVisibleMode(2, !1);
      else {
        if (this.N5_ <= 0) {
          this.SetVisibleMode(2, !1);
          var r,
            i,
            e = e.GetActiveListenerListByTag(t);
          if (e.length <= 0) return;
          for ([r, i] of e.entries()) {
            var s = i.GetOwner();
            if (this.IsLinkListener(s)) {
              (this.N5_ = r + 1), (this.Nxo = i);
              break;
            }
          }
        }
        this.SetVisibleMode(2, this.N5_ === o);
      }
    } else this.SetVisibleMode(2, !1);
  }
}
exports.RewardTakeComponent = RewardTakeComponent;
//# sourceMappingURL=RewardTakeComponent.js.map
