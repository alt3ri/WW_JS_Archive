"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDisableModulePlayerOperation = void 0);
const UnionCameraOperationHelper_1 = require("./UnionCameraOperationHelper"),
  UnionMoveOperationHelper_1 = require("./UnionMoveOperationHelper"),
  UnionSceneInteractionOperationHelper_1 = require("./UnionSceneInteractionOperationHelper"),
  UnionSkillOperationHelper_1 = require("./UnionSkillOperationHelper"),
  UnionUiOperationHelper_1 = require("./UnionUiOperationHelper");
class FbDisableModulePlayerOperation {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.qyh = !1),
      (this.kyh = void 0),
      (this.Gyh = !1),
      (this.Oyh = void 0),
      (this.Fyh = !1),
      (this.Nyh = void 0),
      (this.Vyh = !1),
      (this.jyh = void 0),
      (this.Hyh = !1),
      (this.Wyh = void 0);
  }
  static Create(e) {
    if (e) return new FbDisableModulePlayerOperation(e);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MoveOption() {
    var e, i;
    return (
      !this.qyh &&
        ((this.qyh = !0),
        (e = this.FbDataInternal.moveOptionType()),
        (i =
          UnionMoveOperationHelper_1.UnionMoveOperationHelper.GetUnionMoveOperationObject(
            e,
          ))) &&
        (this.kyh =
          UnionMoveOperationHelper_1.UnionMoveOperationHelper.ReadUnionMoveOperation(
            e,
            this.FbDataInternal.moveOption(i),
          )),
      this.kyh
    );
  }
  get SkillOption() {
    var e, i;
    return (
      !this.Gyh &&
        ((this.Gyh = !0),
        (e = this.FbDataInternal.skillOptionType()),
        (i =
          UnionSkillOperationHelper_1.UnionSkillOperationHelper.GetUnionSkillOperationObject(
            e,
          ))) &&
        (this.Oyh =
          UnionSkillOperationHelper_1.UnionSkillOperationHelper.ReadUnionSkillOperation(
            e,
            this.FbDataInternal.skillOption(i),
          )),
      this.Oyh
    );
  }
  get CameraOption() {
    var e, i;
    return (
      !this.Fyh &&
        ((this.Fyh = !0),
        (e = this.FbDataInternal.cameraOptionType()),
        (i =
          UnionCameraOperationHelper_1.UnionCameraOperationHelper.GetUnionCameraOperationObject(
            e,
          ))) &&
        (this.Nyh =
          UnionCameraOperationHelper_1.UnionCameraOperationHelper.ReadUnionCameraOperation(
            e,
            this.FbDataInternal.cameraOption(i),
          )),
      this.Nyh
    );
  }
  get UiOption() {
    var e, i;
    return (
      !this.Vyh &&
        ((this.Vyh = !0),
        (e = this.FbDataInternal.uiOptionType()),
        (i =
          UnionUiOperationHelper_1.UnionUiOperationHelper.GetUnionUiOperationObject(
            e,
          ))) &&
        (this.jyh =
          UnionUiOperationHelper_1.UnionUiOperationHelper.ReadUnionUiOperation(
            e,
            this.FbDataInternal.uiOption(i),
          )),
      this.jyh
    );
  }
  get SceneInteractionOption() {
    var e, i;
    return (
      !this.Hyh &&
        ((this.Hyh = !0),
        (e = this.FbDataInternal.sceneInteractionOptionType()),
        (i =
          UnionSceneInteractionOperationHelper_1.UnionSceneInteractionOperationHelper.GetUnionSceneInteractionOperationObject(
            e,
          ))) &&
        (this.Wyh =
          UnionSceneInteractionOperationHelper_1.UnionSceneInteractionOperationHelper.ReadUnionSceneInteractionOperation(
            e,
            this.FbDataInternal.sceneInteractionOption(i),
          )),
      this.Wyh
    );
  }
}
exports.FbDisableModulePlayerOperation = FbDisableModulePlayerOperation;
//# sourceMappingURL=FbDisableModulePlayerOperation.js.map
