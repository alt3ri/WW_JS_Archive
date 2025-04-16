"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressQuestionnaireLayoutItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  SmallItemGrid_1 = require("../../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivityRegressHelper_1 = require("../Misc/ActivityRegressHelper");
class ActivityRegressQuestionnaireLayoutItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.sft = void 0),
      (this.Pe = void 0),
      (this.Bco = () => {
        var e;
        1 === this.Pe.ItemData.RewardState
          ? ActivityControllerHolder_1.ActivityControllerHolder.ActivityRegressController.RequestClaimQuestionnaireReward(
              this.Pe.Type,
            )
          : ((e = this.Pe.ItemData.ItemInfo.Id),
            ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              e,
            ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[7, UE.UIItem]];
  }
  OnStart() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      this.sft.Initialize(this.GetItem(7).GetOwner()),
      this.sft.BindOnCanExecuteChange(() => !1),
      this.sft.BindOnExtendToggleClicked(this.Bco);
  }
  Refresh(e, t, r) {
    (this.Pe = e),
      ActivityRegressHelper_1.ActivityRegressHelper.RefreshItemGridByData(
        this.sft,
        e.ItemData,
      );
  }
}
exports.ActivityRegressQuestionnaireLayoutItem =
  ActivityRegressQuestionnaireLayoutItem;
//# sourceMappingURL=ActivityRegressQuestionnaireLayoutItem.js.map
