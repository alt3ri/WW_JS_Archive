"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRefineResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  ItemController_1 = require("../../../Item/ItemController"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  VisionRecoverySlotGridItem_1 = require("../VisionRecovery/VisionRecoverySlotGridItem");
class VisionRefineResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.c3a = void 0),
      (this.fGt = void 0),
      (this.OnCloseCallback = void 0),
      (this.m3a = () => {
        return new VisionRecoverySlotGridItem_1.VisionRecoverySlotGridItem(
          this.zvt,
          !1,
        );
      }),
      (this.cmc = () => {
        this.CloseMe(this.OnCloseCallback);
      }),
      (this.zvt = (e, o) => {
        void 0 !== o &&
          ItemController_1.ItemController.OpenItemTipsByItemUid(
            o.GetUniqueId(),
            o.GetConfigId(),
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
      (this.BtnBindInfo = [[1, this.cmc]]);
  }
  async OnBeforeStartAsync() {
    this.GetItem(3).SetUIActive(!1),
      this.GetGridLayout(4).RootUIComp.SetUIActive(!1),
      this.GetGridLayout(2).SetAlign(1);
    var e = this.OpenParam;
    e && e.xPs
      ? ((this.fGt =
          ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(
            e.xPs,
          )),
        (this.c3a = new GenericLayout_1.GenericLayout(
          this.GetGridLayout(2),
          this.m3a,
          this.GetItem(0).GetOwner(),
        )),
        await this.c3a.RefreshByDataAsync([this.fGt]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Calabash",
          75,
          "Proto_PhantomPolishResponse.Proto_UpdateInfo为空",
        );
  }
  OnAfterShow() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
      this.fGt.GetUniqueId(),
    );
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Calabash",
          75,
          "Proto_PhantomPolishResponse.Proto_UpdateInfo为空",
        )
      : ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
          this.fGt.GetUniqueId(),
          !e.GetIsLock(),
        );
  }
}
exports.VisionRefineResultView = VisionRefineResultView;
//# sourceMappingURL=VisionRefineResultView.js.map
