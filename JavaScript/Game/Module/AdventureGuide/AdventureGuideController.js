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
      this.Q5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveMapMark,
        this.X5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMapMark,
        this.OnTrackMapMark,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.$5e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      this.Q5e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RemoveMapMark,
        this.X5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMapMark,
        this.OnTrackMapMark,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.$5e,
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
    Net_1.Net.Register(18870, this.Y5e),
      Net_1.Net.Register(16636, this.J5e),
      Net_1.Net.Register(9933, this.z5e),
      Net_1.Net.Register(20756, this.Z5e),
      Net_1.Net.Register(21193, this.eVe),
      Net_1.Net.Register(18863, this.tVe);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18870),
      Net_1.Net.UnRegister(16636),
      Net_1.Net.UnRegister(9933),
      Net_1.Net.UnRegister(20756),
      Net_1.Net.UnRegister(21193),
      Net_1.Net.UnRegister(18863);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "AdventureGuideView",
      AdventureGuideController.iVe,
      "AdventureGuideController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "AdventureGuideView",
      AdventureGuideController.iVe,
    );
  }
  static async RequestForAdventureManual() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      e = Protocol_1.Aki.Protocol.J$n.create({ q5n: e }),
      e = await Net_1.Net.CallAsync(21210, e);
    AdventureGuideController.oVe(e);
  }
  static rVe(e, r) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, r);
  }
  static RequestForAdventureManualData(e) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = Protocol_1.Aki.Protocol.V$n.create({ q5n: r });
    Net_1.Net.Call(9857, r, AdventureGuideController.nVe);
  }
  static async RequestForAdventureReward(e) {
    (e = Protocol_1.Aki.Protocol.H$n.create({ J4n: e })),
      (e = await Net_1.Net.CallAsync(28545, e));
    AdventureGuideController.sVe(e);
  }
  static async GetDetectionLabelInfoRequest() {
    var e = Protocol_1.Aki.Protocol.SXn.create({}),
      e = await Net_1.Net.CallAsync(9897, e);
    AdventureGuideController.aVe(e);
  }
  static RequestForDetection(e, r, t) {
    this.HardCode(e, t) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AdventureGuide",
          5,
          "发送探测请求到后端 DetectionRequest",
          ["type", Protocol_1.Aki.Protocol.X6n[e]],
          ["confId", t],
        ),
      (e = Protocol_1.Aki.Protocol.Q$n.create({ X6n: e, $6n: r, Y6n: t })),
      Net_1.Net.Call(21105, e, AdventureGuideController.hVe));
  }
  static HardCode(e, r) {
    return (
      AdventureGuideController.StopTrackCurDetectingDungeon(),
      AdventureGuideController.StopTrackCurDetectingMonster(),
      AdventureGuideController.StopTrackCurDetectingSilentArea(),
      !1
    );
  }
  static lVe() {
    var e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    if (e) {
      e = e.Entity.GetComponent(3);
      if (e) return e.ActorLocationProxy;
    }
  }
  static StopTrackCurDetectingMonster() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterMarkId();
    e && this.rVe(7, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingMonster();
  }
  static _Ve(o, n) {
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
            $6n: o,
            Z4n: Protocol_1.Aki.Protocol.X6n.Proto_NormalMonster,
            J4n: t,
          }),
          ((l = Protocol_1.Aki.Protocol.mXn.create()).J6n = a),
          Net_1.Net.Call(28743, l, AdventureGuideController.uVe))
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
    var e = Protocol_1.Aki.Protocol.mXn.create();
    (e.z6n = !0), Net_1.Net.Call(28743, e, () => {});
  }
  static NormalMonsterManualInfoRequest(e) {
    e = Protocol_1.Aki.Protocol.pXn.create({ $6n: e });
    Net_1.Net.Call(29290, e, AdventureGuideController.cVe);
  }
  static StopTrackCurDetectingDungeon() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId();
    this.mVe(6, e) && this.rVe(6, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
  }
  static dVe(t, o) {
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
            $6n: t,
            Z4n: Protocol_1.Aki.Protocol.X6n.Proto_Dungeon,
            J4n: r,
          }),
          ((n = Protocol_1.Aki.Protocol.mXn.create()).J6n = t),
          Net_1.Net.Call(28743, n, AdventureGuideController.uVe))
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
    this.mVe(r, e) && this.rVe(r, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingSilentArea();
  }
  static RequestSilentFirstAward(o, n) {
    var e = Protocol_1.Aki.Protocol.Z$n.create();
    (e.J4n = o),
      Net_1.Net.Call(23179, e, (e) => {
        if (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            1359,
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
  static CVe(o, n) {
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
            $6n: o,
            Z4n: Protocol_1.Aki.Protocol.X6n.Proto_SilentArea,
            J4n: e,
          }),
          ((a = Protocol_1.Aki.Protocol.mXn.create()).J6n = o),
          Net_1.Net.Call(28743, a, AdventureGuideController.uVe))
        : t ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "SilentCountDown",
          ),
          this.StopTrackCurDetectingSilentArea(),
          this.CancelDetectingRequest());
    }
  }
  static RequestForChapterReward(e) {
    e = Protocol_1.Aki.Protocol.W$n.create({ Z6n: e });
    Net_1.Net.Call(9127, e, AdventureGuideController.gVe);
  }
  static fVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    r !== e[0].$6n
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
          : e[0].J4n ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId() &&
            AdventureGuideController._Ve(r, AdventureGuideController.lVe()));
  }
  static pVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId();
    r !== e[0].$6n
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
          : e[0].J4n ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonId() &&
            AdventureGuideController.dVe(r, AdventureGuideController.lVe()));
  }
  static vVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId();
    r !== e[0].$6n
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
          : e[0].J4n ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId() &&
            AdventureGuideController.CVe(r, AdventureGuideController.lVe()));
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
  static mVe(e, r, t = !1) {
    return !(
      !r ||
      !e ||
      (!ModelManager_1.ModelManager.MapModel.IsMarkIdExist(e, r) &&
        (t ||
          (this.rVe(e, r),
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
  static MVe(e, r, t, o, n) {
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
      if (o.Status === Protocol_1.Aki.Protocol.Eks.Proto_Finish) return !0;
    var r = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
        ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
      ),
      t = ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter();
    return r.Received === r.Total && e !== t;
  }
}
(exports.AdventureGuideController = AdventureGuideController),
  ((_a = AdventureGuideController).X5e = (e, r) => {
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
  (AdventureGuideController.iVe = (e) => {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) ||
      (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
        "NoJumpTo",
      ),
      !1)
    );
  }),
  (AdventureGuideController.OpenGuideView = (e, r = void 0, t = void 0) => {
    UiManager_1.UiManager.IsViewShow("AdventureGuideView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChangeChildView,
          e ?? "DailyActivityTabView",
          r,
        )
      : UiManager_1.UiManager.OpenView("AdventureGuideView", [e, r], t);
  }),
  (AdventureGuideController.Q5e = () => {
    ModelManager_1.ModelManager.AdventureGuideModel.InitDetectionData();
  }),
  (AdventureGuideController.$5e = () => {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureManualUpdate,
    );
  }),
  (AdventureGuideController.Y5e = (e) => {
    for (const r of e.xMs) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetNowChapter(r.TMs),
        ModelManager_1.ModelManager.AdventureGuideModel.SetReceivedChapter(
          r.LMs,
        );
      for (const t of r.IMs)
        ModelManager_1.ModelManager.AdventureGuideModel.SetTaskById(
          t.J4n,
          t.F4n,
          t.yMs,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.AdventureTaskStateChange,
            t.J4n,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureManualUpdate,
    );
  }),
  (AdventureGuideController.J5e = (e) => {
    ModelManager_1.ModelManager.AdventureGuideModel.HandleMonsterDetectLockStatus(
      e.qMs,
    );
  }),
  (AdventureGuideController.oVe = (e) => {
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
  (AdventureGuideController.nVe = (e) => {}),
  (AdventureGuideController.sVe = (e) => {
    e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          9941,
        )
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖返回", [
            "id",
            e.J4n,
          ]),
        (ModelManager_1.ModelManager.AdventureGuideModel.GetTaskRecordById(
          e.J4n,
        ).Status = Protocol_1.Aki.Protocol.Eks.Proto_Received),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AdventureTaskStateChange,
          e.J4n,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖红点刷新", [
            "id",
            e.J4n,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.aVe = (e) => {
    for (const r of e?.FMs?.kMs)
      ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
        r,
        !0,
      );
    for (const t of e?.FMs?.NMs)
      ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(t, !0);
  }),
  (AdventureGuideController.hVe = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "AdventureGuide",
          5,
          "收到探测请求响应消息 DetectionResponse",
        ),
      e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs)
    )
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.hvs,
        2041,
      );
    else {
      var r = AdventureGuideController.lVe();
      switch (e.bMs[0]?.Z4n) {
        case Protocol_1.Aki.Protocol.X6n.Proto_NormalMonster:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
            e.bMs,
            e.Y6n,
          ),
            AdventureGuideController._Ve(e.Y6n, r);
          break;
        case Protocol_1.Aki.Protocol.X6n.Proto_Dungeon:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
            e.bMs,
            e.Y6n,
          ),
            AdventureGuideController.dVe(e.Y6n, r);
          break;
        case Protocol_1.Aki.Protocol.X6n.Proto_SilentArea:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
            e.bMs,
            e.Y6n,
          ),
            AdventureGuideController.CVe(e.Y6n, r);
      }
    }
  }),
  (AdventureGuideController.cVe = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AdventureGuide",
        8,
        "普通怪物探测面板信息 DetectionResponse",
      ),
      e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          20731,
        ),
      0 !== e.bMs.length &&
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
          e.bMs[0].$6n,
          e.bMs[0].AMs,
        );
  }),
  (AdventureGuideController.Z5e = (e) => {
    e &&
      (ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
        e.J4n,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAward,
      ),
      AdventureGuideController.EmitRedDotFirstAwardEvent(e.J4n));
  }),
  (AdventureGuideController.eVe = (e) => {
    if (e)
      for (const r of e.kMs)
        ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.tVe = (e) => {
    if (e)
      for (const r of e.NMs)
        ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.gVe = (e) => {
    e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.hvs,
          4072,
        )
      : (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChapterRewardReceived,
          e.Z6n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.z5e = (e) => {
    switch (e.bMs[0].Z4n) {
      case Protocol_1.Aki.Protocol.X6n.Proto_NormalMonster:
        var r = Protocol_1.Aki.Protocol.fXn.create({ s6n: e.bMs });
        Net_1.Net.Call(22501, r, (e) => {
          AdventureGuideController.fVe(e.bMs);
        });
        break;
      case Protocol_1.Aki.Protocol.X6n.Proto_SilentArea:
        AdventureGuideController.vVe(e.bMs);
        break;
      case Protocol_1.Aki.Protocol.X6n.Proto_Dungeon:
        AdventureGuideController.pVe(e.bMs);
    }
  }),
  (AdventureGuideController.uVe = (e) => {
    if (
      (AdventureGuideController.StopTrackCurDetectingDungeon(),
      AdventureGuideController.StopTrackCurDetectingMonster(),
      AdventureGuideController.StopTrackCurDetectingSilentArea(),
      e.hvs !== Protocol_1.Aki.Protocol.O4n.NRs)
    )
      return e.J6n.J4n ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId()
        ? void 0
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.hvs,
            8050,
          );
    var r = e.J6n.J4n,
      t = e.J6n.$6n,
      e = e.J6n.Z4n;
    let o = void 0,
      n = 0,
      a = 6;
    switch (e) {
      case Protocol_1.Aki.Protocol.X6n.Proto_NormalMonster:
        {
          AdventureGuideController.rVe(
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
            (a = AdventureGuideController.mVe(19, l.Conf.MarkId, !0)
              ? ((e = !0), 19)
              : AdventureGuideController.mVe(6, l.Conf.MarkId, !0)
                ? ((e = !0), 6)
                : 7);
          (n = AdventureGuideController.MVe(o, l.Conf.MarkId, e, a, i)),
            ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterMarkId(
              n,
            ),
            ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterId(
              r,
            );
        }
        break;
      case Protocol_1.Aki.Protocol.X6n.Proto_Dungeon:
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
        AdventureGuideController.mVe(6, i.MarkId) &&
          ((a = 6),
          (n = AdventureGuideController.MVe(o, i.MarkId, !0, a, !1)),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonMarkId(
            n,
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonId(
            r,
          ));
        break;
      case Protocol_1.Aki.Protocol.X6n.Proto_SilentArea:
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
          (i = AdventureGuideController.mVe(19, l.Conf.MarkId));
        (a = i ? 19 : 7),
          (n = AdventureGuideController.MVe(o, l.Conf.MarkId, i, a, !i)),
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
