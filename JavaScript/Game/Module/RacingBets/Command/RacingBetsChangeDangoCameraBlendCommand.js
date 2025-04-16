"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsChangeDangoCameraBlendCommand = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsChangeDangoCameraBlendCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), (this.gfc = 0), (this.CommandType = 11);
  }
  async OnExecute() {
    var e = ModelManager_1.ModelManager.RacingBetsModel.GetDungeonDangoEntityId(
        this.gfc,
      ),
      e =
        ModelManager_1.ModelManager.CreatureModel?.GetEntity(
          e,
        )?.Entity?.GetComponent(1)?.ActorLocationProxy;
    if (e) {
      const a = new CustomPromise_1.CustomPromise();
      ControllerHolder_1.ControllerHolder.DangoGlobalController.ApplyDangoBeforeMoveCamera(
        e,
        () => {
          a.SetResult();
        },
      ),
        await a.Promise;
    }
  }
  SetDangoId(e) {
    this.gfc = e;
  }
  LogInfo() {
    return "RacingBetsChangeDangoCameraBlendCommand";
  }
}
exports.RacingBetsChangeDangoCameraBlendCommand =
  RacingBetsChangeDangoCameraBlendCommand;
//# sourceMappingURL=RacingBetsChangeDangoCameraBlendCommand.js.map
