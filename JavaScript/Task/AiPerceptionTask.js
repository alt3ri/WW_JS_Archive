"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiPerceptionTask = void 0;
const UE = require("ue");
const JsModelManager_1 = require("../Core/Model/JsModelManager");
const AsyncAiPerception_1 = require("./AsyncObject/AsyncAiPerception");
const TaskBase_1 = require("./TaskBase");
class AiPerceptionTask extends TaskBase_1.TaskBase {
  static StartTask(message) {
    const perceptionHandle = message.AiPerceptionHandle;
    if (perceptionHandle <= 0) {
      return undefined;
    }
    if (!this._private_HasInitialized) {
      this._private_HasInitialized = true;
      JsModelManager_1.JsModelManager.HasInitialized = true;
    }
    if (!this._private_LineTrace) {
      this._private_LineTrace = UE.NewObject(UE.TraceLineElement.StaticClass());
      this._private_LineTrace.bIsSingle = true;
      this._private_LineTrace.bIgnoreSelf = true;
    }
    this._private_AsyncAiPerception.OnTick(
      perceptionHandle,
      this._private_LineTrace,
    );
    return undefined;
  }
}
exports.AiPerceptionTask = AiPerceptionTask;
AiPerceptionTask._private_HasInitialized = false;
AiPerceptionTask._private_LineTrace = undefined;
AiPerceptionTask._private_AsyncAiPerception =
  new AsyncAiPerception_1.AsyncAiPerception();
//# sourceMappingURL=AiPerceptionTask.js.map
