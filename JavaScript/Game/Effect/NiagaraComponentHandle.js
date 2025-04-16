"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NiagaraComponentHandle = void 0);
class EmitterFloatParam {
  constructor() {
    (this.EmitterName = ""), (this.VariableName = ""), (this.FloatValue = 0);
  }
}
class EmitterVector4Param {
  constructor() {
    (this.EmitterName = ""),
      (this.VariableName = ""),
      (this.Vector4Value = void 0);
  }
}
class EmitterCustomTextureParam {
  constructor() {
    (this.EmitterName = ""),
      (this.VariableName = ""),
      (this.TextureValue = void 0);
  }
}
class NiagaraComponentHandle {
  constructor() {
    (this.Upe = void 0),
      (this.Ape = void 0),
      (this.Ppe = void 0),
      (this.xpe = void 0),
      (this.wpe = void 0),
      (this.nvl = void 0),
      (this.svl = void 0),
      (this.avl = void 0),
      (this.CAl = void 0),
      (this.gAl = void 0),
      (this.bForceSolo = void 0),
      (this._Kl = void 0),
      (this.lF_ = void 0),
      (this.SDc = void 0);
  }
  IsValid() {
    return !0;
  }
  SetNiagaraVariableFloat(t, i) {
    this.Upe || (this.Upe = new Map()), this.Upe.set(t, i);
  }
  SetNiagaraVariableVec3(t, i) {
    this.Ape || (this.Ape = new Map()), this.Ape.set(t, i);
  }
  SetIntParameter(t, i) {
    this.Ppe || (this.Ppe = new Map()), this.Ppe.set(t, i);
  }
  SetFloatParameter(t, i) {
    this.xpe || (this.xpe = new Map()), this.xpe.set(t, i);
  }
  SetColorParameter(t, i) {
    this.wpe || (this.wpe = new Map()), this.wpe.set(t, i);
  }
  SetVectorParameter(t, i) {
    this.nvl || (this.nvl = new Map()), this.nvl.set(t, i);
  }
  SetKuroNiagaraEmitterFloatParam(t, i, s) {
    this.svl || (this.svl = new Array());
    var a = new EmitterFloatParam();
    (a.EmitterName = t),
      (a.VariableName = i),
      (a.FloatValue = s),
      this.svl.push(a);
  }
  SetKuroNiagaraEmitterVectorParam(t, i, s) {
    this.avl || (this.avl = new Array());
    var a = new EmitterVector4Param();
    (a.EmitterName = t),
      (a.VariableName = i),
      (a.Vector4Value = s),
      this.avl.push(a);
  }
  SetNiagaraVariableLinearColor(t, i) {
    this.gAl || (this.gAl = new Map()), this.gAl.set(t, i);
  }
  SetCastShadow(t) {
    this._Kl = t;
  }
  SetEnviInteractionComp(t) {
    this.lF_ = t;
  }
  SetKuroNiagaraEmitterCustomTexture(t, i, s) {
    this.CAl || (this.CAl = new Array());
    var a = new EmitterCustomTextureParam();
    (a.EmitterName = t),
      (a.VariableName = i),
      (a.TextureValue = s),
      this.CAl.push(a);
  }
  SetEmitterQualityLevelBias(t) {
    this.SDc = t;
  }
  InitNiagaraComponent(t) {
    if (t) {
      if (this.Upe)
        for (var [i, s] of this.Upe) t.SetNiagaraVariableFloat(i, s);
      if (this.Ape) for (var [a, r] of this.Ape) t.SetNiagaraVariableVec3(a, r);
      if (this.Ppe) for (var [h, o] of this.Ppe) t.SetIntParameter(h, o);
      if (this.xpe) for (var [e, n] of this.xpe) t.SetFloatParameter(e, n);
      if (this.wpe) for (var [v, f] of this.wpe) t.SetColorParameter(v, f);
      if (this.nvl) for (var [m, d] of this.nvl) t.SetVectorParameter(m, d);
      if (this.svl)
        for (const u of this.svl)
          t.SetKuroNiagaraEmitterFloatParam(
            u.EmitterName,
            u.VariableName,
            u.FloatValue,
          );
      if (this.avl)
        for (const p of this.avl)
          t.SetKuroNiagaraEmitterVectorParam(
            p.EmitterName,
            p.VariableName,
            p.Vector4Value,
          );
      if (this.gAl)
        for (var [c, l] of this.gAl) t.SetNiagaraVariableLinearColor(c, l);
      if (this.CAl)
        for (const w of this.CAl)
          t.SetKuroNiagaraEmitterCustomTexture(
            w.EmitterName,
            w.VariableName,
            w.TextureValue,
          );
      void 0 !== this._Kl && t.SetCastShadow(this._Kl),
        void 0 !== this.bForceSolo && (t.bForceSolo = this.bForceSolo),
        void 0 !== this.lF_ && this.lF_.SetNiagaraCompShiftColor(t),
        void 0 !== this.SDc && t.SetEmitterQualityLevelBias(this.SDc);
    }
  }
}
exports.NiagaraComponentHandle = NiagaraComponentHandle;
//# sourceMappingURL=NiagaraComponentHandle.js.map
