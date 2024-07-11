"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.monsterSortFunc =
    exports.silentAreasSortFunc =
    exports.AdventureGuideController =
    exports.REMAINFLUSHTIME =
    exports.RECEIVED_COUNT =
    exports.LOWLEVELTEXTID =
    exports.MIDLEVELTEXTID =
    exports.HIGHLEVELTEXTID =
    exports.DETECT =
    exports.UNDISCOVERED =
    exports.DOING =
    exports.LVLUNKNOWNTEXT =
    exports.UNKNOWNTEXT =
    exports.LEVELTEXT =
      void 0);
const Log_1 = require("../../../Core/Common/Log"),
  MapMarkByMarkId_1 = require("../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  InventoryGiftController_1 = require("../Inventory/InventoryGiftController"),
  MapController_1 = require("../Map/Controller/MapController"),
  MapDefine_1 = require("../Map/MapDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  WorldMapController_1 = require("../WorldMap/WorldMapController"),
  MAX_INT32_NUMBER =
    ((exports.LEVELTEXT = "LevelText"),
    (exports.UNKNOWNTEXT = "Unknown"),
    (exports.LVLUNKNOWNTEXT = "LvlUnknown"),
    2147483647),
  MAX_INT64_NUMBER = MathUtils_1.MathUtils.BigIntToLong(0x7fffffffffffffffn),
  DUNGEON_LOCKED = "DungeonLocked";
(exports.DOING = "Doing"),
  (exports.UNDISCOVERED = "UnDiscovered"),
  (exports.DETECT = "Detect"),
  (exports.HIGHLEVELTEXTID = 3),
  (exports.MIDLEVELTEXTID = 2),
  (exports.LOWLEVELTEXTID = 1),
  (exports.RECEIVED_COUNT = "ReceivedCount"),
  (exports.REMAINFLUSHTIME = "FlushTimeRemain");
class AdventureGuideController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "AdventureGuideView",
        AdventureGuideController.OpenGuideView,
      ),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.w4e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.B4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMapMark,
        this.OnTrackMapMark,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.b4e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.w4e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.B4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMapMark,
        this.OnTrackMapMark,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.b4e,
      );
  }
  static EmitRedDotFirstAwardEvent(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
        e,
      );
    r &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAwardCategory,
        r.Conf.Secondary,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAwardResult,
        e,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19085, this.q4e),
      Net_1.Net.Register(12360, this.G4e),
      Net_1.Net.Register(19970, this.N4e),
      Net_1.Net.Register(10757, this.O4e),
      Net_1.Net.Register(1171, this.k4e),
      Net_1.Net.Register(23429, this.F4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19085),
      Net_1.Net.UnRegister(12360),
      Net_1.Net.UnRegister(19970),
      Net_1.Net.UnRegister(10757),
      Net_1.Net.UnRegister(1171),
      Net_1.Net.UnRegister(23429);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "AdventureGuideView",
      AdventureGuideController.V4e,
      "AdventureGuideController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "AdventureGuideView",
      AdventureGuideController.V4e,
    );
  }
  static RequestForAdventureManual() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      e = Protocol_1.Aki.Protocol.J$n.create({ aFn: e });
    Net_1.Net.Call(11381, e, AdventureGuideController.H4e);
  }
  static j4e(e, r) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, r);
  }
  static RequestForAdventureManualData(e) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = Protocol_1.Aki.Protocol.V$n.create({ aFn: r });
    Net_1.Net.Call(27679, r, AdventureGuideController.W4e);
  }
  static async RequestForAdventureReward(e) {
    (e = Protocol_1.Aki.Protocol.H$n.create({ Ekn: e })),
      (e = await Net_1.Net.CallAsync(24758, e));
    AdventureGuideController.K4e(e);
  }
  static async GetDetectionLabelInfoRequest() {
    var e = Protocol_1.Aki.Protocol.Rjn.create({}),
      e = await Net_1.Net.CallAsync(22461, e);
    AdventureGuideController.Q4e(e);
  }
  static RequestForDetection(e, r, t) {
    this.HardCode(e, t) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AdventureGuide",
          5,
          "发送探测请求到后端 DetectionRequest",
          ["type", Protocol_1.Aki.Protocol.d3n[e]],
          ["confId", t],
        ),
      (e = Protocol_1.Aki.Protocol.Q$n.create({ d3n: e, C3n: r, g3n: t })),
      Net_1.Net.Call(24831, e, AdventureGuideController.X4e));
  }
  static HardCode(e, r) {
    return (
      AdventureGuideController.StopTrackCurDetectingDungeon(),
      AdventureGuideController.StopTrackCurDetectingMonster(),
      AdventureGuideController.StopTrackCurDetectingSilentArea(),
      !1
    );
  }
  static $4e() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) return e.ActorLocationProxy;
    }
  }
  static StopTrackCurDetectingMonster() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId();
    e && this.j4e(7, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
  }
  static Y4e(o, n) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 5, "找到下一个距离最近的怪物", [
          "探测Id",
          o,
        ]),
      o !==
        ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId())
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 10, "pending列表与探测目标不一致");
    else {
      let e = MAX_INT32_NUMBER,
        r = MAX_INT64_NUMBER,
        t = void 0;
      var a, l;
      for (const d of ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().values()) {
        var i = MathUtils_1.MathUtils.LongToBigInt(d.RefreshTime);
        Number(i) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 &&
          ((i = { X: d.PositionX, Y: d.PositionY, Z: d.PositionZ }),
          (i = Vector_1.Vector.Create(i)),
          (i = Vector_1.Vector.Dist(n, i)) < e) &&
          ((e = i), (t = d.Id)),
          MathUtils_1.MathUtils.LongToBigInt(d.RefreshTime) <
            MathUtils_1.MathUtils.LongToBigInt(r) && (r = d.RefreshTime);
      }
      void 0 !== t
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AdventureGuide",
              5,
              "找到距离最近的怪物发起探测",
              ["探测Id", o],
              ["实体id", t],
              ["refreshtime", r],
            ),
          (a = {
            C3n: o,
            Ikn: Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster,
            Ekn: t,
          }),
          ((l = Protocol_1.Aki.Protocol.Mjn.create()).f3n = a),
          Net_1.Net.Call(23417, l, AdventureGuideController.J4e))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AdventureGuide",
              5,
              "没有找到距离最近怪物，结束探测",
              ["探测Id", o],
            ),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "CannotFindTarget",
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
            o,
            r,
          ),
          this.StopTrackCurDetectingMonster(),
          this.CancelDetectingRequest(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AdventureGuide", 10, "剩余刷新时间", [
              "MathUtils.LongToBigInt(minRefreshTime)",
              MathUtils_1.MathUtils.LongToBigInt(r),
            ]));
    }
  }
  static CancelDetectingRequest() {
    var e = Protocol_1.Aki.Protocol.Mjn.create();
    (e.p3n = !0), Net_1.Net.Call(23417, e, () => {});
  }
  static NormalMonsterManualInfoRequest(e) {
    e = Protocol_1.Aki.Protocol.Tjn.create({ C3n: e });
    Net_1.Net.Call(22146, e, AdventureGuideController.z4e);
  }
  static StopTrackCurDetectingDungeon() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId();
    this.Z4e(6, e) && this.j4e(6, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
  }
  static e5e(t, o) {
    if (
      t !==
      ModelManager_1.ModelManager.AdventureGuideModel.GetPendingDungeonConfId()
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 10, "探测目标与Pending列表不一致");
    else {
      let e = MAX_INT32_NUMBER,
        r = void 0;
      var n;
      for (const l of ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().values()) {
        var a = { X: l.PositionX, Y: l.PositionY, Z: l.PositionZ },
          a = Vector_1.Vector.Create(a),
          a = Vector_1.Vector.Dist(o, a);
        a < e && ((r = l.Id), (e = a));
      }
      void 0 !== r
        ? ((t = {
            C3n: t,
            Ikn: Protocol_1.Aki.Protocol.d3n.Proto_Dungeon,
            Ekn: r,
          }),
          ((n = Protocol_1.Aki.Protocol.Mjn.create()).f3n = t),
          Net_1.Net.Call(23417, n, AdventureGuideController.J4e))
        : ((t =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              DUNGEON_LOCKED,
            )),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(t),
          this.StopTrackCurDetectingDungeon(),
          this.CancelDetectingRequest());
    }
  }
  static StopTrackCurDetectingSilentArea() {
    var e =
        ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId(),
      r =
        ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSlientAreaMarkType();
    this.Z4e(r, e) && this.j4e(r, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
  }
  static RequestSilentFirstAward(o, n) {
    var e = Protocol_1.Aki.Protocol.Z$n.create();
    (e.Ekn = o),
      Net_1.Net.Call(3127, e, (e) => {
        if (e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            5685,
          );
        else {
          var r = [];
          for (const t of ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
            n,
          ).entries())
            r.push([{ IncId: 0, ItemId: t[0] }, t[1]]);
          InventoryGiftController_1.InventoryGiftController.ShowRewardViewWithList(
            r,
          ),
            ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
              o,
              !0,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RedDotSilentFirstAward,
            ),
            AdventureGuideController.EmitRedDotFirstAwardEvent(o);
        }
      });
  }
  static t5e(o, n) {
    if (
      o !==
      ModelManager_1.ModelManager.AdventureGuideModel.GetPendingSilentAreaConfId()
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 10, "探测目标与Pending列表不一致");
    else {
      let e = void 0,
        r = MAX_INT32_NUMBER,
        t = !0;
      var a;
      for (const i of ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().values()) {
        var l = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
            i.Id,
          ),
          l =
            ((t = t && (l?.IsClose || !l)),
            MathUtils_1.MathUtils.LongToBigInt(i.RefreshTime));
        Number(l) <= TimeUtil_1.TimeUtil.GetServerTime() &&
          ((l = Vector_1.Vector.Create(i.PositionX, i.PositionY, i.PositionZ)),
          (l = Vector_1.Vector.Dist(n, l)) < r) &&
          ((e = i.Id), (r = l));
      }
      void 0 !== e
        ? ((o = {
            C3n: o,
            Ikn: Protocol_1.Aki.Protocol.d3n.Proto_SilentArea,
            Ekn: e,
          }),
          ((a = Protocol_1.Aki.Protocol.Mjn.create()).f3n = o),
          Net_1.Net.Call(23417, a, AdventureGuideController.J4e))
        : t ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "SilentCountDown",
          ),
          this.StopTrackCurDetectingSilentArea(),
          this.CancelDetectingRequest());
    }
  }
  static RequestForChapterReward(e) {
    e = Protocol_1.Aki.Protocol.W$n.create({ v3n: e });
    Net_1.Net.Call(23683, e, AdventureGuideController.i5e);
  }
  static o5e(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    r !== e[0].C3n
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
      : (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
          e,
          r,
        ),
        0 ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList()
          .size
          ? ((ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
              ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId(),
            ).RefreshTime = MAX_INT32_NUMBER),
            AdventureGuideController.StopTrackCurDetectingMonster(),
            AdventureGuideController.CancelDetectingRequest())
          : e[0].Ekn ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId() &&
            AdventureGuideController.Y4e(r, AdventureGuideController.$4e()));
  }
  static r5e(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId();
    r !== e[0].C3n
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
      : (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
          e,
          r,
        ),
        0 ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList()
          .size
          ? (AdventureGuideController.StopTrackCurDetectingDungeon(),
            AdventureGuideController.CancelDetectingRequest(),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("AdventureGuide", 10, "Pending列表为空，等待刷新"))
          : e[0].Ekn ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonId() &&
            AdventureGuideController.e5e(r, AdventureGuideController.$4e()));
  }
  static n5e(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId();
    r !== e[0].C3n
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("AdventureGuide", 10, "更新的追踪目标与现有目标不一致")
      : (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
          e,
          r,
        ),
        0 ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList()
          .size
          ? (AdventureGuideController.StopTrackCurDetectingSilentArea(),
            AdventureGuideController.CancelDetectingRequest(),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn("AdventureGuide", 10, "Pending列表为空，等待刷新"))
          : e[0].Ekn ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId() &&
            AdventureGuideController.t5e(r, AdventureGuideController.$4e()));
  }
  static GetValidMonsterEntityIdsOfDetectConf(e) {
    let r =
      ModelManager_1.ModelManager.CreatureModel.GetAllEntityIdOfBlueprintType(
        e.BlueprintType,
      );
    return (r = r.filter(
      (e) =>
        !ModelManager_1.ModelManager.AdventureGuideModel.GetAllCulledMonsters().has(
          e,
        ),
    ));
  }
  static Z4e(e, r, t = !1) {
    return !(
      !r ||
      !e ||
      (!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(e, r) &&
        (t ||
          (this.j4e(e, r),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AdventureGuide",
              5,
              "该地图标记Id不存在, 让策划去检查 k.开拓探测 配置表",
              ["探测类型EMarkType", e],
              ["错误id", r],
            )),
        1))
    );
  }
  static s5e(e, r, t, o, n) {
    e = { X: e.PositionX, Y: e.PositionY, Z: e.PositionZ };
    let a = r;
    return (
      t ||
        ((t = new MapDefine_1.DynamicMarkCreateInfo(
          Vector_1.Vector.Create(e),
          r,
          o,
          void 0,
          void 0,
          !0,
        )),
        (a = ModelManager_1.ModelManager.MapModel.CreateMapMark(t))),
      n && MapController_1.MapController.RequestTrackMapMark(o, a, n),
      a
    );
  }
  static GetDungeonData(e) {
    (e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
        .InstanceDungeonList[0]),
      (e =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          e,
        ).EnterControlId);
    if (e)
      return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstanceData(
        e,
      );
  }
  static GetFirstDungeonConf(e) {
    e =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
        .InstanceDungeonList[0];
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
  }
  static GetDungeonMaxCount(e) {
    var e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(e)
          .InstanceDungeonList[0],
      e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return e &&
      e.EnterControlId &&
      (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetCountConfig(
        e.EnterControlId,
      ))
      ? e.EnterCount
      : 0;
  }
  static JumpToTargetView(e, r = void 0, t = void 0) {
    AdventureGuideController.OpenGuideView(e, r, t);
  }
  static GetMarkAreaText(e) {
    var r,
      t,
      o,
      e = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(e);
    return e.EntityConfigId
      ? ((o = ModelManager_1.ModelManager.WorldMapModel.GetEntityAreaId(
          e.EntityConfigId,
        )),
        (r = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o))
          ? ((t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
              r.Title,
            )),
            (o = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(o)),
            (o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o)),
            (o = ConfigManager_1.ConfigManager.AreaConfig.GetAreaLocalName(
              o.Title,
            )),
            ConfigManager_1.ConfigManager.InfluenceConfig.GetCountryTitle(
              r.CountryId,
            ) +
              `-${o}-` +
              t)
          : "")
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "AdventureGuide",
            5,
            "地图标记配置缺乏实体id, 无法显示对应的区域文本",
            ["markId", e.MarkId],
          ),
        "");
  }
  static GetShowSilentAreasList(e, r) {
    0 ===
      ModelManager_1.ModelManager.AdventureGuideModel
        .DetectionSilentAreasDataList.length &&
      ModelManager_1.ModelManager.AdventureGuideModel.InitAllDetectSilentAreasList();
    var t = new Array();
    return (
      void 0 === e && void 0 === r
        ? ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
            t,
          )
        : void 0 !== e
          ? ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
              t,
              e,
            )
          : void 0 !== r &&
            ModelManager_1.ModelManager.AdventureGuideModel.GetShowSilentAreasList(
              t,
              void 0,
              r,
            ),
      t
    );
  }
  static CheckIsAdventureGuideHasRedDot() {
    return (
      AdventureGuideController.CheckCanGetTaskAward() ||
      AdventureGuideController.CheckCanGetFirstAward() ||
      AdventureGuideController.CheckCanGetDailyActivityAward()
    );
  }
  static CheckCanGetDailyActivityAward() {
    return ModelManager_1.ModelManager.DailyActivityModel.CheckIsRewardWaitTake();
  }
  static CheckCanGetFirstAward() {
    return !1;
  }
  static CheckCanGetFirstAwardById(e) {
    return !1;
  }
  static CheckCanGetFirstAwardByTypeId(e) {
    return !1;
  }
  static CheckCanGetTaskAward() {
    if (!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023001)) return !1;
    var e = ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
      r = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(e);
    if (!r) return !1;
    for (const o of r)
      if (o.Status === Protocol_1.Aki.Protocol.bBs.Proto_Finish) return !0;
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
        ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
      ),
      t = ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter();
    return r.Received === r.Total && e !== t;
  }
}
(exports.AdventureGuideController = AdventureGuideController),
  ((_a = AdventureGuideController).B4e = (e, r) => {
    switch (e) {
      case 7:
        r ===
          ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId() &&
          ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
        break;
      case 6:
        r ===
          ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId() &&
          ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
        break;
      case 19:
        r ===
          ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
          ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
    }
  }),
  (AdventureGuideController.OnTrackMapMark = (r, t, e) => {
    if (!e) {
      let e = !1;
      switch (r) {
        case 7:
          t ===
          ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId()
            ? (ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster(),
              (e = !0))
            : t ===
                ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
              (ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea(),
              (e = !0));
          break;
        case 6:
          t ===
            ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId() &&
            (ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon(),
            (e = !0));
          break;
        case 19:
          t ===
            ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaMarkId() &&
            (ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea(),
            (e = !0));
      }
      e && _a.CancelDetectingRequest();
    }
  }),
  (AdventureGuideController.V4e = (e) => {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) ||
      (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "NoJumpTo",
      ),
      !1)
    );
  }),
  (AdventureGuideController.OpenGuideView = (e, r = void 0, t = void 0) => {
    AdventureGuideController.RequestForAdventureManual(),
      UiManager_1.UiManager.IsViewShow("AdventureGuideView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ChangeChildView,
            e ?? "DailyActivityTabView",
            r,
          )
        : UiManager_1.UiManager.OpenView("AdventureGuideView", [e, r], t);
  }),
  (AdventureGuideController.w4e = () => {
    ModelManager_1.ModelManager.AdventureGuideModel.InitDetectionData();
  }),
  (AdventureGuideController.b4e = () => {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureManualUpdate,
    );
  }),
  (AdventureGuideController.q4e = (e) => {
    for (const r of e.ggs) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetNowChapter(r.hgs),
        ModelManager_1.ModelManager.AdventureGuideModel.SetReceivedChapter(
          r.lgs,
        );
      for (const t of r.ags)
        ModelManager_1.ModelManager.AdventureGuideModel.SetTaskById(
          t.Ekn,
          t.ckn,
          t.sgs,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.AdventureTaskStateChange,
            t.Ekn,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureManualUpdate,
    );
  }),
  (AdventureGuideController.G4e = (e) => {
    ModelManager_1.ModelManager.AdventureGuideModel.HandleMonsterDetectLockStatus(
      e.pgs,
    );
  }),
  (AdventureGuideController.H4e = (e) => {
    ModelManager_1.ModelManager.AdventureGuideModel.UpdateByAdventureManualResponse(
      e,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotAdventureManualUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAward,
      );
  }),
  (AdventureGuideController.W4e = (e) => {}),
  (AdventureGuideController.K4e = (e) => {
    e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Kms,
          23844,
        )
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖返回", [
            "id",
            e.Ekn,
          ]),
        (ModelManager_1.ModelManager.AdventureGuideModel.GetTaskRecordById(
          e.Ekn,
        ).Status = Protocol_1.Aki.Protocol.bBs.Proto_Received),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AdventureTaskStateChange,
          e.Ekn,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖红点刷新", [
            "id",
            e.Ekn,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.Q4e = (e) => {
    for (const r of e?.Igs?.Egs)
      ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
        r,
        !0,
      );
    for (const t of e?.Igs?.ygs)
      ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(t, !0);
  }),
  (AdventureGuideController.X4e = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AdventureGuide",
          5,
          "收到探测请求响应消息 DetectionResponse",
        ),
      e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
    )
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Kms,
        29635,
      );
    else {
      var r = AdventureGuideController.$4e();
      switch (e.fgs[0]?.Ikn) {
        case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
            e.fgs,
            e.g3n,
          ),
            AdventureGuideController.Y4e(e.g3n, r);
          break;
        case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
            e.fgs,
            e.g3n,
          ),
            AdventureGuideController.e5e(e.g3n, r);
          break;
        case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
            e.fgs,
            e.g3n,
          ),
            AdventureGuideController.t5e(e.g3n, r);
      }
    }
  }),
  (AdventureGuideController.z4e = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AdventureGuide",
        8,
        "普通怪物探测面板信息 DetectionResponse",
      ),
      e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Kms,
          5732,
        ),
      0 !== e.fgs.length &&
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
          e.fgs[0].C3n,
          e.fgs[0].cgs,
        );
  }),
  (AdventureGuideController.O4e = (e) => {
    e &&
      (ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
        e.Ekn,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAward,
      ),
      AdventureGuideController.EmitRedDotFirstAwardEvent(e.Ekn));
  }),
  (AdventureGuideController.k4e = (e) => {
    if (e)
      for (const r of e.Egs)
        ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.F4e = (e) => {
    if (e)
      for (const r of e.ygs)
        ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.i5e = (e) => {
    e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Kms,
          14427,
        )
      : (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChapterRewardReceived,
          e.v3n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.N4e = (e) => {
    switch (e.fgs[0].Ikn) {
      case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
        var r = Protocol_1.Aki.Protocol.yjn.create({ xFn: e.fgs });
        Net_1.Net.Call(6214, r, (e) => {
          AdventureGuideController.o5e(e.fgs);
        });
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
        AdventureGuideController.n5e(e.fgs);
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
        AdventureGuideController.r5e(e.fgs);
    }
  }),
  (AdventureGuideController.J4e = (e) => {
    if (
      (AdventureGuideController.StopTrackCurDetectingDungeon(),
      AdventureGuideController.StopTrackCurDetectingMonster(),
      AdventureGuideController.StopTrackCurDetectingSilentArea(),
      e.Kms !== Protocol_1.Aki.Protocol.lkn.Sys)
    )
      return e.f3n.Ekn ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId()
        ? void 0
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Kms,
            8872,
          );
    var r = e.f3n.Ekn,
      t = e.f3n.C3n,
      e = e.f3n.Ikn;
    let o = void 0,
      n = 0,
      a = 6;
    switch (e) {
      case Protocol_1.Aki.Protocol.d3n.Proto_NormalMonster:
        {
          AdventureGuideController.j4e(
            7,
            ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId(),
          ),
            ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId() !==
            t
              ? ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterConfId(
                  t,
                )
              : Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("AdventureGuide", 10, "追踪目标改变"),
            (o =
              ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().get(
                r,
              ));
          var l =
            ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
              t,
            );
          let e = !1;
          var i =
            7 ===
            (a = AdventureGuideController.Z4e(19, l.Conf.MarkId, !0)
              ? ((e = !0), 19)
              : AdventureGuideController.Z4e(6, l.Conf.MarkId, !0)
                ? ((e = !0), 6)
                : 7);
          (n = AdventureGuideController.s5e(o, l.Conf.MarkId, e, a, i)),
            ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterMarkId(
              n,
            ),
            ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterId(
              r,
            );
        }
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_Dungeon:
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId() !==
          t &&
          ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingDungeonConfId(
            t,
          ),
          (o =
            ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().get(
              r,
            ));
        (l =
          ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
            t,
          )),
          (i =
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              l.Conf.DungeonId,
            ));
        AdventureGuideController.Z4e(6, i.MarkId) &&
          ((a = 6),
          (n = AdventureGuideController.s5e(o, i.MarkId, !0, a, !1)),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonMarkId(
            n,
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonId(
            r,
          ));
        break;
      case Protocol_1.Aki.Protocol.d3n.Proto_SilentArea:
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId() !==
          t &&
          ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(
            t,
          ),
          (o =
            ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().get(
              r,
            ));
        (l =
          ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
            t,
          )),
          (i = AdventureGuideController.Z4e(19, l.Conf.MarkId));
        (a = i ? 19 : 7),
          (n = AdventureGuideController.s5e(o, l.Conf.MarkId, i, a, !i)),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaMarkId(
            n,
            a,
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingSilentAreaId(
            r,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.DetectSuccess,
      t,
      e,
    ),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        (ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
          !1,
        ),
        (e = { MarkId: n, MarkType: a, OpenAreaId: 0, IsNotFocusTween: !0 }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, e));
  });
const silentAreasSortFunc = (e, r) =>
    e.Conf.DangerType !== r.Conf.DangerType
      ? r.Conf.DangerType - e.Conf.DangerType
      : e.Conf.Secondary !== r.Conf.Secondary
        ? r.Conf.Secondary - e.Conf.Secondary
        : e.Conf.Id - r.Conf.Id,
  monsterSortFunc =
    ((exports.silentAreasSortFunc = silentAreasSortFunc),
    (e, r) =>
      e.Conf.DangerType !== r.Conf.DangerType
        ? r.Conf.DangerType - e.Conf.DangerType
        : e.Conf.TypeDescription2 !== r.Conf.TypeDescription2
          ? r.Conf.TypeDescription2 - e.Conf.TypeDescription2
          : r.Conf.Id - e.Conf.Id);
exports.monsterSortFunc = monsterSortFunc;
//# sourceMappingURL=AdventureGuideController.js.map
