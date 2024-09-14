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
      o = Protocol_1.Aki.Protocol.ces.create();
    (o.oKn = MathUtils_1.MathUtils.NumberToLong(e)),
      (o.nKn = r),
      Net_1.Net.Call(25010, o, (e) => {
        let r = !1;
        e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs && (r = !0);
        var o = MathUtils_1.MathUtils.LongToNumber(e.oKn);
        ModelManager_1.ModelManager.CreatureModel.GetEntity(o)?.IsInit &&
          t &&
          t(e.nKn, r);
      });
  }
}
exports.SceneItemBuffController = SceneItemBuffController;
//# sourceMappingURL=SceneItemBuffController.js.map
