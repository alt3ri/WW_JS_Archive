"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCaptureRequest = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  BattleNetController_1 = require("../../World/Controller/BattleNetController"),
  LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventCaptureRequest extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.NLe = ""), (this.E0 = 0);
  }
  ExecuteNew(t, e) {
    1 === e.Type && EntitySystem_1.EntitySystem.Get(e.EntityId)?.Valid
      ? ((this.E0 = e.EntityId),
        BattleNetController_1.BattleNetController.RequestCaptureEntity(
          this.E0,
        ).then((e) => {
          e
            ? (this.kLe(t), this.OLe(), this.FinishExecute(!0))
            : this.FinishExecute(!1);
        }))
      : this.FinishExecute(!1);
  }
  kLe(e) {
    var t = new LevelGameplayActionsDefine_1.CommonActionInfo(),
      e = ((t.Params = e.SuccessEvent), new Array());
    e.push(t),
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        e,
        LevelGeneralContextDefine_1.EntityContext.Create(this.E0),
      );
  }
  OLe() {
    var e = EntitySystem_1.EntitySystem.Get(this.E0);
    e && (e = e.GetComponent(133)) && e.ExecuteCapture(this.NLe);
  }
  OnReset() {
    (this.NLe = void 0), (this.E0 = 0);
  }
}
exports.LevelEventCaptureRequest = LevelEventCaptureRequest;
//# sourceMappingURL=LevelEventCaptureRequest.js.map
