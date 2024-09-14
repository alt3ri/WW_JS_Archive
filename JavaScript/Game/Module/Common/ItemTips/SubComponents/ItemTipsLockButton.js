"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsLockButton = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  InventoryController_1 = require("../../../Inventory/InventoryController");
class TipsLockButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this._Xe = 0),
      (this.Kvt = void 0),
      (this.gke = () => !this.Kvt || this.Kvt(this._Xe)),
      (this.yNa = (e) => {
        e === this._Xe && this.Hqe(e);
      }),
      (this.Uxt = () => {
        var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
          this._Xe,
        );
        void 0 !== e &&
          ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
            this._Xe,
            !e.GetIsLock(),
          );
      }),
      (this.INa = () => {
        var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
          this._Xe,
        );
        void 0 !== e &&
          InventoryController_1.InventoryController.ItemDeprecateRequest(
            this._Xe,
            !e.GetIsDeprecated(),
          );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [0, this.Uxt],
        [1, this.INa],
      ]);
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.gke);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.yNa,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemFuncValueChange,
      this.yNa,
    );
  }
  Refresh(e, t) {
    (this._Xe = e), this.Hqe(e), (this.Kvt = t || void 0);
  }
  Hqe(e) {
    var t,
      e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    void 0 !== e &&
      (this.GetExtendToggle(0).RootUIComp.SetUIActive(e.CanLock()),
      this.GetExtendToggle(1).RootUIComp.SetUIActive(e.CanDeprecate()),
      (t = e.GetIsLock() ? 0 : 1),
      this.GetExtendToggle(0).SetToggleStateForce(t, !1),
      (t = e.GetIsDeprecated() ? 1 : 0),
      this.GetExtendToggle(1).SetToggleStateForce(t, !1));
  }
  SetDeprecateToggleVisible(e) {
    this.GetExtendToggle(1).RootUIComp.SetUIActive(e);
  }
}
exports.TipsLockButton = TipsLockButton;
//# sourceMappingURL=ItemTipsLockButton.js.map
