"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EffectSystem =
    exports.EFFECT_LIFETIME_FLOAT_TO_INT =
    exports.EFFECT_REASON_LENGTH_LIMIT =
      void 0);
const cpp_1 = require("cpp"),
  Info_1 = require("../../Core/Common/Info"),
  Lru_1 = require("../../Core/Container/Lru"),
  EffectEnvironment_1 = require("../../Core/Effect/EffectEnvironment"),
  KuroEffectSystem_1 = require("./KuroEffectSystem/KuroEffectSystem"),
  TsEffectSystem_1 = require("./TsEffectSystem");
(exports.EFFECT_REASON_LENGTH_LIMIT = 4),
  (exports.EFFECT_LIFETIME_FLOAT_TO_INT = 1e4);
class EffectSystem {
  static get Yhc() {
    return (
      this.zhc || (this.zhc = new KuroEffectSystem_1.KuroEffectSystem()),
      this.zhc
    );
  }
  static get Jhc() {
    return (
      this.Zhc || (this.Zhc = new TsEffectSystem_1.TsEffectSystem()), this.Zhc
    );
  }
  static Initialize() {
    if (
      ((this.elc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize),
      cpp_1.FEffectSystem.SetUseDebugDrawNew(this.elc),
      this.elc)
    ) {
      if (this.Yhc.Initialize()) return !0;
      this.elc = !1;
    }
    return this.Jhc.Initialize();
  }
  static Clear() {
    return (this.elc ? this.Yhc : this.Jhc).Clear();
  }
  static InitializeWithPreview(t) {
    Info_1.Info.IsGameRunning() ||
      this.Yhc.PreviewInitState ||
      (this.Yhc.InitializeWithPreview(t)
        ? (this.elc = EffectEnvironment_1.EffectEnvironment.OpenCppOptimize)
        : (this.elc = !1),
      this.Jhc.InitializeWithPreview(t));
  }
  static Tick(t) {
    (this.elc ? this.Yhc : this.Jhc).Tick(t);
  }
  static AfterTick(t) {
    this.elc || this.Jhc.AfterTick(t);
  }
  static ClearPool() {
    (this.elc ? this.Yhc : this.Jhc).ClearPool();
  }
  static InitHandleWhenEnable(t) {
    return !this.elc && this.Jhc.InitHandleWhenEnable(t);
  }
  static SpawnChildEffect(t, i, s, e, h, a = !0, r, c, f) {
    if (!this.elc) return this.Jhc.SpawnChildEffect(t, i, s, e, h, a, r, c, f);
  }
  static AddRemoveHandle(t, i) {
    this.elc || this.Jhc.AddRemoveHandle(t, i);
  }
  static StopEffect(t, i, s, e) {
    return !this.elc && this.Jhc.StopEffect(t, i, s, e);
  }
  static CreateEffectLru(t) {
    return this.elc ? new Lru_1.Lru(t) : this.Jhc.CreateEffectLru(t);
  }
  static SpawnEffectWithActor(t, i, s, e, h = !0, a, r = !0, c = 3) {
    return this.elc
      ? this.Yhc.SpawnEffectWithActor(t, i, s, e, h, a, r, c)
      : this.Jhc.SpawnEffectWithActor(
          t,
          void 0,
          i,
          s,
          e,
          h,
          a,
          void 0,
          void 0,
          r,
          void 0,
          c,
          void 0,
          !0,
        );
  }
  static RemoveKuroEffectHandle(t) {
    this.elc && this.Yhc.RemoveKuroEffectHandle(t);
  }
  static GetEffectLruCount(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectLruCount(t);
  }
  static GetEffectLruCapacity() {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectLruCapacity();
  }
  static SetEffectLruCapacity(t) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectLruCapacity(t);
  }
  static GetEffectLruSize() {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectLruSize();
  }
  static SpawnUnloopedEffect(t, i, s, e, h, a = 3, r, c, f, n = !1, o = !1) {
    return (this.elc ? this.Yhc : this.Jhc).SpawnUnloopedEffect(
      t,
      i,
      s,
      e,
      h,
      a,
      r,
      c,
      f,
      n,
      o,
    );
  }
  static SpawnEffect(t, i, s, e, h, a = 3, r, c, f, n = !1, o = !1) {
    return (this.elc ? this.Yhc : this.Jhc).SpawnEffect(
      t,
      i,
      s,
      e,
      h,
      a,
      r,
      c,
      f,
      n,
      o,
    );
  }
  static DynamicRegisterSpawnCallback(t, i) {
    (this.elc ? this.Yhc : this.Jhc).DynamicRegisterSpawnCallback(t, i);
  }
  static ForceCheckPendingInit(t) {
    (this.elc ? this.Yhc : this.Jhc).ForceCheckPendingInit(t);
  }
  static SetEffectHidden(t, i, s = void 0, e = !1) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectHidden(t, i, s, e);
  }
  static StopEffectById(t, i, s, e) {
    return (this.elc ? this.Yhc : this.Jhc).StopEffectById(t, i, s, e);
  }
  static IsValid(t) {
    return (this.elc ? this.Yhc : this.Jhc).IsValid(t);
  }
  static AddFinishCallback(t, i) {
    (this.elc ? this.Yhc : this.Jhc).AddFinishCallback(t, i);
  }
  static RemoveFinishCallback(t, i) {
    (this.elc ? this.Yhc : this.Jhc).RemoveFinishCallback(t, i);
  }
  static GetEffectActor(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectActor(t);
  }
  static GetSureEffectActor(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetSureEffectActor(t);
  }
  static GetNiagaraComponent(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetNiagaraComponent(t);
  }
  static GetSureNiagaraComponent(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetSureNiagaraComponent(t);
  }
  static ReplayEffect(t, i, s = void 0) {
    (this.elc ? this.Yhc : this.Jhc).ReplayEffect(t, i, s);
  }
  static IsPlaying(t) {
    return (this.elc ? this.Yhc : this.Jhc).IsPlaying(t);
  }
  static SetHandleLifeCycle(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetHandleLifeCycle(t, i);
  }
  static SetTimeScale(t, i, s = !1) {
    (this.elc ? this.Yhc : this.Jhc).SetTimeScale(t, i, s);
  }
  static FreezeHandle(t, i, s = !1) {
    (this.elc ? this.Yhc : this.Jhc).FreezeHandle(t, i, s);
  }
  static IsHandleFreeze(t) {
    return (this.elc ? this.Yhc : this.Jhc).IsHandleFreeze(t);
  }
  static HandleSeekToTime(t, i, s, e = !1) {
    return (this.elc ? this.Yhc : this.Jhc).HandleSeekToTime(t, i, s, e);
  }
  static HandleSeekToTimeWithProcess(t, i, s = !1, e = -1) {
    (this.elc ? this.Yhc : this.Jhc).HandleSeekToTimeWithProcess(t, i, s, e);
  }
  static GetSeekToTargetTime(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetSeekToTargetTime(t);
  }
  static SetEffectNotRecord(t, i = !0) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectNotRecord(t, i);
  }
  static GetPath(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetPath(t);
  }
  static SetEffectDataByNiagaraParam(t, i, s) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectDataByNiagaraParam(t, i, s);
  }
  static SetEffectParameterNiagara(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectParameterNiagara(t, i);
  }
  static SetEffectDataFloatConstParam(t, i, s) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectDataFloatConstParam(t, i, s);
  }
  static SetEffectExtraState(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectExtraState(t, i);
  }
  static SetEffectIgnoreVisibilityOptimize(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectIgnoreVisibilityOptimize(t, i);
  }
  static SetEffectStoppingTime(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectStoppingTime(t, i);
  }
  static get GlobalStoppingPlayTime() {
    return this.elc
      ? this.Yhc.GlobalStoppingPlayTime()
      : this.Jhc.GlobalStoppingPlayTime;
  }
  static get GlobalStoppingTime() {
    return this.elc
      ? this.Yhc.GlobalStoppingTime()
      : this.Jhc.GlobalStoppingTime;
  }
  static SetGlobalStoppingTime(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetGlobalStoppingTime(t, i);
  }
  static AttachToEffectSkeletalMesh(t, i, s, e) {
    (this.elc ? this.Yhc : this.Jhc).AttachToEffectSkeletalMesh(t, i, s, e);
  }
  static AttachSkeletalMesh(t, i) {
    (this.elc ? this.Yhc : this.Jhc).AttachSkeletalMesh(t, i);
  }
  static CollectMaterialFloatCurve(t, i, s) {
    (this.elc ? this.Yhc : this.Jhc).CollectMaterialFloatCurve(t, i, s);
  }
  static CollectMaterialVectorCurve(t, i, s) {
    (this.elc ? this.Yhc : this.Jhc).CollectMaterialVectorCurve(t, i, s);
  }
  static CollectMaterialLinearColorCurve(t, i, s) {
    (this.elc ? this.Yhc : this.Jhc).CollectMaterialLinearColorCurve(t, i, s);
  }
  static GetEffectModel(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectModel(t);
  }
  static GetTotalPassTime(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetTotalPassTime(t);
  }
  static GetPassTime(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetPassTime(t);
  }
  static GetHideOnBurstSkill(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetHideOnBurstSkill(t);
  }
  static RegisterCustomCheckOwnerFunc(t, i) {
    (this.elc ? this.Yhc : this.Jhc).RegisterCustomCheckOwnerFunc(t, i);
  }
  static SetEffectQualityLevel(t, i) {
    (this.elc ? this.Yhc : this.Jhc).SetEffectQualityLevel(t, i);
  }
  static TickHandleInEditor(t, i) {
    (this.elc ? this.Yhc : this.Jhc).TickHandleInEditor(t, i);
  }
  static GetLastPlayTime(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetLastPlayTime(t);
  }
  static GetLastStopTime(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetLastStopTime(t);
  }
  static UpdateBodyEffect(t, i, s, e) {
    (this.elc ? this.Yhc : this.Jhc).UpdateBodyEffect(t, i, s, e);
  }
  static DebugUpdate(t, i) {
    (this.elc ? this.Yhc : this.Jhc).DebugUpdate(t, i);
  }
  static GetEffectCount() {
    return (this.elc ? this.Yhc : this.Jhc).GetEffectCount();
  }
  static GetActiveEffectCount() {
    return (this.elc ? this.Yhc : this.Jhc).GetActiveEffectCount();
  }
  static DebugPrintAllErrorEffects() {
    (this.elc ? this.Yhc : this.Jhc).DebugPrintAllErrorEffects();
  }
  static DebugPrintCurrentImportanceEffects() {
    (this.elc ? this.Yhc : this.Jhc).DebugPrintCurrentImportanceEffects();
  }
  static DebugPrintEffect() {
    (this.elc ? this.Yhc : this.Jhc).DebugPrintEffect();
  }
  static GetPlayerEffectLruSize(t) {
    return (this.elc ? this.Yhc : this.Jhc).GetPlayerEffectLruSize(t);
  }
  static SetEffectStartRecording(t, i, s, e) {
    this.elc && this.Yhc.SetEffectStartRecording(t, i, s, e),
      this.Jhc.SetEffectStartRecording(t, i, s, e);
  }
  static RefreshEffectSpecData(t) {
    this.elc && this.Yhc.RefreshEffectSpecData(t),
      this.Jhc.RefreshEffectSpecData(t);
  }
}
((exports.EffectSystem = EffectSystem).zhc = void 0),
  (EffectSystem.Zhc = void 0),
  (EffectSystem.elc = !1);
//# sourceMappingURL=EffectSystem.js.map
