"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KeySettingRowContainerItem = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const KeySettingRowKeyItem_1 = require("./KeySettingRowKeyItem");
const KeySettingRowTypeItem_1 = require("./KeySettingRowTypeItem");
class KeySettingRowContainerItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.KeySettingRowData = void 0),
      (this.DAi = void 0),
      (this.RAi = void 0),
      (this.EAi = void 0),
      (this.s_i = void 0),
      (this.t_i = void 0),
      (this.i_i = void 0),
      (this.UAi = (t) => {
        this.s_i && this.s_i(this, t);
      }),
      (this.__i = () => {
        this.t_i && this.t_i(this.KeySettingRowData);
      }),
      (this.u_i = () => {
        this.i_i && this.i_i(this.KeySettingRowData);
      }),
      (this.LAi = (t, i) => {
        this.EAi && this.EAi(t, i, this);
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
    const t = this.GetExtendToggle(0);
    t?.OnStateChange.Add(this.UAi),
      t?.OnHover.Add(this.__i),
      t?.OnUnHover.Add(this.u_i),
      this.SetActive(!0);
  }
  OnBeforeDestroy() {
    (this.KeySettingRowData = void 0),
      (this.DAi = void 0),
      (this.RAi = void 0),
      (this.EAi = void 0);
    const t = this.GetExtendToggle(0);
    t?.OnStateChange.Remove(this.UAi),
      t?.OnHover.Remove(this.__i),
      t?.OnUnHover.Remove(this.u_i);
  }
  BindOnToggleStateChanged(t) {
    this.s_i = t;
  }
  BindOnHover(t) {
    this.t_i = t;
  }
  BindOnUnHover(t) {
    this.i_i = t;
  }
  async Init(t) {
    await Promise.all([
      this.CreateByActorAsync(t.GetOwner(), void 0, !0),
      this.AAi(),
      this.PAi(),
    ]);
  }
  ClearItem() {
    this.KeySettingRowData = void 0;
  }
  Update(t, i) {
    const e =
      ModelManager_1.ModelManager.MenuModel.KeySettingInputControllerType;
    switch ((this.KeySettingRowData = t).GetRowType()) {
      case 2:
        this.GetExtendToggle(0)?.SetSelfInteractive(!0),
          this.DAi.Refresh(t, e),
          this.GetItem(2).SetUIActive(!0),
          this.GetItem(1).SetUIActive(!1);
        break;
      case 1:
        this.GetExtendToggle(0)?.SetSelfInteractive(!1),
          this.RAi.Refresh(t),
          this.GetItem(2).SetUIActive(!1),
          this.GetItem(1).SetUIActive(!0);
    }
    this.SetSelected(!1), this.fRt(t.IsExpandDetail);
  }
  async PAi() {
    const t = this.GetItem(2)?.GetOwner();
    t &&
      ((this.DAi = new KeySettingRowKeyItem_1.KeySettingRowKeyItem()),
      this.DAi.BindOnWaitInput(this.LAi),
      await this.DAi.CreateThenShowByActorAsync(t));
  }
  BindOnWaitInput(t) {
    this.EAi = t;
  }
  async AAi() {
    const t = this.GetItem(1)?.GetOwner();
    t &&
      ((this.RAi = new KeySettingRowTypeItem_1.KeySettingRowTypeItem()),
      await this.RAi.CreateThenShowByActorAsync(t));
  }
  GetUsingItem(t) {
    switch (t.GetRowType()) {
      case 1:
        return this.GetItem(1).GetOwner();
      case 2:
        return this.GetItem(2).GetOwner();
      default:
    }
  }
  SetSelected(t) {
    this.DAi?.SetSelected(t);
  }
  SetDetailItemVisible(t) {
    this.DAi?.SetDetailItemVisible(t), this.fRt(t);
  }
  fRt(t) {
    this.GetExtendToggle(0)?.SetToggleState(t ? 1 : 0);
  }
}
exports.KeySettingRowContainerItem = KeySettingRowContainerItem;
// # sourceMappingURL=KeySettingRowContainerItem.js.map
