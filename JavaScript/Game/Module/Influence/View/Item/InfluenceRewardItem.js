"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceRewardItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  CommonItemSimpleGridExFinish_1 = require("../../../Common/ItemGrid/CommonItemSimpleGridExFinish"),
  GenericLayoutNew_1 = require("../../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class InfluenceRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.eGe = void 0),
      (this.a5t = !1),
      (this.sGe = (e, i, t) => {
        i = new CommonItemSimpleGridExFinish_1.CommonItemSimpleGridExFinish(
          i.GetOwner(),
        );
        return (
          i.RefreshItem(e[0], e[1]),
          i.SetReceived(this.a5t),
          { Key: t, Value: i }
        );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILayoutBase],
    ];
  }
  OnStart() {
    this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(1),
      this.sGe,
    );
  }
  OnBeforeDestroy() {
    this.eGe.ClearChildren(), (this.eGe = void 0);
  }
  UpdateItem(e, i) {
    (this.a5t = i), this.Ani(e.Item1);
    i = ModelManager_1.ModelManager.InfluenceReputationModel.GetRewardList(
      e.Item2,
    );
    this.eGe.RebuildLayoutByDataNew(i);
  }
  Ani(e) {
    var i = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(i, "ReputationReceive", e);
  }
  SetAllReceivedTitle() {
    var e = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalText(e, "ReputationAllReceived");
  }
}
exports.InfluenceRewardItem = InfluenceRewardItem;
//# sourceMappingURL=InfluenceRewardItem.js.map
