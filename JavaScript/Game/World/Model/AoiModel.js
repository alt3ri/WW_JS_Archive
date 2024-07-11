"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AoiModel = void 0);
const UE = require("ue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase");
class AoiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.nMr = void 0), (this.sMr = void 0);
  }
  get MinCoordinate() {
    return this.nMr;
  }
  set MinCoordinate(e) {
    this.nMr = e;
  }
  get MaxCoordinate() {
    return this.sMr;
  }
  set MaxCoordinate(e) {
    this.sMr = e;
  }
  OnInit() {
    return (this.nMr = new UE.Vector()), (this.sMr = new UE.Vector()), !0;
  }
  OnClear() {
    return (this.nMr = void 0), !(this.sMr = void 0);
  }
  OnLeaveLevel() {
    return !0;
  }
}
exports.AoiModel = AoiModel;
//# sourceMappingURL=AoiModel.js.map
