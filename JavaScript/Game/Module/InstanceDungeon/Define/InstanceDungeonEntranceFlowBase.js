"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowBase = void 0);
const Log_1 = require("../../../../Core/Common/Log");
class InstanceDungeonEntranceFlowBase {
  constructor() {
    (this.Lai = new Array()), (this.Dai = -1), this.OnCreate();
  }
  get r$t() {
    return 0 < this.Dai && this.Dai >= this.Lai.length;
  }
  Rai() {
    ++this.Dai,
      this.Dai < 0 || this.Dai >= this.Lai.length
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            17,
            "副本进入流程执行失败，当前步数与总步数不匹配！",
            ["CurrentStep", this.Dai],
          )
        : this.Lai[this.Dai]();
  }
  Reset() {
    this.Dai = -1;
  }
  ResetToBeforeLast() {
    this.Dai = this.Lai.length - 2;
  }
  Start() {
    this.Reset(), this.Rai();
  }
  Flow() {
    this.r$t || this.Rai();
  }
  RevertStep() {
    this.r$t || --this.Dai;
  }
  AddStep(t) {
    this.Lai.push(t);
  }
  OnCreate() {}
}
exports.InstanceDungeonEntranceFlowBase = InstanceDungeonEntranceFlowBase;
//# sourceMappingURL=InstanceDungeonEntranceFlowBase.js.map
