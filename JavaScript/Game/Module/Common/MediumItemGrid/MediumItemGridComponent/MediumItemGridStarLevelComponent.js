"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridStarLevelComponent = void 0);
const UE = require("ue"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent");
class MediumItemGridStarLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments), (this.xwt = void 0), (this.wwt = []), (this.Bwt = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
    ];
  }
  OnActivate() {
    (this.xwt = this.GetItem(0)), this.GetSprite(1).SetUIActive(!1);
  }
  OnDeactivate() {
    (this.wwt.length = 0), (this.xwt = void 0);
  }
  GetResourceId() {
    return "UiItem_ItemTagStar";
  }
  OnRefresh(t) {
    if (this.Bwt !== t) {
      this.Bwt = t;
      var i = this.GetSprite(1).GetOwner();
      this.bwt();
      for (let e = 0; e < t; e++) {
        let t = this.wwt[e];
        t?.IsValid() ||
          ((t = LguiUtil_1.LguiUtil.DuplicateActor(i, this.xwt)),
          this.wwt.push(t)),
          t?.GetUIItem()?.SetUIActive(!0);
      }
    }
    this.SetActive(!0);
  }
  bwt() {
    for (const t of this.wwt) t?.GetUIItem()?.SetUIActive(!1);
  }
}
exports.MediumItemGridStarLevelComponent = MediumItemGridStarLevelComponent;
//# sourceMappingURL=MediumItemGridStarLevelComponent.js.map
