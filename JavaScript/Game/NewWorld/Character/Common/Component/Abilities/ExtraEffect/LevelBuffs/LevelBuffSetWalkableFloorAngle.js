"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelBuffSetWalkableFloorAngle = void 0);
const Log_1 = require("../../../../../../../../Core/Common/Log"),
  LevelBuffBase_1 = require("./LevelBuffBase");
class LevelBuffSetWalkableFloorAngle extends LevelBuffBase_1.LevelBuffBase {
  constructor() {
    super(...arguments), (this.s$o = 0);
  }
  OnCreated() {
    var e = this.Entity.CheckGetComponent(163).CharacterMovement,
      l = ((this.s$o = e.WalkableFloorAngle), Number(this.Params[0]));
    l
      ? e.SetWalkableFloorAngle(l)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Level",
          29,
          "LevelBuffSetWalkableFloorAngle玩法效果缺少参数",
          ["Buff", this.BuffId],
        );
  }
  OnRemoved(e) {
    this.Entity.CheckGetComponent(163).CharacterMovement.SetWalkableFloorAngle(
      this.s$o,
    );
  }
}
exports.LevelBuffSetWalkableFloorAngle = LevelBuffSetWalkableFloorAngle;
//# sourceMappingURL=LevelBuffSetWalkableFloorAngle.js.map
