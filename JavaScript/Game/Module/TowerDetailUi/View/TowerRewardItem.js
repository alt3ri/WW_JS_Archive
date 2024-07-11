"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerRewardItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  TowerController_1 = require("../TowerController");
class TowerRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(),
      (this.QSi = !1),
      (this.uDo = 0),
      (this.bOe = void 0),
      (this.jjt = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.cDo = () => {
        TowerController_1.TowerController.TowerRewardRequest(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
          this.uDo,
        ),
          this.GetItem(3).SetUIActive(!0),
          this.GetItem(5).SetUIActive(!1);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.cDo]]);
  }
  OnStart() {
    this.bOe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.jjt,
    );
  }
  OnBeforeDestroy() {
    this.bOe = void 0;
  }
  Refresh(e) {
    (this.QSi = e.IsReceived), (this.uDo = e.Index);
    var r = this.mDo(e.RewardId),
      r =
        (this.bOe.RefreshByData(r, () => {
          for (const e of this.bOe.GetScrollItemList())
            e.SetReceivedVisible(this.QSi);
        }),
        ModelManager_1.ModelManager.TowerModel.GetDifficultyMaxStars(
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties,
        ));
    this.GetText(1).SetText("" + e.Target),
      this.GetItem(3).SetUIActive(this.QSi),
      this.GetItem(4).SetUIActive(r < e.Target),
      this.GetItem(5).SetUIActive(r >= e.Target && !this.QSi);
  }
  mDo(e) {
    var r,
      t,
      i = [];
    for ([r, t] of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e)
      ?.DropPreview) {
      var o = [{ IncId: 0, ItemId: r }, t];
      i.push(o);
    }
    return i;
  }
}
exports.TowerRewardItem = TowerRewardItem;
//# sourceMappingURL=TowerRewardItem.js.map
