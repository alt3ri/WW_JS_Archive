"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressButtonItem = void 0);
const TickSystem_1 = require("../../../../Core/Tick/TickSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  UiComponentUtil_1 = require("../../Util/UiComponentUtil"),
  DRAG_TOLERANCE = 200,
  ONE_SECOND_TO_MILLISECOND = 1e3;
class LongPressButtonItem {
  constructor(t, i, s = void 0) {
    (this.tTt = void 0),
      (this.Lo = void 0),
      (this.wut = !1),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.rut = 0),
      (this.e8 = 0),
      (this.iTt = !1),
      (this.oTt = void 0),
      (this.rTt = void 0),
      (this.nTt = void 0),
      (this.sTt = void 0),
      (this.aTt = void 0),
      (this.hTt = Vector_1.Vector.Create()),
      (this.lTt = Vector_1.Vector.Create()),
      (this._Tt = void 0),
      (this.uTt = (t) => {
        t || (this.wut = !1);
      }),
      (this.r6 = (t) => {
        this.wut
          ? this.cTt()
            ? this.mTt()
              ? ((this.wut = !1), (this.rut = 0), (this.e8 = 0))
              : ((this.rut += t),
                this.rut < this.Lo.PressTime[0] ||
                  (this.iTt
                    ? ((this.iTt = !1), this.oTt?.(!0))
                    : ((this.e8 += t),
                      (t = this.dTt()),
                      this.e8 < t || ((this.e8 -= t), this.oTt?.(!1)))))
            : (this.rut = 1)
          : (this.rut < this.Lo.PressTime[0] && 0 < this.rut && this.oTt?.(!0),
            (this.rut = 0),
            (this.e8 = 0));
      }),
      t && this.Initialize(t, s),
      i && this.Activate(i);
  }
  Initialize(t, i = void 0, s = void 0, h = void 0, e = void 0) {
    (this.tTt = t),
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
      (this.oTt = i),
      (this.rTt = s),
      (this.nTt = h),
      (this.sTt = e),
      this.CTt();
  }
  Activate(t) {
    (this.Lo =
      ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(t)),
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
  SetTickConditionDelegate(t) {
    this.aTt = t;
  }
  SetInteractive(t) {
    this.tTt.SetSelfInteractive(t);
  }
  SetActive(t) {
    this.tTt.RootUIComp.SetUIActive(t);
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
