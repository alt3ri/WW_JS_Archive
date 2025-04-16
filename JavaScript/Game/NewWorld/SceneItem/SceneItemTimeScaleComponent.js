"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    var o,
      s = arguments.length,
      a =
        s < 3
          ? t
          : null === n
            ? (n = Object.getOwnPropertyDescriptor(t, i))
            : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(e, t, i, n);
    else
      for (var r = e.length - 1; 0 <= r; r--)
        (o = e[r]) && (a = (s < 3 ? o(a) : 3 < s ? o(t, i, a) : o(t, i)) || a);
    return 3 < s && a && Object.defineProperty(t, i, a), a;
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
      (this.Xte = this.Entity.GetComponent(194)),
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
        this.bla());
  }
  OnTick(e) {
    var t = Time_1.Time.WorldTimeSeconds;
    let i = 1,
      n = !1;
    for (; !this.TimeScaleList.Empty; ) {
      var o = this.TimeScaleList.Top;
      if (!o) break;
      if (o.EndTime > t && !o.MarkDelete) {
        (i = o.CalculateTimeScale()), (n = o.NeedAddSceneItemTag);
        break;
      }
      this.TimeScaleMap.delete(o.Id), this.TimeScaleList.Pop();
    }
    i !== this.TimeScaleInternal &&
      (this.bla(),
      n && 1 !== i && this.Xte?.AddTag(1 < i ? upsizeTag : downsizeTag),
      (this.TimeScaleInternal = i),
      this.Entity.SetTimeDilation(this.TimeDilation)),
      this.TimeScaleList.Empty &&
        this.XMn(!1, "[PawnTimeScaleComponent] 时间缩放结束");
  }
  SetTimeScale(e, t, i, n, o, s = !1) {
    e = super.SetTimeScale(e, t, i, n, o, s);
    return 0 <= e && this.XMn(!0), this.OnTick(0), e;
  }
  RemoveTimeScale(e) {
    super.RemoveTimeScale(e), this.OnTick(0);
  }
  bla() {
    this.Xte &&
      (this.Xte.RemoveTag(downsizeTag), this.Xte.RemoveTag(upsizeTag));
  }
};
(SceneItemTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(202)],
  SceneItemTimeScaleComponent,
)),
  (exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent);
//# sourceMappingURL=SceneItemTimeScaleComponent.js.map
