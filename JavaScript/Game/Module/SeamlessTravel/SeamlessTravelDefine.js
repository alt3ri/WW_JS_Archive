"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelFloorParams = exports.SeamlessTravelContext = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
  DEFAULT_EFFECT_COLLAPSE_TIME = 0.5;
class SeamlessTravelContext {
  constructor() {
    (this.EffectPath = void 0),
      (this.EffectExpandTime = 0),
      (this.EffectCollapseTime = 0),
      (this.LeastTime = 0),
      (this.FloorParams = void 0);
  }
  ParseConfig(s) {
    (this.EffectPath = s.D$s),
      (this.EffectExpandTime = s.U$s),
      (this.EffectCollapseTime = Math.max(s.P$s, DEFAULT_EFFECT_COLLAPSE_TIME)),
      (this.LeastTime = s.A$s),
      s.cta &&
        ((this.FloorParams = new SeamlessTravelFloorParams()),
        this.FloorParams.ParseFloorParams(s.dta));
  }
}
exports.SeamlessTravelContext = SeamlessTravelContext;
class SeamlessTravelFloorParams {
  constructor() {
    (this.FloorMeshPath = void 0),
      (this.FloorMaterialPath = void 0),
      (this.FloorAppearTime = 0),
      (this.FloorDisappearTime = 0),
      (this.FloorScale = void 0);
  }
  ParseFloorParams(s) {
    "" !== s.mta && (this.FloorMeshPath = s.mta),
      "" !== s.Cta && (this.FloorMaterialPath = s.Cta),
      (this.FloorAppearTime = s.vta),
      (this.FloorDisappearTime = s.pta),
      (this.FloorScale = Vector_1.Vector.Create(s.gta, s.fta, 1));
  }
}
exports.SeamlessTravelFloorParams = SeamlessTravelFloorParams;
//# sourceMappingURL=SeamlessTravelDefine.js.map
