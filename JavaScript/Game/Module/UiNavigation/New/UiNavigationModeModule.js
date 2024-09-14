"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationModeModule = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class UiNavigationModeModule {
  constructor(i) {
    (this.Nxo = void 0),
      (this.PBo = MathUtils_1.MathUtils.SmallNumber),
      (this.Nxo = i),
      (this.PBo =
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetNavigateTolerance());
  }
  xBo(i, t, e) {
    var a = e.GetRootComponent().GetLocalSpaceCenter(),
      o = e.GetRootComponent().GetLocalSpaceLeftBottomPoint(),
      e = e.GetRootComponent().GetLocalSpaceRightTopPoint();
    if (t) {
      t = a.X - i.X;
      if (t < o.X || t > e.X) return !1;
    } else {
      t = a.Y - i.Z;
      if (t < o.Y || t > e.Y) return !1;
    }
    return !0;
  }
  wBo(i, t) {
    return (
      (Math.abs(i - t) < MathUtils_1.MathUtils.KindaSmallNumber &&
        (UiNavigationModeModule.BBo.X < 0 ||
          0 < UiNavigationModeModule.BBo.Z)) ||
      t - i >= MathUtils_1.MathUtils.KindaSmallNumber
    );
  }
  bBo(e, i, a, o) {
    var r = this.qBo(this.Nxo);
    let s = 0,
      n = Number.MAX_VALUE,
      h = Number.MAX_VALUE,
      M = !1,
      v = void 0,
      d = 0,
      l = Number.MIN_VALUE,
      u = void 0;
    var _ = Vector_1.Vector.Create(),
      g = Vector_1.Vector.Create();
    for (let i = 0, t = e.length; i < t; ++i) {
      var U = e[i];
      if (U.GetNavigationComponent().CheckFindOpposite(this.Nxo)) {
        this.qBo(U).Subtraction(r, _);
        var N = _.Size(),
          f =
            (g.DeepCopy(_),
            g.Normalize(),
            Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, g));
        if (
          !MathUtils_1.MathUtils.IsNearlyEqual(
            f,
            0,
            MathUtils_1.MathUtils.KindaSmallNumber,
          )
        )
          if (0 < f) {
            var c = o ? Math.abs(_.Z) : Math.abs(_.X),
              p = MathUtils_1.MathUtils.IsNearlyEqual(f, 1, this.PBo),
              m = MathUtils_1.MathUtils.IsNearlyEqual(s, 1, this.PBo);
            let i = !1,
              t = !1;
            switch (a) {
              case 1:
                p && N < n && (i = !0);
                break;
              case 0:
                (t = this.xBo(_, o, U)) && M
                  ? MathUtils_1.MathUtils.IsNearlyEqual(c, h, 1)
                    ? this.wBo(N, n) && (i = !0)
                    : c < h && (i = !0)
                  : this.wBo(N, n) && (i = !0);
                break;
              case 2:
                p ? (!m || N < n) && (i = !0) : !m && N < n && (i = !0);
            }
            i && ((s = f), (n = N), (v = U), (h = c), (M = t));
          } else {
            var C = MathUtils_1.MathUtils.IsNearlyEqual(
                f,
                -1,
                MathUtils_1.MathUtils.KindaSmallNumber,
              ),
              V = MathUtils_1.MathUtils.IsNearlyEqual(
                d,
                -1,
                MathUtils_1.MathUtils.KindaSmallNumber,
              );
            C
              ? (!V || N > l) && ((d = f), (l = N), (u = U))
              : !V &&
                ((!(C = MathUtils_1.MathUtils.IsNearlyEqual(f, d)) && f < d) ||
                  (C && N > l)) &&
                ((d = f), (l = N), (u = U));
          }
      }
    }
    return MathUtils_1.MathUtils.IsNearlyEqual(s, 0)
      ? !this.Nxo.HasDynamicScrollView() && 1 === i
        ? u?.GetSelectableComponent()
        : void 0
      : v?.GetSelectableComponent();
  }
  GBo(i, t, e) {
    let a = void 0;
    var o;
    return (
      (a = this.Nxo.HasLoopScrollView()
        ? this.Nxo.ScrollView.FindNavigationComponent(
            this.Nxo.GetSelectableComponent(),
            UiNavigationModeModule.BBo.ToUeVector(),
            i,
          )
        : a) ||
        ((o = this.Nxo.GetNavigationGroup()),
        (a = this.bBo(o.ListenerList, i, t, e))),
      !a && this.Nxo.HasDynamicScrollView() && this.nNn(this.Nxo, e),
      a
    );
  }
  nNn(i, t) {
    i = i.ScrollView;
    i.Vertical === t &&
      (t
        ? ((t = UiNavigationModeModule.BBo.Z < 0), i.ScrollItemIndex(!t))
        : ((t = 0 < UiNavigationModeModule.BBo.X), i.ScrollItemIndex(!t)),
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove());
  }
  NBo() {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(1, 0, 0);
      var i = this.Nxo.ScrollView.FindNavigationComponent(
        this.Nxo.GetSelectableComponent(),
        UiNavigationModeModule.BBo.ToUeVector(),
        2,
      );
      if (i) return i;
    }
    var t = this.Nxo.GetNavigationGroup().ListenerList,
      e = t.length;
    if (e <= 0) return this.Nxo.GetSelectableComponent();
    var a = t.indexOf(this.Nxo);
    if (-1 !== a) {
      for (let i = a + 1; i < e; i++) {
        var o = t[i];
        if (o.IsCanFocus()) return o.GetSelectableComponent();
      }
      if (!this.Nxo?.HasDynamicScrollView())
        for (let i = 0; i < a; i++) {
          var r = t[i];
          if (r.IsCanFocus()) return r.GetSelectableComponent();
        }
    }
  }
  OBo() {
    if (this.Nxo.HasLoopScrollView()) {
      UiNavigationModeModule.BBo.Set(-1, 0, 0);
      var t = this.Nxo.ScrollView.FindNavigationComponent(
        this.Nxo.GetSelectableComponent(),
        UiNavigationModeModule.BBo.ToUeVector(),
        2,
      );
      if (t) return t;
    }
    var e = this.Nxo.GetNavigationGroup().ListenerList,
      t = e.length;
    if (t <= 0) return this.Nxo.GetSelectableComponent();
    var a = e.indexOf(this.Nxo);
    if (-1 !== a) {
      for (let i = a - 1; 0 <= i; i--) {
        var o = e[i];
        if (o.IsCanFocus()) return o.GetSelectableComponent();
      }
      if (!this.Nxo?.HasDynamicScrollView())
        for (let i = t - 1; i > a; i--) {
          var r = e[i];
          if (r.IsCanFocus()) return r.GetSelectableComponent();
        }
    }
  }
  kBo(i) {
    if (
      Math.abs(UiNavigationModeModule.BBo.X) >=
      Math.abs(UiNavigationModeModule.BBo.Z)
    )
      switch (i.HorizontalWrapMode) {
        case 2:
          return 0 < UiNavigationModeModule.BBo.X ? this.NBo() : this.OBo();
        case 0:
        case 1:
          return (
            UiNavigationModeModule.BBo.Set(
              Math.sign(UiNavigationModeModule.BBo.X),
              0,
              0,
            ),
            this.GBo(i.HorizontalWrapMode, i.HorizontalPriorityMode, !1)
          );
        default:
          return;
      }
    else
      switch (i.VerticalWrapMode) {
        case 2:
          return UiNavigationModeModule.BBo.Z < 0 ? this.NBo() : this.OBo();
        case 0:
        case 1:
          return (
            UiNavigationModeModule.BBo.Set(
              0,
              0,
              Math.sign(UiNavigationModeModule.BBo.Z),
            ),
            this.GBo(i.VerticalWrapMode, i.VerticalPriorityMode, !0)
          );
        default:
          return;
      }
  }
  FBo(i) {
    return 3 === i
      ? this.Nxo.NavigationMode.TopActor
      : 4 === i
        ? this.Nxo.NavigationMode.DownActor
        : 1 === i
          ? this.Nxo.NavigationMode.LeftActor
          : 2 === i
            ? this.Nxo.NavigationMode.RightActor
            : void 0;
  }
  VBo(i) {
    return 3 === i
      ? this.Nxo.NavigationMode.TopMode
      : 4 === i
        ? this.Nxo.NavigationMode.DownMode
        : 1 === i
          ? this.Nxo.NavigationMode.LeftMode
          : 2 === i
            ? this.Nxo.NavigationMode.RightMode
            : void 0;
  }
  HBo(i) {
    var t;
    3 === i &&
      ((t = this.Nxo.GetRootComponent().GetRightVector()),
      UiNavigationModeModule.BBo.Set(t.X, t.Y, t.Z)),
      4 === i &&
        ((t = this.Nxo.GetRootComponent().GetRightVector()),
        UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z)),
      1 === i &&
        ((t = this.Nxo.GetRootComponent().GetForwardVector()),
        UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z)),
      2 === i &&
        ((t = this.Nxo.GetRootComponent().GetForwardVector()),
        UiNavigationModeModule.BBo.Set(t.X, t.Y, t.Z));
  }
  jBo() {
    var i = this.Nxo.RootUIComp;
    if (i) {
      var t = i.GetRenderCanvas();
      if (void 0 !== t && void 0 !== t.GetRootCanvas())
        return i.IsScreenSpaceOverlayUI()
          ? ((t = i.GetRootCanvas().GetOwner().RootComponent), this.WBo(t))
          : this.WBo(void 0);
    }
  }
  WBo(i) {
    UiNavigationModeModule.BBo.Normalize(0);
    var t = this.Nxo.GetNavigationGroup();
    if (t) return this.kBo(t);
    var e = this.qBo(this.Nxo);
    let a = Number.MIN_VALUE,
      o = this.Nxo.GetSelectableComponent();
    var r = UE.LGUIBPLibrary.GetComponentsInChildren(
      i.GetOwner(),
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !1,
    );
    for (let i = 0, t = r.Num(); i < t; ++i) {
      var s,
        n,
        h = r.Get(i);
      h.GroupName === this.Nxo.GroupName &&
        h.IsCanFocus() &&
        ((s = this.qBo(h)).Subtraction(e, s),
        (n = Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, s)) <=
          0.1 ||
          ((n = n / s.SizeSquared()) > a &&
            ((a = n), (o = h.GetSelectableComponent()))));
    }
    return o;
  }
  qBo(i) {
    var t = i.GetRootComponent().GetLocalSpaceCenter(),
      t = Vector_1.Vector.Create(t.X, t.Y, 0);
    return (
      Transform_1.Transform.Create(
        i.GetRootSceneComponent().K2_GetComponentToWorld(),
      ).TransformPosition(t, t),
      t
    );
  }
  FindActorByDirection(i, t = !0) {
    var e,
      a = this.VBo(i);
    return 2 === a
      ? ((e = this.Nxo.RootUIComp),
        t && !e.IsUIActiveInHierarchy()
          ? void (
              Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "UiNavigation",
                11,
                "当前选中的导航监听组件按钮不可视",
                ["DisplayName", e.displayName],
              )
            )
          : (t = this.FBo(i).GetComponentByClass(
                UE.TsUiNavigationBehaviorListener_C.StaticClass(),
              )) && !t.IsCanFocus()
            ? t.ModeModule?.FindActorByDirection(i, !1)
            : t.GetBehaviorComponent().GetRootSceneComponent())
      : 1 === a
        ? (this.HBo(i), this.jBo()?.GetRootSceneComponent())
        : void 0;
  }
}
(exports.UiNavigationModeModule = UiNavigationModeModule).BBo =
  Vector_1.Vector.Create();
//# sourceMappingURL=UiNavigationModeModule.js.map
