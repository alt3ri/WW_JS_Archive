"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.KuroEffectNiagaraComponentHandle = void 0);
const cpp_1 = require("cpp");
class KuroEffectNiagaraComponentHandle {
  constructor(t) {
    this.xe = t;
  }
  IsValid() {
    return cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_IsValid(
      this.xe,
    );
  }
  get bForceSolo() {
    return cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_GetForceSolo(
      this.xe,
    );
  }
  set bForceSolo(t) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetForceSolo(
      this.xe,
      t,
    );
  }
  SetNiagaraVariableFloat(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetNiagaraVariableFloat(
      this.xe,
      t,
      e,
    );
  }
  SetNiagaraVariableVec3(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetNiagaraVariableVec3(
      this.xe,
      t,
      e,
    );
  }
  SetIntParameter(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetIntParameter(
      this.xe,
      t,
      e,
    );
  }
  SetFloatParameter(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetFloatParameter(
      this.xe,
      t,
      e,
    );
  }
  SetColorParameter(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetColorParameter(
      this.xe,
      t,
      e,
    );
  }
  SetVectorParameter(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetVectorParameter(
      this.xe,
      t,
      e,
    );
  }
  SetCastShadow(t) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetCastShadow(
      this.xe,
      t,
    );
  }
  SetEnviInteractionComp(t) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetEnviInteractionComp(
      this.xe,
      t,
    );
  }
  SetKuroNiagaraEmitterFloatParam(t, e, a) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetKuroNiagaraEmitterFloatParam(
      this.xe,
      t,
      e,
      a,
    );
  }
  SetKuroNiagaraEmitterVectorParam(t, e, a) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetKuroNiagaraEmitterVectorParam(
      this.xe,
      t,
      e,
      a,
    );
  }
  SetNiagaraVariableLinearColor(t, e) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetNiagaraVariableLinearColor(
      this.xe,
      t,
      e,
    );
  }
  SetKuroNiagaraEmitterCustomTexture(t, e, a) {
    cpp_1.FEffectSystemHandleHelper.NiagaraComponentHandle_SetKuroNiagaraEmitterCustomTexture(
      this.xe,
      t,
      e,
      a,
    );
  }
}
exports.KuroEffectNiagaraComponentHandle = KuroEffectNiagaraComponentHandle;
//# sourceMappingURL=KuroEffectNiagaraComponentHandle.js.map
