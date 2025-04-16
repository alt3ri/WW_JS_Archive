"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedDollController = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager");
class BigStuffedDollController extends ControllerBase_1.ControllerBase {
  static Open(e, t, a) {
    var r = ModelManager_1.ModelManager.BigStuffedDollModel,
      e =
        (r.GameplayStart(e, t),
        ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          r.BrokenRockEntityPbDataId,
        ));
    e && (r.BrokenRockEntityCreatureDataId = e.CreatureDataId),
      UiManager_1.UiManager.OpenView("BigStuffedDollView", void 0, () => {
        a();
      });
  }
  static SetBooleanValueThenSendEvent(e, t, a) {
    ModelManager_1.ModelManager.BlackboardModel.SetBooleanValueByEntity(
      e,
      t,
      a,
    ),
      BigStuffedDollController.kLe(e);
  }
  static SetIntValueThenSendEvent(e, t, a) {
    ModelManager_1.ModelManager.BlackboardModel.SetIntValueByEntity(e, t, a),
      BigStuffedDollController.kLe(e);
  }
  static kLe(e) {
    var t,
      e = EntitySystem_1.EntitySystem.Get(e);
    e?.Valid &&
      (e = e.GetComponent(18))?.Valid &&
      (t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(394204955)) &&
      e.SendGameplayEventToActor(t);
  }
}
exports.BigStuffedDollController = BigStuffedDollController;
//# sourceMappingURL=BigStuffedDollController.js.map
