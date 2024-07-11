"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementStarItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class AchievementStarItem extends UiPanelBase_1.UiPanelBase {
  constructor(t, e, i) {
    super(),
      (this.TGe = 0),
      (this.LGe = new Array()),
      (this.Pe = void 0),
      (this.TGe = t),
      (this.Pe = e),
      this.CreateThenShowByResourceIdAsync(this.DGe(t), i).then(
        () => {},
        () => {},
      );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [];
    for (let t = 0; t < this.TGe + 1; ++t)
      this.ComponentRegisterInfos.push([t, UE.UIItem]);
  }
  OnStart() {
    for (let t = 0; t < this.TGe; ++t) this.LGe.push(this.GetItem(t));
    this.RefreshStar(this.Pe);
  }
  OnBeforeDestroy() {
    void 0 !== this.LGe && ((this.LGe.length = 0), (this.LGe = void 0)),
      this.Pe && (this.Pe = void 0);
  }
  RefreshStar(t) {
    if (
      (this.LGe.forEach((t) => {
        t.SetUIActive(!1);
      }),
      t.IfSingleAchievement())
    ) {
      if (t.CanShowStarState())
        for (let t = 0; t < this.TGe; t++) this.LGe[t].SetUIActive(!0);
    } else {
      var e = t.GetAchievementShowStar();
      for (let t = 0; t < e; t++) this.LGe[t].SetUIActive(!0);
    }
  }
  DGe(t) {
    return 1 === t
      ? "UiItem_AchvStarA"
      : 2 === t
        ? "UiItem_AchvStarB"
        : "UiItem_AchvStarC";
  }
}
exports.AchievementStarItem = AchievementStarItem;
//# sourceMappingURL=AchievementStarItem.js.map
