"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoveryBatchResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ItemController_1 = require("../../../Item/ItemController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  VisionRecoverySlotGridItem_1 = require("./VisionRecoverySlotGridItem"),
  CELLS_PER_LINE = 7;
class VisionRecoveryBatchResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lNa = void 0),
      (this.qWt = void 0),
      (this._Na = () => {
        return new VisionRecoverySlotGridItem_1.VisionRecoverySlotGridItem(
          this.zvt,
          !1,
        );
      }),
      (this.aRo = () => {
        this.CloseMe();
      }),
      (this.zvt = (e, i) => {
        void 0 !== i &&
          ItemController_1.ItemController.OpenItemTipsByItemUid(
            i.GetUniqueId(),
            i.GetConfigId(),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIGridLayout],
      [3, UE.UIItem],
      [4, UE.UIGridLayout],
    ]),
      (this.BtnBindInfo = [[1, this.aRo]]);
  }
  async OnBeforeStartAsync() {
    var e,
      i = this.OpenParam;
    void 0 === i
      ? Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Calabash",
          59,
          "VisionRecoveryBatchResultView responseData为空",
        )
      : ((this.lNa = new GenericLayout_1.GenericLayout(
          this.GetGridLayout(2),
          this._Na,
          this.GetItem(0).GetOwner(),
        )),
        (this.qWt = new GenericLayout_1.GenericLayout(
          this.GetGridLayout(4),
          this._Na,
          this.GetItem(0).GetOwner(),
        )),
        (e =
          ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoverySortPhantomItemList(
            i.bMs,
          )),
        await this.lNa.RefreshByDataAsync(e),
        (i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetVisionRecoverySortPhantomItemList(
            i.GBs,
          )),
        await this.qWt.RefreshByDataAsync(i),
        this.GetItem(3).SetUIActive(0 < i.length),
        this.GetGridLayout(4).RootUIComp.SetUIActive(0 < i.length),
        (e = e.length > CELLS_PER_LINE ? 0 : 1),
        this.GetGridLayout(2).SetAlign(e),
        (e = i.length > CELLS_PER_LINE ? 0 : 1),
        this.GetGridLayout(4).SetAlign(e));
  }
}
exports.VisionRecoveryBatchResultView = VisionRecoveryBatchResultView;
//# sourceMappingURL=VisionRecoveryBatchResultView.js.map
