"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BagTagNavigationNextComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  NavigationGroupComponent_1 = require("./NavigationGroupComponent");
class BagTagNavigationNextComponent extends NavigationGroupComponent_1.NavigationGroupNextComponent {
  OnRefreshSelfHotKeyState(e) {
    var i = e.GetFocusListener();
    if (i) {
      var i = i.GetNavigationGroup(),
        o = this.GetBindButtonTag();
      let t = void 0;
      (t = o ? i.GroupNameMap.Get(o) : i.NextGroupName),
        !StringUtils_1.StringUtils.IsEmpty(t) &&
        (o = e.GetNavigationGroupByName(i.NextGroupName))
          ? ((e = o.DefaultListener),
            this.SetVisibleMode(2, e?.IsScrollOrLayoutActive() ?? !1))
          : this.SetVisibleMode(2, !1);
    } else this.SetVisibleMode(2, !1);
  }
}
exports.BagTagNavigationNextComponent = BagTagNavigationNextComponent;
//# sourceMappingURL=BagTagNavigationNextComponent.js.map
