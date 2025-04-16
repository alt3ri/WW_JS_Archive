"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionLeisureInteractOption =
    exports.unionToUnionLeisureInteractOption =
    exports.UnionLeisureInteractOption =
      void 0);
const bounce_js_1 = require("../fb-action/bounce.js"),
  catapult_js_1 = require("../fb-action/catapult.js"),
  failure_pose_interact_js_1 = require("../fb-action/failure-pose-interact.js"),
  gameplay_pose1_interact_js_1 = require("../fb-action/gameplay-pose1-interact.js"),
  gameplay_pose2_interact_js_1 = require("../fb-action/gameplay-pose2-interact.js"),
  gameplay_pose3_interact_js_1 = require("../fb-action/gameplay-pose3-interact.js"),
  get_up_js_1 = require("../fb-action/get-up.js"),
  glide_js_1 = require("../fb-action/glide.js"),
  hook_lock_interact_js_1 = require("../fb-action/hook-lock-interact.js"),
  kite_hook_interact_js_1 = require("../fb-action/kite-hook-interact.js"),
  manipulate_js_1 = require("../fb-action/manipulate.js"),
  sit_down_js_1 = require("../fb-action/sit-down.js"),
  sit_on_ground_js_1 = require("../fb-action/sit-on-ground.js"),
  soar_js_1 = require("../fb-action/soar.js"),
  stand_control_js_1 = require("../fb-action/stand-control.js"),
  stand_control2_js_1 = require("../fb-action/stand-control2.js"),
  super_catapult_js_1 = require("../fb-action/super-catapult.js");
var UnionLeisureInteractOption;
function unionToUnionLeisureInteractOption(e, t) {
  switch (UnionLeisureInteractOption[e]) {
    case "NONE":
      return;
    case "Bounce":
      return t(new bounce_js_1.Bounce());
    case "Catapult":
      return t(new catapult_js_1.Catapult());
    case "FailurePoseInteract":
      return t(new failure_pose_interact_js_1.FailurePoseInteract());
    case "GameplayPose1Interact":
      return t(new gameplay_pose1_interact_js_1.GameplayPose1Interact());
    case "GameplayPose2Interact":
      return t(new gameplay_pose2_interact_js_1.GameplayPose2Interact());
    case "GameplayPose3Interact":
      return t(new gameplay_pose3_interact_js_1.GameplayPose3Interact());
    case "GetUp":
      return t(new get_up_js_1.GetUp());
    case "Glide":
      return t(new glide_js_1.Glide());
    case "HookLockInteract":
      return t(new hook_lock_interact_js_1.HookLockInteract());
    case "KiteHookInteract":
      return t(new kite_hook_interact_js_1.KiteHookInteract());
    case "Manipulate":
      return t(new manipulate_js_1.Manipulate());
    case "SitDown":
      return t(new sit_down_js_1.SitDown());
    case "SitOnGround":
      return t(new sit_on_ground_js_1.SitOnGround());
    case "Soar":
      return t(new soar_js_1.Soar());
    case "StandControl":
      return t(new stand_control_js_1.StandControl());
    case "StandControl2":
      return t(new stand_control2_js_1.StandControl2());
    case "SuperCatapult":
      return t(new super_catapult_js_1.SuperCatapult());
    default:
      return;
  }
}
function unionListToUnionLeisureInteractOption(e, t, n) {
  switch (UnionLeisureInteractOption[e]) {
    case "NONE":
      return;
    case "Bounce":
      return t(n, new bounce_js_1.Bounce());
    case "Catapult":
      return t(n, new catapult_js_1.Catapult());
    case "FailurePoseInteract":
      return t(n, new failure_pose_interact_js_1.FailurePoseInteract());
    case "GameplayPose1Interact":
      return t(n, new gameplay_pose1_interact_js_1.GameplayPose1Interact());
    case "GameplayPose2Interact":
      return t(n, new gameplay_pose2_interact_js_1.GameplayPose2Interact());
    case "GameplayPose3Interact":
      return t(n, new gameplay_pose3_interact_js_1.GameplayPose3Interact());
    case "GetUp":
      return t(n, new get_up_js_1.GetUp());
    case "Glide":
      return t(n, new glide_js_1.Glide());
    case "HookLockInteract":
      return t(n, new hook_lock_interact_js_1.HookLockInteract());
    case "KiteHookInteract":
      return t(n, new kite_hook_interact_js_1.KiteHookInteract());
    case "Manipulate":
      return t(n, new manipulate_js_1.Manipulate());
    case "SitDown":
      return t(n, new sit_down_js_1.SitDown());
    case "SitOnGround":
      return t(n, new sit_on_ground_js_1.SitOnGround());
    case "Soar":
      return t(n, new soar_js_1.Soar());
    case "StandControl":
      return t(n, new stand_control_js_1.StandControl());
    case "StandControl2":
      return t(n, new stand_control2_js_1.StandControl2());
    case "SuperCatapult":
      return t(n, new super_catapult_js_1.SuperCatapult());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.Bounce = 1)] = "Bounce"),
    (e[(e.Catapult = 2)] = "Catapult"),
    (e[(e.FailurePoseInteract = 3)] = "FailurePoseInteract"),
    (e[(e.GameplayPose1Interact = 4)] = "GameplayPose1Interact"),
    (e[(e.GameplayPose2Interact = 5)] = "GameplayPose2Interact"),
    (e[(e.GameplayPose3Interact = 6)] = "GameplayPose3Interact"),
    (e[(e.GetUp = 7)] = "GetUp"),
    (e[(e.Glide = 8)] = "Glide"),
    (e[(e.HookLockInteract = 9)] = "HookLockInteract"),
    (e[(e.KiteHookInteract = 10)] = "KiteHookInteract"),
    (e[(e.Manipulate = 11)] = "Manipulate"),
    (e[(e.SitDown = 12)] = "SitDown"),
    (e[(e.SitOnGround = 13)] = "SitOnGround"),
    (e[(e.Soar = 14)] = "Soar"),
    (e[(e.StandControl = 15)] = "StandControl"),
    (e[(e.StandControl2 = 16)] = "StandControl2"),
    (e[(e.SuperCatapult = 17)] = "SuperCatapult");
})(
  (UnionLeisureInteractOption =
    exports.UnionLeisureInteractOption ||
    (exports.UnionLeisureInteractOption = {})),
),
  (exports.unionToUnionLeisureInteractOption =
    unionToUnionLeisureInteractOption),
  (exports.unionListToUnionLeisureInteractOption =
    unionListToUnionLeisureInteractOption);
//# sourceMappingURL=union-leisure-interact-option.js.map
