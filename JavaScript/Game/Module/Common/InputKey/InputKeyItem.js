"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputKeyItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  InputSettings_1 = require("../../../InputSettings/InputSettings"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  PcAndGamepadProgressBar_1 = require("../../UiNavigation/KeyComponent/PcAndGamepadProgressBar"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  InputKeyDefine_1 = require("./InputKeyDefine");
class InputKeyItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.HEe = void 0),
      (this.XUt = void 0),
      (this.xut = void 0),
      (this.$Ut = void 0),
      (this.YUt = !1),
      (this.JUt = !1),
      (this.zUt = !1),
      (this.ZUt = !1),
      (this.eAt = void 0),
      (this.git = void 0),
      (this.tAt = 0),
      (this.vq = !1),
      (this.iAt = void 0),
      (this.oAt = !1),
      (this.UniqueId = void 0),
      (this.rAt = (t, i) => {
        this.oAt ||
          !this.xut ||
          this.xut <= 0 ||
          (this.HEe &&
            ((i = i.KeyName.toString()), this.HEe === i) &&
            (t
              ? this.$Ut && 0 < this.$Ut
                ? (this.iAt = TimerSystem_1.TimerSystem.Delay(() => {
                    this.nAt();
                  }, this.$Ut))
                : this.nAt()
              : this.sAt()));
      }),
      (this.aAt = () => {
        var t;
        !this.xut ||
          this.xut <= 0 ||
          ((t = this.tAt / this.xut),
          this.SetLongPressPercent(t),
          (this.tAt += TimerSystem_1.MIN_TIME));
      }),
      (this.UniqueId = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    (this.eAt = new PcAndGamepadProgressBar_1.PcAndGamepadProgressBar()),
      await this.eAt.Init(this.GetItem(3), this.GetItem(2));
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.rAt,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      );
  }
  OnAfterHide() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.OnInputAnyKey,
      this.rAt,
    ) &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
      );
  }
  OnBeforeDestroy() {
    (this.eAt = void 0), this.DeactivateLongPress();
  }
  nAt() {
    this.YUt && this.hAt(),
      this.SetLongPressProgressVisible(this.YUt),
      this.SetTextArrowVisible(this.zUt);
  }
  sAt() {
    this.DeactivateLongPress(),
      this.SetLongPressProgressVisible(this.JUt),
      this.SetTextArrowVisible(this.ZUt);
  }
  lAt() {
    this.iAt &&
      TimerSystem_1.TimerSystem.Has(this.iAt) &&
      TimerSystem_1.TimerSystem.Remove(this.iAt);
  }
  Refresh(t) {
    (this.HEe = t.KeyName),
      (this.oAt = !0 === t.IsLongPressDisable),
      (this.xut = t.LongPressTime),
      (this.$Ut = t.DelayPressTime),
      (this.YUt = !0 === t.IsShowLongPressWhenPress),
      (this.JUt = !0 === t.IsShowLongPressWhenRelease),
      (this.zUt = !0 === t.IsShowTextArrowWhenPress),
      (this.ZUt = !0 === t.IsShowTextArrowWhenRelease);
    var i = !0 === t.IsLongPressProcessVisible,
      s = !0 === t.IsTextArrowVisible,
      e = !0 === t.IsUpArrowVisible,
      h = !0 === t.IsDownArrowVisible,
      t = t.DescriptionId;
    this.SetKeyTexture(this.HEe),
      this.SetTextArrowVisible(s),
      this.SetUpArrowVisible(e),
      this.SetDownArrowVisible(h),
      this.SetDescription(t),
      this.DeactivateLongPress(),
      this.SetLongPressProgressVisible(i),
      i && this.SetLongPressPercent(0);
  }
  SetLongPressDisable(t) {
    this.oAt = t;
  }
  SetKeyTexture(t) {
    if (this.XUt !== t) {
      this.XUt = t;
      t = InputSettings_1.InputSettings.GetKeyIconPath(t);
      const i = this.GetTexture(0);
      t
        ? this.SetTextureByPath(t, i, void 0, () => {
            i.SetSizeFromTexture(), i.SetUIActive(!0);
          })
        : i?.SetUIActive(!1);
    }
  }
  SetLongPressTime(t) {
    this.xut = t;
  }
  SetLongPressPercent(t) {
    this.eAt?.SetPercent(Math.min(t, 1));
  }
  SetLongPressProgressVisible(t) {
    this.eAt?.SetProgressVisible(t);
  }
  SetTextArrowVisible(t) {
    this.GetTexture(5)?.SetUIActive(t);
  }
  SetUpArrowVisible(t) {
    this.GetTexture(6)?.SetUIActive(t);
  }
  SetDownArrowVisible(t) {
    this.GetTexture(7)?.SetUIActive(t);
  }
  SetDescription(t) {
    var i = this.GetText(4);
    t
      ? (LguiUtil_1.LguiUtil.SetLocalTextNew(i, t), i?.SetUIActive(!0))
      : i?.SetUIActive(!1);
  }
  hAt() {
    (this.tAt = 0),
      (this.git = TimerSystem_1.TimerSystem.Forever(
        this.aAt,
        TimerSystem_1.MIN_TIME,
      ));
  }
  DeactivateLongPress() {
    this.git &&
      TimerSystem_1.TimerSystem.Has(this.git) &&
      (TimerSystem_1.TimerSystem.Remove(this.git), (this.git = void 0)),
      (this.tAt = 0),
      this.lAt();
  }
  ResetLongPress() {
    this.DeactivateLongPress(),
      this.SetLongPressPercent(0),
      this.SetLongPressProgressVisible(!1);
  }
  SetEnable(t, i = !1) {
    (this.vq === t && !i) ||
      (t
        ? this.RootItem.SetAlpha(1)
        : this.RootItem.SetAlpha(InputKeyDefine_1.DISABLE_ALPHA),
      (this.vq = t));
  }
}
exports.InputKeyItem = InputKeyItem;
//# sourceMappingURL=InputKeyItem.js.map
