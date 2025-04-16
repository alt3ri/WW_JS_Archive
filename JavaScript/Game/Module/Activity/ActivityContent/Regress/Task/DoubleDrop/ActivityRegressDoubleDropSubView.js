"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressDoubleDropSubView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase"),
  ActivityRegressDoubleDropChallengeItem_1 = require("./ActivityRegressDoubleDropChallengeItem");
class ActivityRegressDoubleDropSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments), (this.wl1 = void 0), (this.Al1 = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.wl1 =
      new ActivityRegressDoubleDropChallengeItem_1.ActivityRegressDoubleDropChallengeItem(
        1,
      );
    var e = this.GetItem(0),
      e =
        (await this.wl1.CreateThenShowByActorAsync(e.GetOwner()),
        (this.Al1 =
          new ActivityRegressDoubleDropChallengeItem_1.ActivityRegressDoubleDropChallengeItem(
            2,
          )),
        this.GetItem(1));
    await this.Al1.CreateThenShowByActorAsync(e.GetOwner());
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.ActivityRegressModel.MarkDoubleDropReminderShown(),
      ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.MarkDoubleDropFirstRedDotShown();
  }
}
exports.ActivityRegressDoubleDropSubView = ActivityRegressDoubleDropSubView;
//# sourceMappingURL=ActivityRegressDoubleDropSubView.js.map
