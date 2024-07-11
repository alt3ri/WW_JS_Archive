"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.effectSpecMap = void 0);
const EffectModelMultiEffectSpec_1 = require("./EffectModelMultiEffectSpec"),
  EffectModelAudioSpec_1 = require("./EffectSpec/EffectModelAudioSpec"),
  EffectModelBillboardSpec_1 = require("./EffectSpec/EffectModelBillboardSpec"),
  EffectModelDecalSpec_1 = require("./EffectSpec/EffectModelDecalSpec"),
  EffectModelGhostSpec_1 = require("./EffectSpec/EffectModelGhostSpec"),
  EffectModelGpuParticleSpec_1 = require("./EffectSpec/EffectModelGpuParticleSpec"),
  EffectModelGroupSpec_1 = require("./EffectSpec/EffectModelGroupSpec"),
  EffectModelLightSpec_1 = require("./EffectSpec/EffectModelLightSpec"),
  EffectModelNiagaraSpec_1 = require("./EffectSpec/EffectModelNiagaraSpec"),
  EffectModelPostProcessSpec_1 = require("./EffectSpec/EffectModelPostProcessSpec"),
  EffectModelSkeletalMeshSpec_1 = require("./EffectSpec/EffectModelSkeletalMeshSpec"),
  EffectModelStaticMeshSpec_1 = require("./EffectSpec/EffectModelStaticMeshSpec"),
  EffectModelTrailSpec_1 = require("./EffectSpec/EffectModelTrailSpec");
exports.effectSpecMap = new Map([
  [0, () => new EffectModelGroupSpec_1.EffectModelGroupSpec()],
  [1, () => new EffectModelNiagaraSpec_1.EffectModelNiagaraSpec()],
  [2, () => new EffectModelAudioSpec_1.EffectModelAudioSpec()],
  [3, () => new EffectModelBillboardSpec_1.EffectModelBillboardSpec()],
  [4, () => new EffectModelDecalSpec_1.EffectModelDecalSpec()],
  [5, () => new EffectModelGhostSpec_1.EffectModelGhostSpec()],
  [6, () => new EffectModelLightSpec_1.EffectModelLightSpec()],
  [7, () => new EffectModelGpuParticleSpec_1.EffectModelGpuParticleSpec()],
  [8, () => new EffectModelPostProcessSpec_1.EffectModelPostProcessSpec()],
  [9, () => new EffectModelSkeletalMeshSpec_1.EffectModelSkeletalMeshSpec()],
  [10, () => new EffectModelStaticMeshSpec_1.EffectModelStaticMeshSpec()],
  [11, () => new EffectModelTrailSpec_1.EffectModelTrailSpec()],
  [12, () => new EffectModelMultiEffectSpec_1.EffectModelMultiEffectSpec()],
]);
//# sourceMappingURL=EffectDefine.js.map
