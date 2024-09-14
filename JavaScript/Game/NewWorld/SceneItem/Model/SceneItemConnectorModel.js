"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemConnectorModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class SceneItemConnectorModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.uQs = new Map());
  }
  AddConnectedRelation(e, t) {
    let o = this.uQs.get(e);
    o || ((o = new Set()), this.uQs.set(e, o));
    for (const n of t) o.add(n);
  }
  RemoveConnectRelation(e, t) {
    e = this.uQs.get(e);
    e && e.delete(t);
  }
  GetRelationByEntityId(e) {
    return this.uQs.get(e);
  }
}
exports.SceneItemConnectorModel = SceneItemConnectorModel;
//# sourceMappingURL=SceneItemConnectorModel.js.map
