"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputMultiKeyItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputKeyDisplayData_1 = require("../../../InputSettings/InputKeyDisplayData"),
  InputSettingsManager_1 = require("../../../InputSettings/InputSettingsManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InputKeyDefine_1 = require("./InputKeyDefine"),
  InputKeyItem_1 = require("./InputKeyItem");
class InputMultiKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor(e = !0, s = !0, t) {
    super(),
      (this._At = void 0),
      (this.uAt = void 0),
      (this.cAt = void 0),
      (this.mAt = void 0),
      (this.vq = !1),
      (this.dAt = !0),
      (this.CAt = !0),
      (this.wTt = void 0),
      (this.XBo = () => {
        this.mAt && this.gAt(this.mAt);
      }),
      (this.Dut = (e) => {
        this.mAt && this.mAt.ActionOrAxisName === e && this.gAt(this.mAt);
      }),
      (this.Rut = (e) => {
        this.mAt && this.mAt.ActionOrAxisName === e && this.gAt(this.mAt);
      }),
      (this.dAt = e),
      (this.CAt = s),
      (this.wTt = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this._At = new InputKeyItem_1.InputKeyItem(
      void 0 !== this.wTt ? this.wTt + "_1" : void 0,
    )),
      (this.uAt = new InputKeyItem_1.InputKeyItem(
        void 0 !== this.wTt ? this.wTt + "_2" : void 0,
      )),
      await Promise.all([
        this._At.CreateByActorAsync(this.GetItem(1).GetOwner(), !0),
        this.uAt.CreateByActorAsync(this.GetItem(2).GetOwner(), !0),
      ]);
  }
  OnStart() {
    this.cAt = new InputKeyDisplayData_1.InputKeyDisplayData();
  }
  OnBeforeDestroy() {
    this.cAt?.Reset(), (this._At = void 0), (this.uAt = void 0);
  }
  OnBeforeShow() {
    this.dAt &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      this.CAt &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnActionKeyChanged,
          this.Dut,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAxisKeyChanged,
          this.Rut,
        )),
      this.mAt && this.gAt(this.mAt);
  }
  OnAfterHide() {
    this.dAt &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.XBo,
      ),
      this.CAt &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnActionKeyChanged,
          this.Dut,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnAxisKeyChanged,
          this.Rut,
        ));
  }
  RefreshByKeyList(e, s) {
    this.fAt(e, s), (this.mAt = void 0);
  }
  fAt(e, s, t) {
    e && (this._At?.Refresh(e), this._At?.SetActive(!0)), (e = this.GetText(0));
    s
      ? (this.uAt?.Refresh(s),
        this.uAt?.SetActive(!0),
        e.SetText(t ?? "+"),
        e.SetUIActive(!0))
      : (e.SetUIActive(!1), this.uAt?.SetActive(!1));
  }
  RefreshByKey(e) {
    this.pAt(e), (this.mAt = void 0);
  }
  pAt(e) {
    this._At?.Refresh(e),
      this.GetText(0)?.SetUIActive(!1),
      this.uAt?.SetActive(!1);
  }
  RefreshByActionOrAxis(e) {
    (this.mAt = e), this.gAt(e);
  }
  gAt(s) {
    if (this.cAt) {
      var t,
        i = s.ActionOrAxisName;
      this.cAt.Reset();
      let e =
        InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
          this.cAt,
          i,
        );
      (e =
        e ||
        InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(
          this.cAt,
          i,
        )) &&
        ((i = s.Index ?? 0),
        !(i = this.cAt.GetDisplayKeyNameList(i)) ||
          i.length <= 0 ||
          (1 === i.length &&
            ((t = {
              KeyName: i[0],
              IsLongPressDisable: s.IsLongPressDisable,
              LongPressTime: s.LongPressTime,
              DelayPressTime: s.DelayPressTime,
              IsLongPressProcessVisible: s.IsLongPressProcessVisible,
              IsShowLongPressWhenPress: s.IsShowLongPressWhenPress,
              IsShowLongPressWhenRelease: s.IsShowLongPressWhenRelease,
              IsTextArrowVisible: s.IsTextArrowVisible,
              IsUpArrowVisible: s.IsUpArrowVisible,
              IsDownArrowVisible: s.IsDownArrowVisible,
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId,
            }),
            this.fAt(t)),
          2 === i.length &&
            ((t = { KeyName: i[0] }),
            (i = {
              KeyName: i[1],
              LongPressTime: s.LongPressTime,
              IsLongPressProcessVisible: s.IsLongPressProcessVisible,
              IsShowLongPressWhenPress: s.IsShowLongPressWhenPress,
              IsShowLongPressWhenRelease: s.IsShowLongPressWhenRelease,
              IsTextArrowVisible: s.IsTextArrowVisible,
              IsUpArrowVisible: s.IsUpArrowVisible,
              IsDownArrowVisible: s.IsDownArrowVisible,
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId,
            }),
            this.fAt(t, i, s.LinkString))));
    }
  }
  SetEnable(e, s = !1) {
    (this.vq === e && !s) ||
      (e
        ? this.RootItem.SetAlpha(1)
        : this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
      (this.vq = e));
  }
  SetLongPressDisable(e) {
    this.mAt && (this.mAt.IsLongPressDisable = e),
      this._At?.SetLongPressDisable(e),
      this.uAt?.SetLongPressDisable(e);
  }
  SetLongPressTime(e) {
    this._At?.SetLongPressTime(e),
      this.uAt?.SetLongPressTime(e),
      this.mAt && (this.mAt.LongPressTime = e);
  }
  ResetLongPress() {
    this._At?.ResetLongPress(), this.uAt?.ResetLongPress();
  }
}
exports.InputMultiKeyItem = InputMultiKeyItem;
//# sourceMappingURL=InputMultiKeyItem.js.map
