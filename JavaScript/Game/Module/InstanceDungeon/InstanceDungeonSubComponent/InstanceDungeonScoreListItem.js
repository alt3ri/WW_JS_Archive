"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonScoreListItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonScoreListItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [8, UE.UIText],
      [6, UE.UIItem],
      [7, UE.UITexture],
    ];
  }
  RefreshItem(e) {
    var i = void 0 === e || void 0 === e.MedalPathId;
    this.GetItem(0)?.SetUIActive(!i),
      this.GetItem(6)?.SetUIActive(i),
      this.GetText(5)?.SetUIActive(!1),
      i ||
        (LguiUtil_1.LguiUtil.TrySetLocalTextNew(
          this.GetText(1),
          e.TitleTextId1,
        ),
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(3), e.TitleTextId2),
        LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(5), e.TitleTextId3),
        this.GetText(2)?.SetText(e.ScoreText1),
        this.GetText(4)?.SetText(e.ScoreText2),
        this.GetText(8)?.SetText(e.ScoreText3),
        this.TrySetTextureByPath(e?.MedalPathId, this.GetTexture(7)));
  }
}
exports.InstanceDungeonScoreListItem = InstanceDungeonScoreListItem;
//# sourceMappingURL=InstanceDungeonScoreListItem.js.map
