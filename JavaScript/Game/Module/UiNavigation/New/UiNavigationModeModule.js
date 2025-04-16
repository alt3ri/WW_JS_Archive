"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationModeModule = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ERRORTOLERANCE = 1e-4;
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
  sRc(i, t) {
    return 4 === t && this.Nxo.ScrollView !== i.ScrollView;
  }
  bBo(e, i, a, o) {
    var r = this.qBo(this.Nxo);
    let s = 0,
      n = Number.MAX_VALUE,
      h = Number.MAX_VALUE,
      M = !1,
      v = void 0,
      d = 0,
      l = Number.MAX_VALUE,
      u = Number.MIN_VALUE,
      _ = void 0;
    var U = Vector_1.Vector.Create(),
      g = Vector_1.Vector.Create();
    for (let i = 0, t = e.length; i < t; ++i) {
      var N = e[i];
      if (
        N.GetNavigationComponent().CheckFindOpposite(this.Nxo) &&
        !this.sRc(N, a)
      ) {
        this.qBo(N).Subtraction(r, U);
        var c = U.Size(),
          f =
            (g.DeepCopy(U),
            g.Normalize(),
            Vector_1.Vector.DotProduct(UiNavigationModeModule.BBo, g));
        if (
          !MathUtils_1.MathUtils.IsNearlyEqual(
            f,
            0,
            MathUtils_1.MathUtils.KindaSmallNumber,
          )
        ) {
          var p,
            R,
            C = o ? Math.abs(U.Z) : Math.abs(U.X);
          if (0 < f) {
            var m = MathUtils_1.MathUtils.IsNearlyEqual(f, 1, this.PBo),
              E = MathUtils_1.MathUtils.IsNearlyEqual(s, 1, this.PBo);
            let i = !1,
              t = !1;
            switch (a) {
              case 1:
                m && c < n && (i = !0);
                break;
              case 0:
              case 4:
                (t = this.xBo(U, o, N)) && M
                  ? MathUtils_1.MathUtils.IsNearlyEqual(C, h, 1)
                    ? this.wBo(c, n) && (i = !0)
                    : C < h && (i = !0)
                  : this.wBo(c, n) && (i = !0);
                break;
              case 2:
                m ? (!E || c < n) && (i = !0) : !E && c < n && (i = !0);
                break;
              case 3:
                m && (!E || f > s) && (i = !0);
            }
            i && ((s = f), (n = c), (v = N), (h = C), (M = t));
          } else {
            let i = !1;
            4 === a
              ? MathUtils_1.MathUtils.IsNearlyEqual(C, u, 1)
                ? c < l && (i = !0)
                : C > u && (i = !0)
              : ((R = MathUtils_1.MathUtils.IsNearlyEqual(
                  f,
                  -1,
                  MathUtils_1.MathUtils.KindaSmallNumber,
                )),
                (p = MathUtils_1.MathUtils.IsNearlyEqual(
                  d,
                  -1,
                  MathUtils_1.MathUtils.KindaSmallNumber,
                )),
                R
                  ? (!p || c > l) && (i = !0)
                  : !p &&
                    ((!(R = MathUtils_1.MathUtils.IsNearlyEqual(f, d)) &&
                      f < d) ||
                      (R && c > l)) &&
                    (i = !0)),
              i && ((d = f), (u = C), (l = c), (_ = N));
          }
        }
      }
    }
    return MathUtils_1.MathUtils.IsNearlyEqual(s, 0)
      ? !this.Nxo.HasDynamicScrollView() && 1 === i && this.fSc(_)
        ? _?.GetSelectableComponent()
        : void 0
      : v?.GetSelectableComponent();
  }
  fSc(i) {
    var t, e, a;
    return !(
      i?.ScrollView &&
      this.Nxo?.ScrollView &&
      (i = this.Nxo.GetNavigationGroup()) &&
      !(t = this.Nxo.ScrollView).CheckContentUnderSize() &&
      (t.Horizontal &&
      t.HorizontalScrollbarComp &&
      0 !== UiNavigationModeModule.BBo.X
        ? ((e = t.HorizontalScrollbarComp.Value),
          (a = 0 < UiNavigationModeModule.BBo.X),
          (e < 1 - ERRORTOLERANCE && a && i?.SlideToRightOrDown) ||
            (e > ERRORTOLERANCE && !a && i?.SlideToLeftOrTop))
        : t.Vertical &&
          t.VerticalScrollbarComp &&
          0 !== UiNavigationModeModule.BBo.Z &&
          ((e = t.VerticalScrollbarComp.Value),
          (a = UiNavigationModeModule.BBo.Z < 0),
          (e < 1 - ERRORTOLERANCE && a && i?.SlideToRightOrDown) ||
            (e > ERRORTOLERANCE && !a && i?.SlideToLeftOrTop)))
    );
  }
  GBo(i, t, e) {
    let a =
      this.Nxo.GetNavigationComponent().FindLoopScrollViewNavigationComponent(
        UiNavigationModeModule.BBo.ToUeVectorOld(),
        i,
      );
    var o;
    return (
      a ||
        ((o = this.Nxo.GetNavigationGroup().GetOppositeListenerListByListener(
          this.Nxo,
        )),
        (a = this.bBo(o, i, t, e))),
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
        UiNavigationModeModule.BBo.ToUeVectorOld(),
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
        UiNavigationModeModule.BBo.ToUeVectorOld(),
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
      ((t = this.Nxo.GetRootComponent().D_GetRightVector()),
      UiNavigationModeModule.BBo.Set(t.X, t.Y, t.Z)),
      4 === i &&
        ((t = this.Nxo.GetRootComponent().D_GetRightVector()),
        UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z)),
      1 === i &&
        ((t = this.Nxo.GetRootComponent().D_GetForwardVector()),
        UiNavigationModeModule.BBo.Set(-t.X, -t.Y, -t.Z)),
      2 === i &&
        ((t = this.Nxo.GetRootComponent().D_GetForwardVector()),
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
        i.GetRootSceneComponent().D_K2_GetComponentToWorld(),
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
                10,
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
