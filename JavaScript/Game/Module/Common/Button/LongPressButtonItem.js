"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressButtonItem = void 0);
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiComponentUtil_1 = require("../../Util/UiComponentUtil"),
  DRAG_TOLERANCE = 200,
  ONE_SECOND_TO_MILLISECOND = 1e3,
  LONG_PRESS_AUDIO_EVENT = "play_ui_com_slider_tick";
class LongPressButtonItem {
  constructor(i, t, s = void 0) {
    (this.tTt = void 0),
      (this.Lo = void 0),
      (this.wut = !1),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.rut = 0),
      (this.e8 = 0),
      (this.dz_ = 0),
      (this.iTt = !1),
      (this.OverriddenLongPressAudioEvent = void 0),
      (this.ShouldPlayLongPressSound = !1),
      (this.oTt = void 0),
      (this.rTt = void 0),
      (this.nTt = void 0),
      (this.sTt = void 0),
      (this.aTt = void 0),
      (this.hTt = Vector_1.Vector.Create()),
      (this.lTt = Vector_1.Vector.Create()),
      (this._Tt = void 0),
      (this.uTt = (i) => {
        i || (this.wut = !1);
      }),
      (this.r6 = (i) => {
        this.mz_(i) || (this.fz_(i), this.gz_(i));
      }),
      i && this.Initialize(i, s),
      t && this.Activate(t);
  }
  Initialize(i, t = void 0, s = void 0, h = void 0, e = void 0) {
    (this.tTt = i),
      this.tTt.OnPointDownCallBack.Bind(() => {
        (this.iTt = !0),
          (this.wut = !0),
          this.hTt.DeepCopy(
            LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
              0,
            ),
          ),
          this.rTt && this.rTt();
      }),
      this.tTt.OnPointCancelCallBack.Bind(() => {
        (this.wut = !1), (this.rut = 0), (this.e8 = 0), this.sTt && this.sTt();
      }),
      this.tTt.OnPointUpCallBack.Bind(() => {
        (this.wut = !1), this.nTt && this.nTt();
      }),
      this.tTt.OnSelfInteractiveChanged.Bind(this.uTt),
      (this.oTt = t),
      (this.rTt = s),
      (this.nTt = h),
      (this.sTt = e),
      this.CTt();
  }
  Activate(i) {
    (this.Lo =
      ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(i)),
      (this.sKe = TickSystem_1.TickSystem.Add(
        this.r6,
        "LongPressComponent",
        0,
        !0,
      ).Id),
      (this.wut = !1);
  }
  Deactivate() {
    (this.wut = !1),
      this.sKe !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.sKe),
        (this.sKe = TickSystem_1.TickSystem.InvalidId));
  }
  IsActivate() {
    return (
      this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Has(this.sKe)
    );
  }
  CTt() {
    (this._Tt = this.tTt.GetOwner().GetName()),
      UiComponentUtil_1.UiComponentUtil.BindAudioEvent(this.tTt);
  }
  gTt() {
    StringUtils_1.StringUtils.IsBlank(this._Tt ?? "") ||
      UiComponentUtil_1.UiComponentUtil.UnBindAudioEventByName(this._Tt);
  }
  cTt() {
    return this.aTt?.() ?? !0;
  }
  mTt() {
    return (
      this.lTt.DeepCopy(
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
          0,
        ),
      ),
      this.hTt.Subtraction(this.lTt, this.lTt),
      this.lTt.SizeSquared() >= DRAG_TOLERANCE * DRAG_TOLERANCE
    );
  }
  mz_(i) {
    return this.wut
      ? this.cTt()
        ? this.mTt()
          ? ((this.wut = !1), (this.rut = 0), (this.e8 = 0), !(this.dz_ = 0))
          : ((this.rut += i),
            this.rut < this.Lo.PressTime[0] ||
              (!!this.iTt && ((this.iTt = !1), this.oTt?.(!0), !0)))
        : ((this.rut = 1), !0)
      : (this.rut < this.Lo.PressTime[0] && 0 < this.rut && this.oTt?.(!0),
        (this.rut = 0),
        (this.e8 = 0),
        !(this.dz_ = 0));
  }
  fz_(i) {
    this.e8 += i;
    i = this.dTt();
    this.e8 < i || ((this.e8 -= i), this.oTt?.(!1));
  }
  gz_(i) {
    this.ShouldPlayLongPressSound &&
      ((this.dz_ += i),
      (i = this.dTt()),
      (i = Math.max(i, this.Lo.AudioIntervalLimit)),
      this.dz_ >= i) &&
      (AudioSystem_1.AudioSystem.PostEvent(
        this.OverriddenLongPressAudioEvent ?? LONG_PRESS_AUDIO_EVENT,
      ),
      (this.dz_ -= i));
  }
  dTt() {
    var t = this.Lo.PressTime.length;
    for (let i = 1; i < t; ++i)
      if (this.rut < this.Lo.PressTime[i]) {
        const s = this.Lo.TriggerTime[i - 1];
        return ONE_SECOND_TO_MILLISECOND / s;
      }
    const s = this.Lo.TriggerTime[t - 1];
    return ONE_SECOND_TO_MILLISECOND / s;
  }
  SetTickConditionDelegate(i) {
    this.aTt = i;
  }
  SetInteractive(i) {
    this.tTt.SetSelfInteractive(i);
  }
  SetActive(i) {
    this.tTt.RootUIComp.SetUIActive(i);
  }
  Clear() {
    this.Deactivate(),
      this.tTt &&
        (this.tTt.OnPointDownCallBack.Unbind(),
        this.tTt.OnPointCancelCallBack.Unbind(),
        this.tTt.OnPointUpCallBack.Unbind(),
        this.tTt.OnSelfInteractiveChanged.Unbind()),
      this.gTt(),
      (this.tTt = void 0),
      (this.oTt = void 0),
      (this.rTt = void 0),
      (this.nTt = void 0);
  }
}
exports.LongPressButtonItem = LongPressButtonItem;
//# sourceMappingURL=LongPressButtonItem.js.map
