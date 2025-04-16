"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var n,
      i = arguments.length,
      s =
        i < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, r);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (n = e[a]) && (s = (i < 3 ? n(s) : 3 < i ? n(t, o, s) : n(t, o)) || s);
    return 3 < i && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BasePerformComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PerformMachine_1 = require("./Performance/PerformMachine");
let BasePerformComponent = class BasePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.AnimComp = void 0),
      (this.IsInPlotInternal = !1),
      (this.gj_ = void 0),
      (this.InLevelAiControl = () => !0),
      (this.Cj_ = -1),
      (this.pj_ = -1),
      (this.vj_ = -1);
  }
  get IsInPlot() {
    return this.IsInPlotInternal;
  }
  OnStart() {
    return (
      (this.AnimComp = this.Entity.GetComponent(43)),
      (this.gj_ = new PerformMachine_1.PerformMachine(this)),
      this.gj_.Init(),
      !0
    );
  }
  OnClear() {
    return this.gj_.Clear(), !(this.gj_ = void 0);
  }
  IsMontagePlaying() {
    return this.AnimComp.MontageManager.IsMontagePlaying();
  }
  OnNpcInPlot(e) {
    (this.IsInPlotInternal = e), this.gj_.Update();
  }
  GetMontagePath(e) {
    let t = void 0;
    if (
      (t = e.IsAbp
        ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(e.MontageId)
        : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(e.MontageId))
    )
      return t.ActionMontage;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "NPC",
        42,
        "当前MontageId无效,找不到相关蒙太奇配置,请检查注册蒙太奇csv表格",
        ["EntityId", this.AnimComp.Actor.EntityId],
        ["MontageId", e.MontageId],
        ["IsABP", e.IsAbp],
      );
  }
  VolatileMontagePlayByLoad(t, e, o, r, n = 0, i = 0) {
    return (
      (this.pj_ = -1),
      (this.Cj_ = ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.AnimMontage,
        (e) => {
          this.VolatileMontagePlay(t, e, o, r, n, i);
        },
      )),
      this.Cj_
    );
  }
  VolatileMontagePlay(e, t, o, r, n = 0, i = 0) {
    var s = t.CompositeSections.Num();
    let a = 0,
      h = !0;
    return (
      1 === s
        ? 0 < i
          ? (a = i * t.SequenceLength * CommonDefine_1.MILLIONSECOND_PER_SECOND)
          : 0 === i && (h = !1)
        : 3 === s &&
          (0 < n
            ? (a = n * CommonDefine_1.MILLIONSECOND_PER_SECOND)
            : 0 === n && (h = !1)),
      (this.vj_ = -1),
      (this.pj_ = this.PlayPerformMontage(e, {
        MontageAsset: t,
        IsLoop: h,
        OnStartCallback: (e) => {
          this.vj_ = e;
        },
        OnPlayCallback: o,
        OnEndCallback: r,
        Duration: 0 < a ? a : void 0,
      })),
      this.pj_
    );
  }
  VolatileMontageStopByLoad(e, t, o) {
    this.Cj_ === t &&
      (ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t),
      this.VolatileMontageStop(e, this.pj_, o));
  }
  VolatileMontageStop(e, t, o) {
    this.pj_ === t &&
      (this.EnableAction(t, !1),
      this.StopPerformMontage(e, {
        HandleId: this.vj_,
        Method: o,
        BlendOutTime: 0,
      }),
      this.AnimComp?.MontageManager.ClearCallback(this.vj_),
      (this.Cj_ = -1),
      (this.vj_ = -1),
      (this.pj_ = -1));
  }
  GetCurrentPerformMode() {
    return this.gj_.GetCurrentMode();
  }
  PlayPerformMontage(e, t, o, r) {
    return this.gj_.DoAction(e, 0, t, o, r);
  }
  StopPerformMontage(e, t, o, r) {
    return this.gj_.DoAction(e, 1, t, o, r);
  }
  PerformTurn(e, t, o, r) {
    return this.gj_.DoAction(e, 2, t, o, r);
  }
  EnableAction(e, t) {
    return this.gj_.EnableAction(e, t);
  }
  ClearAction() {
    this.gj_?.CleanAction();
  }
};
(BasePerformComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(45)],
  BasePerformComponent,
)),
  (exports.BasePerformComponent = BasePerformComponent);
//# sourceMappingURL=BasePerformComponent.js.map
