"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TipsLockButton = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class TipsLockButton extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this._Xe = 0),
      (this.Dxt = !1),
      (this.gke = () => !this.Kvt || this.Kvt(this._Xe)),
      (this.wke = (e, t) => {
        e === this._Xe && ((this.Dxt = t), this.Rxt());
      }),
      (this.Kvt = void 0),
      (this.Uxt = () => {
        ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
          this._Xe,
          !this.Dxt,
        );
      }),
      this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]]),
      (this.BtnBindInfo = [[0, this.Uxt]]);
  }
  OnStart() {
    var e = this.GetExtendToggle(0);
    e.CanExecuteChange.Unbind(), e.CanExecuteChange.Bind(this.gke);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnItemLock,
      this.wke,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnItemLock,
      this.wke,
    );
  }
  Refresh(e, t) {
    this._Xe = e;
    e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(e);
    this.GetExtendToggle(0).RootUIComp.SetUIActive(e.CanLock()),
      (this.Dxt = e.GetIsLock()),
      this.Rxt(),
      (this.Kvt = t || void 0);
  }
  Rxt() {
    var e = this.Dxt ? 0 : 1;
    this.GetExtendToggle(0).SetToggleState(e, !1);
  }
}
exports.TipsLockButton = TipsLockButton;
//# sourceMappingURL=ItemTipsLockButton.js.map
