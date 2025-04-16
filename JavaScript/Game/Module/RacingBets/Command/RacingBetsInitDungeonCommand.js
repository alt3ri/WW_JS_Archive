"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsInitDungeonCommand = void 0);
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CreatureController_1 = require("../../../World/Controller/CreatureController"),
  ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController"),
  RacingBetsDefine_1 = require("../RacingBetsDefine"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsInitDungeonCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments),
      (this.vBc = []),
      (this.yBc = []),
      (this.CommandType = 50);
  }
  Init(o, e) {
    for (let e = o.length - 1; 0 <= e; e--) {
      var t = o[e],
        t = {
          Id: t.DangoId,
          CreatureDataId: t.EntityId,
          InitPointId: t.RealPoint(),
        };
      this.vBc.push(t);
    }
    for (const n of e) {
      var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          n.EntityId,
        ),
        r = {
          Id: n.Id,
          Location: Vector_1.Vector.Create(
            r?.Transform?.Pos.X ?? 0,
            r?.Transform?.Pos.Y ?? 0,
            r?.Transform?.Pos.Z ?? 0,
          ),
          Rotation: Rotator_1.Rotator.Create(
            r?.Transform?.Rot?.Y ?? 0,
            r?.Transform?.Rot?.Z ?? 0,
            r?.Transform?.Rot?.X ?? 0,
          ),
          SortIndex: n.SortId,
        };
      this.yBc.push(r);
    }
  }
  async OnExecute() {
    ControllerHolder_1.ControllerHolder.CameraController.FreeCamera?.LogicComponent?.ResetToInit();
    const e = new CustomPromise_1.CustomPromise();
    ControllerHolder_1.ControllerHolder.DangoGlobalController.InitGlobalConfig(
      RacingBetsDefine_1.DANGO_GLOBAL_CONFIG_PATH,
      () => {
        e.SetResult();
      },
    ),
      await e.Promise,
      await ChessController_1.ChessController.InitChessGameAsync(
        this.yBc,
        this.vBc,
        this.yBc[this.yBc.length - 1].Id,
      ),
      this.lNc(this.vBc);
  }
  lNc(e) {
    for (const t of e) {
      var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        t.CreatureDataId,
      );
      o &&
        CreatureController_1.CreatureController.SetEntityEnable(
          o.Entity,
          !0,
          "RacingBetsInitDungeonCommand active dango",
        );
    }
  }
  LogInfo() {
    return "RacingBetsInitDungeonCommand";
  }
}
exports.RacingBetsInitDungeonCommand = RacingBetsInitDungeonCommand;
//# sourceMappingURL=RacingBetsInitDungeonCommand.js.map
