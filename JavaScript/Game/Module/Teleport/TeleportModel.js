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
      (this.YIo = void 0),
      (this.JIo = void 0),
      (this.TeleportMode = 1),
      (this.TeleportCameraFadeStatus = void 0),
      (this.CallSource = void 0),
      (this.CheckStreamingCompletedTimerId = void 0),
      (this.CheckPhysicsCompletedTimerId = void 0),
      (this.zIo = void 0),
      (this.x$s = void 0),
      (this.eTo = void 0),
      (this.tTo = void 0),
      (this.IsInSeamlessTeleport = !1),
      (this.Treadmill = void 0),
      (this.SeamlessConfig = void 0),
      (this.SeamlessEffectData = void 0),
      (this.SeamlessEndHandle = void 0),
      (this.wea = void 0),
      (this.Bea = void 0),
      (this.bea = void 0);
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
  get SeamlessAssetLoaded() {
    return this.wea;
  }
  get EffectFillScreen() {
    return this.Bea;
  }
  get TransitionMapUnloaded() {
    return this.bea;
  }
  OnInit() {
    return (
      (this.XIo = Vector_1.Vector.Create()),
      (this.YIo = Vector_1.Vector.Create()),
      (this.$Io = Rotator_1.Rotator.Create()),
      (this.JIo = Rotator_1.Rotator.Create()),
      !(this.TeleportCameraFadeStatus = !1)
    );
  }
  OnClear() {
    return (
      (this.XIo = void 0),
      (this.YIo = void 0),
      (this.$Io = void 0),
      (this.JIo = void 0),
      !(this.TeleportCameraFadeStatus = !1)
    );
  }
  CreatePromise() {
    (this.zIo = new GameModePromise_1.GameModePromise()),
      (this.x$s = new GameModePromise_1.GameModePromise()),
      (this.eTo = new GameModePromise_1.GameModePromise()),
      (this.tTo = new GameModePromise_1.GameModePromise()),
      (this.wea = new GameModePromise_1.GameModePromise()),
      (this.Bea = new GameModePromise_1.GameModePromise()),
      (this.bea = new GameModePromise_1.GameModePromise());
  }
  ResetPromise() {
    (this.zIo = void 0),
      (this.x$s = void 0),
      (this.eTo = void 0),
      (this.tTo = void 0),
      (this.wea = void 0),
      (this.Bea = void 0),
      (this.bea = void 0);
  }
}
exports.TeleportModel = TeleportModel;
//# sourceMappingURL=TeleportModel.js.map
