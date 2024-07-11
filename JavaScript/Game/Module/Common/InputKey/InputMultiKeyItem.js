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
      (this.sUt = void 0),
      (this.aUt = void 0),
      (this.hUt = void 0),
      (this.lUt = void 0),
      (this.vq = !1),
      (this._Ut = !0),
      (this.uUt = !0),
      (this.RIt = void 0),
      (this.dKe = (e, s, t, i) => {
        e !== i && this.lUt && this.cUt(this.lUt);
      }),
      (this.c_t = (e) => {
        this.lUt && this.lUt.ActionOrAxisName === e && this.cUt(this.lUt);
      }),
      (this.m_t = (e) => {
        this.lUt && this.lUt.ActionOrAxisName === e && this.cUt(this.lUt);
      }),
      (this._Ut = e),
      (this.uUt = s),
      (this.RIt = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.sUt = new InputKeyItem_1.InputKeyItem(
      void 0 !== this.RIt ? this.RIt + "_1" : void 0,
    )),
      (this.aUt = new InputKeyItem_1.InputKeyItem(
        void 0 !== this.RIt ? this.RIt + "_2" : void 0,
      )),
      await Promise.all([
        this.sUt.CreateByActorAsync(this.GetItem(1).GetOwner(), !0),
        this.aUt.CreateByActorAsync(this.GetItem(2).GetOwner(), !0),
      ]);
  }
  OnStart() {
    this.hUt = new InputKeyDisplayData_1.InputKeyDisplayData();
  }
  OnBeforeDestroy() {
    this.hUt?.Reset(), (this.sUt = void 0), (this.aUt = void 0);
  }
  OnBeforeShow() {
    this._Ut &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      this.uUt &&
        (EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnActionKeyChanged,
          this.c_t,
        ),
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.OnAxisKeyChanged,
          this.m_t,
        )),
      this.lUt && this.cUt(this.lUt);
  }
  OnAfterHide() {
    this._Ut &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.dKe,
      ),
      this.uUt &&
        (EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnActionKeyChanged,
          this.c_t,
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnAxisKeyChanged,
          this.m_t,
        ));
  }
  RefreshByKeyList(e, s) {
    this.mUt(e, s), (this.lUt = void 0);
  }
  mUt(e, s, t) {
    e && (this.sUt?.Refresh(e), this.sUt?.SetActive(!0)), (e = this.GetText(0));
    s
      ? (this.aUt?.Refresh(s),
        this.aUt?.SetActive(!0),
        e.SetText(t ?? "+"),
        e.SetUIActive(!0))
      : (e.SetUIActive(!1), this.aUt?.SetActive(!1));
  }
  RefreshByKey(e) {
    this.dUt(e), (this.lUt = void 0);
  }
  dUt(e) {
    this.sUt?.Refresh(e),
      this.GetText(0)?.SetUIActive(!1),
      this.aUt?.SetActive(!1);
  }
  RefreshByActionOrAxis(e) {
    (this.lUt = e), this.cUt(e);
  }
  cUt(s) {
    if (this.hUt) {
      var t,
        i = s.ActionOrAxisName;
      this.hUt.Reset();
      let e =
        InputSettingsManager_1.InputSettingsManager.GetActionKeyDisplayData(
          this.hUt,
          i,
        );
      (e =
        e ||
        InputSettingsManager_1.InputSettingsManager.GetAxisKeyDisplayData(
          this.hUt,
          i,
        )) &&
        ((i = s.Index ?? 0),
        !(i = this.hUt.GetDisplayKeyNameList(i)) ||
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
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId,
            }),
            this.mUt(t)),
          2 === i.length &&
            ((t = { KeyName: i[0] }),
            (i = {
              KeyName: i[1],
              LongPressTime: s.LongPressTime,
              IsLongPressProcessVisible: s.IsLongPressProcessVisible,
              IsShowLongPressWhenPress: s.IsShowLongPressWhenPress,
              IsShowLongPressWhenRelease: s.IsShowLongPressWhenRelease,
              IsTextArrowVisible: s.IsTextArrowVisible,
              IsShowTextArrowWhenPress: s.IsShowTextArrowWhenPress,
              IsShowTextArrowWhenRelease: s.IsShowTextArrowWhenRelease,
              DescriptionId: s.DescriptionId,
            }),
            this.mUt(t, i, s.LinkString))));
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
    this.lUt && (this.lUt.IsLongPressDisable = e),
      this.sUt?.SetLongPressDisable(e),
      this.aUt?.SetLongPressDisable(e);
  }
  SetLongPressTime(e) {
    this.sUt?.SetLongPressTime(e),
      this.aUt?.SetLongPressTime(e),
      this.lUt && (this.lUt.LongPressTime = e);
  }
  Reset() {
    this.sUt?.DeactivateLongPress(), this.aUt?.DeactivateLongPress();
  }
}
exports.InputMultiKeyItem = InputMultiKeyItem;
//# sourceMappingURL=InputMultiKeyItem.js.map
