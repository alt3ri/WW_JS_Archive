"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SetFlowTemplate = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  camera_pos_and_rot_js_1 = require("../fb-action/camera-pos-and-rot.js"),
  camera_setting_js_1 = require("../fb-action/camera-setting.js"),
  flow_actor_index_data_js_1 = require("../fb-action/flow-actor-index-data.js"),
  flow_template_mode_js_1 = require("../fb-action/flow-template-mode.js"),
  pos_and_rot_js_1 = require("../fb-action/pos-and-rot.js"),
  set_camera_anim_js_1 = require("../fb-action/set-camera-anim.js"),
  vector_info_js_1 = require("../fb-var/vector-info.js");
class SetFlowTemplate {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsSetFlowTemplate(t, e) {
    return (e || new SetFlowTemplate()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsSetFlowTemplate(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new SetFlowTemplate()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  folded() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return !!t && !!this.bb.readInt8(this.bb_pos + t);
  }
  templateMode(t) {
    var e = this.bb.__offset(this.bb_pos, 6);
    return e
      ? (t || new flow_template_mode_js_1.FlowTemplateMode()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  targetPos(t) {
    var e = this.bb.__offset(this.bb_pos, 8);
    return e
      ? (t || new pos_and_rot_js_1.PosAndRot()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraAnim(t) {
    var e = this.bb.__offset(this.bb_pos, 10);
    return e
      ? (t || new set_camera_anim_js_1.SetCameraAnim()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraOffset(t) {
    var e = this.bb.__offset(this.bb_pos, 12);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraRotate(t) {
    var e = this.bb.__offset(this.bb_pos, 14);
    return e
      ? (t || new vector_info_js_1.VectorInfo()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraPosAndRot(t) {
    var e = this.bb.__offset(this.bb_pos, 16);
    return e
      ? (t || new camera_pos_and_rot_js_1.CameraPosAndRot()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  cameraSetting(t) {
    var e = this.bb.__offset(this.bb_pos, 18);
    return e
      ? (t || new camera_setting_js_1.CameraSetting()).__init(
          this.bb.__indirect(this.bb_pos + e),
          this.bb,
        )
      : void 0;
  }
  actorIndexArray(t, e) {
    var a = this.bb.__offset(this.bb_pos, 20);
    return a
      ? (e || new flow_actor_index_data_js_1.FlowActorIndexData()).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + a) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  actorIndexArrayLength() {
    var t = this.bb.__offset(this.bb_pos, 20);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  delayTime() {
    var t = this.bb.__offset(this.bb_pos, 22);
    return t ? this.bb.readFloat32(this.bb_pos + t) : 0;
  }
  static startSetFlowTemplate(t) {
    t.startObject(10);
  }
  static addFolded(t, e) {
    t.addFieldInt8(0, +e, 0);
  }
  static addTemplateMode(t, e) {
    t.addFieldOffset(1, e, 0);
  }
  static addTargetPos(t, e) {
    t.addFieldOffset(2, e, 0);
  }
  static addCameraAnim(t, e) {
    t.addFieldOffset(3, e, 0);
  }
  static addCameraOffset(t, e) {
    t.addFieldOffset(4, e, 0);
  }
  static addCameraRotate(t, e) {
    t.addFieldOffset(5, e, 0);
  }
  static addCameraPosAndRot(t, e) {
    t.addFieldOffset(6, e, 0);
  }
  static addCameraSetting(t, e) {
    t.addFieldOffset(7, e, 0);
  }
  static addActorIndexArray(t, e) {
    t.addFieldOffset(8, e, 0);
  }
  static createActorIndexArrayVector(e, a) {
    e.startVector(4, a.length, 4);
    for (let t = a.length - 1; 0 <= t; t--) e.addOffset(a[t]);
    return e.endVector();
  }
  static startActorIndexArrayVector(t, e) {
    t.startVector(4, e, 4);
  }
  static addDelayTime(t, e) {
    t.addFieldFloat32(9, e, 0);
  }
  static endSetFlowTemplate(t) {
    return t.endObject();
  }
}
exports.SetFlowTemplate = SetFlowTemplate;
//# sourceMappingURL=set-flow-template.js.map
