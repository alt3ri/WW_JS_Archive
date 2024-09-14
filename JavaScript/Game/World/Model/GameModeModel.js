"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameModeModel = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../Core/Actor/ActorSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  LogProfiler_1 = require("../../../Core/Common/LogProfiler"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../GlobalData"),
  GameModePromise_1 = require("../Define/GameModePromise"),
  LoadLevelDefine_1 = require("../Define/LoadLevelDefine"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
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
      (this.WMr = new Array()),
      (this.Aoa = void 0),
      (this.KMr = void 0),
      (this.QMr = void 0),
      (this.XMr = 0),
      (this.$Mr = 0),
      (this.YMr = void 0),
      (this.JMr = !1),
      (this.zMr = !1),
      (this.QIo = !1),
      (this.ZMr = !1),
      (this.eEr = void 0),
      (this.tEr = !1),
      (this.iEr = !1),
      (this.ShowCenterTextFlow = void 0),
      (this.oEr = !1),
      (this.PreloadLevelMap = new Map()),
      (this.ForceDisableGamePaused = !1),
      (this.GamePausedReasons = new Set()),
      (this.SubLevelMap = new Map()),
      (this.UnloadLevelMap = new Map()),
      (this.DataLayerSet = new Set()),
      (this.MaterialParameterCollectionMap = new Map()),
      (this.rEr = void 0),
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
      (this.LoadSubLevelProfiler =
        this.LoadWorldProfiler.CreateChild("加载子Level")),
      (this.LoadDataLayerProfiler =
        this.LoadWorldProfiler.CreateChild("加载DataLayer")),
      (this.CheckVoxelStreamingSourceProfiler =
        this.LoadWorldProfiler.CreateChild("等待体素流送")),
      (this.CheckStreamingSourceProfiler =
        this.LoadWorldProfiler.CreateChild("等待场景流送")),
      (this.CreateEntitiesProfiler =
        this.LoadWorldProfiler.CreateChild("创建实体")),
      (this.WaitRenderAssetsProfiler =
        this.LoadWorldProfiler.CreateChild("等待渲染资源")),
      (this.OpenBattleViewProfiler =
        this.LoadWorldProfiler.CreateChild("打开主界面")),
      (this.OpenPlotViewProfiler =
        this.LoadWorldProfiler.CreateChild("打开剧情界面")),
      (this.CloseLoadingProfiler =
        this.LoadWorldProfiler.CreateChild("关闭Loading界面")),
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
      (this.EEr = void 0),
      (this.SEr = !1);
  }
  get JoinSceneInfo() {
    return this.rEr;
  }
  set JoinSceneInfo(e) {
    this.rEr = e;
  }
  get LoadingPhase() {
    return this.nEr;
  }
  set LoadingPhase(e) {
    this.nEr = e;
  }
  get Loading() {
    return 1 < this.nEr;
  }
  get HasGameModeData() {
    return this.GMr;
  }
  set HasGameModeData(e) {
    this.GMr = e;
  }
  get Mode() {
    return this.NMr;
  }
  set Mode(e) {
    this.NMr = e;
  }
  get MapPath() {
    return this.jMr;
  }
  set MapPath(e) {
    this.jMr = e;
  }
  AddLoadMapHandle(e) {
    this.OMr || (this.OMr = new Map());
    var t = this.OMr.get(e);
    return (
      t ? this.OMr.set(e, ++t) : this.OMr.set(e, 1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "World",
          3,
          "添加LoadMapHandle",
          ["添加的Handle", e],
          ["Size", this.OMr.size],
        ),
      !0
    );
  }
  RemoveLoadMapHandle(e) {
    var t;
    return this.OMr?.has(e)
      ? ((t = this.OMr.get(e)),
        --t ? this.OMr.set(e, t) : this.OMr.delete(e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "删除LoadMapHandle",
            ["删除的Handle", e],
            ["Size", this.OMr.size],
          ),
        !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "删除LoadManHandle失败",
            ["Handle", e],
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
  set NavMeshDone(e) {
    this.kMr = e;
  }
  get WorldDone() {
    return this.FMr;
  }
  set WorldDone(e) {
    this.FMr = e;
  }
  get WorldDoneAndLoadingClosed() {
    return this.VMr;
  }
  set WorldDoneAndLoadingClosed(e) {
    this.VMr = e;
  }
  get PlayerStarts() {
    return this.WMr;
  }
  get MapConfig() {
    return this.QMr;
  }
  set MapConfig(e) {
    this.QMr = e;
  }
  get InstanceDungeon() {
    return InstanceDungeonById_1.configInstanceDungeonById.GetConfig(this.XMr);
  }
  SetInstanceDungeon(e) {
    this.XMr = e;
  }
  get MapId() {
    return this.$Mr;
  }
  set MapId(e) {
    this.$Mr = e;
  }
  get InstanceType() {
    return this.YMr;
  }
  set InstanceType(e) {
    this.YMr = e;
  }
  get IsMulti() {
    return this.JMr;
  }
  set IsMulti(e) {
    this.JMr = e;
  }
  get ChangeModeState() {
    return this.HMr;
  }
  set ChangeModeState(e) {
    this.HMr = e;
  }
  get PlayTravelMp4() {
    return this.ZMr;
  }
  set PlayTravelMp4(e) {
    this.ZMr = e;
  }
  get TravelMp4Path() {
    return this.eEr;
  }
  set TravelMp4Path(e) {
    this.eEr = e;
  }
  get UseShowCenterText() {
    return this.iEr;
  }
  set UseShowCenterText(e) {
    this.iEr = e;
  }
  get TravelMp4Playing() {
    return this.tEr;
  }
  set TravelMp4Playing(e) {
    this.tEr = e;
  }
  get DataLayerSwitching() {
    return this.oEr;
  }
  set DataLayerSwitching(e) {
    this.oEr = e;
  }
  AddPlayerStart(e) {
    this.WMr.push(e);
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
  set UseWorldPartition(e) {
    this.zMr = e;
  }
  get IsTeleport() {
    return this.QIo;
  }
  set IsTeleport(e) {
    this.QIo = e;
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
  static nQs(e, t, i, s) {
    var o = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), e),
      r =
        (o.AddComponentByClass(
          UE.SceneComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ),
        o.K2_SetActorLocation(e.GetLocation(), !1, void 0, !1),
        o.AddComponentByClass(
          UE.WorldPartitionStreamingSourceComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        ));
    if (((r.Priority = t), (r.TargetBehavior = i), s))
      for (const h of s) r.TargetGrids.Add(h);
    return (
      (r.bStreamingSourceShouldBlockOnSlowStreaming = !0),
      r.DisableStreamingSource(),
      o
    );
  }
  InitStreamingSources() {
    var e = new UE.Transform(
        this.BornRotator,
        this.BornLocation,
        new UE.Vector(1, 1, 1),
      ),
      t = [WorldDefine_1.VOXEL_GRID_NAME];
    (this.Aoa = GameModeModel.nQs(e, 64, 0, t)),
      (this.KMr = GameModeModel.nQs(e, 128, 1, t)),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Level",
          7,
          "StreamingSource出生信息",
          ["Location", this.BornLocation],
          ["Rotation", this.BornRotator],
        );
  }
  SetBornInfo(e, t) {
    (this.sEr = e ? new UE.Vector(e.X, e.Y, e.Z) : void 0),
      (this.hEr = e ? Vector_1.Vector.Create(e) : void 0),
      (this.aEr = t ? new UE.Rotator(t.Pitch, t.Yaw, t.Roll) : void 0);
  }
  UpdateBornLocation(e) {
    this.hEr.Set(e.X, e.Y, e.Z);
  }
  AddSubLevel(e) {
    var t;
    if (!this.SubLevelMap.has(e))
      return (
        (t = new LoadLevelDefine_1.SubLevel(e)), this.SubLevelMap.set(e, t), t
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "World",
        3,
        "[GameModeModel.AddSubLevel] 重复添加子关卡。",
        ["Path", e],
      );
  }
  AddSubLevelInstance(e) {
    return this.SubLevelMap.has(e.Path)
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[GameModeModel.AddSubLevelInstance] 重复添加子关卡。",
            ["Path", e.Path],
          ),
        !1)
      : ((e.IsPreload = !1), this.SubLevelMap.set(e.Path, e), !0);
  }
  AddPreloadSubLevel(e) {
    if (this.PreloadLevelMap.has(e))
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[GameModeModel.AddPreloadSubLevel] 重复添加预加载的Level，因为存在于this.PreloadLevelMap中",
          ["Path", e],
        );
    else {
      var t;
      if (!this.SubLevelMap.has(e))
        return (
          (t = new LoadLevelDefine_1.SubLevel(e)),
          this.PreloadLevelMap.set(e, t),
          t
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "World",
          3,
          "[GameModeModel.AddPreloadSubLevel] 重复添加预加载Level，因为存在于SubLevelMap中",
          ["Path", e],
        );
    }
  }
  RemovePreloadSubLevel(e) {
    return this.PreloadLevelMap.delete(e);
  }
  GetPreloadSubLevel(e) {
    return this.PreloadLevelMap.get(e);
  }
  async RemoveSubLevel(e) {
    var t, i, s;
    return this.SubLevelMap.has(e)
      ? ((t = this.SubLevelMap.get(e)),
        this.SubLevelMap.delete(e),
        (t.LoadType = 3),
        (t.UnLoadPromise = new GameModePromise_1.GameModePromise()),
        (i = FNameUtil_1.FNameUtil.GetDynamicFName(e)),
        (i =
          GlobalData_1.GlobalData.GameInstance.场景加载通知器.UnloadStreamLevel(
            i,
            !0,
          )),
        (s = this.UnloadLevelMap.size),
        this.UnloadLevelMap.set(i, t),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "World",
            3,
            "切换子关卡:卸载子关卡。",
            ["Path", e],
            ["LinkId", i],
            ["需要释放数量(前)", s],
            ["需要释放数量(后)", this.UnloadLevelMap.size],
          ),
        t.UnLoadPromise.Promise)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            3,
            "[GameModeModel.RemoveSubLevel]不存在子关卡，删除子关卡失败。",
            ["Path", e],
          ),
        !1);
  }
  AddDataLayer(e) {
    return this.DataLayerSet.has(e)
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "World",
            30,
            "[GameModeModel.AddDataLayer] 重复添加DataLayer。",
            ["Path", e],
          ),
        !1)
      : (this.DataLayerSet.add(e), !0);
  }
  RemoveDataLayer(e) {
    return this.DataLayerSet.has(e)
      ? (this.DataLayerSet.delete(e), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "World",
            30,
            "[GameModeModel.RemoveDataLayer] 删除不存在的DataLayer。",
            ["Path", e],
          ),
        !1);
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
  set LoadMultiFormationPromise(e) {
    this.dEr = e;
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
  set CheckStreamingCompletedTimerId(e) {
    this.fEr = e;
  }
  get CheckRenderAssetsStreamingCompletedTimerId() {
    return this.vEr;
  }
  set CheckRenderAssetsStreamingCompletedTimerId(e) {
    this.vEr = e;
  }
  get CheckRenderAssetsTimeoutId() {
    return this.Dbn;
  }
  set CheckRenderAssetsTimeoutId(e) {
    this.Dbn = e;
  }
  get VideoStartPromise() {
    return this.MEr;
  }
  get VideoEndPromise() {
    return this.EEr;
  }
  get RenderAssetDone() {
    return this.SEr;
  }
  set RenderAssetDone(e) {
    this.SEr = e;
  }
  CreatePromise() {
    (this.lEr = new GameModePromise_1.GameModePromise()),
      (this.yAr = new GameModePromise_1.GameModePromise()),
      (this._Er = new GameModePromise_1.GameModePromise()),
      (this.zIo = new GameModePromise_1.GameModePromise()),
      (this.x$s = new GameModePromise_1.GameModePromise()),
      (this.CEr = new GameModePromise_1.GameModePromise()),
      (this.MEr = new GameModePromise_1.GameModePromise()),
      (this.EEr = new GameModePromise_1.GameModePromise()),
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
      (this.EEr = void 0),
      (this.gEr = void 0);
  }
  CreateChangeModePromise() {
    this.ETn = new GameModePromise_1.GameModePromise();
  }
  ResetChangeModePromise() {
    this.ETn = void 0;
  }
  yEr() {
    this.zMr &&
      (this.KMr?.IsValid() &&
        (ActorSystem_1.ActorSystem.Put(this.KMr), (this.KMr = void 0)),
      this.Aoa?.IsValid()) &&
      (ActorSystem_1.ActorSystem.Put(this.Aoa), (this.Aoa = void 0));
  }
  OnLeaveLevel() {
    var e,
      t,
      i = new Array();
    for ([e] of this.PreloadLevelMap) i.push(e);
    for ([t] of this.SubLevelMap) i.push(t);
    for (const s of i) this.RemoveSubLevel(s);
    return (
      (i.length = 0),
      this.DataLayerSet.clear(),
      this.MaterialParameterCollectionMap.clear(),
      this.yEr(),
      void 0 !== this.CheckStreamingCompletedTimerId &&
        (TimerSystem_1.TimerSystem.Remove(this.CheckStreamingCompletedTimerId),
        (this.CheckStreamingCompletedTimerId = void 0)),
      (this.OMr = void 0),
      (this.kMr = !1),
      (this.FMr = !1),
      (this.VMr = !1),
      (this.jMr = ""),
      (this.$Mr = 0),
      (this.JMr = !1),
      (this.YMr = Protocol_1.Aki.Protocol.i4s.Proto_NoneInstance),
      (this.QMr = void 0),
      (this.XMr = 0),
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
