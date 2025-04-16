"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JsModelManager = void 0);
const cpp_1 = require("cpp"),
  Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log");
class JsModelManager {
  static InitializeEnvironment() {
    var t = Info_1.Info.World;
    t
      ? (cpp_1.FModelManager.InitializeEnvironment(t),
        (this.HasInitialized = !0))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Core",
          36,
          "JsModelManager.InitializeEnvironment Fail!!!",
        );
  }
  static DestroyEnvironment() {
    cpp_1.FModelManager.DestroyEnvironment();
  }
  static get ci_() {
    return this.ui_ || (this.ui_ = cpp_1.FModelManager.GetAiModel()), this.ui_;
  }
  static get di_() {
    return (
      this.mi_ || (this.mi_ = cpp_1.FModelManager.GetEntityModel()), this.mi_
    );
  }
  static AddEntity(t) {
    if (this.HasInitialized) return this.di_?.CreateEntityData(t);
  }
  static UpdateEntityActor(t, i) {
    this.HasInitialized && this.di_?.UpdateEntityActor(t, i);
  }
  static RemoveEntity(t) {
    this.HasInitialized && this.di_?.DestroyEntityData(t);
  }
  static GetEntityById(t) {
    if (this.HasInitialized) return this.di_?.GetEntityById(t);
  }
  static GetEntityByActor(t) {
    if (this.HasInitialized) return this.di_?.GetEntityByActor(t);
  }
  static AddAiPerception(t) {
    if (this.HasInitialized) return this.ci_?.CreateAiPerceptionData(t);
  }
  static RemoveAiPerception(t) {
    this.HasInitialized && this.ci_?.DestroyAiPerceptionData(t);
  }
  static GetAiPerception(t) {
    if (this.HasInitialized) return this.ci_?.GetAiPerceptionData(t);
  }
}
((exports.JsModelManager = JsModelManager).HasInitialized = !1),
  (JsModelManager.ui_ = void 0),
  (JsModelManager.mi_ = void 0);
//# sourceMappingURL=JsModelManager.js.map
