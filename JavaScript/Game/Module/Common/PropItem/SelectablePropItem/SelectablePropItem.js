"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropItem = void 0);
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SelectablePropItemBase_1 = require("./SelectablePropItemBase"),
  ONE_SECOND_TO_MILLISECOND = 1e3;
class SelectablePropItem extends SelectablePropItemBase_1.SelectablePropItemBase {
  constructor() {
    super(...arguments),
      (this.ShowItemTipsFunction = void 0),
      (this.AddFunction = void 0),
      (this.ReduceFunction = void 0),
      (this.GetSelectedNumber = void 0),
      (this.GetSelectedSpriteActive = void 0),
      (this.GetGraySpriteActive = void 0),
      (this.PromptFunction = void 0),
      (this.CheckEnableFunction = void 0),
      (this.HideSelectNumberStateFunction = void 0),
      (this.sKe = 0),
      (this.wBt = !1),
      (this.BBt = !1),
      (this.e8 = 0),
      (this.rut = 0),
      (this.H5e = void 0),
      (this.bBt = !1),
      (this.qBt = !1),
      (this.GBt = !0),
      (this.Mne = 1),
      (this.Lo = void 0),
      (this.IsSelectableProp = !0),
      (this.NBt = (t) => {
        this.wBt = !0;
      }),
      (this.OBt = (t) => {
        (this.CheckEnableFunction &&
          !this.CheckEnableFunction(this.PropData, this.GridIndex)) ||
          this.bBt ||
          this.kBt(),
          (this.bBt = !1),
          (this.wBt = !1);
      }),
      (this.FBt = (t) => {
        1 ===
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)
            .inputType &&
          (this.ShowItemTipsFunction?.(this.PropData, this.GridIndex),
          this.ScrollViewDelegate) &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          );
      }),
      (this.Lke = () => {
        var t = this.H5e.GetToggleState(),
          i = this.GetSelectedNumber?.(this.PropData) ?? 0;
        return !((0 < i && 1 === t) || (i <= 0 && 0 === t));
      }),
      (this.VBt = () => {
        this.BBt = !0;
      }),
      (this.HBt = () => {
        this.CheckEnableFunction &&
        !this.CheckEnableFunction(this.PropData, this.GridIndex)
          ? ((this.bBt = !1), (this.wBt = !1))
          : (this.qBt || this.jBt(), (this.qBt = !1), (this.BBt = !1));
      }),
      (this.r6 = (t) => {
        this.LDe(t);
      });
  }
  SetPressConfig(t = 1) {
    this.Mne = t;
  }
  kBt() {
    var t;
    return (
      this.PromptFunction && this.PromptFunction(this.PropData, this.GridIndex),
      !!this.AddFunction &&
        ((t = this.AddFunction(this.PropData, this.GridIndex)) && this.WBt(),
        this.ScrollViewDelegate &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          ),
        t)
    );
  }
  jBt() {
    var t;
    return (
      !!this.ReduceFunction &&
      ((t = this.ReduceFunction(this.PropData, this.GridIndex)) &&
        (this.WBt(), this.KBt()),
      this.ScrollViewDelegate &&
        this.ScrollViewDelegate.SelectGridProxy(
          this.GridIndex,
          this.DisplayIndex,
          !1,
        ),
      t)
    );
  }
  OnStart() {
    this.GetControlItem()?.SetUIActive(!1),
      (this.H5e = this.GetSelectableToggle()),
      this.H5e.OnPointDownCallBack.Bind(this.NBt),
      this.H5e.OnPointUpCallBack.Bind(this.OBt),
      this.H5e.OnPointEnterCallBack.Bind(this.FBt),
      this.H5e.CanExecuteChange.Bind(this.Lke);
    var t = this.GetReduceButton();
    t.RootUIComp.SetUIActive(this.GBt),
      t.OnPointDownCallBack.Bind(this.VBt),
      t.OnPointUpCallBack.Bind(this.HBt),
      (this.Lo = ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(
        this.Mne,
      )),
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.r6,
        "SelectablePropItem",
        0,
        !0,
      ).Id);
  }
  LDe(t) {
    this.wBt || this.BBt
      ? LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)
          .isDragging
        ? ((this.bBt = this.wBt),
          (this.qBt = this.BBt),
          (this.rut = 0),
          (this.e8 = 0))
        : ((this.rut += t),
          this.rut < this.Lo.PressTime[0] ||
            ((this.e8 += t), (t = this.dTt()), this.e8 < t) ||
            ((this.e8 -= t), this.oTt(!1)))
      : (this.rut < this.Lo.PressTime[0] && 0 < this.rut && this.oTt(!0),
        (this.rut = 0),
        (this.e8 = 0));
  }
  dTt() {
    var i = this.Lo.PressTime.length;
    for (let t = 1; t < i; ++t)
      if (this.rut < this.Lo.PressTime[t]) {
        const s = this.Lo.TriggerTime[t - 1];
        return ONE_SECOND_TO_MILLISECOND / s;
      }
    const s = this.Lo.TriggerTime[i - 1];
    return ONE_SECOND_TO_MILLISECOND / s;
  }
  oTt(t) {
    this.wBt && ((this.bBt = !0), (this.wBt = this.kBt())),
      this.BBt && ((this.qBt = !0), (this.BBt = this.jBt()));
  }
  WBt() {
    var t;
    this.HideSelectNumberStateFunction
      ? this.SetControllerState(
          this.HideSelectNumberStateFunction(this.PropData, this.GridIndex),
        )
      : 0 < (t = this.GetSelectedNumber?.(this.PropData) ?? 0)
        ? (this.SetControllerState(!0),
          this.GetSelectNumberText() &&
            LguiUtil_1.LguiUtil.SetLocalText(
              this.GetSelectNumberText(),
              "RoleExp",
              t,
              this.PropData.Count,
            ))
        : this.SetControllerState(!1);
  }
  SetControllerState(t) {
    var i = this.GetControlItem(),
      s = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(
        this.PropData,
      )[0];
    s
      ? (i?.SetUIActive(t),
        t &&
          ((t = 1 === s.GetMaxStackCount()),
          this.GetFinishSelectItem()?.SetUIActive(t)))
      : i?.SetUIActive(!1);
  }
  Oqe() {
    0 < (this.GetSelectedNumber?.(this.PropData) ?? 0)
      ? this.EUt(1)
      : this.EUt(0);
  }
  EUt(t) {
    this.H5e.SetToggleState(t);
  }
  QBt() {
    this.WBt(), this.GetSelectItem()?.SetUIActive(!1);
  }
  KBt() {
    (this.GetSelectedNumber?.(this.PropData) ?? 0) <= 0 && this.EUt(0);
  }
  OnBeforeDestroy() {
    var t = this.GetSelectableToggle(),
      t =
        (t?.OnPointDownCallBack.Unbind(),
        t?.OnPointUpCallBack.Unbind(),
        t?.CanExecuteChange.Unbind(),
        this.GetReduceButton());
    t?.OnPointDownCallBack.Unbind(),
      t?.OnPointUpCallBack.Unbind(),
      this.sKe !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.sKe),
        (this.sKe = TickSystem_1.TickSystem.InvalidId));
  }
  OnRefresh(t, i) {
    this.WBt(), this.Oqe();
    var s = this.GetSelectedSpriteActive?.(this.PropData, this.GridIndex) ?? !1,
      s =
        (this.GetSelectItem()?.SetUIActive(s),
        this.GetGraySpriteActive?.(this.PropData, this.GridIndex) ?? !1);
    this.GetItem(16) && this.GetItem(16).SetUIActive(s);
  }
  OnSelected(t) {
    this.GetSelectItem()?.SetUIActive(!0);
  }
  OnDeselected(t) {
    this.QBt();
  }
  Clear() {
    this.KBt(), this.QBt();
  }
  SetShowItemTipsFunction(t) {
    this.ShowItemTipsFunction = t;
  }
  SetAddFunction(t) {
    this.AddFunction = t;
  }
  SetReduceFunction(t) {
    this.ReduceFunction = t;
  }
  SetSelectedNumber(t) {
    this.GetSelectedNumber = t;
  }
  SetSelectedSpriteActive(t) {
    this.GetSelectedSpriteActive = t;
  }
  SetGraySpriteActive(t) {
    this.GetGraySpriteActive = t;
  }
  SetReduceButtonActive(t) {
    this.GBt = t;
  }
  SetPromptFunction(t) {
    this.PromptFunction = t;
  }
  SetCheckEnableFunction(t) {
    this.CheckEnableFunction = t;
  }
  SetHideSelectNumberStateFunction(t) {
    this.HideSelectNumberStateFunction = t;
  }
}
exports.SelectablePropItem = SelectablePropItem;
//# sourceMappingURL=SelectablePropItem.js.map
