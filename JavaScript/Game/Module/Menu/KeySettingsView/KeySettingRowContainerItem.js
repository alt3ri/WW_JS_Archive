"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowContainerItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  KeySettingRowKeyItem_1 = require("./KeySettingRowKeyItem"),
  KeySettingRowTypeItem_1 = require("./KeySettingRowTypeItem");
class KeySettingRowContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.KeySettingRowData = void 0),
      (this.DPi = void 0),
      (this.RPi = void 0),
      (this.SPi = void 0),
      (this.sui = void 0),
      (this.tui = void 0),
      (this.iui = void 0),
      (this.UPi = (t) => {
        this.sui && this.sui(this, t);
      }),
      (this._ui = () => {
        this.tui && this.tui(this.KeySettingRowData);
      }),
      (this.uui = () => {
        this.iui && this.iui(this.KeySettingRowData);
      }),
      (this.LPi = (t, i) => {
        this.SPi && this.SPi(t, i, this);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    var t = this.GetExtendToggle(0);
    t?.OnStateChange.Add(this.UPi),
      t?.OnHover.Add(this._ui),
      t?.OnUnHover.Add(this.uui),
      this.SetActive(!0);
  }
  OnBeforeDestroy() {
    (this.KeySettingRowData = void 0),
      (this.DPi = void 0),
      (this.RPi = void 0),
      (this.SPi = void 0);
    var t = this.GetExtendToggle(0);
    t?.OnStateChange.Remove(this.UPi),
      t?.OnHover.Remove(this._ui),
      t?.OnUnHover.Remove(this.uui);
  }
  BindOnToggleStateChanged(t) {
    this.sui = t;
  }
  BindOnHover(t) {
    this.tui = t;
  }
  BindOnUnHover(t) {
    this.iui = t;
  }
  async Init(t) {
    await Promise.all([
      this.CreateByActorAsync(t.GetOwner(), void 0, !0),
      this.APi(),
      this.PPi(),
    ]);
  }
  ClearItem() {
    this.KeySettingRowData = void 0;
  }
  Update(t, i) {
    var e = ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType;
    switch ((this.KeySettingRowData = t).GetRowType()) {
      case 2:
        this.GetExtendToggle(0)?.SetSelfInteractive(!0),
          this.DPi.Refresh(t, e),
          this.GetItem(2).SetUIActive(!0),
          this.GetItem(1).SetUIActive(!1);
        break;
      case 1:
        this.GetExtendToggle(0)?.SetSelfInteractive(!1),
          this.RPi.Refresh(t),
          this.GetItem(2).SetUIActive(!1),
          this.GetItem(1).SetUIActive(!0);
    }
    this.SetSelected(!1), this.EUt(t.IsExpandDetail);
  }
  async PPi() {
    var t = this.GetItem(2)?.GetOwner();
    t &&
      ((this.DPi = new KeySettingRowKeyItem_1.KeySettingRowKeyItem()),
      this.DPi.BindOnWaitInput(this.LPi),
      await this.DPi.CreateThenShowByActorAsync(t));
  }
  BindOnWaitInput(t) {
    this.SPi = t;
  }
  async APi() {
    var t = this.GetItem(1)?.GetOwner();
    t &&
      ((this.RPi = new KeySettingRowTypeItem_1.KeySettingRowTypeItem()),
      await this.RPi.CreateThenShowByActorAsync(t));
  }
  GetUsingItem(t) {
    switch (t.GetRowType()) {
      case 1:
        return this.GetItem(1).GetOwner();
      case 2:
        return this.GetItem(2).GetOwner();
      default:
        return;
    }
  }
  SetSelected(t) {
    this.DPi?.SetSelected(t);
  }
  SetDetailItemVisible(t) {
    this.DPi?.SetDetailItemVisible(t), this.EUt(t);
  }
  EUt(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
  }
}
exports.KeySettingRowContainerItem = KeySettingRowContainerItem;
//# sourceMappingURL=KeySettingRowContainerItem.js.map
