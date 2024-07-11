"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcController = void 0);
const Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PC_CHECK_RANGE = 6e3,
  PC_CHECK_RANGE_SQUARED = PC_CHECK_RANGE * PC_CHECK_RANGE,
  MOBILE_CHECK_RANGE = 3e3,
  MOBILE_CHECK_RANGE_SQUARED = MOBILE_CHECK_RANGE * MOBILE_CHECK_RANGE,
  DITHER_STEP = 0.33,
  DITHER_MAX = 1,
  DITHER_MIN = 0,
  MILLISECOND_TO_SECOND = 0.001;
class SimpleNpcController extends ControllerBase_1.ControllerBase {
  static get wir() {
    return 0 < this.Bir.size;
  }
  static OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("UiCommon", 28, "初始化SimpleNpcController"),
      this.OnAddEvents(),
      !0
    );
  }
  static OnClear() {
    return this.OnRemoveEvents(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnReceivePlayerVar,
      SimpleNpcController.bir,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeatherChange,
        SimpleNpcController.dIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQuality,
        SimpleNpcController.qir,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeatherChange,
      SimpleNpcController.dIe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQuality,
        SimpleNpcController.qir,
      );
  }
  static OnLeaveLevel() {
    return (
      this.Gir.clear(), this.Nir.clear(), this.Oir.clear(), this.kir.clear(), !0
    );
  }
  static Add(t) {
    this.Gir.add(t);
    var e = Global_1.Global.BaseCharacter;
    e && this.Fir(t, e.CharacterActorComponent.ActorLocationProxy, !1),
      this.CheckNpcShowState(t, !0),
      this.Vir(t);
  }
  static Remove(t) {
    this.Gir.delete(t),
      this.Nir.delete(t),
      this.Oir.delete(t),
      this.kir.delete(t);
  }
  static SetClearOutState(t, e) {
    let i = !1;
    if (
      (e && !this.Bir.has(t)
        ? (this.Bir.add(t), (i = !0))
        : !e && this.Bir.has(t) && (this.Bir.delete(t), (i = !0)),
      i)
    )
      for (const o of this.Nir)
        this.CheckNpcShowState(o, !0, !1), o.ChangeLogicRangeState(!1);
  }
  static OnTick(t) {
    this.Hir(t), this.jir(t);
  }
  static GetSimpleNpcListByRange(t) {
    var e = new Array(),
      i = Global_1.Global.BaseCharacter;
    if (i) {
      var o = t * t,
        r = i.CharacterActorComponent.ActorLocationProxy;
      for (const n of this.Gir) {
        var s = n.SelfLocationProxy;
        o < Vector_1.Vector.DistSquared(r, s) || e.push(n);
      }
    }
    return e;
  }
  static Wir() {
    Info_1.Info.IsPcOrGamepadPlatform()
      ? (this.Kir = PC_CHECK_RANGE_SQUARED)
      : (this.Kir = MOBILE_CHECK_RANGE_SQUARED),
      this.Qir();
  }
  static UpdateDistanceLogic() {
    var t = Global_1.Global.BaseCharacter;
    if (t) {
      this.gU || (this.Wir(), (this.gU = !0));
      var e = t.CharacterActorComponent.ActorLocationProxy;
      for (const i of this.Gir) this.Fir(i, e);
    }
  }
  static Fir(t, e, i = !0) {
    var o;
    t.IsNotUnload &&
      ((o = t.SelfLocationProxy),
      (e = Vector_1.Vector.DistSquared(e, o)) > this.Kir
        ? this.Xir(t, !1, i)
        : this.Xir(t, !0, i),
      (t.TempDistanceSquared = e));
  }
  static Xir(t, e, i = !0) {
    var o = t.IsInLogicRange;
    t.ChangeLogicRangeState(e),
      o !== e &&
        (t.SetTickEnabled(e),
        t.SetMainShadowEnabled(e),
        !o && e
          ? (this.Nir.add(t), i && this.CheckNpcShowState(t, !1))
          : o && !e && this.Nir.delete(t));
  }
  static $ir(t) {
    (t.CurDither = DITHER_MIN),
      (t.IsNotUnload = !0),
      t.SetDitherEffect(DITHER_MIN, 1),
      this.Oir.add(t),
      this.kir.delete(t);
  }
  static Yir(t) {
    (t.CurDither = DITHER_MAX),
      (t.IsNotUnload = !1),
      t.SetDitherEffect(DITHER_MAX, 1),
      this.kir.add(t),
      this.Oir.delete(t);
  }
  static Hir(e) {
    if (!(this.Oir.size <= 0)) {
      let t = void 0;
      for (const i of this.Oir)
        (i.CurDither += DITHER_STEP * e * MILLISECOND_TO_SECOND),
          (i.CurDither = MathUtils_1.MathUtils.Clamp(
            i.CurDither,
            DITHER_MIN,
            DITHER_MAX,
          )),
          i.SetDitherEffect(i.CurDither, 1),
          MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MAX) &&
            (t = void 0 === t ? [] : t).push(i);
      if (void 0 !== t) for (const o of t) this.Oir.delete(o);
    }
  }
  static jir(e) {
    if (!(this.kir.size <= 0)) {
      let t = void 0;
      for (const i of this.kir)
        (i.CurDither -= DITHER_STEP * e * MILLISECOND_TO_SECOND),
          (i.CurDither = MathUtils_1.MathUtils.Clamp(
            i.CurDither,
            DITHER_MIN,
            DITHER_MAX,
          )),
          i.SetDitherEffect(i.CurDither, 1),
          MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MIN) &&
            (t = void 0 === t ? [] : t).push(i);
      if (void 0 !== t) for (const o of t) this.kir.delete(o);
    }
  }
  static Jir(t, e) {
    (t.CurDither = e ? DITHER_MAX : DITHER_MIN),
      (t.IsNotUnload = e),
      t.SetDitherEffect(t.CurDither, 1),
      this.Oir.delete(t),
      this.kir.delete(t);
  }
  static CheckNpcShowState(t, e, i = !0) {
    var o = !this.wir && this.zir(t);
    (o && !t.IsLodShow) ||
      (i
        ? e
          ? o
            ? this.$ir(t)
            : this.Jir(t, o)
          : t.IsNotUnload && !o
            ? this.Yir(t)
            : !t.IsNotUnload && o && this.$ir(t)
        : this.Jir(t, o));
  }
  static zir(t) {
    var e = ModelManager_1.ModelManager.WeatherModel;
    if (!e) return !0;
    let i = !0;
    switch (e.CurrentWeatherId) {
      case 1:
        t.DisappearOnSunny && (i = !1);
        break;
      case 2:
        t.DisappearOnCloudy && (i = !1);
        break;
      case 3:
        t.DisappearOnRainy && (i = !1);
        break;
      case 4:
        t.DisappearOnThunderRain && (i = !1);
        break;
      case 5:
        t.DisappearOnSnowy && (i = !1);
    }
    return i;
  }
  static Zir() {
    for (const t of this.Gir)
      t.FilterFlowWorldState(
        ModelManager_1.ModelManager.WorldModel.WorldStateMap,
      );
  }
  static Qir() {
    for (const t of this.Gir) this.Vir(t);
  }
  static Vir(t) {
    t.IsLodShow
      ? t.IsNotUnload || this.$ir(t)
      : t.IsNotUnload && (this.Yir(t), t.ChangeLogicRangeState(!1));
  }
}
((exports.SimpleNpcController = SimpleNpcController).Gir = new Set()),
  (SimpleNpcController.Nir = new Set()),
  (SimpleNpcController.Oir = new Set()),
  (SimpleNpcController.kir = new Set()),
  (SimpleNpcController.Bir = new Set()),
  (SimpleNpcController.Kir = 0),
  (SimpleNpcController.gU = !1),
  (SimpleNpcController.dIe = () => {
    for (const t of SimpleNpcController.Nir)
      SimpleNpcController.CheckNpcShowState(t, !1);
  }),
  (SimpleNpcController.bir = () => {
    SimpleNpcController.Zir();
  }),
  (SimpleNpcController.qir = () => {
    SimpleNpcController.Qir();
  });
//# sourceMappingURL=SimpleNpcController.js.map
