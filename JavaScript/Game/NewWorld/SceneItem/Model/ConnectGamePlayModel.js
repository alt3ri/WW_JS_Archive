"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConnectGamePlayModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class ConnectGamePlayModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.TryConnectInterval = 500),
      (this.uQs = new Map()),
      (this.jga = new Map());
  }
  AddConnectedRelation(e, t) {
    let o = this.uQs.get(e);
    o || ((o = new Set()), this.uQs.set(e, o));
    for (const s of t) o.add(s);
  }
  SetRelationPortalParam(e, t) {
    this.jga.set(e, t);
  }
  RemoveConnectRelation(e, t) {
    e = this.uQs.get(e);
    e && e.delete(t);
  }
  RemoveRelationPortalType(e) {
    this.jga.delete(e);
  }
  GetRelationByEntityId(e) {
    return this.uQs.get(e);
  }
  GetRelationPassThroughParam(e) {
    return this.jga.get(e);
  }
}
exports.ConnectGamePlayModel = ConnectGamePlayModel;
//# sourceMappingURL=ConnectGamePlayModel.js.map
