"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongPressButtonItem = void 0);
const TickSystem_1 = require("../../../../Core/Tick/TickSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LguiEventSystemManager_1 = require("../../../Ui/LguiEventSystem/LguiEventSystemManager");
const UiComponentUtil_1 = require("../../Util/UiComponentUtil");
const DRAG_TOLERANCE = 200;
const ONE_SECOND_TO_MILLISECOND = 1e3;
class LongPressButtonItem {
  constructor(t, i, s = void 0) {
    (this.Xyt = void 0),
      (this.Lo = void 0),
      (this.f_t = !1),
      (this.Xje = TickSystem_1.TickSystem.InvalidId),
      (this.K1t = 0),
      (this.e8 = 0),
      (this.$yt = !1),
      (this.Yyt = void 0),
      (this.Jyt = void 0),
      (this.zyt = void 0),
      (this.Zyt = void 0),
      (this.eIt = void 0),
      (this.tIt = Vector_1.Vector.Create()),
      (this.iIt = Vector_1.Vector.Create()),
      (this.oIt = void 0),
      (this.rIt = (t) => {
        t || (this.f_t = !1);
      }),
      (this.r6 = (t) => {
        this.f_t
          ? this.nIt()
            ? this.sIt()
              ? ((this.f_t = !1), (this.K1t = 0), (this.e8 = 0))
              : ((this.K1t += t),
                this.K1t < this.Lo.PressTime[0] ||
                  (this.$yt
                    ? ((this.$yt = !1), this.Yyt?.(!0))
                    : ((this.e8 += t),
                      (t = this.aIt()),
                      this.e8 < t || ((this.e8 -= t), this.Yyt?.(!1)))))
            : (this.K1t = 1)
          : (this.K1t < this.Lo.PressTime[0] && this.K1t > 0 && this.Yyt?.(!0),
            (this.K1t = 0),
            (this.e8 = 0));
      }),
      t && this.Initialize(t, s),
      i && this.Activate(i);
  }
  Initialize(t, i = void 0, s = void 0, h = void 0, e = void 0) {
    (this.Xyt = t),
      this.Xyt.OnPointDownCallBack.Bind(() => {
        (this.$yt = !0),
          (this.f_t = !0),
          this.tIt.DeepCopy(
            LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
              0,
            ),
          ),
          this.Jyt && this.Jyt();
      }),
      this.Xyt.OnPointCancelCallBack.Bind(() => {
        (this.f_t = !1), (this.K1t = 0), (this.e8 = 0), this.Zyt && this.Zyt();
      }),
      this.Xyt.OnPointUpCallBack.Bind(() => {
        (this.f_t = !1), this.zyt && this.zyt();
      }),
      this.Xyt.OnSelfInteractiveChanged.Bind(this.rIt),
      (this.Yyt = i),
      (this.Jyt = s),
      (this.zyt = h),
      (this.Zyt = e),
      this.hIt();
  }
  Activate(t) {
    (this.Lo =
      ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(t)),
      (this.Xje = TickSystem_1.TickSystem.Add(
        this.r6,
        "LongPressComponent",
        0,
        !0,
      ).Id),
      (this.f_t = !1);
  }
  Deactivate() {
    (this.f_t = !1),
      this.Xje !== TickSystem_1.TickSystem.InvalidId &&
        (TickSystem_1.TickSystem.Remove(this.Xje),
        (this.Xje = TickSystem_1.TickSystem.InvalidId));
  }
  IsActivate() {
    return (
      this.Xje !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Has(this.Xje)
    );
  }
  hIt() {
    (this.oIt = this.Xyt.GetOwner().GetName()),
      UiComponentUtil_1.UiComponentUtil.BindAudioEvent(this.Xyt);
  }
  lIt() {
    StringUtils_1.StringUtils.IsBlank(this.oIt ?? "") ||
      UiComponentUtil_1.UiComponentUtil.UnBindAudioEventByName(this.oIt);
  }
  nIt() {
    return this.eIt?.() ?? !0;
  }
  sIt() {
    return (
      this.iIt.DeepCopy(
        LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventDataPosition(
          0,
        ),
      ),
      this.tIt.Subtraction(this.iIt, this.iIt),
      this.iIt.SizeSquared() >= DRAG_TOLERANCE * DRAG_TOLERANCE
    );
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
  SetTickConditionDelegate(t) {
    this.eIt = t;
  }
  SetInteractive(t) {
    this.Xyt.SetSelfInteractive(t);
  }
  SetActive(t) {
    this.Xyt.RootUIComp.SetUIActive(t);
  }
  Clear() {
    this.Deactivate(),
      this.Xyt &&
        (this.Xyt.OnPointDownCallBack.Unbind(),
        this.Xyt.OnPointCancelCallBack.Unbind(),
        this.Xyt.OnPointUpCallBack.Unbind(),
        this.Xyt.OnSelfInteractiveChanged.Unbind()),
      this.lIt(),
      (this.Xyt = void 0),
      (this.Yyt = void 0),
      (this.Jyt = void 0),
      (this.zyt = void 0);
  }
}
exports.LongPressButtonItem = LongPressButtonItem;
// # sourceMappingURL=LongPressButtonItem.js.map
