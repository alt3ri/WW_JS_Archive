"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InfluenceModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class InfluenceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.UnlockCountry = new Set()),
      (this.UnlockInfluence = new Set()),
      (this.CurrentSelectAreaId = 0),
      (this.CurrentSelectInfluenceId = 0);
  }
  AddUnlockCountry(s) {
    for (let e = 0; e < s.length; e++)
      this.UnlockCountry.has(s[e]) || this.UnlockCountry.add(s[e]);
  }
  AddUnlockInfluence(s) {
    for (let e = 0; e < s.length; e++)
      this.UnlockInfluence.has(s[e]) || this.UnlockInfluence.add(s[e]);
  }
}
exports.InfluenceModel = InfluenceModel;
//# sourceMappingURL=InfluenceModel.js.map
