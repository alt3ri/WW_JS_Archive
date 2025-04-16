"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemRogueEventSelect = exports.OpenSystemRogueAbilitySelect =
    void 0);
const Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemRogueAbilitySelect extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      (ModelManager_1.ModelManager.RoguelikeModel.CurIndex = e.BoardId),
      ControllerHolder_1.ControllerHolder.RoguelikeController.OpenBuffSelectViewById(
        e.BoardId,
      )
    );
  }
  GetViewName(e, r) {
    e = ModelManager_1.ModelManager.RoguelikeModel.GetRoguelikeChooseDataById(
      e.BoardId,
    );
    return ControllerHolder_1.ControllerHolder.RoguelikeController.GetViewNameByGainType(
      e.RoguelikeGainDataType,
    );
  }
}
exports.OpenSystemRogueAbilitySelect = OpenSystemRogueAbilitySelect;
class OpenSystemRogueEventSelect extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return (
      (ModelManager_1.ModelManager.RoguelikeModel.CurIndex =
        Protocol_1.Aki.Protocol.s8s.Proto_EventBindId),
      ControllerHolder_1.ControllerHolder.RoguelikeController.OpenBuffSelectViewById(
        Protocol_1.Aki.Protocol.s8s.Proto_EventBindId,
      )
    );
  }
  GetViewName(e, r) {
    return "RoguelikeRandomEventView";
  }
}
exports.OpenSystemRogueEventSelect = OpenSystemRogueEventSelect;
//# sourceMappingURL=OpenSystemRogueAbilitySelect.js.map
