"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemRogueResMain =
    exports.OpenSystemRogueBattleShop =
    exports.OpenSystemRogueBattleAbilitySelect =
      void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ActivityPermanentRogueController_1 = require("../../../Module/PermanentRogue/ActivityPermanentRogueController"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueBattleAbilitySelect extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (
      (ModelManager_1.ModelManager.RogueBattleModel.CurrentBindId = e.BoardId),
      ControllerHolder_1.ControllerHolder.RogueBattleController.OpenBuffSelectViewById(
        e.BoardId,
      )
    );
  }
  GetViewName(e, t) {
    e = ModelManager_1.ModelManager.RogueBattleModel.GetOptionDataById(
      e.BoardId,
    );
    return ControllerHolder_1.ControllerHolder.RogueBattleController.GetViewNameByGainType(
      e.Lac,
    );
  }
}
exports.OpenSystemRogueBattleAbilitySelect = OpenSystemRogueBattleAbilitySelect;
class OpenSystemRogueBattleShop extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return ControllerHolder_1.ControllerHolder.RogueBattleController.OpenBuffSelectViewById(
      99,
    );
  }
  GetViewName(e, t) {
    return "RogueBattleShopView";
  }
}
exports.OpenSystemRogueBattleShop = OpenSystemRogueBattleShop;
class OpenSystemRogueResMain extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return ActivityPermanentRogueController_1.ActivityPermanentRogueController.OpenSeasonMainView();
  }
  GetViewName(e, t) {
    return "RogueSeasonEntranceView";
  }
}
exports.OpenSystemRogueResMain = OpenSystemRogueResMain;
//# sourceMappingURL=OpenSystemRogueBattle.js.map
