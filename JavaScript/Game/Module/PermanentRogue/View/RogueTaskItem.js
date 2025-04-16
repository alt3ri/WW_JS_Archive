"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueTaskItem = void 0);
const UE = require("ue"),
  RogueResTaskById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTaskById"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController");
class RogueTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.bOe = void 0),
      (this.sOn = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid()),
      (this.qOe = () => {
        ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestTaskAward(
          this.sOn.Id,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[1, this.qOe]]);
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(6),
      this.JGe,
    );
  }
  Refresh(e, t, i) {
    (this.sOn = e),
      this.bOe.RefreshByData(e.GetRewardList()),
      this.GetButton(1).RootUIComp.SetUIActive(e.IsFinished() && !e.IsTaken()),
      this.GetItem(3).SetUIActive(e.IsTaken()),
      this.GetText(2).SetUIActive(!e.IsTaken() && !e.IsFinished()),
      this.GetButton(0).RootUIComp.SetUIActive(!1);
    var r = RogueResTaskById_1.configRogueResTaskById.GetConfig(e.Id);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), r.Text),
      0 < e.Target
        ? (this.GetText(5)?.SetUIActive(!0),
          this.GetText(5)?.SetText(e.Current + "/" + e.Target))
        : this.GetText(5)?.SetUIActive(!1);
  }
}
exports.RogueTaskItem = RogueTaskItem;
//# sourceMappingURL=RogueTaskItem.js.map
