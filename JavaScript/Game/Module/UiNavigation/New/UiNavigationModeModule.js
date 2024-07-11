"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiNavigationModeModule = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const Transform_1 = require("../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
class UiNavigationModeModule {
  constructor(i) {
    (this.FPo = void 0),
      (this.Bwo = MathUtils_1.MathUtils.SmallNumber),
      (this.FPo = i),
      (this.Bwo =
        ConfigManager_1.ConfigManager.UiNavigationConfig.GetNavigateTolerance());
  }
  bwo(i, t, e) {
    const a = e.GetRootComponent().GetLocalSpaceCenter();
    const o = e.GetRootComponent().GetLocalSpaceLeftBottomPoint();
    var e = e.GetRootComponent().GetLocalSpaceRightTopPoint();
    if (t) {
      t = a.X - i.X;
      if (t < o.X || t > e.X) return !1;
    } else {
      t = a.Y - i.Z;
      if (t < o.Y || t > e.Y) return !1;
    }
    return !0;
  }
  qwo(i, t) {
    return (
      (Math.abs(i - t) < MathUtils_1.MathUtils.KindaSmallNumber &&
        (UiNavigationModeModule.Gwo.X < 0 ||
          UiNavigationModeModule.Gwo.Z > 0)) ||
      t - i >= MathUtils_1.MathUtils.KindaSmallNumber
    );
  }
  Nwo(e, i, a, o) {
    const r = this.Owo(this.FPo);
    let s = 0;
    let n = Number.MAX_VALUE;
    let h = Number.MAX_VALUE;
    let v = !1;
    let M = void 0;
    let d = 0;
    let l = Number.MIN_VALUE;
    let u = void 0;
    const _ = Vector_1.Vector.Create();
    const g = Vector_1.Vector.Create();
    for (let i = 0, t = e.Num(); i < t; ++i) {
      const U = e.Get(i);
      if (U.GetNavigationComponent().CheckFindOpposite(this.FPo)) {
        this.Owo(U).Subtraction(r, _);
        const N = _.Size();
        const f =
          (g.DeepCopy(_),
          g.Normalize(),
          Vector_1.Vector.DotProduct(UiNavigationModeModule.Gwo, g));
        if (
          !MathUtils_1.MathUtils.IsNearlyEqual(
            f,
            0,
            MathUtils_1.MathUtils.KindaSmallNumber,
          )
        )
          if (f > 0) {
            const c = o ? Math.abs(_.Z) : Math.abs(_.X);
            const p = MathUtils_1.MathUtils.IsNearlyEqual(f, 1, this.Bwo);
            const m = MathUtils_1.MathUtils.IsNearlyEqual(s, 1, this.Bwo);
            let i = !1;
            let t = !1;
            switch (a) {
              case 1:
                p && N < n && (i = !0);
                break;
              case 0:
                (t = this.bwo(_, o, U)) && v
                  ? MathUtils_1.MathUtils.IsNearlyEqual(c, h, 1)
                    ? this.qwo(N, n) && (i = !0)
                    : c < h && (i = !0)
                  : this.qwo(N, n) && (i = !0);
                break;
              case 2:
                p ? (!m || N < n) && (i = !0) : !m && N < n && (i = !0);
            }
            i && ((s = f), (n = N), (M = U), (h = c), (v = t));
          } else {
            let C = MathUtils_1.MathUtils.IsNearlyEqual(f, -1);
            const V = MathUtils_1.MathUtils.IsNearlyEqual(d, -1);
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
      ? !this.FPo.HasDynamicScrollView() && i === 1
        ? u?.GetSelectableComponent()
        : void 0
      : M?.GetSelectableComponent();
  }
  kwo(i, t, e) {
    let a = void 0;
    let o;
    return (
      (a = this.FPo.HasLoopScrollView()
        ? this.FPo.ScrollView.FindNavigationComponent(
            this.FPo.GetSelectableComponent(),
            UiNavigationModeModule.Gwo.ToUeVector(),
            i,
          )
        : a) ||
        ((o = this.FPo.GetNavigationGroup()?.ListenerList),
        (a = this.Nwo(o, i, t, e))),
      !a && this.FPo.HasDynamicScrollView() && this.Kqn(this.FPo, e),
      a
    );
  }
  Kqn(i, t) {
    i = i.ScrollView;
    i.Vertical === t &&
      (t
        ? ((t = UiNavigationModeModule.Gwo.Z < 0), i.ScrollItemIndex(!t))
        : ((t = UiNavigationModeModule.Gwo.X > 0), i.ScrollItemIndex(!t)),
      ModelManager_1.ModelManager.UiNavigationModel?.RepeatMove());
  }
  Fwo() {
    if (this.FPo.HasLoopScrollView()) {
      UiNavigationModeModule.Gwo.Set(1, 0, 0);
      const i = this.FPo.ScrollView.FindNavigationComponent(
        this.FPo.GetSelectableComponent(),
        UiNavigationModeModule.Gwo.ToUeVector(),
        2,
      );
      if (i) return i;
    }
    const t = this.FPo.GetNavigationGroup()?.ListenerList;
    const e = t.Num();
    if (e <= 0) return this.FPo.GetSelectableComponent();
    const a = t.FindIndex(this.FPo);
    if (a !== -1) {
      for (let i = a + 1; i < e; i++) {
        const o = t.Get(i);
        if (o.IsCanFocus()) return o.GetSelectableComponent();
      }
      if (!this.FPo?.HasDynamicScrollView())
        for (let i = 0; i < a; i++) {
          const r = t.Get(i);
          if (r.IsCanFocus()) return r.GetSelectableComponent();
        }
    }
  }
  Vwo() {
    if (this.FPo.HasLoopScrollView()) {
      UiNavigationModeModule.Gwo.Set(-1, 0, 0);
      var t = this.FPo.ScrollView.FindNavigationComponent(
        this.FPo.GetSelectableComponent(),
        UiNavigationModeModule.Gwo.ToUeVector(),
        2,
      );
      if (t) return t;
    }
    const e = this.FPo.GetNavigationGroup()?.ListenerList;
    var t = e.Num();
    if (t <= 0) return this.FPo.GetSelectableComponent();
    const a = e.FindIndex(this.FPo);
    if (a !== -1) {
      for (let i = a - 1; i >= 0; i--) {
        const o = e.Get(i);
        if (o.IsCanFocus()) return o.GetSelectableComponent();
      }
      if (!this.FPo?.HasDynamicScrollView())
        for (let i = t - 1; i > a; i--) {
          const r = e.Get(i);
          if (r.IsCanFocus()) return r.GetSelectableComponent();
        }
    }
  }
  Hwo(i) {
    if (
      Math.abs(UiNavigationModeModule.Gwo.X) >=
      Math.abs(UiNavigationModeModule.Gwo.Z)
    )
      switch (i.HorizontalWrapMode) {
        case 2:
          return UiNavigationModeModule.Gwo.X > 0 ? this.Fwo() : this.Vwo();
        case 0:
        case 1:
          return (
            UiNavigationModeModule.Gwo.Set(
              Math.sign(UiNavigationModeModule.Gwo.X),
              0,
              0,
            ),
            this.kwo(i.HorizontalWrapMode, i.HorizontalPriorityMode, !1)
          );
        default:
      }
    else
      switch (i.VerticalWrapMode) {
        case 2:
          return UiNavigationModeModule.Gwo.Z < 0 ? this.Fwo() : this.Vwo();
        case 0:
        case 1:
          return (
            UiNavigationModeModule.Gwo.Set(
              0,
              0,
              Math.sign(UiNavigationModeModule.Gwo.Z),
            ),
            this.kwo(i.VerticalWrapMode, i.VerticalPriorityMode, !0)
          );
        default:
      }
  }
  jwo(i) {
    return i === 3
      ? this.FPo.NavigationMode.TopActor
      : i === 4
        ? this.FPo.NavigationMode.DownActor
        : i === 1
          ? this.FPo.NavigationMode.LeftActor
          : i === 2
            ? this.FPo.NavigationMode.RightActor
            : void 0;
  }
  Wwo(i) {
    return i === 3
      ? this.FPo.NavigationMode.TopMode
      : i === 4
        ? this.FPo.NavigationMode.DownMode
        : i === 1
          ? this.FPo.NavigationMode.LeftMode
          : i === 2
            ? this.FPo.NavigationMode.RightMode
            : void 0;
  }
  Kwo(i) {
    let t;
    i === 3 &&
      ((t = this.FPo.GetRootComponent().GetRightVector()),
      UiNavigationModeModule.Gwo.Set(t.X, t.Y, t.Z)),
      i === 4 &&
        ((t = this.FPo.GetRootComponent().GetRightVector()),
        UiNavigationModeModule.Gwo.Set(-t.X, -t.Y, -t.Z)),
      i === 1 &&
        ((t = this.FPo.GetRootComponent().GetForwardVector()),
        UiNavigationModeModule.Gwo.Set(-t.X, -t.Y, -t.Z)),
      i === 2 &&
        ((t = this.FPo.GetRootComponent().GetForwardVector()),
        UiNavigationModeModule.Gwo.Set(t.X, t.Y, t.Z));
  }
  Qwo() {
    const i = this.FPo.RootUIComp;
    if (i) {
      let t = i.GetRenderCanvas();
      if (void 0 !== t && void 0 !== t.GetRootCanvas())
        return i.IsScreenSpaceOverlayUI()
          ? ((t = i.GetRootCanvas().GetOwner().RootComponent), this.Xwo(t))
          : this.Xwo(void 0);
    }
  }
  Xwo(i) {
    UiNavigationModeModule.Gwo.Normalize(0);
    const t = this.FPo.GetNavigationGroup();
    if (t) return this.Hwo(t);
    const e = this.Owo(this.FPo);
    let a = Number.MIN_VALUE;
    let o = this.FPo.GetSelectableComponent();
    const r = UE.LGUIBPLibrary.GetComponentsInChildren(
      i.GetOwner(),
      UE.TsUiNavigationBehaviorListener_C.StaticClass(),
      !1,
    );
    for (let i = 0, t = r.Num(); i < t; ++i) {
      var s;
      var n;
      const h = r.Get(i);
      h.GroupName === this.FPo.GroupName &&
        h.IsCanFocus() &&
        ((s = this.Owo(h)).Subtraction(e, s),
        (n = Vector_1.Vector.DotProduct(UiNavigationModeModule.Gwo, s)) <=
          0.1 ||
          ((n = n / s.SizeSquared()) > a &&
            ((a = n), (o = h.GetSelectableComponent()))));
    }
    return o;
  }
  Owo(i) {
    var t = i.GetRootComponent().GetLocalSpaceCenter();
    var t = Vector_1.Vector.Create(t.X, t.Y, 0);
    return (
      Transform_1.Transform.Create(
        i.GetRootSceneComponent().K2_GetComponentToWorld(),
      ).TransformPosition(t, t),
      t
    );
  }
  FindActorByDirection(i, t = !0) {
    let e;
    const a = this.Wwo(i);
    return a === 2
      ? ((e = this.FPo.RootUIComp),
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
          : (t = this.jwo(i).GetComponentByClass(
                UE.TsUiNavigationBehaviorListener_C.StaticClass(),
              )) && !t.IsCanFocus()
            ? t.ModeModule?.FindActorByDirection(i, !1)
            : t.GetBehaviorComponent().GetRootSceneComponent())
      : a === 1
        ? (this.Kwo(i), this.Qwo()?.GetRootSceneComponent())
        : void 0;
  }
}
(exports.UiNavigationModeModule = UiNavigationModeModule).Gwo =
  Vector_1.Vector.Create();
// # sourceMappingURL=UiNavigationModeModule.js.map
