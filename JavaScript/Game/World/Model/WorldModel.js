"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldModel =
    exports.WorldEnvironmentInfo =
    exports.MOBILE_CSM_DISTANCE_OUTCAVE =
    exports.MOBILE_CSM_DISTANCE_INCAVE =
      void 0);
const Queue_1 = require("../../../Core/Container/Queue"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  DEFAULT_ENVIRONMENTTYPE = 255;
(exports.MOBILE_CSM_DISTANCE_INCAVE = 2e4),
  (exports.MOBILE_CSM_DISTANCE_OUTCAVE = 8e3);
class WorldEnvironmentInfo {
  constructor() {
    (this.E9 = DEFAULT_ENVIRONMENTTYPE),
      (this.NEr = ""),
      (this.OEr = ""),
      (this.un = 6),
      (this.bNn = 1);
  }
  get DataLayerType() {
    return this.NEr;
  }
  get SubDataLayerType() {
    return this.OEr;
  }
  get LoadType() {
    return this.un;
  }
  get CaveMode() {
    return this.bNn;
  }
  IsEqual(e) {
    return this.E9 === e;
  }
  IsEnCloseEnvironment() {
    return 0 === this.E9 || 1 === this.E9;
  }
  get EnvType() {
    return this.E9;
  }
  SetInfo(e) {
    switch (e.EnvType) {
      case 0:
        (this.NEr = "DataLayerRuntime_EncloseSpace"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSub"),
          (this.bNn = 2);
        break;
      case 2:
        (this.NEr = "DataLayerRuntime_EncloseSpace"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSub"),
          (this.bNn = 3);
        break;
      case 1:
        (this.NEr = "DataLayerRuntime_EncloseSpaceRoom"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSubRoom"),
          (this.bNn = 2);
        break;
      default:
        this.bNn = 1;
    }
    (this.un = e.StreamingType), (this.E9 = e.EnvType);
  }
  ResetInfo() {
    this.E9 = DEFAULT_ENVIRONMENTTYPE;
  }
}
exports.WorldEnvironmentInfo = WorldEnvironmentInfo;
class WorldModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.TickIntervalSchedulers = new Array()),
      (this.kEr = void 0),
      (this.$5e = !1),
      (this.FEr = !1),
      (this.ChangeSchedulerLastType = 0),
      (this.ChangeSchedulerDeltaFrameCount = 0),
      (this.CurrentSchedulerDelta = 0),
      (this.VEr = new Map()),
      (this.DestroyActorQueue = new Queue_1.Queue()),
      (this.ActorsToIgnoreSet = new Set()),
      (this.CurEnvironmentInfo = new WorldEnvironmentInfo()),
      (this.IsEnableEnvironmentDetecting = !0);
  }
  get ControlPlayerLastLocation() {
    return ModelManager_1.ModelManager.WorldModel.kEr;
  }
  set ControlPlayerLastLocation(e) {
    this.kEr = e;
  }
  get WorldStateMap() {
    return this.VEr;
  }
  set WorldStateMap(e) {
    this.VEr = e;
  }
  UpdateWorldState(e) {
    for (const r of Object.keys(e)) {
      var t = e[r],
        s = Number(MathUtils_1.MathUtils.LongToBigInt(t.JIs));
      switch (r) {
        case "DefaultState":
        case "NpcWorldState":
          this.VEr.set(r, s);
      }
    }
  }
  GetMapDone() {
    return this.FEr;
  }
  SetMapDone(e) {
    this.FEr = e;
  }
  GetWorldDone() {
    return this.$5e;
  }
  SetWorldDone(e) {
    this.$5e = e;
  }
  static AddTsSimpleInteractItem(e) {
    let t = this.HEr.get(e.TypeId);
    t || ((t = new Set()), this.HEr.set(e.TypeId, t)), t.add(e);
  }
  static RemoveTsSimpleInteractItem(e) {
    var t = this.HEr.get(e.TypeId);
    t && t.delete(e);
  }
  static GetTsSimpleInteractItemById(e) {
    return this.HEr.get(e);
  }
  AddDestroyActor(e, t, s) {
    s?.IsValid() && this.DestroyActorQueue.Push([e, t, s]);
  }
  PopDestroyActor() {
    if (0 !== this.DestroyActorQueue.Size) return this.DestroyActorQueue.Pop();
  }
  AddIgnore(e) {
    !e?.IsValid() ||
      this.ActorsToIgnoreSet.has(e) ||
      this.ActorsToIgnoreSet.add(e);
  }
  RemoveIgnore(e) {
    return !!e?.IsValid() && this.ActorsToIgnoreSet.delete(e);
  }
  ClearIgnore() {
    this.ActorsToIgnoreSet.clear();
  }
  HandleEnvironmentUpdate(e) {
    let t = 0;
    if (!this.CurEnvironmentInfo.IsEqual(e.EnvType)) {
      switch (this.CurEnvironmentInfo.EnvType) {
        case DEFAULT_ENVIRONMENTTYPE:
          2 === e.EnvType && (t = 1),
            (0 !== e.EnvType && 1 !== e.EnvType) || (t = 5);
          break;
        case 2:
          e.EnvType === DEFAULT_ENVIRONMENTTYPE && (t = 4),
            (0 !== e.EnvType && 1 !== e.EnvType) || (t = 3);
          break;
        case 0:
        case 1:
          e.EnvType === DEFAULT_ENVIRONMENTTYPE && (t = 6),
            2 === e.EnvType && (t = 2);
      }
      this.CurEnvironmentInfo.SetInfo(e);
    }
    return t;
  }
}
((exports.WorldModel = WorldModel).IsStandalone = !1),
  (WorldModel.HEr = new Map());
//# sourceMappingURL=WorldModel.js.map
