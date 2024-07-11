"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WaitEntityTaskModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class WaitEntityTaskModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.QY = void 0);
  }
  OnInit() {
    return (this.QY = new Map()), !0;
  }
  OnClear() {
    return this.QY.clear(), !0;
  }
  AddTask(t, e) {
    this.QY.set(t, e);
  }
  RemoveTask(t) {
    this.QY.set(t, void 0);
  }
  OnAddEntity(e, s) {
    for (let t = 0; t < this.QY.size; t++) {
      var i = this.QY.get(t);
      i && i.OnAddEntity(e, s);
    }
  }
  OnRemoveEntity(e, s) {
    for (let t = 0; t < this.QY.size; t++) {
      var i = this.QY.get(t);
      i && i.OnRemoveEntity(e, s);
    }
  }
}
exports.WaitEntityTaskModel = WaitEntityTaskModel;
//# sourceMappingURL=WaitEntityTaskModel.js.map
