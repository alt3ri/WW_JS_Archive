"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
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
  static get wtr() {
    return 0 < this.Btr.size;
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
      SimpleNpcController.btr,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeatherChange,
        SimpleNpcController.dIe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQuality,
        SimpleNpcController.qtr,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeatherChange,
      SimpleNpcController.dIe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQuality,
        SimpleNpcController.qtr,
      );
  }
  static OnLeaveLevel() {
    return (
      this.Gtr.clear(), this.Ntr.clear(), this.Otr.clear(), this.ktr.clear(), !0
    );
  }
  static Add(t) {
    this.Gtr.add(t);
    var e = Global_1.Global.BaseCharacter;
    e && this.Ftr(t, e.CharacterActorComponent.ActorLocationProxy, !1),
      this.CheckNpcShowState(t, !0),
      this.Vtr(t);
  }
  static Remove(t) {
    this.Gtr.delete(t),
      this.Ntr.delete(t),
      this.Otr.delete(t),
      this.ktr.delete(t);
  }
  static SetClearOutState(t, e) {
    let i = !1;
    if (
      (e && !this.Btr.has(t)
        ? (this.Btr.add(t), (i = !0))
        : !e && this.Btr.has(t) && (this.Btr.delete(t), (i = !0)),
      i)
    )
      for (const r of this.Ntr)
        this.CheckNpcShowState(r, !0, !1), r.ChangeLogicRangeState(!1);
  }
  static OnTick(t) {
    this.Htr(t), this.jtr(t);
  }
  static GetSimpleNpcListByRange(t) {
    var e = new Array(),
      i = Global_1.Global.BaseCharacter;
    if (i) {
      var r = t * t,
        o = i.CharacterActorComponent.ActorLocationProxy;
      for (const a of this.Gtr) {
        var s = a.SelfLocationProxy;
        r < Vector_1.Vector.DistSquared(o, s) || e.push(a);
      }
    }
    return e;
  }
  static Wtr() {
    ModelManager_1.ModelManager.PlatformModel.IsPc()
      ? (this.Ktr = PC_CHECK_RANGE_SQUARED)
      : (this.Ktr = MOBILE_CHECK_RANGE_SQUARED),
      this.Qtr();
  }
  static UpdateDistanceLogic() {
    var t = Global_1.Global.BaseCharacter;
    if (t) {
      this.gU || (this.Wtr(), (this.gU = !0));
      var e = t.CharacterActorComponent.ActorLocationProxy;
      for (const i of this.Gtr) this.Ftr(i, e);
    }
  }
  static Ftr(t, e, i = !0) {
    var r;
    t.IsNotUnload &&
      ((r = t.SelfLocationProxy),
      (e = Vector_1.Vector.DistSquared(e, r)) > this.Ktr
        ? this.Xtr(t, !1, i)
        : this.Xtr(t, !0, i),
      (t.TempDistanceSquared = e));
  }
  static Xtr(t, e, i = !0) {
    var r = t.IsInLogicRange;
    t.ChangeLogicRangeState(e),
      r !== e &&
        (t.SetTickEnabled(e),
        t.SetMainShadowEnabled(e),
        !r && e
          ? (this.Ntr.add(t), i && this.CheckNpcShowState(t, !1))
          : r && !e && this.Ntr.delete(t));
  }
  static $tr(t) {
    (t.CurDither = DITHER_MIN),
      (t.IsNotUnload = !0),
      t.SetDitherEffect(DITHER_MIN, 1),
      this.Otr.add(t),
      this.ktr.delete(t);
  }
  static Ytr(t) {
    (t.CurDither = DITHER_MAX),
      (t.IsNotUnload = !1),
      t.SetDitherEffect(DITHER_MAX, 1),
      this.ktr.add(t),
      this.Otr.delete(t);
  }
  static Htr(e) {
    if (!(this.Otr.size <= 0)) {
      let t = void 0;
      for (const i of this.Otr)
        (i.CurDither += DITHER_STEP * e * MILLISECOND_TO_SECOND),
          (i.CurDither = MathUtils_1.MathUtils.Clamp(
            i.CurDither,
            DITHER_MIN,
            DITHER_MAX,
          )),
          i.SetDitherEffect(i.CurDither, 1),
          MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MAX) &&
            (t = void 0 === t ? [] : t).push(i);
      if (void 0 !== t) for (const r of t) this.Otr.delete(r);
    }
  }
  static jtr(e) {
    if (!(this.ktr.size <= 0)) {
      let t = void 0;
      for (const i of this.ktr)
        (i.CurDither -= DITHER_STEP * e * MILLISECOND_TO_SECOND),
          (i.CurDither = MathUtils_1.MathUtils.Clamp(
            i.CurDither,
            DITHER_MIN,
            DITHER_MAX,
          )),
          i.SetDitherEffect(i.CurDither, 1),
          MathUtils_1.MathUtils.IsNearlyEqual(i.CurDither, DITHER_MIN) &&
            (t = void 0 === t ? [] : t).push(i);
      if (void 0 !== t) for (const r of t) this.ktr.delete(r);
    }
  }
  static Jtr(t, e) {
    (t.CurDither = e ? DITHER_MAX : DITHER_MIN),
      (t.IsNotUnload = e),
      t.SetDitherEffect(t.CurDither, 1),
      this.Otr.delete(t),
      this.ktr.delete(t);
  }
  static CheckNpcShowState(t, e, i = !0) {
    var r = !this.wtr && this.ztr(t);
    (r && !t.IsLodShow) ||
      (i
        ? e
          ? r
            ? this.$tr(t)
            : this.Jtr(t, r)
          : t.IsNotUnload && !r
            ? this.Ytr(t)
            : !t.IsNotUnload && r && this.$tr(t)
        : this.Jtr(t, r));
  }
  static ztr(t) {
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
  static Ztr() {
    for (const t of this.Gtr)
      t.FilterFlowWorldState(
        ModelManager_1.ModelManager.WorldModel.WorldStateMap,
      );
  }
  static Qtr() {
    for (const t of this.Gtr) this.Vtr(t);
  }
  static Vtr(t) {
    t.IsLodShow
      ? t.IsNotUnload || this.$tr(t)
      : t.IsNotUnload && (this.Ytr(t), t.ChangeLogicRangeState(!1));
  }
}
((exports.SimpleNpcController = SimpleNpcController).Gtr = new Set()),
  (SimpleNpcController.Ntr = new Set()),
  (SimpleNpcController.Otr = new Set()),
  (SimpleNpcController.ktr = new Set()),
  (SimpleNpcController.Btr = new Set()),
  (SimpleNpcController.Ktr = 0),
  (SimpleNpcController.gU = !1),
  (SimpleNpcController.dIe = () => {
    for (const t of SimpleNpcController.Ntr)
      SimpleNpcController.CheckNpcShowState(t, !1);
  }),
  (SimpleNpcController.btr = () => {
    SimpleNpcController.Ztr();
  }),
  (SimpleNpcController.qtr = () => {
    SimpleNpcController.Qtr();
  });
//# sourceMappingURL=SimpleNpcController.js.map
