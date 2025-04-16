"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueOpTeleport = void 0);
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpTeleport extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments), (this.StepSize = 1), (this.ExecuteInMapView = !0);
  }
  ToString() {
    return `[Teleport] IncId:${this.IncId} GridId:` + this.Data.tL1?.Zsc;
  }
  OnStartExecute(e) {
    this.Execute(e);
  }
  OnExecute(e) {
    var t = this.Data.tL1;
    t &&
      e.TeleportFlow(t.Zsc, t.hac).then(() => {
        this.Execute(e);
      });
  }
  OnFinish(e) {}
}
exports.MapRogueOpTeleport = MapRogueOpTeleport;
//# sourceMappingURL=MapRogueOpTeleport.js.map
