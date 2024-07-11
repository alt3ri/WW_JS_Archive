"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementGroupDataItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const AchievementModel_1 = require("../AchievementModel");
const AchievementDataItem_1 = require("./AchievementDataItem");
class AchievementGroupDataItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.xqe = void 0),
      (this.wqe = void 0),
      (this.Bqe = () => {
        return new AchievementDataItem_1.AchievementDataItem();
      }),
      (this.wqe = e);
  }
  async Init() {
    await this.CreateByActorAsync(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.xqe = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(0),
      this.GetItem(1).GetOwner(),
      this.Bqe,
    );
  }
  Update(e) {
    e = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
      e.GetId(),
    );
    e.sort(AchievementModel_1.AchievementModel.SortByTabIndex), this.bqe(e);
  }
  bqe(e) {
    this.xqe.RefreshByData(e, !0),
      e.length > 0 && ((e = this.qqe(e)), this.xqe.ScrollToGridIndex(e));
  }
  qqe(t) {
    if (
      ModelManager_1.ModelManager.AchievementModel
        .CurrentSelectAchievementId === -1
    )
      return 0;
    let i = 0;
    const r = t.length;
    for (let e = 0; e < r; e++)
      if (
        ModelManager_1.ModelManager.AchievementModel
          .CurrentSelectAchievementId === t[e].GetId()
      ) {
        i = e;
        break;
      }
    return (
      (ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId =
        -1),
      i
    );
  }
}
exports.AchievementGroupDataItem = AchievementGroupDataItem;
// # sourceMappingURL=AchievementGroupDataItem.js.map
