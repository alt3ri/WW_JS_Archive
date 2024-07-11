"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DamageViewData = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils");
class DamageViewData {
  constructor() {
    (this.Mne = 0),
      (this.tFt = void 0),
      (this.iFt = 0),
      (this.oFt = 0),
      (this.rFt = 0),
      (this.nFt = 0),
      (this.sFt = void 0),
      (this.aFt = void 0),
      (this.hFt = void 0),
      (this.lFt = void 0),
      (this._Ft = "");
  }
  Initialize(t) {
    (this.Mne = t.Id),
      (this.tFt = t),
      (this._Ft = t.CritNiagaraPath),
      (this.iFt = t.MinDeviationX),
      (this.oFt = t.MinDeviationY),
      (this.rFt = t.MaxDeviationX),
      (this.nFt = t.MaxDeviationX),
      (this.sFt = UE.Color.FromHex(t.TextColor)),
      (this.aFt = UE.Color.FromHex(t.CritTextColor)),
      (this.hFt = UE.Color.FromHex(t.StrokeColor)),
      (this.lFt = UE.Color.FromHex(t.CritStrokeColor));
  }
  GetConfigId() {
    return this.Mne;
  }
  GetRandomOffsetX() {
    return MathUtils_1.MathUtils.GetRandomFloatNumber(this.iFt, this.rFt);
  }
  GetRandomOffsetY() {
    return MathUtils_1.MathUtils.GetRandomFloatNumber(this.oFt, this.nFt);
  }
  GetTextColor() {
    return this.sFt;
  }
  GetCriticalTextColor() {
    return this.aFt;
  }
  GetStrokeColor() {
    return this.hFt;
  }
  GetCriticalStrokeColor() {
    return this.lFt;
  }
  GetCriticalNiagaraPath() {
    return this._Ft;
  }
  GetSequencePath(t, i, s) {
    return s
      ? this.tFt.DamageTextSequence
      : t
        ? i
          ? this.tFt.OwnCriticalDamageSequence
          : this.tFt.OwnDamageSequence
        : i
          ? this.tFt.MonsterCriticalDamageSequence
          : this.tFt.MonsterDamageSequence;
  }
}
exports.DamageViewData = DamageViewData;
//# sourceMappingURL=DamageViewData.js.map
