"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressRoleCultivateSubView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView"),
  ActivityRegressTaskSubViewBase_1 = require("../ActivityRegressTaskSubViewBase"),
  ActivityRegressCultivateTaskSubViewLoopItem_1 = require("./ActivityRegressCultivateTaskSubViewLoopItem");
class ActivityRegressRoleCultivateSubView extends ActivityRegressTaskSubViewBase_1.ActivityRegressTaskSubViewBase {
  constructor() {
    super(...arguments),
      (this.vVt = void 0),
      (this.I2i = () => {
        return new ActivityRegressCultivateTaskSubViewLoopItem_1.ActivityRegressCultivateTaskSubViewLoopItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.vVt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(1),
      this.GetItem(2).GetOwner(),
      this.I2i,
    );
  }
  OnBeforeShow() {
    this.Og();
  }
  OnUpdate() {
    this.Og();
  }
  Og() {
    var e =
        ModelManager_1.ModelManager.ActivityRegressModel.GetRegressCultivateLoopSvDataList(),
      t =
        (this.vVt.RefreshByData(e, !1, void 0, !0),
        ModelManager_1.ModelManager.ActivityRegressModel.CalculateRegressCultivateReachTaskCount(
          e,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "PrefabTextItem_4217661232_Text",
      t + "/" + e.length,
    );
  }
  OnBeforeDestroy() {
    this.vVt?.ClearGridProxies();
  }
}
exports.ActivityRegressRoleCultivateSubView =
  ActivityRegressRoleCultivateSubView;
//# sourceMappingURL=ActivityRegressCultivateTaskSubView.js.map
