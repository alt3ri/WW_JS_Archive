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
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
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
  GuideView_1 = require("./Views/GuideView"),
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
    Net_1.Net.Register(16659, this.Y5e),
      Net_1.Net.Register(18762, this.J5e),
      Net_1.Net.Register(28775, this.z5e),
      Net_1.Net.Register(19540, this.Z5e),
      Net_1.Net.Register(16194, this.eVe),
      Net_1.Net.Register(20115, this.tVe),
      Net_1.Net.Register(20529, this.Wkl),
      Net_1.Net.Register(19234, this.E11);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16659),
      Net_1.Net.UnRegister(18762),
      Net_1.Net.UnRegister(28775),
      Net_1.Net.UnRegister(19540),
      Net_1.Net.UnRegister(16194),
      Net_1.Net.UnRegister(20115),
      Net_1.Net.UnRegister(20529),
      Net_1.Net.UnRegister(19234);
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
  static OpenGuideViewWithOpenData(e, r = void 0) {
    UiManager_1.UiManager.IsViewShow("AdventureGuideView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SwitchAdventureGuideViewTab,
          e,
        )
      : UiManager_1.UiManager.OpenView("AdventureGuideView", e, r);
  }
  static UpdateAdventureNewSoundAreaTabRedDot() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate,
    );
  }
  static UpdateAdventureNewChallengeTabRedDot() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureChallengeTabUpdate,
    );
  }
  static async RequestForAdventureManual() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      e = Protocol_1.Aki.Protocol.J$n.create({ W5n: e }),
      e = await Net_1.Net.CallAsync(24445, e);
    AdventureGuideController.oVe(e);
  }
  static rVe(e, r) {
    ModelManager_1.ModelManager.MapModel.RemoveMapMark(e, r);
  }
  static RequestForAdventureManualData(e) {
    var r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = Protocol_1.Aki.Protocol.V$n.create({ W5n: r });
    Net_1.Net.Call(29980, r, AdventureGuideController.nVe);
  }
  static async RequestForAdventureReward(e) {
    (e = Protocol_1.Aki.Protocol.H$n.create({ s5n: e })),
      (e = await Net_1.Net.CallAsync(25239, e));
    AdventureGuideController.sVe(e);
  }
  static async GetDetectionLabelInfoRequest() {
    var e = Protocol_1.Aki.Protocol.DXn.create({}),
      e = await Net_1.Net.CallAsync(21242, e);
    AdventureGuideController.aVe(e);
  }
  static RequestForDetection(e, r, t) {
    this.HardCode(e, t) ||
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AdventureGuide",
          5,
          "发送探测请求到后端 DetectionRequest",
          ["type", Protocol_1.Aki.Protocol.r8n[e]],
          ["confId", t],
        ),
      (e = Protocol_1.Aki.Protocol.Q$n.create({ r8n: e, o8n: r, n8n: t })),
      Net_1.Net.Call(23642, e, AdventureGuideController.hVe));
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
  static _Ve(n, a) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("AdventureGuide", 5, "找到下一个距离最近的怪物", [
          "探测Id",
          n,
        ]),
      n !==
        ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId())
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 9, "pending列表与探测目标不一致");
    else {
      let e = MAX_INT32_NUMBER,
        r = MAX_INT64_NUMBER,
        t = void 0,
        o = void 0;
      var i,
        d =
          ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList(),
        l = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
      for (const u of d.values()) {
        var _ = MathUtils_1.MathUtils.LongToBigInt(u.RefreshTime);
        Number(_) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 &&
          l === u.MapId &&
          ((_ = { X: u.PositionX, Y: u.PositionY, Z: u.PositionZ }),
          (_ = Vector_1.Vector.Create(_)),
          (_ = Vector_1.Vector.Dist(a, _)) < e) &&
          ((e = _), (t = u.Id)),
          MathUtils_1.MathUtils.LongToBigInt(u.RefreshTime) <
            MathUtils_1.MathUtils.LongToBigInt(r) && (r = u.RefreshTime);
      }
      if (t) o = l;
      else
        for (const s of d.values()) {
          var M = MathUtils_1.MathUtils.LongToBigInt(s.RefreshTime);
          if (
            Number(M) - TimeUtil_1.TimeUtil.GetServerTime() <= 0 &&
            l !== s.MapId
          ) {
            (M = { X: s.PositionX, Y: s.PositionY, Z: s.PositionZ }),
              (M = Vector_1.Vector.Create(M)),
              (M = Vector_1.Vector.Dist(a, M));
            (e = M),
              (t = s.Id),
              (o = s.MapId),
              MathUtils_1.MathUtils.LongToBigInt(s.RefreshTime) <
                MathUtils_1.MathUtils.LongToBigInt(r) && (r = s.RefreshTime);
            break;
          }
        }
      void 0 !== t
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AdventureGuide",
              5,
              "找到距离最近的怪物发起探测",
              ["探测Id", n],
              ["实体id", t],
              ["地图id", o],
              ["refreshtime", r],
            ),
          (d = {
            o8n: n,
            h5n: Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster,
            s5n: t,
            w7n: o ?? 0,
          }),
          ((i = Protocol_1.Aki.Protocol.SXn.create()).s8n = d),
          Net_1.Net.Call(22328, i, AdventureGuideController.uVe))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "AdventureGuide",
              5,
              "没有找到距离最近怪物，结束探测",
              ["探测Id", n],
            ),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "CannotFindTarget",
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
            n,
            r,
          ),
          this.StopTrackCurDetectingMonster(),
          this.CancelDetectingRequest(),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("AdventureGuide", 9, "剩余刷新时间", [
              "MathUtils.LongToBigInt(minRefreshTime)",
              MathUtils_1.MathUtils.LongToBigInt(r),
            ]));
    }
  }
  static CancelDetectingRequest() {
    var e = Protocol_1.Aki.Protocol.SXn.create();
    (e.a8n = !0), Net_1.Net.Call(22328, e, () => {});
  }
  static NormalMonsterManualInfoRequest(e) {
    e = Protocol_1.Aki.Protocol.LXn.create({ o8n: e });
    Net_1.Net.Call(27138, e, AdventureGuideController.cVe);
  }
  static StopTrackCurDetectingDungeon() {
    var e =
      ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonMarkId();
    this.mVe(6, e) && this.rVe(6, e),
      ModelManager_1.ModelManager.AdventureGuideModel.GetIsFromManualDetect() &&
        ModelManager_1.ModelManager.AdventureGuideModel.CleanCurTrackingDungeon();
  }
  static dVe(o, n) {
    if (
      o !==
      ModelManager_1.ModelManager.AdventureGuideModel.GetPendingDungeonConfId()
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 9, "探测目标与Pending列表不一致");
    else {
      let e = MAX_INT32_NUMBER,
        r = void 0,
        t = void 0;
      var a;
      for (const d of ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().values()) {
        var i = { X: d.PositionX, Y: d.PositionY, Z: d.PositionZ },
          i = Vector_1.Vector.Create(i),
          i = Vector_1.Vector.Dist(n, i);
        i < e && ((r = d.Id), (t = d.MapId), (e = i));
      }
      void 0 !== r
        ? ((o = {
            o8n: o,
            h5n: Protocol_1.Aki.Protocol.r8n.Proto_Dungeon,
            s5n: r,
            w7n: t ?? 0,
          }),
          ((a = Protocol_1.Aki.Protocol.SXn.create()).s8n = o),
          Net_1.Net.Call(22328, a, AdventureGuideController.uVe))
        : ((o =
            ConfigManager_1.ConfigManager.TextConfig.GetTextById(
              DUNGEON_LOCKED,
            )),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(o),
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
    (e.s5n = o),
      Net_1.Net.Call(16261, e, (e) => {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            21565,
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
  static CVe(n, a) {
    if (
      n !==
      ModelManager_1.ModelManager.AdventureGuideModel.GetPendingSilentAreaConfId()
    )
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("AdventureGuide", 9, "探测目标与Pending列表不一致");
    else {
      let e = void 0,
        r = MAX_INT32_NUMBER,
        t = !0,
        o = void 0;
      var i;
      for (const l of ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().values()) {
        var d = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(
            l.Id,
          ),
          d =
            ((t = t && (d?.IsClose || !d)),
            MathUtils_1.MathUtils.LongToBigInt(l.RefreshTime));
        Number(d) <= TimeUtil_1.TimeUtil.GetServerTime() &&
          ((d = Vector_1.Vector.Create(l.PositionX, l.PositionY, l.PositionZ)),
          (d = Vector_1.Vector.Dist(a, d)) < r) &&
          ((e = l.Id), (o = l.MapId), (r = d));
      }
      void 0 !== e
        ? ((n = {
            o8n: n,
            h5n: Protocol_1.Aki.Protocol.r8n.Proto_SilentArea,
            s5n: e,
            w7n: o ?? 0,
          }),
          ((i = Protocol_1.Aki.Protocol.SXn.create()).s8n = n),
          Net_1.Net.Call(22328, i, AdventureGuideController.uVe))
        : t ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "SilentCountDown",
          ),
          this.StopTrackCurDetectingSilentArea(),
          this.CancelDetectingRequest());
    }
  }
  static RequestForChapterReward(e) {
    e = Protocol_1.Aki.Protocol.W$n.create({ h8n: e });
    Net_1.Net.Call(22817, e, AdventureGuideController.gVe);
  }
  static fVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    r !== e[0].o8n
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AdventureGuide",
          9,
          "Monster 更新的追踪目标与现有目标不一致",
          ["现有追踪目标：", r],
          ["更新追踪目标：", e[0].o8n],
        )
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
          : e[0].s5n ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId() &&
            AdventureGuideController._Ve(r, AdventureGuideController.lVe()));
  }
  static pVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId();
    r !== e[0].o8n
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AdventureGuide",
          9,
          "Dungeon 更新的追踪目标与现有目标不一致",
          ["现有追踪目标：", r],
          ["更新追踪目标：", e[0].o8n],
        )
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
              Log_1.Log.Warn("AdventureGuide", 9, "Pending列表为空，等待刷新"))
          : e[0].s5n ===
              ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingDungeonId() &&
            AdventureGuideController.dVe(r, AdventureGuideController.lVe()));
  }
  static vVe(e) {
    var r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId();
    r !== e[0].o8n
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AdventureGuide",
          9,
          "SilentArea 更新的追踪目标与现有目标不一致",
          ["现有追踪目标：", r],
          ["更新追踪目标：", e[0].o8n],
        )
      : (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
          e,
          r,
        ),
        AdventureGuideController.StopTrackCurDetectingSilentArea(),
        AdventureGuideController.CancelDetectingRequest());
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
  static IsMarkUnlock(e) {
    var r, t;
    return !(
      !e ||
      ((r = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e)),
      !ModelManager_1.ModelManager.MapModel.IsConfigMarkIdUnlock(e) &&
        0 < r.ShowCondition &&
        ((t = ConfigManager_1.ConfigManager.WorldMapConfig.GetConditionGroup(
          r.ShowCondition,
        ).HintText),
        StringUtils_1.StringUtils.IsEmpty(t)
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "AdventureGuide",
              75,
              "该地图标记Id ConditionText不存在, 策划检查 d.地图标记、t.条件 配表",
              ["错误标记id", e],
              ["错误条件", r.ShowCondition],
            )
          : ((e = ConfigManager_1.ConfigManager.MapConfig.GetLocalText(t)),
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "UnlockCondition",
              e,
            )),
        1))
    );
  }
  static MVe(e, r, t, o, n) {
    var a = { X: e.PositionX, Y: e.PositionY, Z: e.PositionZ };
    let i = r;
    return (
      t ||
        ((t = new MapDefine_1.DynamicMarkCreateInfo({
          TrackTarget: Vector_1.Vector.Create(a),
          MarkConfigId: r,
          MarkType: o,
          DestroyOnUnTrack: !0,
          MapAndDungeonInfo: { MapConfigId: e.MapId },
        })),
        (i = ModelManager_1.ModelManager.MapModel.CreateMapMark(t))),
      n &&
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: o,
          MarkId: i,
          Track: n,
        }),
      i
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
  static RecordAdventureNewSoundAreaTabClick() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .RedDotAdventureNewSoundAreaTabLastUpdateTime,
      TimeUtil_1.TimeUtil.GetServerTimeStamp(),
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate,
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
      if (o.Status === Protocol_1.Aki.Protocol.Aks.a3_) return !0;
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
    var o;
    UiManager_1.UiManager.IsViewShow("AdventureGuideView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChangeChildView,
          e ?? "DailyActivityTabView",
          r,
        )
      : (((o = new GuideView_1.AdventureGuideViewOpenData()).OpenTabViewName =
          e),
        (o.OpenParam = r),
        void 0 !==
        (e = UiManager_1.UiManager.GetViewByName("AdventureGuideView"))
          ? (e.SetTabViewOpenData(o),
            UiManager_1.UiManager.NormalResetToView(
              "AdventureGuideView",
              (e) => {
                t?.(e, 0);
              },
            ))
          : UiManager_1.UiManager.OpenView("AdventureGuideView", o, t));
  }),
  (AdventureGuideController.Q5e = () => {
    ModelManager_1.ModelManager.AdventureGuideModel.InitDetectionData();
  }),
  (AdventureGuideController.$5e = () => {
    (ModelManager_1.ModelManager.AdventureGuideModel.DetectionRedDotRecord =
      LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey.DetectionRedDotRecord,
      ) ?? new Map()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotAdventureManualUpdate,
      ),
      ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForAdventureManual();
  }),
  (AdventureGuideController.Y5e = (e) => {
    for (const r of e.NMs) {
      ModelManager_1.ModelManager.AdventureGuideModel.SetNowChapter(r.wMs),
        ModelManager_1.ModelManager.AdventureGuideModel.SetReceivedChapter(
          r.xMs,
        );
      for (const t of r.UMs)
        ModelManager_1.ModelManager.AdventureGuideModel.SetTaskById(
          t.s5n,
          t.Y4n,
          t.PMs,
        ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.AdventureTaskStateChange,
            t.s5n,
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RedDotAdventureManualUpdate,
    );
  }),
  (AdventureGuideController.J5e = (e) => {
    ModelManager_1.ModelManager.AdventureGuideModel.HandleMonsterDetectLockStatus(
      e.$Ms,
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
  (AdventureGuideController.Wkl = (e) => {
    void 0 !== e &&
      (ModelManager_1.ModelManager.AdventureGuideModel.FullUpdateDetectionPreOpenData(
        1,
        e.wE_,
      ),
      ModelManager_1.ModelManager.AdventureGuideModel.FullUpdateDetectionPreOpenData(
        0,
        e.LE_,
      ));
  }),
  (AdventureGuideController.I11 = void 0),
  (AdventureGuideController.T11 = []),
  (AdventureGuideController.E11 = (e) => {
    e = e.ih1;
    const r =
      ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingMonsterConfId();
    r !== e.o8n
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AdventureGuide",
          5,
          "Monster 更新的追踪目标与现有目标不一致",
          ["现有追踪目标：", r],
          ["更新追踪目标：", e.o8n],
        )
      : (_a.T11.push(e),
        _a.I11 ||
          (_a.I11 = TimerSystem_1.TimerSystem.Delay(() => {
            if (
              (ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
                _a.T11,
                r,
              ),
              0 ===
                ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList()
                  .size)
            )
              (ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
                ModelManager_1.ModelManager.AdventureGuideModel.GetPendingMonsterConfId(),
              ).RefreshTime = MAX_INT32_NUMBER),
                AdventureGuideController.StopTrackCurDetectingMonster(),
                AdventureGuideController.CancelDetectingRequest();
            else
              for (const e of _a.T11)
                if (
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "AdventureGuide",
                      5,
                      "DetectionListHandle",
                      ["怪物id", e.s5n],
                      ["探测id", e.o8n],
                      ["RefreshTime", e.qMs],
                    ),
                  e.s5n ===
                    ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingMonsterId())
                ) {
                  AdventureGuideController._Ve(
                    r,
                    AdventureGuideController.lVe(),
                  );
                  break;
                }
            (_a.T11 = []), (_a.I11 = void 0);
          }, TimeUtil_1.TimeUtil.InverseMillisecond)));
  }),
  (AdventureGuideController.nVe = (e) => {}),
  (AdventureGuideController.sVe = (e) => {
    e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          28953,
        )
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖返回", [
            "id",
            e.s5n,
          ]),
        (ModelManager_1.ModelManager.AdventureGuideModel.GetTaskRecordById(
          e.s5n,
        ).Status = Protocol_1.Aki.Protocol.Aks.Proto_Received),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.AdventureTaskStateChange,
          e.s5n,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("AdventureGuide", 5, "拾音辑录任务领奖红点刷新", [
            "id",
            e.s5n,
          ]),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.aVe = (e) => {
    for (const r of e?.QMs?.WMs)
      ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
        r,
        !0,
      );
    for (const t of e?.QMs?.KMs)
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
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs)
    )
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Cvs,
        19002,
      );
    else {
      var r = AdventureGuideController.lVe();
      switch (e.FMs[0]?.h5n) {
        case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingMonsterList(
            e.FMs,
            e.n8n,
          ),
            AdventureGuideController._Ve(e.n8n, r);
          break;
        case Protocol_1.Aki.Protocol.r8n.Proto_Dungeon:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingDungeonList(
            e.FMs,
            e.n8n,
          ),
            AdventureGuideController.dVe(e.n8n, r);
          break;
        case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
          ModelManager_1.ModelManager.AdventureGuideModel.UpdatePendingSilentAreaList(
            e.FMs,
            e.n8n,
          ),
            AdventureGuideController.CVe(e.n8n, r);
      }
    }
  }),
  (AdventureGuideController.cVe = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "AdventureGuide",
        64,
        "普通怪物探测面板信息 DetectionResponse",
      ),
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          18871,
        ),
      0 !== e.FMs.length &&
        ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterRefreshTime(
          e.FMs[0].o8n,
          e.FMs[0].qMs,
        );
  }),
  (AdventureGuideController.Z5e = (e) => {
    e &&
      (ModelManager_1.ModelManager.AdventureGuideModel.UpdateSilentFirstAwards(
        e.s5n,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RedDotSilentFirstAward,
      ),
      AdventureGuideController.EmitRedDotFirstAwardEvent(e.s5n));
  }),
  (AdventureGuideController.eVe = (e) => {
    if (e)
      for (const r of e.WMs)
        ModelManager_1.ModelManager.AdventureGuideModel?.GuideTypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.tVe = (e) => {
    if (e)
      for (const r of e.KMs)
        ModelManager_1.ModelManager.AdventureGuideModel?.TypeUnLockMap.set(
          r,
          !0,
        );
  }),
  (AdventureGuideController.gVe = (e) => {
    e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          19479,
        )
      : (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ChapterRewardReceived,
          e.h8n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RedDotAdventureManualUpdate,
        ));
  }),
  (AdventureGuideController.z5e = (e) => {
    switch (e.FMs[0].h5n) {
      case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
        var r = Protocol_1.Aki.Protocol.IXn.create({ C6n: e.FMs });
        Net_1.Net.Call(22092, r, (e) => {
          AdventureGuideController.fVe(e.FMs);
        });
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
        AdventureGuideController.vVe(e.FMs);
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_Dungeon:
        AdventureGuideController.pVe(e.FMs);
    }
  }),
  (AdventureGuideController.sN_ = new Set([19, 6, 29])),
  (AdventureGuideController.uVe = (e) => {
    if (
      (AdventureGuideController.StopTrackCurDetectingDungeon(),
      AdventureGuideController.StopTrackCurDetectingMonster(),
      AdventureGuideController.StopTrackCurDetectingSilentArea(),
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs)
    )
      return e.s8n.s5n ===
        ModelManager_1.ModelManager.AdventureGuideModel.GetDetectingSilentAreaId()
        ? void 0
        : void ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            21399,
          );
    var r = e.s8n.s5n,
      t = e.s8n.o8n,
      e = e.s8n.h5n;
    let o = void 0,
      n = 0,
      a = 6;
    switch (e) {
      case Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster:
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
                Log_1.Log.Info("AdventureGuide", 9, "追踪目标改变"),
            (o =
              ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterPendingList().get(
                r,
              ));
          var i =
            ModelManager_1.ModelManager.AdventureGuideModel.GetMonsterDetectData(
              t,
            );
          let e = !1;
          for (const _ of _a.sN_)
            if (AdventureGuideController.mVe(_, i.Conf.MarkId, !0)) {
              (e = !0), (a = _);
              break;
            }
          var d = 7 === (a = e ? a : 7);
          (n = AdventureGuideController.MVe(o, i.Conf.MarkId, e, a, d)),
            ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingMonsterMarkId(
              n,
            ),
            ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingMonsterId(
              r,
            );
        }
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_Dungeon:
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingDungeonConfId() !==
          t &&
          ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingDungeonConfId(
            t,
          ),
          (o =
            ModelManager_1.ModelManager.AdventureGuideModel.GetDungeonPendingList().get(
              r,
            ));
        (d =
          ModelManager_1.ModelManager.AdventureGuideModel.GetSoundAreaDetectData(
            t,
          )),
          (d =
            ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
              d.Conf.DungeonId,
            ));
        AdventureGuideController.mVe(6, d.MarkId) &&
          ((a = 6),
          (n = AdventureGuideController.MVe(o, d.MarkId, !0, a, !1)),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonMarkId(
            n,
          ),
          ModelManager_1.ModelManager.AdventureGuideModel.SetDetectingDungeonId(
            r,
          ));
        break;
      case Protocol_1.Aki.Protocol.r8n.Proto_SilentArea:
        ModelManager_1.ModelManager.AdventureGuideModel.GetCurDetectingSilentAreaConfId() !==
          t &&
          ModelManager_1.ModelManager.AdventureGuideModel.SetCurDetectingSilentAreaConfId(
            t,
          ),
          (o =
            ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaPendingList().get(
              r,
            ));
        var d =
            ModelManager_1.ModelManager.AdventureGuideModel.GetSilentAreaDetectData(
              t,
            ),
          l = AdventureGuideController.mVe(19, d.Conf.MarkId);
        (a = l ? 19 : 7),
          (n = AdventureGuideController.MVe(o, d.Conf.MarkId, l, a, !l)),
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
        (e = { MarkId: n, MarkType: a, OpenFogId: 0, IsNotFocusTween: !0 }),
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
