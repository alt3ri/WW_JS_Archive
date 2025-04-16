"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PerformModel = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  ModelBase_1 = require("../../../../../../Core/Framework/ModelBase"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../../../Manager/ModelManager");
class PerformModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.iX_ = new Map());
  }
  SetSightTarget(e) {
    var r = e.s6n;
    switch (r) {
      case 0:
        this.iX_.set(e.F4n, { Type: 0 });
        break;
      case 2:
        this.iX_.set(e.F4n, { Type: 2, Pos: Vector_1.Vector.Create(e.CIl) });
        break;
      case 1:
        this.iX_.set(e.F4n, { Type: 1, EntityId: e.TVn });
        break;
      case 3:
        this.iX_.set(e.F4n, { Type: 3 });
        break;
      case 4:
        this.iX_.delete(e.F4n);
    }
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "BasePerform",
        26,
        "NPC行为设置看向",
        ["pbDataId", e.F4n],
        ["type", r],
      );
  }
  HasSightTarget(e) {
    e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e);
    return !!e && this.iX_.has(e.PbDataId);
  }
  GetSightTarget(e) {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e),
      r = this.iX_.get(e.PbDataId);
    let a = void 0;
    switch (r.Type) {
      case 2:
        a = r.Pos;
        break;
      case 1:
        var t = r,
          t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            t.EntityId,
          )?.Entity?.GetComponent(1);
        t?.Valid && (a = t.GetWatchedPoint());
        break;
      case 3:
        t =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
            1,
          );
        t?.Valid && (a = t.GetWatchedPoint());
    }
    return a;
  }
}
exports.PerformModel = PerformModel;
//# sourceMappingURL=PerformModel.js.map
