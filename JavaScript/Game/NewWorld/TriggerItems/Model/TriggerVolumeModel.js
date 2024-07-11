"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TriggerVolumeModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
class TriggerVolumeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.Ksr = void 0);
  }
  OnInit() {
    return (this.Ksr = new Map()), !0;
  }
  AddTriggerVolume(e, r, o) {
    let t = this.Ksr.get(e);
    t || ((t = new Map()), this.Ksr.set(e, t)), t.set(r, o);
  }
  RemoveTriggerVolume(e, r) {
    e = this.Ksr.get(e);
    e && e.delete(r);
  }
  GetTriggerVolume(e, r) {
    e = this.Ksr.get(e);
    if (e) return e.get(r);
  }
  OnClear() {
    return !(this.Ksr = void 0);
  }
}
exports.TriggerVolumeModel = TriggerVolumeModel;
//# sourceMappingURL=TriggerVolumeModel.js.map
