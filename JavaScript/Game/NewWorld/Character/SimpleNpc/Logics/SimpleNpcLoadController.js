"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SimpleNpcLoadController = void 0);
const Queue_1 = require("../../../../../Core/Container/Queue");
const ControllerBase_1 = require("../../../../../Core/Framework/ControllerBase");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SimpleNpcLoadController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (this.Mir = new Queue_1.Queue(256)), !0;
  }
  static OnLeaveLevel() {
    return !0;
  }
  static OnTick(e) {
    let r;
    ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      this.Mir.Size !== 0 &&
      ((r = this.Mir.Pop()), ObjectUtils_1.ObjectUtils.IsValid(r)) &&
      r.Mesh &&
      (r.LoadModelByDA() && r.SetDefaultCollision(), r.StartFlowLogic());
  }
  static AddSimpleNpc(e) {
    this.Mir && this.Mir.Push(e);
  }
}
(exports.SimpleNpcLoadController = SimpleNpcLoadController).Mir = void 0;
// # sourceMappingURL=SimpleNpcLoadController.js.map
