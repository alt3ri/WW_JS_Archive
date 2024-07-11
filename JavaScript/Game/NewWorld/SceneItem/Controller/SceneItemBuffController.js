"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemBuffController = void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../../Core/Net/Net"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class SceneItemBuffController extends ControllerBase_1.ControllerBase {
  static BuffOperate(e, r, t) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetCreatureDataId(e),
      o = Protocol_1.Aki.Protocol.nes.create();
    (o.$Wn = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.YWn = r),
      Net_1.Net.Call(18889, o, (e) => {
        let r = !1;
        e.O4n === Protocol_1.Aki.Protocol.O4n.NRs && (r = !0);
        var o = MathUtils_1.MathUtils.LongToNumber(e.$Wn);
        ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.IsInit &&
          t &&
          t(e.YWn, r);
      });
  }
}
exports.SceneItemBuffController = SceneItemBuffController;
//# sourceMappingURL=SceneItemBuffController.js.map
