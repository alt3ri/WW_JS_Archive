"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionLimitPlayOperation =
    exports.unionToUnionLimitPlayOperation =
    exports.UnionLimitPlayOperation =
      void 0);
const limit_player_action_js_1 = require("../fb-action/limit-player-action.js"),
  limit_player_block_all_js_1 = require("../fb-action/limit-player-block-all.js"),
  limit_player_camera_js_1 = require("../fb-action/limit-player-camera.js"),
  limit_player_mouse_js_1 = require("../fb-action/limit-player-mouse.js"),
  limit_player_move_js_1 = require("../fb-action/limit-player-move.js"),
  limit_player_move_new_js_1 = require("../fb-action/limit-player-move-new.js"),
  limit_player_ui_js_1 = require("../fb-action/limit-player-ui.js");
var UnionLimitPlayOperation;
function unionToUnionLimitPlayOperation(e, i) {
  switch (UnionLimitPlayOperation[e]) {
    case "NONE":
      return;
    case "LimitPlayerAction":
      return i(new limit_player_action_js_1.LimitPlayerAction());
    case "LimitPlayerBlockAll":
      return i(new limit_player_block_all_js_1.LimitPlayerBlockAll());
    case "LimitPlayerCamera":
      return i(new limit_player_camera_js_1.LimitPlayerCamera());
    case "LimitPlayerMouse":
      return i(new limit_player_mouse_js_1.LimitPlayerMouse());
    case "LimitPlayerMove":
      return i(new limit_player_move_js_1.LimitPlayerMove());
    case "LimitPlayerMoveNew":
      return i(new limit_player_move_new_js_1.LimitPlayerMoveNew());
    case "LimitPlayerUI":
      return i(new limit_player_ui_js_1.LimitPlayerUI());
    default:
      return;
  }
}
function unionListToUnionLimitPlayOperation(e, i, r) {
  switch (UnionLimitPlayOperation[e]) {
    case "NONE":
      return;
    case "LimitPlayerAction":
      return i(r, new limit_player_action_js_1.LimitPlayerAction());
    case "LimitPlayerBlockAll":
      return i(r, new limit_player_block_all_js_1.LimitPlayerBlockAll());
    case "LimitPlayerCamera":
      return i(r, new limit_player_camera_js_1.LimitPlayerCamera());
    case "LimitPlayerMouse":
      return i(r, new limit_player_mouse_js_1.LimitPlayerMouse());
    case "LimitPlayerMove":
      return i(r, new limit_player_move_js_1.LimitPlayerMove());
    case "LimitPlayerMoveNew":
      return i(r, new limit_player_move_new_js_1.LimitPlayerMoveNew());
    case "LimitPlayerUI":
      return i(r, new limit_player_ui_js_1.LimitPlayerUI());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.LimitPlayerAction = 1)] = "LimitPlayerAction"),
    (e[(e.LimitPlayerBlockAll = 2)] = "LimitPlayerBlockAll"),
    (e[(e.LimitPlayerCamera = 3)] = "LimitPlayerCamera"),
    (e[(e.LimitPlayerMouse = 4)] = "LimitPlayerMouse"),
    (e[(e.LimitPlayerMove = 5)] = "LimitPlayerMove"),
    (e[(e.LimitPlayerMoveNew = 6)] = "LimitPlayerMoveNew"),
    (e[(e.LimitPlayerUI = 7)] = "LimitPlayerUI");
})(
  (UnionLimitPlayOperation =
    exports.UnionLimitPlayOperation || (exports.UnionLimitPlayOperation = {})),
),
  (exports.unionToUnionLimitPlayOperation = unionToUnionLimitPlayOperation),
  (exports.unionListToUnionLimitPlayOperation =
    unionListToUnionLimitPlayOperation);
//# sourceMappingURL=union-limit-play-operation.js.map
