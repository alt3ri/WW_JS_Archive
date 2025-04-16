"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetFlowTemplate = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCameraPosAndRot_1 = require("./FbCameraPosAndRot"),
  FbCameraSetting_1 = require("./FbCameraSetting"),
  FbFlowActorIndexData_1 = require("./FbFlowActorIndexData"),
  FbFlowTemplateMode_1 = require("./FbFlowTemplateMode"),
  FbPosAndRot_1 = require("./FbPosAndRot"),
  FbSetCameraAnim_1 = require("./FbSetCameraAnim"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSetFlowTemplate {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.ogh = !1),
      (this.ngh = !1),
      (this.sfh = !1),
      (this.afh = void 0),
      (this.hfh = !1),
      (this.lfh = void 0),
      (this.Jgh = !1),
      (this.Zgh = void 0),
      (this._fh = !1),
      (this.cfh = void 0),
      (this.ufh = !1),
      (this.dfh = void 0),
      (this.mfh = !1),
      (this.Cfh = void 0),
      (this.gfh = !1),
      (this.ffh = void 0),
      (this.pfh = !1),
      (this.vfh = void 0),
      (this.Gfh = !1),
      (this.Ofh = 0);
  }
  static Create(t) {
    if (t) return new FbSetFlowTemplate(t);
  }
  get _folded() {
    return (
      this.ogh || ((this.ogh = !0), (this.ngh = this.FbDataInternal.folded())),
      this.ngh
    );
  }
  get TemplateMode() {
    return (
      this.sfh ||
        ((this.sfh = !0),
        (this.afh = FbFlowTemplateMode_1.FbFlowTemplateMode.Create(
          this.FbDataInternal.templateMode(),
        ))),
      this.afh
    );
  }
  get TargetPos() {
    return (
      this.hfh ||
        ((this.hfh = !0),
        (this.lfh = FbPosAndRot_1.FbPosAndRot.Create(
          this.FbDataInternal.targetPos(),
        ))),
      this.lfh
    );
  }
  get CameraAnim() {
    return (
      this.Jgh ||
        ((this.Jgh = !0),
        (this.Zgh = FbSetCameraAnim_1.FbSetCameraAnim.Create(
          this.FbDataInternal.cameraAnim(),
        ))),
      this.Zgh
    );
  }
  get CameraOffset() {
    return (
      this._fh ||
        ((this._fh = !0),
        (this.cfh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.cameraOffset(),
        ))),
      this.cfh
    );
  }
  get CameraRotate() {
    return (
      this.ufh ||
        ((this.ufh = !0),
        (this.dfh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.cameraRotate(),
        ))),
      this.dfh
    );
  }
  get CameraPosAndRot() {
    return (
      this.mfh ||
        ((this.mfh = !0),
        (this.Cfh = FbCameraPosAndRot_1.FbCameraPosAndRot.Create(
          this.FbDataInternal.cameraPosAndRot(),
        ))),
      this.Cfh
    );
  }
  get CameraSetting() {
    return (
      this.gfh ||
        ((this.gfh = !0),
        (this.ffh = FbCameraSetting_1.FbCameraSetting.Create(
          this.FbDataInternal.cameraSetting(),
        ))),
      this.ffh
    );
  }
  get ActorIndexArray() {
    if (!this.pfh) {
      (this.pfh = !0), (this.vfh = new Array());
      var e = this.FbDataInternal.actorIndexArrayLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.actorIndexArray(
            t,
            new fb_action_1.FlowActorIndexData(),
          );
          this.vfh.push(FbFlowActorIndexData_1.FbFlowActorIndexData.Create(i));
        }
    }
    return this.vfh;
  }
  get DelayTime() {
    return (
      this.Gfh ||
        ((this.Gfh = !0), (this.Ofh = this.FbDataInternal.delayTime())),
      this.Ofh
    );
  }
}
exports.FbSetFlowTemplate = FbSetFlowTemplate;
//# sourceMappingURL=FbSetFlowTemplate.js.map
