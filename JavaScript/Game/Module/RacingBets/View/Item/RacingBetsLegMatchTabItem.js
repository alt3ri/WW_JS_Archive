"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsLegMatchTabItem = void 0);
const UE = require("ue"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class RacingBetsLegMatchTabItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  RefreshUi(e) {
    void 0 === e
      ? this.SetUiActive(!1)
      : (this.GetText(0).ShowTextNew(e.Name),
        (e = new Date(e.MatchStartTime)),
        this.GetText(1).SetText(TimeUtil_1.TimeUtil.DateFormat3(e)));
  }
}
exports.RacingBetsLegMatchTabItem = RacingBetsLegMatchTabItem;
//# sourceMappingURL=RacingBetsLegMatchTabItem.js.map
