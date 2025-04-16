"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityInstanceEntranceScoreItem = void 0);
const UE = require("ue"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivityInstanceEntranceScoreItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.C0t = void 0),
      (this.hih = () => {
        var t = this.C0t.GetPointRewardBtnClickCallBack();
        t && t();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.hih]]);
  }
  RefreshView(t) {
    this.C0t &&
      this.C0t.GetRedDotName() &&
      RedDotController_1.RedDotController.UnBindGivenUi(
        this.C0t.GetRedDotName(),
        this.GetItem(2),
        this.C0t.GetRedDotId(),
      ),
      (this.C0t = t),
      this.C0t &&
        this.C0t.GetRedDotName() &&
        RedDotController_1.RedDotController.BindRedDot(
          this.C0t.GetRedDotName(),
          this.GetItem(2),
          void 0,
          this.C0t.GetRedDotId(),
        );
    t = t.GetRewardData();
    this.GetButton(0)?.RootUIComp.SetUIActive(void 0 !== t), this.l3e();
  }
  l3e() {
    var t = this.C0t.GetScoreDesc();
    this.GetText(1)?.SetText(t);
  }
}
exports.ActivityInstanceEntranceScoreItem = ActivityInstanceEntranceScoreItem;
//# sourceMappingURL=ActivityInstanceEntranceScoreItem.js.map
