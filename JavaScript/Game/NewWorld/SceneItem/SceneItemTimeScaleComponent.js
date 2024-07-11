"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, n) {
    let o;
    const s = arguments.length;
    let r =
      s < 3 ? t : n === null ? (n = Object.getOwnPropertyDescriptor(t, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(e, t, i, n);
    else
      for (let c = e.length - 1; c >= 0; c--)
        (o = e[c]) && (r = (s < 3 ? o(r) : s > 3 ? o(t, i, r) : o(t, i)) || r);
    return s > 3 && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemTimeScaleComponent = void 0);
const Time_1 = require("../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent");
const PawnTimeScaleComponent_1 = require("../Pawn/Component/PawnTimeScaleComponent");
let SceneItemTimeScaleComponent = class SceneItemTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments), (this.Rne = void 0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.TimeScaleList && !this.TimeScaleList.Empty) ||
        this.gSn(!1, "[PawnTimeScaleComponent] OnStart, 初始关闭时间缩放"),
      !0)
    );
  }
  gSn(e, t) {
    e && void 0 !== this.Rne
      ? this.Enable(
          this.Rne,
          "SceneItemTimeScaleComponent.SetTimeScaleTicking",
        ) && (this.Rne = void 0)
      : e ||
        void 0 !== this.Rne ||
        (this.Rne = this.Disable(t ?? "[PawnTimeScaleComponent] 关闭Tick"));
  }
  OnTick(e) {
    const t = Time_1.Time.WorldTimeSeconds;
    let i = 1;
    for (; !this.TimeScaleList.Empty; ) {
      const n = this.TimeScaleList.Top;
      if (!n) break;
      if (n.EndTime > t && !n.MarkDelete) {
        i = n.CalculateTimeScale();
        break;
      }
      this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
    }
    i !== this.TimeScaleInternal &&
      ((this.TimeScaleInternal = i),
      this.Entity.SetTimeDilation(this.TimeDilation)),
      this.TimeScaleList.Empty &&
        this.gSn(!1, "[PawnTimeScaleComponent] 时间缩放结束");
  }
  SetTimeScale(e, t, i, n, o) {
    e = super.SetTimeScale(e, t, i, n, o);
    return e >= 0 && this.gSn(!0), e;
  }
};
(SceneItemTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(184)],
  SceneItemTimeScaleComponent,
)),
  (exports.SceneItemTimeScaleComponent = SceneItemTimeScaleComponent);
// # sourceMappingURL=SceneItemTimeScaleComponent.js.map
