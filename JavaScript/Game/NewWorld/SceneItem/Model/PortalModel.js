"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PortalModel = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class PortalModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Osr = void 0), (this.I4a = void 0);
  }
  OnInit() {
    return (this.Osr = new Map()), !0;
  }
  AddPortalPair(t, e) {
    this.Osr.has(t) || this.Osr.set(t, e);
  }
  RemovePortalPair(t) {
    this.Osr.delete(t);
  }
  GetPortal(t) {
    return this.Osr.get(t);
  }
  GetPortals() {
    return this.Osr;
  }
  OnClear() {
    return (
      (this.Osr = void 0) !== this.I4a &&
        (ActorSystem_1.ActorSystem.Put(this.I4a), (this.I4a = void 0)),
      !0
    );
  }
  OnLeaveLevel() {
    return (
      void 0 !== this.I4a &&
        (ActorSystem_1.ActorSystem.Put(this.I4a), (this.I4a = void 0)),
      !0
    );
  }
  GetBpPortalActor() {
    return (
      void 0 === this.I4a &&
        (this.I4a = ActorSystem_1.ActorSystem.Spawn(
          UE.BP_Portal_C.StaticClass(),
          void 0,
          void 0,
        )),
      this.I4a
    );
  }
}
exports.PortalModel = PortalModel;
//# sourceMappingURL=PortalModel.js.map
