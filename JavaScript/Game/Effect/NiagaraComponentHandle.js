"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NiagaraComponentHandle = void 0);
class NiagaraComponentHandle {
  constructor() {
    (this.Upe = void 0),
      (this.Ape = void 0),
      (this.Ppe = void 0),
      (this.xpe = void 0),
      (this.wpe = void 0),
      (this.bForceSolo = void 0);
  }
  IsValid() {
    return !0;
  }
  SetNiagaraVariableFloat(i, t) {
    this.Upe || (this.Upe = new Map()), this.Upe.set(i, t);
  }
  SetNiagaraVariableVec3(i, t) {
    this.Ape || (this.Ape = new Map()), this.Ape.set(i, t);
  }
  SetIntParameter(i, t) {
    this.Ppe || (this.Ppe = new Map()), this.Ppe.set(i, t);
  }
  SetFloatParameter(i, t) {
    this.xpe || (this.xpe = new Map()), this.xpe.set(i, t);
  }
  SetColorParameter(i, t) {
    this.wpe || (this.wpe = new Map()), this.wpe.set(i, t);
  }
  InitNiagaraComponent(i) {
    if (i) {
      if (this.Upe)
        for (const [t, s] of this.Upe) i.SetNiagaraVariableFloat(t, s);
      if (this.Ape)
        for (const [a, o] of this.Ape) i.SetNiagaraVariableVec3(a, o);
      if (this.Ppe) for (const [e, h] of this.Ppe) i.SetIntParameter(e, h);
      if (this.xpe) for (const [r, n] of this.xpe) i.SetFloatParameter(r, n);
      if (this.wpe) for (const [f, v] of this.wpe) i.SetColorParameter(f, v);
      void 0 !== this.bForceSolo && (i.bForceSolo = this.bForceSolo);
    }
  }
}
exports.NiagaraComponentHandle = NiagaraComponentHandle;
// # sourceMappingURL=NiagaraComponentHandle.js.map
