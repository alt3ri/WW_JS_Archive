"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScoreModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class ScoreModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.HFe = 0), (this.rvo = 0);
  }
  GetCurrentScore() {
    return this.HFe;
  }
  GetTargetScore() {
    return this.rvo;
  }
  SetCurrentScore(e) {
    this.HFe = e;
  }
  SetTargetScore(e) {
    this.rvo = e;
  }
  SetScore(e, t) {
    (this.HFe = e), (this.rvo = t);
  }
  Reset() {
    (this.HFe = void 0), (this.rvo = void 0);
  }
}
exports.ScoreModel = ScoreModel;
//# sourceMappingURL=ScoreModel.js.map
