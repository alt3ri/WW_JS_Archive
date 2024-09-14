"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SeamlessTravelModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  GameModePromise_1 = require("../../World/Define/GameModePromise");
class SeamlessTravelModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.svo = !1),
      (this.InSeamlessTraveling = !1),
      (this.SeamlessEndHandle = void 0),
      (this.Config = void 0),
      (this.SeamlessTravelController = void 0),
      (this.SeamlessTravelDefaultController = void 0),
      (this.SeamlessTravelTeamDefaultController = new Array()),
      (this.SeamlessTravelPlayerEntityHandle = void 0),
      (this.SeamlessTravelPlayerTeamHandles = new Array()),
      (this.SeamlessTravelCamera = void 0),
      (this.SeamlessTravelScreenEffect = void 0),
      (this.SeamlessTravelEffectPlayer = void 0),
      (this.SeamlessTravelTreadmill = void 0),
      (this.cvo = []),
      (this.MeshAssetLoadedPromise = void 0),
      (this.EffectFillScreenPromise = void 0),
      (this.TransitionFloorLoadedPromise = void 0),
      (this.EnterTransitionMapPromise = void 0),
      (this.EnterDestinationMapPromise = void 0),
      (this.TransitionFloorUnloadedPromise = void 0);
  }
  get IsSeamlessTravel() {
    return this.svo;
  }
  set IsSeamlessTravel(e) {
    this.InSeamlessTraveling &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error("SeamlessTravel", 30, "无缝加载中，禁止修改是否无缝加载"),
      (this.svo = e);
  }
  OnClear() {
    return this.ClearSeamlessTravelActor(), !0;
  }
  AddSeamlessTravelActor(e) {
    return e?.IsValid()
      ? (this.cvo.push(e),
        UE.KuroStaticLibrary.SetActorPermanent(e, !0, !0),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[AddSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  RemoveSeamlessTravelActor(e) {
    var s;
    return e?.IsValid()
      ? (0 <= (s = this.cvo.indexOf(e)) && this.cvo.splice(s, 1),
        UE.KuroStaticLibrary.SetActorPermanent(e, !1, !0),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[RemoveSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  IsSeamlessTravelActor(e) {
    return e?.IsValid()
      ? 0 <= this.cvo.indexOf(e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SeamlessTravel",
            30,
            "[IsSeamlessTravelActor] Actor Invalid",
          ),
        !1);
  }
  GetSeamlessTravelRoleEntityHandle(e) {
    for (const s of this.SeamlessTravelPlayerTeamHandles)
      if (s.Entity.GetComponent(0).GetRoleId() === e) return s;
  }
  CreatePromise() {
    (this.MeshAssetLoadedPromise = new GameModePromise_1.GameModePromise()),
      (this.EffectFillScreenPromise = new GameModePromise_1.GameModePromise()),
      (this.EnterTransitionMapPromise =
        new GameModePromise_1.GameModePromise()),
      (this.EnterDestinationMapPromise =
        new GameModePromise_1.GameModePromise()),
      (this.TransitionFloorLoadedPromise =
        new GameModePromise_1.GameModePromise()),
      (this.TransitionFloorUnloadedPromise =
        new GameModePromise_1.GameModePromise());
  }
  ClearPromise() {
    (this.MeshAssetLoadedPromise = void 0),
      (this.EffectFillScreenPromise = void 0),
      (this.EnterTransitionMapPromise = void 0),
      (this.EnterDestinationMapPromise = void 0),
      (this.TransitionFloorLoadedPromise = void 0),
      (this.TransitionFloorUnloadedPromise = void 0);
  }
  ClearSeamlessTravelActor() {
    for (const e of this.cvo)
      e?.IsValid() && UE.KuroStaticLibrary.SetActorPermanent(e, !1, !1);
    this.cvo.length = 0;
  }
}
exports.SeamlessTravelModel = SeamlessTravelModel;
//# sourceMappingURL=SeamlessTravelModel.js.map
