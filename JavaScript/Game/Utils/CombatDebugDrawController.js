"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CombatDebugDrawController = void 0);
const UE = require("ue"),
  EntitySystem_1 = require("../../Core/Entity/EntitySystem"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  Macro_1 = require("../../Core/Preprocessor/Macro"),
  Vector_1 = require("../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  CombatDebugController_1 = require("./CombatDebugController");
class CombatDebugDrawController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      (this.RedColor = new UE.LinearColor(1, 0, 0, 1)),
      (this.GreenColor = new UE.LinearColor(0, 1, 0, 1)),
      (this.BlueColor = new UE.LinearColor(0, 0, 1, 1)),
      (this.YellowColor = new UE.LinearColor(1, 1, 0, 1)),
      (this.EntityBoxColor = new UE.LinearColor(0.8, 0.8, 0, 0.5)),
      (this.EntityBoxColorInvincible = new UE.LinearColor(0.5, 0.5, 1, 1)),
      (this.EntityBoxColorCollisionDisabled = new UE.LinearColor(
        0.5,
        0.5,
        0.5,
        0.5,
      )),
      (this.EntityBoxInfoColor = new UE.LinearColor(0.8, 0.8, 1, 0.5)),
      !0
    );
  }
  static OnTick(r) {
    this.DebugMonsterControl;
  }
}
((exports.CombatDebugDrawController =
  CombatDebugDrawController).DebugMonsterMovePath = !1),
  (CombatDebugDrawController.DebugMonsterControl = !1),
  (CombatDebugDrawController.IsDrawEntityBoxEnabled = !0),
  (CombatDebugDrawController.IsDrawEntityBoxInfoEnabled = !1),
  (CombatDebugDrawController.RedColor = void 0),
  (CombatDebugDrawController.GreenColor = void 0),
  (CombatDebugDrawController.BlueColor = void 0),
  (CombatDebugDrawController.YellowColor = void 0),
  (CombatDebugDrawController.EntityBoxColor = void 0),
  (CombatDebugDrawController.EntityBoxColorInvincible = void 0),
  (CombatDebugDrawController.EntityBoxColorCollisionDisabled = void 0),
  (CombatDebugDrawController.EntityBoxInfoColor = void 0),
  (CombatDebugDrawController.ggr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.fgr = Vector_1.Vector.Create()),
  (CombatDebugDrawController.Cgr = new Map());
//# sourceMappingURL=CombatDebugDrawController.js.map
