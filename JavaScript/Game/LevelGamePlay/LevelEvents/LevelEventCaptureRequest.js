"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventCaptureRequest = void 0);
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const BattleNetController_1 = require("../../World/Controller/BattleNetController");
const LevelGameplayActionsDefine_1 = require("../LevelGameplayActionsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
class LevelEventCaptureRequest extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), (this.NLe = ""), (this.E0 = 0);
  }
  Execute(e, t) {
    t instanceof TsBaseCharacter_1.default
      ? ((this.NLe = e.get("Success")),
        (this.E0 = t.CharacterActorComponent.Entity.Id),
        BattleNetController_1.BattleNetController.RequestCaptureEntity(
          this.E0,
        ).then((e) => {
          e ? (this.OLe(), this.FinishExecute(!0)) : this.FinishExecute(!1);
        }))
      : this.FinishExecute(!1);
  }
  ExecuteNew(t, e) {
    e.Type === 1 && EntitySystem_1.EntitySystem.Get(e.EntityId)?.Valid
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
    const t = new LevelGameplayActionsDefine_1.CommonActionInfo();
    var e = ((t.Params = e.SuccessEvent), new Array());
    e.push(t),
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
        e,
        LevelGeneralContextDefine_1.EntityContext.Create(this.E0),
      );
  }
  OLe() {
    let e = EntitySystem_1.EntitySystem.Get(this.E0);
    e && (e = e.GetComponent(130)) && e.ExecuteCapture(this.NLe);
  }
  OnReset() {
    (this.NLe = void 0), (this.E0 = 0);
  }
}
exports.LevelEventCaptureRequest = LevelEventCaptureRequest;
// # sourceMappingURL=LevelEventCaptureRequest.js.map
