"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreMissionItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class ExploreMissionItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.kHs = void 0),
      (this.FHs = () => {
        this.kHs &&
          (SkipTaskManager_1.SkipTaskManager.Run(7, this.kHs.QuestId),
          UiManager_1.UiManager.CloseView("ExploreMissionView"));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [[3, this.FHs]]);
  }
  Refresh(i, e, s) {
    var t = (this.kHs = i).IsBranchQuest(),
      r = i.IsQuestVisible();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.QuestNameId),
      this.GetSprite(1)?.SetUIActive(!t),
      this.GetSprite(0)?.SetUIActive(t),
      r
        ? (this.GetItem(4)?.SetUIActive(!0),
          this.GetText(6)?.SetUIActive(!1),
          this.GetSprite(5)?.SetUIActive(!1))
        : 3 === i.QuestStatus
          ? (this.GetItem(4)?.SetUIActive(!1),
            this.GetText(6)?.SetUIActive(!1),
            this.GetSprite(5)?.SetUIActive(!0))
          : (this.GetItem(4)?.SetUIActive(!1),
            this.GetText(6)?.SetUIActive(!0),
            this.GetSprite(5)?.SetUIActive(!1));
  }
  Clear() {}
  OnSelected(i) {}
  OnDeselected(i) {}
  GetKey(i, e) {
    return this.GridIndex;
  }
}
exports.ExploreMissionItem = ExploreMissionItem;
//# sourceMappingURL=ExploreMissionItem.js.map
