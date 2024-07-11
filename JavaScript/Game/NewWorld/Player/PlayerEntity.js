"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerEntity = void 0);
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Entity_1 = require("../../../Core/Entity/Entity");
const GameBudgetAllocatorConfigCreator_1 = require("../../World/Define/GameBudgetAllocatorConfigCreator");
const CharacterGasDebugComponent_1 = require("../Character/Common/Component/Abilities/CharacterGasDebugComponent");
const PlayerAttributeComponent_1 = require("./Component/PlayerAttributeComponent");
const PlayerBuffComponent_1 = require("./Component/PlayerBuffComponent");
const PlayerTagComponent_1 = require("./Component/PlayerTagComponent");
class PlayerEntity extends Entity_1.Entity {
  constructor() {
    super(...arguments), (this.PlayerId = 0);
  }
  static StaticGameBudgetConfig() {
    return GameBudgetAllocatorConfigCreator_1.GameBudgetAllocatorConfigCreator
      .TsPlayerAlwaysTickConfig;
  }
  OnCreate(e) {
    return (
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Formation", 20, "PlayerEntity OnCreate", [
          "PlayerId",
          e?.PlayerId,
        ]),
      !(
        !this.AddComponent(
          PlayerAttributeComponent_1.PlayerAttributeComponent,
          void 0,
          e,
        ) ||
        !this.AddComponent(
          PlayerTagComponent_1.PlayerTagComponent,
          void 0,
          e,
        ) ||
        !this.AddComponent(
          PlayerBuffComponent_1.PlayerBuffComponent,
          void 0,
          e,
        ) ||
        (Info_1.Info.IsBuildDevelopmentOrDebug &&
          !this.AddComponent(
            CharacterGasDebugComponent_1.CharacterGasDebugComponent,
          )) ||
        (this.RegisterToGameBudgetController(void 0), 0)
      )
    );
  }
  OnClear() {
    return !0;
  }
  Respawn() {
    return this.RegisterToGameBudgetController(void 0), super.Respawn();
  }
}
exports.PlayerEntity = PlayerEntity;
// # sourceMappingURL=PlayerEntity.js.map
