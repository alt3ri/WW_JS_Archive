"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemTrialRoleDescription = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemTrialRoleDescription extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    return e.BoardId
      ? ControllerHolder_1.ControllerHolder.JoinTeamController.OpenJoinTeamView(
          e.BoardId,
          !0,
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Quest", 35, "角色入队界面参数有误", [
            "BoardId",
            e.BoardId,
          ]),
        !1);
  }
  GetViewName(e, r) {
    return "JoinTeamView";
  }
}
exports.OpenSystemTrialRoleDescription = OpenSystemTrialRoleDescription;
//# sourceMappingURL=OpenSystemTrialRoleDescription.js.map
