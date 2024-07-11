"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropItem = void 0);
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SelectablePropItemBase_1 = require("./SelectablePropItemBase");
const ONE_SECOND_TO_MILLISECOND = 1e3;
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
      (this.Xje = 0),
      (this.Awt = !1),
      (this.Pwt = !1),
      (this.e8 = 0),
      (this.K1t = 0),
      (this.R4e = void 0),
      (this.xwt = !1),
      (this.wwt = !1),
      (this.Bwt = !0),
      (this.Mne = 1),
      (this.Lo = void 0),
      (this.IsSelectableProp = !0),
      (this.bwt = (t) => {
        this.Awt = !0;
      }),
      (this.qwt = (t) => {
        (this.CheckEnableFunction &&
          !this.CheckEnableFunction(this.PropData, this.GridIndex)) ||
          this.xwt ||
          this.Gwt(),
          (this.xwt = !1),
          (this.Awt = !1);
      }),
      (this.Nwt = (t) => {
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)
          .inputType === 1 &&
          (this.ShowItemTipsFunction?.(this.PropData, this.GridIndex),
          this.ScrollViewDelegate) &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          );
      }),
      (this.T7e = () => {
        const t = this.R4e.GetToggleState();
        const i = this.GetSelectedNumber?.(this.PropData) ?? 0;
        return !((i > 0 && t === 1) || (i <= 0 && t === 0));
      }),
      (this.Owt = () => {
        this.Pwt = !0;
      }),
      (this.kwt = () => {
        this.CheckEnableFunction &&
        !this.CheckEnableFunction(this.PropData, this.GridIndex)
          ? ((this.xwt = !1), (this.Awt = !1))
          : (this.wwt || this.Fwt(), (this.wwt = !1), (this.Pwt = !1));
      }),
      (this.r6 = (t) => {
        this.LDe(t);
      });
  }
  SetPressConfig(t = 1) {
    this.Mne = t;
  }
  Gwt() {
    let t;
    return (
      this.PromptFunction && this.PromptFunction(this.PropData, this.GridIndex),
      !!this.AddFunction &&
        ((t = this.AddFunction(this.PropData, this.GridIndex)) && this.Vwt(),
        this.ScrollViewDelegate &&
          this.ScrollViewDelegate.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          ),
        t)
    );
  }
  Fwt() {
    let t;
    return (
      !!this.ReduceFunction &&
      ((t = this.ReduceFunction(this.PropData, this.GridIndex)) &&
        (this.Vwt(), this.Hwt()),
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
      (this.R4e = this.GetSelectableToggle()),
      this.R4e.OnPointDownCallBack.Bind(this.bwt),
      this.R4e.OnPointUpCallBack.Bind(this.qwt),
      this.R4e.OnPointEnterCallBack.Bind(this.Nwt),
      this.R4e.CanExecuteChange.Bind(this.T7e);
    const t = this.GetReduceButton();
    t.RootUIComp.SetUIActive(this.Bwt),
      t.OnPointDownCallBack.Bind(this.Owt),
      t.OnPointUpCallBack.Bind(this.kwt),
      (this.Lo = ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(
        this.Mne,
      )),
      (this.Xje = TickSystem_1.TickSystem.Add(
        this.r6,
        "SelectablePropItem",
        0,
        !0,
      ).Id);
  }
  LDe(t) {
    this.Awt || this.Pwt
      ? LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0)
          .isDragging
        ? ((this.xwt = this.Awt),
          (this.wwt = this.Pwt),
          (this.K1t = 0),
          (this.e8 = 0))
        : ((this.K1t += t),
          this.K1t < this.Lo.PressTime[0] ||
            ((this.e8 += t), (t = this.aIt()), this.e8 < t) ||
            ((this.e8 -= t), this.Yyt(!1)))
      : (this.K1t < this.Lo.PressTime[0] && this.K1t > 0 && this.Yyt(!0),
        (this.K1t = 0),
        (this.e8 = 0));
  }
  aIt() {
    const i = this.Lo.PressTime.length;
    for (let t = 1; t < i; ++t)
      if (this.K1t < this.Lo.PressTime[t]) {
        const s = this.Lo.TriggerTime[t - 1];
        return ONE_SECOND_TO_MILLISECOND / s;
      }
    const s = this.Lo.TriggerTime[i - 1];
    return ONE_SECOND_TO_MILLISECOND / s;
  }
  Yyt(t) {
    this.Awt && ((this.xwt = !0), (this.Awt = this.Gwt())),
      this.Pwt && ((this.wwt = !0), (this.Pwt = this.Fwt()));
  }
  Vwt() {
    let t;
    this.HideSelectNumberStateFunction
      ? this.SetControllerState(
          this.HideSelectNumberStateFunction(this.PropData, this.GridIndex),
        )
      : (t = this.GetSelectedNumber?.(this.PropData) ?? 0) > 0
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
    const i = this.GetControlItem();
    const s = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(
      this.PropData,
    )[0];
    s
      ? (i?.SetUIActive(t),
        t &&
          ((t = s.GetMaxStackCount() === 1),
          this.GetFinishSelectItem()?.SetUIActive(t)))
      : i?.SetUIActive(!1);
  }
  Oqe() {
    (this.GetSelectedNumber?.(this.PropData) ?? 0) > 0
      ? this.fRt(1)
      : this.fRt(0);
  }
  fRt(t) {
    this.R4e.SetToggleState(t);
  }
  jwt() {
    this.Vwt(), this.GetSelectItem()?.SetUIActive(!1);
  }
  Hwt() {
    (this.GetSelectedNumber?.(this.PropData) ?? 0) <= 0 && this.fRt(0);
  }
  OnBeforeDestroy() {
    var t = this.GetSelectableToggle();
    var t =
      (t?.OnPointDownCallBack.Unbind(),
      t?.OnPointUpCallBack.Unbind(),
      t?.CanExecuteChange.Unbind(),
      this.GetReduceButton());
    t?.OnPointDownCallBack.Unbind(),
      t?.OnPointUpCallBack.Unbind(),
      this.Xje !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.Xje),
        (this.Xje = TickSystem_1.TickSystem.InvalidId));
  }
  OnRefresh(t, i) {
    this.Vwt(), this.Oqe();
    var s = this.GetSelectedSpriteActive?.(this.PropData, this.GridIndex) ?? !1;
    var s =
      (this.GetSelectItem()?.SetUIActive(s),
      this.GetGraySpriteActive?.(this.PropData, this.GridIndex) ?? !1);
    this.GetItem(16) && this.GetItem(16).SetUIActive(s);
  }
  OnSelected(t) {
    this.GetSelectItem()?.SetUIActive(!0);
  }
  OnDeselected(t) {
    this.jwt();
  }
  Clear() {
    this.Hwt(), this.jwt();
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
    this.Bwt = t;
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
// # sourceMappingURL=SelectablePropItem.js.map
