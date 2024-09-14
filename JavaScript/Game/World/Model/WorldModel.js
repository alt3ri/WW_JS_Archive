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
      (this.jNn = 1);
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
    return this.jNn;
  }
  IsEqual(t) {
    return this.E9 === t;
  }
  IsEnCloseEnvironment() {
    return 0 === this.E9 || 1 === this.E9;
  }
  get EnvType() {
    return this.E9;
  }
  SetInfo(t) {
    switch (t.EnvType) {
      case 0:
        (this.NEr = "DataLayerRuntime_EncloseSpace"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSub"),
          (this.jNn = 2);
        break;
      case 2:
        (this.NEr = "DataLayerRuntime_EncloseSpace"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSub"),
          (this.jNn = 3);
        break;
      case 1:
        (this.NEr = "DataLayerRuntime_EncloseSpaceRoom"),
          (this.OEr = "DataLayerRuntime_EncloseSpaceSubRoom"),
          (this.jNn = 2);
        break;
      default:
        this.jNn = 1;
    }
    (this.un = t.StreamingType), (this.E9 = t.EnvType);
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
      (this.VZa = new Map()),
      (this.DestroyActorQueue = new Queue_1.Queue()),
      (this.ActorsToIgnoreSet = new Set()),
      (this.CurEnvironmentInfo = new WorldEnvironmentInfo()),
      (this.IsEnableEnvironmentDetecting = !0);
  }
  get ControlPlayerLastLocation() {
    return ModelManager_1.ModelManager.WorldModel.kEr;
  }
  set ControlPlayerLastLocation(t) {
    this.kEr = t;
  }
  get WorldStateMap() {
    return this.VEr;
  }
  set WorldStateMap(t) {
    this.VEr = t;
  }
  get WorldStateBooleanMap() {
    return this.VZa;
  }
  set WorldStateBooleanMap(t) {
    this.VZa = t;
  }
  UpdateWorldState(e) {
    for (const r of Object.keys(e)) {
      var s = e[r];
      let t = void 0;
      switch (
        (s.oTs && (t = Number(MathUtils_1.MathUtils.LongToBigInt(s.oTs))), r)
      ) {
        case "DefaultState":
        case "NpcWorldState":
          t && this.VEr.set(r, t);
          break;
        default:
          t && this.VEr.set(r, t), this.VZa.set(r, s.rTs ?? !1);
      }
    }
  }
  GetMapDone() {
    return this.FEr;
  }
  SetMapDone(t) {
    this.FEr = t;
  }
  GetWorldDone() {
    return this.$5e;
  }
  SetWorldDone(t) {
    this.$5e = t;
  }
  static AddTsSimpleInteractItem(t) {
    let e = this.HEr.get(t.TypeId);
    e || ((e = new Set()), this.HEr.set(t.TypeId, e)), e.add(t);
  }
  static RemoveTsSimpleInteractItem(t) {
    var e = this.HEr.get(t.TypeId);
    e && e.delete(t);
  }
  static GetTsSimpleInteractItemById(t) {
    return this.HEr.get(t);
  }
  AddDestroyActor(t, e, s) {
    s?.IsValid() && this.DestroyActorQueue.Push([t, e, s]);
  }
  PopDestroyActor() {
    if (0 !== this.DestroyActorQueue.Size) return this.DestroyActorQueue.Pop();
  }
  AddIgnore(t) {
    !t?.IsValid() ||
      this.ActorsToIgnoreSet.has(t) ||
      this.ActorsToIgnoreSet.add(t);
  }
  RemoveIgnore(t) {
    return !!t?.IsValid() && this.ActorsToIgnoreSet.delete(t);
  }
  ClearIgnore() {
    this.ActorsToIgnoreSet.clear();
  }
  HandleEnvironmentUpdate(t) {
    let e = 0;
    if (!this.CurEnvironmentInfo.IsEqual(t.EnvType)) {
      switch (this.CurEnvironmentInfo.EnvType) {
        case DEFAULT_ENVIRONMENTTYPE:
          2 === t.EnvType && (e = 1),
            (0 !== t.EnvType && 1 !== t.EnvType) || (e = 5);
          break;
        case 2:
          t.EnvType === DEFAULT_ENVIRONMENTTYPE && (e = 4),
            (0 !== t.EnvType && 1 !== t.EnvType) || (e = 3);
          break;
        case 0:
        case 1:
          t.EnvType === DEFAULT_ENVIRONMENTTYPE && (e = 6),
            2 === t.EnvType && (e = 2);
      }
      this.CurEnvironmentInfo.SetInfo(t);
    }
    return e;
  }
}
((exports.WorldModel = WorldModel).IsStandalone = !1),
  (WorldModel.HEr = new Map());
//# sourceMappingURL=WorldModel.js.map
