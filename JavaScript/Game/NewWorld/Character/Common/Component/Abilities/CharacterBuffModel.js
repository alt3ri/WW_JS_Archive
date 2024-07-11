"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffModel = void 0);
const ModelBase_1 = require("../../../../../../Core/Framework/ModelBase");
class BuffModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.HandlePrefix = 0),
      (this.LastHandle = 1),
      (this.SQo = new Map());
  }
  OnClear() {
    return this.SQo.clear(), !0;
  }
  Add(e, s) {
    this.SQo.set(e, s);
  }
  Get(e) {
    return this.SQo.get(e);
  }
}
exports.BuffModel = BuffModel;
//# sourceMappingURL=CharacterBuffModel.js.map
