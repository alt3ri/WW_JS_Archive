"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AlertMarkModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class AlertMarkModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.AlertMarkInit = !1),
      (this.PendingMarkInfos = new Map());
  }
  AddPendingMarkInfo(e, s, r, o) {
    this.PendingMarkInfos.set(e, [s, r, o]);
  }
}
exports.AlertMarkModel = AlertMarkModel;
//# sourceMappingURL=AlertMarksModel.js.map
