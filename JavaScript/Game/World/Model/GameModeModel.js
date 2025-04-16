"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameModeModel = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  WorldDefine_1 = require("../Define/WorldDefine");
class GameModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.IsSilentLogin = !1),
      (this.GMr = !1),
      (this.NMr = void 0),
      (this.OMr = void 0),
      (this.kMr = !1),
      (this.FMr = !1),
      (this.VMr = !1),
      (this.HMr = !1),
      (this.jMr = ""),
      (this.ghh = ""),
      (this.WMr = new Array()),
      (this.Aoa = void 0),
      (this.KMr = void 0),
      (this.QMr = void 0),
      (this.XMr = void 0),
      (this.$Mr = 0),
      (this.YMr = void 0),
      (this.JMr = !1),
      (this.zMr = !1),
      (this.QIo = !1),
      (this.ZMr = !1),
      (this.eEr = void 0),
      (this.tEr = !1),
      (this.iEr = !1),
      (this.Wdl = !1),
      (this.M0l = IAction_1.EFadeInScreenShowType.Black),
      (this.ShowCenterTextFlow = void 0),
      (this.oEr = !1),
      (this.ANc = void 0),
      (this.PNc = void 0),
      (this.xNc = !1),
      (this.sIl = void 0),
      (this.aIl = void 0),
      (this.ForceDisableGamePaused = !1),
      (this.GamePausedReasons = new Set()),
      (this.DataLayerSet = new Set()),
      (this.TempDataLayer = []),
      (this.MaterialParameterCollectionMap = new Map()),
      (this.rEr = void 0),
      (this.pr_ = !1),
      (this.nEr = 0),
      (this.LoadWorldProfiler = new LogProfiler_1.LogProfiler("加载世界")),
      (this.OpenLoadingProfiler =
        this.LoadWorldProfiler.CreateChild("打开Loading")),
      (this.OpenLevelProfiler =
        this.LoadWorldProfiler.CreateChild("加载主Level")),
      (this.PreloadProfiler =
        this.LoadWorldProfiler.CreateChild("Preload阶段")),
      (this.PreloadApplyMaterialParameterCollectionProfiler =
        this.PreloadProfiler.CreateChild("应用MPC")),
      (this.PreloadCommonAndEntityProfiler =
        this.PreloadProfiler.CreateChild("预加载公共资源、实体资源")),
      (this.PreloadControllerProfiler =
        this.PreloadProfiler.CreateChild("预加载Controller资源")),
      (this.PreloadCommonProfiler =
        this.PreloadCommonAndEntityProfiler.CreateChild("预加载公共资源")),
      (this.PreloadEntitiesProfiler =
        this.PreloadCommonAndEntityProfiler.CreateChild("预加载实体")),
      (this.LoadDataLayerAndSubLevelProfiler =
        this.LoadWorldProfiler.CreateChild("加载DataLayer、加载子关卡")),
      (this.LoadSubLevelProfiler =
        this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载子Level")),
      (this.LoadDataLayerProfiler =
        this.LoadDataLayerAndSubLevelProfiler.CreateChild("加载DataLayer")),
      (this.CheckVoxelStreamingSourceProfiler =
        this.LoadWorldProfiler.CreateChild("等待体素流送")),
      (this.CheckStreamingSourceProfiler =
        this.LoadWorldProfiler.CreateChild("等待场景流送")),
      (this.CreateEntitiesProfiler =
        this.LoadWorldProfiler.CreateChild("创建实体")),
      (this.WaitRenderAssetsProfiler =
        this.LoadWorldProfiler.CreateChild("等待渲染资源")),
      (this.WorldDoneProfiler =
        this.LoadWorldProfiler.CreateChild("WorldDone")),
      (this.OpenBattleViewProfiler =
        this.WorldDoneProfiler.CreateChild("打开主界面(WorldDone阶段)")),
      (this.CloseLoadingProfiler =
        this.LoadWorldProfiler.CreateChild("关闭Loading界面")),
      (this.CloseLoadingPhaseOpenBattleViewProfiler =
        this.CloseLoadingProfiler.CreateChild("打开主界面(关闭Loading阶段)")),
      (this.sEr = void 0),
      (this.aEr = void 0),
      (this.hEr = void 0),
      (this.lEr = void 0),
      (this.yAr = void 0),
      (this._Er = void 0),
      (this.zIo = void 0),
      (this.x$s = void 0),
      (this.dEr = void 0),
      (this.CEr = void 0),
      (this.gEr = void 0),
      (this.ETn = void 0),
      (this.fEr = void 0),
      (this.vEr = void 0),
      (this.Dbn = void 0),
      (this.MEr = void 0),
      (this.U$_ = void 0),
      (this.SEr = !1);
  }
  get JoinSceneInfo() {
    return this.rEr;
  }
  set JoinSceneInfo(t) {
    this.rEr = t;
  }
  get LoadingPhase() {
    return this.nEr;
  }
  set LoadingPhase(t) {
    this.nEr = t;
  }
  get Loading() {
    return 1 < this.nEr;
  }
  get HasGameModeData() {
    return this.GMr;
  }
  set HasGameModeData(t) {
    this.GMr = t;
  }
  get Mode() {
    return this.NMr;
  }
  set Mode(t) {
    this.NMr = t;
  }
  get MapPath() {
    return this.jMr;
  }
  set MapPath(t) {
    this.jMr = t;
  }
  get LastMapPath() {
    return this.ghh;
  }
  AddLoadMapHandle(t) {
    this.OMr || (this.OMr = new Map());
    var e = this.OMr.get(t);
    return (
      e ? this.OMr.set(t, ++e) : this.OMr.set(t, 1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "添加LoadMapHandle",
          ["添加的Handle", t],
          ["Size", this.OMr.size],
        ),
      !0
    );
  }
  RemoveLoadMapHandle(t) {
    var e;
    return this.OMr?.has(t)
      ? ((e = this.OMr.get(t)),
        --e ? this.OMr.set(t, e) : this.OMr.delete(t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "删除LoadMapHandle",
            ["删除的Handle", t],
            ["Size", this.OMr.size],
          ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "删除LoadManHandle失败",
            ["Handle", t],
            ["Size", this.OMr?.size],
          ),
        !1);
  }
  get MapDone() {
    return !!this.OMr && 0 === this.OMr.size;
  }
  get NavMeshDone() {
    return this.kMr;
  }
  set NavMeshDone(t) {
    this.kMr = t;
  }
  get WorldDone() {
    return this.FMr;
  }
  set WorldDone(t) {
    this.FMr = t;
  }
  get WorldDoneAndLoadingClosed() {
    return this.VMr;
  }
  set WorldDoneAndLoadingClosed(t) {
    this.VMr = t;
  }
  get PlayerStarts() {
    return this.WMr;
  }
  get MapConfig() {
    return this.QMr;
  }
  set MapConfig(t) {
    this.QMr = t;
  }
  get InstanceDungeon() {
    return this.XMr;
  }
  SetInstanceDungeon(t) {
    this.XMr = InstanceDungeonById_1.configInstanceDungeonById.GetConfig(t);
  }
  get MapId() {
    return this.$Mr;
  }
  set MapId(t) {
    this.$Mr = t;
  }
  get InstanceType() {
    return this.YMr;
  }
  set InstanceType(t) {
    this.YMr = t;
  }
  get IsMulti() {
    return this.JMr;
  }
  set IsMulti(t) {
    this.JMr = t;
  }
  get ChangeModeState() {
    return this.HMr;
  }
  set ChangeModeState(t) {
    this.HMr = t;
  }
  get PlayTravelMp4() {
    return this.ZMr;
  }
  set PlayTravelMp4(t) {
    this.ZMr = t;
  }
  get TravelMp4Path() {
    return this.eEr;
  }
  set TravelMp4Path(t) {
    this.eEr = t;
  }
  get UseShowCenterText() {
    return this.iEr;
  }
  set UseShowCenterText(t) {
    this.iEr = t;
  }
  set UseAsBlackScreen(t) {
    this.Wdl = t;
  }
  get UseAsBlackScreen() {
    return this.Wdl;
  }
  set BlackScreenColor(t) {
    this.M0l = t;
  }
  get BlackScreenColor() {
    return this.M0l;
  }
  get TravelMp4Playing() {
    return this.tEr;
  }
  set TravelMp4Playing(t) {
    this.tEr = t;
  }
  get DataLayerSwitching() {
    return this.oEr;
  }
  set Mp4FadeInScreenColor(t) {
    this.ANc = t;
  }
  get Mp4FadeInScreenColor() {
    return this.ANc;
  }
  set Mp4FadeOutScreenColor(t) {
    this.PNc = t;
  }
  get Mp4FadeOutScreenColor() {
    return this.PNc;
  }
  set NeedOpenBlackScreenWhenTeleportDungeon(t) {
    this.xNc = t;
  }
  get NeedOpenBlackScreenWhenTeleportDungeon() {
    return this.xNc;
  }
  BeginDataLayerChange() {
    (this.oEr = !0),
      (this.sIl = new CustomPromise_1.CustomPromise()),
      (this.aIl = new CustomPromise_1.CustomPromise());
  }
  get DataLayerChangeVoxelPromise() {
    return this.sIl;
  }
  get DataLayerChangeStreamingPromise() {
    return this.aIl;
  }
  EndDataLayerChange() {
    (this.oEr = !1), this.sIl?.SetResult(!0), this.aIl?.SetResult(!0);
  }
  AddPlayerStart(t) {
    this.WMr.push(t);
  }
  ClearPlayerStart() {
    this.WMr.length = 0;
  }
  get VoxelStreamingSource() {
    return this.Aoa;
  }
  get StreamingSource() {
    return this.KMr;
  }
  get UseWorldPartition() {
    return this.zMr;
  }
  set UseWorldPartition(t) {
    this.zMr = t;
  }
  get IsTeleport() {
    return this.QIo;
  }
  set IsTeleport(t) {
    this.QIo = t;
  }
  get BornLocation() {
    return this.sEr;
  }
  get BornRotator() {
    return this.aEr;
  }
  get RoleLocation() {
    return this.hEr;
  }
  static nQs(t, e, i, s) {
    var r = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t),
      o =
        (r.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
        r.D_K2_SetActorLocation(t.GetLocation(), !1, void 0, !1),
        r.AddComponentByClass(
          UE.WorldPartitionStreamingSourceComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ));
    if (((o.Priority = e), (o.TargetBehavior = i), s))
      for (const h of s) o.TargetGrids.Add(h);
    return (
      (o.bStreamingSourceShouldBlockOnSlowStreaming = !0),
      o.DisableStreamingSource(),
      r
    );
  }
  InitStreamingSources() {
    var t = new UE.TransformDouble(
        this.BornRotator,
        this.BornLocation,
        new UE.VectorDouble(1, 1, 1),
      ),
      e = [WorldDefine_1.VOXEL_GRID_NAME];
    this.Aoa?.IsValid()
      ? this.Aoa?.D_K2_SetActorLocation(t.GetLocation(), !1, void 0, !1)
      : (this.Aoa = GameModeModel.nQs(t, 64, 0, e)),
      this.KMr?.IsValid()
        ? this.KMr?.D_K2_SetActorLocation(t.GetLocation(), !1, void 0, !1)
        : (this.KMr = GameModeModel.nQs(t, 128, 1, e)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Level",
          7,
          "StreamingSource出生信息",
          ["Location", this.BornLocation],
          ["Rotation", this.BornRotator],
        );
  }
  AttachStreamingSourcesToActor(t) {
    !this.pr_ &&
      t &&
      this.KMr?.IsValid() &&
      this.Aoa?.IsValid() &&
      (this.KMr.K2_AttachToActor(t, void 0, 2, 2, 2, !1),
      this.Aoa.K2_AttachToActor(t, void 0, 2, 2, 2, !1));
  }
  StartIndependentStreaming(t = void 0) {
    this.KMr?.IsValid() &&
      this.Aoa?.IsValid() &&
      ((this.pr_ = !0),
      this.KMr?.K2_DetachFromActor(1, 1, 1),
      this.Aoa?.K2_DetachFromActor(1, 1, 1),
      t) &&
      (this.KMr?.D_K2_SetActorLocation(t, !1, void 0, !1),
      this.Aoa?.D_K2_SetActorLocation(t, !1, void 0, !1));
  }
  DetachStreamingSourceFromActor() {
    this.KMr?.IsValid() &&
      this.Aoa?.IsValid() &&
      (this.KMr.K2_DetachFromActor(1, 1, 1),
      this.Aoa.K2_DetachFromActor(1, 1, 1));
  }
  StopIndependentStreaming(t = void 0) {
    (this.pr_ = !1), this.AttachStreamingSourcesToActor(t);
  }
  SetBornInfo(t, e) {
    (this.sEr = t ? new UE.VectorDouble(t.X, t.Y, t.Z) : void 0),
      (this.hEr = t ? Vector_1.Vector.Create(t) : void 0),
      (this.aEr = e ? new UE.Rotator(e.Pitch, e.Yaw, e.Roll) : void 0);
  }
  UpdateBornLocation(t) {
    this.hEr.Set(t.X, t.Y, t.Z);
  }
  FlushTempDataLayers() {
    for (const t of this.TempDataLayer) this.DataLayerSet.add(t);
  }
  AddDataLayer(t) {
    return this.DataLayerSet.has(t)
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "World",
            29,
            "[GameModeModel.AddDataLayer] 重复添加DataLayer。",
            ["Path", t],
          ),
        !1)
      : (this.DataLayerSet.add(t), !0);
  }
  RemoveDataLayer(t) {
    return !!this.HasDataLayer(t) && (this.DataLayerSet.delete(t), !0);
  }
  HasDataLayer(t) {
    return this.DataLayerSet.has(t);
  }
  GetAllDataLayers() {
    return this.DataLayerSet;
  }
  get BeginLoadMapPromise() {
    return this.lEr;
  }
  get AfterJoinSceneNotifyPromise() {
    return this.yAr;
  }
  get OpenLevelPromise() {
    return this._Er;
  }
  get StreamingCompleted() {
    return this.zIo;
  }
  get VoxelStreamingCompleted() {
    return this.x$s;
  }
  get LoadMultiFormationPromise() {
    return this.dEr;
  }
  set LoadMultiFormationPromise(t) {
    this.dEr = t;
  }
  get PreloadPromise() {
    return this.CEr;
  }
  get ApplyMaterialParameterCollectionPromise() {
    return this.gEr;
  }
  get ChangeSceneModeEndNotifyPromise() {
    return this.ETn;
  }
  get CheckStreamingCompletedTimerId() {
    return this.fEr;
  }
  set CheckStreamingCompletedTimerId(t) {
    this.fEr = t;
  }
  get CheckRenderAssetsStreamingCompletedTimerId() {
    return this.vEr;
  }
  set CheckRenderAssetsStreamingCompletedTimerId(t) {
    this.vEr = t;
  }
  get CheckRenderAssetsTimeoutId() {
    return this.Dbn;
  }
  set CheckRenderAssetsTimeoutId(t) {
    this.Dbn = t;
  }
  get VideoStartPromise() {
    return this.MEr;
  }
  get OpenLoadingEnd() {
    return this.U$_;
  }
  get RenderAssetDone() {
    return this.SEr;
  }
  set RenderAssetDone(t) {
    this.SEr = t;
  }
  CreatePromise() {
    (this.lEr = new GameModePromise_1.GameModePromise()),
      (this.yAr = new GameModePromise_1.GameModePromise()),
      (this._Er = new GameModePromise_1.GameModePromise()),
      (this.zIo = new GameModePromise_1.GameModePromise()),
      (this.x$s = new GameModePromise_1.GameModePromise()),
      (this.CEr = new GameModePromise_1.GameModePromise()),
      (this.MEr = new GameModePromise_1.GameModePromise()),
      (this.U$_ = new GameModePromise_1.GameModePromise()),
      (this.gEr = new GameModePromise_1.GameModePromise());
  }
  ResetPromise() {
    (this.lEr = void 0),
      (this.yAr = void 0),
      (this._Er = void 0),
      (this.zIo = void 0),
      (this.x$s = void 0),
      (this.CEr = void 0),
      (this.dEr = void 0),
      (this.MEr = void 0),
      (this.U$_ = void 0),
      (this.gEr = void 0);
  }
  CreateChangeModePromise() {
    this.ETn = new GameModePromise_1.GameModePromise();
  }
  ResetChangeModePromise() {
    this.ETn = void 0;
  }
  OnLeaveLevel() {
    this.TempDataLayer.length = 0;
    for (const t of this.DataLayerSet) this.TempDataLayer.push(t);
    return (
      this.DataLayerSet.clear(),
      this.MaterialParameterCollectionMap.clear(),
      void 0 !== this.CheckStreamingCompletedTimerId &&
        (TimerSystem_1.TimerSystem.Remove(this.CheckStreamingCompletedTimerId),
        (this.CheckStreamingCompletedTimerId = void 0)),
      (this.OMr = void 0),
      (this.kMr = !1),
      (this.FMr = !1),
      (this.VMr = !1),
      (this.ghh = this.jMr),
      (this.jMr = ""),
      (this.$Mr = 0),
      (this.JMr = !1),
      (this.YMr = Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance),
      (this.QMr = void 0),
      (this.XMr = void 0),
      (this.zMr = !1),
      (this.QIo = !1),
      (this.RenderAssetDone = !1),
      this.ResetPromise(),
      (this.fEr = void 0),
      (this.vEr = void 0),
      !(this.Dbn = void 0)
    );
  }
  OnChangeMode() {
    return this.ResetPromise(), !0;
  }
}
exports.GameModeModel = GameModeModel;
//# sourceMappingURL=GameModeModel.js.map
