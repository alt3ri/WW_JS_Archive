"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var s,
      o = arguments.length,
      a =
        o < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, i, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (s = e[r]) && (a = (o < 3 ? s(a) : 3 < o ? s(t, i, a) : s(t, i)) || a);
    return 3 < o && a && Object.defineProperty(t, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTimeScaleComponent = void 0);
const Time_1 = require("../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent"),
  downsizeTag = 301831016,
  upsizeTag = 273828843;
let SceneItemTimeScaleComponent = class SceneItemTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments), (this.Xte = void 0), (this.Rne = void 0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.TimeScaleList && !this.TimeScaleList.Empty) ||
        this.XMn(!1, "[PawnTimeScaleComponent] OnStart, 初始关闭时间缩放"),
      (this.Xte = this.Entity.GetComponent(180)),
      !0)
    );
  }
  XMn(e, t) {
    e && void 0 !== this.Rne
      ? this.Enable(
          this.Rne,
          "SceneItemTimeScaleComponent.SetTimeScaleTicking",
        ) && (this.Rne = void 0)
      : e ||
        void 0 !== this.Rne ||
        ((this.Rne = this.Disable(t ?? "[PawnTimeScaleComponent] 关闭Tick")),
        this.Wsa());
  }
  OnTick(e) {
    var t = Time_1.Time.WorldTimeSeconds;
    let i = 1;
    for (; !this.TimeScaleList.Empty; ) {
      var n = this.TimeScaleList.Top;
      if (!n) break;
      if (n.EndTime > t && !n.MarkDelete) {
        i = n.CalculateTimeScale();
        break;
      }
      this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
    }
    i !== this.TimeScaleInternal &&
      (1 === i
        ? this.Wsa()
        : (i - 1) * (this.TimeScaleInternal - 1) <= 0 &&
          (this.Wsa(), this.Xte?.AddTag(1 < i ? upsizeTag : downsizeTag)),
      (this.TimeScaleInternal = i),
      this.Entity.SetTimeDilation(this.TimeDilation)),
      this.TimeScaleList.Empty &&
        this.XMn(!1, "[PawnTimeScaleComponent] 时间缩放结束");
  }
  SetTimeScale(e, t, i, n, s) {
    e = super.SetTimeScale(e, t, i, n, s);
    return 0 <= e && this.XMn(!0), this.OnTick(0), e;
  }
  RemoveTimeScale(e) {
    super.RemoveTimeScale(e), this.OnTick(0);
  }
  Wsa() {
    this.Xte &&
      (this.Xte.RemoveTag(downsizeTag), this.Xte.RemoveTag(upsizeTag));
  }
};
(SceneItemTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(187)],
  SceneItemTimeScaleComponent,
)),
  (exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent);
//# sourceMappingURL=SceneItemTimeScaleComponent.js.map
