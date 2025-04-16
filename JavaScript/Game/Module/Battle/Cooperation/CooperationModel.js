"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CooperationModel = void 0);
const ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  LinkCooperationHandler_1 = require("./CooperationHandler/LinkCooperationHandler"),
  QteCooperationHandler_1 = require("./CooperationHandler/QteCooperationHandler"),
  SceneTeamCooperationHandler_1 = require("./CooperationHandler/SceneTeamCooperationHandler");
class CooperationModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.vYo = void 0);
  }
  OnInit() {
    return (
      (this.vYo = [
        new LinkCooperationHandler_1.LinkCooperationHandler(),
        new QteCooperationHandler_1.QteCooperationHandler(),
        new SceneTeamCooperationHandler_1.SceneTeamCooperationHandler(),
      ]),
      !0
    );
  }
  OnLeaveLevel() {
    if (this.vYo) for (const e of this.vYo) e.Clear();
    return !0;
  }
  GetHandlers() {
    return this.vYo;
  }
}
exports.CooperationModel = CooperationModel;
//# sourceMappingURL=CooperationModel.js.map
