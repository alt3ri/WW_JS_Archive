"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectModelGroupSpec = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  EffectModelHelper_1 = require("../../Render/Effect/Data/EffectModelHelper"),
  EffectSystem_1 = require("../EffectSystem"),
  EffectSpec_1 = require("./EffectSpec");
class EffectModelGroupSpec extends EffectSpec_1.EffectSpec {
  constructor() {
    super(...arguments),
      (this.EffectSpecMap = new Map()),
      (this.d0e = new Set()),
      (this.C0e = new Array()),
      (this.g0e = new Array()),
      (this.GroupComponent = void 0),
      (this.HasTransformAnim = !1),
      (this.CachedLocationCurve = void 0),
      (this.CachedRotationCurve = void 0),
      (this.CachedScaleCurve = void 0),
      (this.f0e = void 0),
      (this.p0e = void 0),
      (this.v0e = void 0),
      (this.M0e = void 0);
  }
  SetEffectType(t) {
    super.SetEffectType(t);
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec().SetEffectType(t);
  }
  SetEffectParameterNiagara(t) {
    for (var [, s] of this.EffectSpecMap) s.SetEffectParameterNiagara(t);
  }
  SetTimeScale(t, s = !1) {
    super.SetTimeScale(t, s);
    for (const e of this.EffectSpecMap.values()) e.SetTimeScale(t, s);
  }
  SetExtraState(t) {
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec().SetExtraState(t);
  }
  ShouldRegisterBodyEffect() {
    for (const t of this.EffectSpecMap.values())
      if (!t.GetEffectSpec().ShouldRegisterBodyEffect()) return !1;
    return !0;
  }
  OnInit() {
    Stats_1.Stat.Enable &&
      ((this.f0e = Stats_1.Stat.Create(
        "[EffectModelGroupSpec.Tick] Path:" + this.Handle.Path,
      )),
      (this.p0e = Stats_1.Stat.Create("[EffectModelGroupSpec.Tick.SuperTick]")),
      (this.v0e = Stats_1.Stat.Create(
        "[EffectModelGroupSpec.Tick.GroupTickHandle]",
      )),
      (this.M0e = Stats_1.Stat.Create("[EffectModelGroupSpec.OnTick]"))),
      (this.InitPromise = new CustomPromise_1.CustomPromise());
    const s = this.Handle.GetSureEffectActor();
    if (s?.IsValid()) {
      var t = this.Handle.Parent,
        t = t ? t.GetEffectSpec()?.GetSceneComponent() : void 0,
        t = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
          s,
          UE.SceneComponent.StaticClass(),
          t,
          void 0,
          !1,
          this.EffectModel,
        ),
        e =
          ((this.GroupComponent = t),
          this.GroupComponent.SetComponentTickEnabled(!1),
          (this.SceneComponent = t),
          this.EffectModel.EffectData.Num());
      const f = this.EffectModel.EffectData;
      let o = e;
      for (let t = 0; t < e; ++t) {
        const h = f.GetKey(t);
        if (!h?.IsValid())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "RenderEffect",
                3,
                "特效框架:EffectModelGroupSpec.Init失败，原因:EffectData存在无效的子特效",
                ["句柄Id", this.Handle.Id],
                ["Path", this.Handle.Path],
              ),
            this.InitPromise.SetResult(0),
            !1
          );
        const s = this.Handle.GetSureEffectActor();
        var r = UE.KismetSystemLibrary.GetPathName(h);
        let i = !1;
        r = EffectSystem_1.EffectSystem.SpawnChildEffect(
          s,
          this.Handle,
          s,
          r,
          this.Handle.CreateReason,
          !1,
          this.Handle.GetContext(),
          void 0,
          (t, s) => {
            switch ((o--, t)) {
              case 1:
              case 2:
                this.EffectSpecMap.delete(s);
                break;
              case 0:
                i = !0;
                break;
              case 5:
                var e = f.Get(h);
                0 < e && (this.C0e.push([s, e]), this.d0e.add(s));
            }
            o ||
              (i
                ? ((this.C0e.length = 0),
                  this.d0e.clear(),
                  this.InitPromise.SetResult(0))
                : this.InitPromise.SetResult(5));
          },
        );
        EffectSystem_1.EffectSystem.IsValid(r?.Id ?? 0) &&
          this.EffectSpecMap.set(r.Id, r);
      }
    } else this.InitPromise.SetResult(2);
    return !0;
  }
  OnStart() {
    let t = !1;
    for (const s of this.EffectSpecMap.values())
      s.Start() ||
        ((t = !0),
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("RenderEffect", 3, "EffectHandle执行Start失败", [
            "Path",
            s.Path,
          ]));
    return (
      (this.CachedLocationCurve = this.EffectModel.Location),
      (this.CachedRotationCurve = this.EffectModel.Rotation),
      (this.CachedScaleCurve = this.EffectModel.Scale),
      (this.HasTransformAnim =
        this.CachedLocationCurve.bUseCurve ||
        this.CachedRotationCurve.bUseCurve ||
        this.CachedScaleCurve.bUseCurve),
      !t
    );
  }
  OnEnd() {
    let t = !1;
    for (const s of this.EffectSpecMap.values()) s.End() || (t = !0);
    return !t;
  }
  OnClear() {
    let t = !1;
    for (const s of this.EffectSpecMap.values()) s.Clear() || (t = !0);
    for (const e of this.EffectSpecMap.values())
      EffectSystem_1.EffectSystem.StopEffect(
        e,
        "[EffectModelGroupSpec.OnClear]",
        !0,
      );
    return (
      (this.f0e = void 0),
      (this.M0e = void 0),
      (this.v0e = void 0),
      (this.p0e = void 0),
      this.d0e.clear(),
      (this.C0e.length = 0),
      (this.g0e.length = 0),
      !t
    );
  }
  Destroy() {
    super.Destroy();
    for (const t of this.EffectSpecMap.values()) t.Destroy();
    this.EffectSpecMap.clear();
  }
  Tick(t) {
    this.f0e?.Start(), this.p0e?.Start(), super.Tick(t), this.p0e?.Stop();
    for (const s of this.EffectSpecMap.values())
      this.v0e?.Start(), s.Tick(t), this.v0e?.Stop();
    this.f0e?.Stop();
  }
  AlwaysTick(t) {
    super.AlwaysTick(t);
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec()?.AlwaysTick(t);
  }
  OnTick(s) {
    if ((this.M0e?.Start(), 0 < this.g0e.length))
      for (let t = 0; t < this.g0e.length; ++t) {
        var e = this.g0e[t],
          i = e[1] - s;
        (e[1] = i) <= 0 &&
          ((i = e[0]),
          this.g0e.splice(t, 1),
          this.EffectSpecMap.get(i)?.Play(
            "[EffectModelGroupSpec.OnTick] 延迟播放",
          ),
          t--);
      }
    this.HasTransformAnim &&
      this.GroupComponent?.IsValid() &&
      this.IsPlaying() &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
        this.GetPlayInEditor(),
        this.GroupComponent,
        this.CachedLocationCurve,
        this.CachedRotationCurve,
        this.CachedScaleCurve,
        this.LifeTime.PassTime,
      ),
      this.M0e?.Stop();
  }
  OnBodyEffectChanged(t) {
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec().UpdateBodyEffect(t, !0);
  }
  SetPlaying(t) {
    super.SetPlaying(t);
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec().SetPlaying(t);
  }
  SetStopping(t) {
    super.SetStopping(t);
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec().SetStopping(t);
  }
  OnPlay(t) {
    for (var [s, e] of this.EffectSpecMap) this.d0e.has(s) || e.Play(t);
    if (this.C0e.length) {
      this.g0e.length = 0;
      for (const i of this.C0e) this.g0e.push([i[0], i[1]]);
    }
    this.GroupComponent &&
      UE.KuroRenderingRuntimeBPPluginBPLibrary.UpdateEffectTransform(
        !0,
        this.GroupComponent,
        this.CachedLocationCurve,
        this.CachedRotationCurve,
        this.CachedScaleCurve,
        this.LifeTime.PassTime,
      );
  }
  IsReallyPlaying() {
    for (const t of this.EffectSpecMap.values())
      if (t.GetEffectSpec()?.IsReallyPlaying()) return !0;
    return !1;
  }
  OnReplay() {
    for (const t of this.EffectSpecMap.values()) t.Replay();
  }
  OnEnterPool() {
    for (const t of this.EffectSpecMap.values()) t.OnEnterPool();
  }
  OnStop(t, s) {
    for (const e of this.EffectSpecMap.values()) e.Stop(t, s);
  }
  OnPreStop() {
    for (const t of this.EffectSpecMap.values()) t.PreStop();
  }
  OnEnableChanged(t) {
    for (const s of this.EffectSpecMap.values()) s.OnEnabledChange(t, 0);
  }
  NeedVisibilityTest() {
    for (const t of this.EffectSpecMap.values())
      if (t.GetEffectSpec()?.NeedVisibilityTest()) return !0;
    return !1;
  }
  VisibilityChanged(t) {
    super.VisibilityChanged(t);
    for (const s of this.EffectSpecMap.values()) s.OnVisibilityChanged(t);
  }
  ChaseFrame(t, s, e) {
    super.ChaseFrame(t, s, e);
    for (const i of this.EffectSpecMap.values())
      i.GetEffectSpec()?.ChaseFrame(t, s, e);
  }
  SeekTo(t, s, e) {
    super.SeekTo(t, s, e);
    for (const i of this.EffectSpecMap.values())
      i.GetEffectSpec()?.SeekTo(t, s, e);
  }
  SeekDelta(t, s, e) {
    super.SeekDelta(t, s, e);
    for (const i of this.EffectSpecMap.values())
      i.GetEffectSpec()?.SeekDelta(t, s, e);
  }
  DebugErrorNiagaraPauseCount() {
    let t = 0;
    for (const s of this.EffectSpecMap.values())
      t += s.GetEffectSpec()?.DebugErrorNiagaraPauseCount() ?? 0;
    return t;
  }
  NeedAlwaysTick() {
    for (const t of this.EffectSpecMap.values())
      if (t.GetEffectSpec()?.NeedAlwaysTick()) return !0;
    return !1;
  }
  TickNeedAlwaysTick(t) {
    for (const s of this.EffectSpecMap.values())
      s.GetEffectSpec()?.TickNeedAlwaysTick(t);
  }
  SeekTimeWithoutAlwaysTick(t, s) {
    for (const e of this.EffectSpecMap.values())
      e.GetEffectSpec()?.SeekTimeWithoutAlwaysTick(t, s);
  }
  IsVisible() {
    for (const t of this.EffectSpecMap.values())
      if (t.GetEffectSpec()?.IsVisible()) return !0;
    return this.Visible;
  }
  IsUseBoundsCalculateDistance() {
    for (const t of this.EffectSpecMap.values())
      if (t.GetEffectSpec()?.IsUseBoundsCalculateDistance()) return !0;
    return !1;
  }
  FreezeEffect(t) {
    super.FreezeEffect(t);
    for (const s of this.EffectSpecMap.values()) s.FreezeEffect(t);
  }
  OnModifyEffectModel() {
    super.OnModifyEffectModel();
    for (const t of this.EffectSpecMap.values()) t.OnModifyEffectModel();
  }
  GetDebugErrorCode() {
    for (const s of this.EffectSpecMap.values()) {
      var t = s.GetDebugErrorCode();
      if (0 !== t) return t;
    }
    return 0;
  }
}
exports.EffectModelGroupSpec = EffectModelGroupSpec;
//# sourceMappingURL=EffectModelGroupSpec.js.map
