"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportModel = void 0);
const ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  GameModePromise_1 = require("../../World/Define/GameModePromise");
class TeleportModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.QIo = void 0),
      (this.XIo = void 0),
      (this.$Io = void 0),
      (this.StartGravityDirectCache = void 0),
      (this.YIo = void 0),
      (this.JIo = void 0),
      (this.TargetGravityDirectCache = void 0),
      (this.pml = !0),
      (this.TeleportMode = 1),
      (this.TeleportCameraFadeStatus = void 0),
      (this.CallSource = void 0),
      (this.CheckStreamingCompletedTimerId = void 0),
      (this.CheckPhysicsCompletedTimerId = void 0),
      (this.zIo = void 0),
      (this.DisableAutoFade = !1),
      (this.x$s = void 0),
      (this.eTo = void 0),
      (this.tTo = void 0),
      (this.shh = void 0),
      (this.AllowTeleport = !0),
      (this.TeleportEntityCreatureDataId = 0),
      (this.IsInSeamlessTeleport = !1),
      (this.Treadmill = void 0),
      (this.PostProcess = void 0),
      (this.SeamlessConfig = void 0),
      (this.SeamlessEffectData = void 0),
      (this.SeamlessEndHandle = void 0),
      (this.Bea = void 0),
      (this.ch1 = void 0),
      (this.uh1 = void 0),
      (this.dh1 = void 0),
      (this.mh1 = void 0),
      (this.fh1 = void 0);
  }
  get IsTeleport() {
    return this.QIo;
  }
  set IsTeleport(t) {
    this.QIo = t;
  }
  get StartPosition() {
    return this.XIo;
  }
  set StartPosition(t) {
    this.XIo = t;
  }
  get StartRotation() {
    return this.$Io;
  }
  set StartRotation(t) {
    this.$Io = t;
  }
  get StartGravityDirect() {
    return this.StartGravityDirectCache;
  }
  set StartGravityDirect(t) {
    this.StartGravityDirectCache = t;
  }
  get TargetPosition() {
    return this.YIo;
  }
  set TargetPosition(t) {
    this.YIo = t;
  }
  get TargetRotation() {
    return this.JIo;
  }
  set TargetRotation(t) {
    this.JIo = t;
  }
  get TargetGravityDirect() {
    return this.TargetGravityDirectCache;
  }
  set TargetGravityDirect(t) {
    this.TargetGravityDirectCache = t;
  }
  get NeedRestoreCamera() {
    return this.pml;
  }
  set NeedRestoreCamera(t) {
    this.pml = t;
  }
  get StreamingCompleted() {
    return this.zIo;
  }
  get VoxelStreamingCompleted() {
    return this.x$s;
  }
  get TeleportFinishRequest() {
    return this.eTo;
  }
  get CgTeleportCompleted() {
    return this.tTo;
  }
  get TeleportWaitRequest() {
    return this.shh;
  }
  get TreadmillLoaded() {
    return this.ch1;
  }
  get TreadmillLeastTimeFinished() {
    return this.uh1;
  }
  get EffectFillScreen() {
    return this.Bea;
  }
  get TreadmillDisappeared() {
    return this.dh1;
  }
  get PostProcessBlendedIn() {
    return this.mh1;
  }
  get PostProcessBlendedOut() {
    return this.fh1;
  }
  OnInit() {
    return (
      (this.XIo = Vector_1.Vector.Create()),
      (this.YIo = Vector_1.Vector.Create()),
      (this.$Io = Rotator_1.Rotator.Create()),
      (this.JIo = Rotator_1.Rotator.Create()),
      (this.StartGravityDirectCache = Vector_1.Vector.Create()),
      (this.TargetGravityDirectCache = Vector_1.Vector.Create()),
      !(this.TeleportCameraFadeStatus = !1)
    );
  }
  OnClear() {
    return (
      (this.XIo = void 0),
      (this.YIo = void 0),
      (this.$Io = void 0),
      (this.JIo = void 0),
      (this.StartGravityDirectCache = void 0),
      (this.TargetGravityDirectCache = void 0),
      !(this.TeleportCameraFadeStatus = !1)
    );
  }
  OnLeaveLevel() {
    return (this.AllowTeleport = !0);
  }
  CreatePromise() {
    (this.zIo = new GameModePromise_1.GameModePromise()),
      (this.x$s = new GameModePromise_1.GameModePromise()),
      (this.eTo = new GameModePromise_1.GameModePromise()),
      (this.tTo = new GameModePromise_1.GameModePromise()),
      (this.Bea = new GameModePromise_1.GameModePromise()),
      (this.ch1 = new GameModePromise_1.GameModePromise()),
      (this.uh1 = new GameModePromise_1.GameModePromise()),
      (this.dh1 = new GameModePromise_1.GameModePromise()),
      (this.mh1 = new GameModePromise_1.GameModePromise()),
      (this.fh1 = new GameModePromise_1.GameModePromise()),
      (this.shh = new GameModePromise_1.GameModePromise());
  }
  ResetPromise() {
    (this.zIo = void 0),
      (this.x$s = void 0),
      (this.eTo = void 0),
      (this.tTo = void 0),
      (this.Bea = void 0),
      (this.ch1 = void 0),
      (this.uh1 = void 0),
      (this.dh1 = void 0),
      (this.mh1 = void 0),
      (this.fh1 = void 0),
      (this.shh = void 0);
  }
}
exports.TeleportModel = TeleportModel;
//# sourceMappingURL=TeleportModel.js.map
