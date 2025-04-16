"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  MapLogger_1 = require("../Map/Misc/MapLogger"),
  QuestController_1 = require("../QuestNew/Controller/QuestController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  WorldMapDefine_1 = require("./WorldMapDefine");
class WorldMapController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "WorldMapView",
        WorldMapController._ki,
      ),
      !0
    );
  }
  static OnLeaveLevel() {
    return (
      void 0 !== this.l3o &&
        TimerSystem_1.TimerSystem.Has(this.l3o) &&
        TimerSystem_1.TimerSystem.Remove(this.l3o),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this._3o),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.u3o,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenView,
      this._3o,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.u3o,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      );
  }
  static TryTeleport(e, r) {
    var o;
    TeleportController_1.TeleportController.CheckCanTeleport()
      ? void 0 ===
        (o = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(e))
        ? MapLogger_1.MapLogger.Error(63, "[地图系统]传送失败,找不到传送配置", [
            "teleportId",
            e,
          ])
        : ((o = ModelManager_1.ModelManager.WorldMapModel.GetEntityPosition(
            o.TeleportEntityConfigId,
            o.MapId,
          )),
          QuestController_1.QuestNewController.IsTrackPositionOutFailRange(o)
            ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                220,
              )).FunctionMap.set(2, () => {
                TeleportController_1.TeleportController.SendTeleportTransferRequest(
                  e,
                ),
                  r?.();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                o,
              ))
            : (TeleportController_1.TeleportController.SendTeleportTransferRequest(
                e,
              ),
              r?.()))
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTransmitLimit",
        );
  }
  static MapOpenPush(e) {
    var r = new Protocol_1.Aki.Protocol.fas();
    (r.vjn = e), Net_1.Net.Send(17929, r);
  }
  static OpenView(o, e, r, t) {
    void 0 !==
      ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId &&
      (EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ) &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
          this.Uct,
        ),
      (ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId =
        void 0)),
      (ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = e);
    const n = () => {
      UiManager_1.UiManager.OpenView("WorldMapView", r, (e, r) => {
        e && WorldMapController.MapOpenPush(o),
          (ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = !1),
          t?.(e, r);
      });
    };
    UiManager_1.UiManager.IsViewOpen("WorldMapView") ||
    UiManager_1.UiManager.IsViewHide("WorldMapView")
      ? UiManager_1.UiManager.CloseViewAsync("WorldMapView").then(() => {
          n();
        })
      : n();
  }
  static FocalMarkItem(e, r) {
    var o = ModelManager_1.ModelManager.WorldMapModel,
      t = o.CurrentFocalMarkType,
      n = o.CurrentFocalMarkId;
    (t === e && n === r) ||
      (UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
        UiManager_1.UiManager.CloseView("ItemTipsView"),
      UiManager_1.UiManager.IsViewShow("CommonRewardView") &&
        UiManager_1.UiManager.CloseView("CommonRewardView")),
      (o.CurrentFocalMarkType = e),
      (o.CurrentFocalMarkId = r),
      UiManager_1.UiManager.IsViewShow("WorldMapView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
            e,
            r,
          )
        : ((t = { MarkType: e, MarkId: r, OpenFogId: 0 }),
          WorldMapController.OpenView(1, !1, t));
  }
  static ClearFocalMarkItem() {
    var e = ModelManager_1.ModelManager.WorldMapModel;
    (e.CurrentFocalMarkType = void 0), (e.CurrentFocalMarkId = void 0);
  }
  static CloseWorldMap() {
    UiManager_1.UiManager.IsViewShow("WorldMapView")
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.DestroyAllUiCameraAnimationHandles,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ))
      : UiManager_1.UiManager.IsViewShow("FunctionView") &&
        UiManager_1.UiManager.CloseView("FunctionView");
  }
  static OnClear() {
    return (
      void 0 !== this.l3o &&
        (TimerSystem_1.TimerSystem.Remove(this.l3o), (this.l3o = void 0)),
      this.iUi.ClearData(),
      !0
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "WorldMapView",
      WorldMapController.iVe,
      "WorldMapController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "WorldMapView",
      WorldMapController.iVe,
    );
  }
  static vdl() {
    var e =
        ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo
          ?.InstanceDungeonId ?? 0,
      r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    ModelManager_1.ModelManager.MapModel.CurrentInWorld ||
    ModelManager_1.ModelManager.WorldMapModel.InstIsType(
      r,
      Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance,
      12,
    )
      ? (ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo =
          void 0)
      : e !== r && this.Mdl(r);
  }
  static Mdl(r) {
    var e = Protocol_1.Aki.Protocol.wg_.create();
    Net_1.Net.Call(17472, e, (e) => {
      e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Cvs,
          18763,
        );
      e = {
        InstanceDungeonId: r,
        Position: Vector_1.Vector.Create(e.D7n, e.A7n, e.L7n),
        AreaId: e.p6n,
      };
      ModelManager_1.ModelManager.WorldMapModel.LastBigSceneMiniMapInfo = e;
    });
  }
  static SkipToExploreAreaDetailView(e, r) {
    UiManager_1.UiManager.IsViewShow("WorldMapView")
      ? EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OpenExploreAreaDetailViewFromMap,
          e,
          r,
        )
      : ((e = {
          MarkId: void 0,
          MarkType: 0,
          SkipToExploreAreaDetailView: [e, r],
        }),
        WorldMapController.OpenView(2, !1, e));
  }
  static StartListenChildQuestNodeStatusChangedAndOpenWorldMap(e) {
    (ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId = e),
      EventSystem_1.EventSystem.Has(
        EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
        this.Uct,
      ) ||
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
          this.Uct,
        );
  }
}
(exports.WorldMapController = WorldMapController),
  ((_a = WorldMapController).l3o = void 0),
  (WorldMapController.m3o = void 0),
  (WorldMapController.iUi =
    new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
  (WorldMapController._ki = () => {
    WorldMapController.OpenView(0, !0);
  }),
  (WorldMapController._3o = (e, r) => {
    "FunctionOpenView" === e &&
      (_a.m3o =
        ModelManager_1.ModelManager.FunctionModel?.GetNewOpenFunctionIdList());
  }),
  (WorldMapController.u3o = (r, e) => {
    if ("FunctionOpenView" === r) {
      let e = void 0;
      for (const o of _a.m3o)
        if (
          (e =
            ConfigManager_1.ConfigManager.MapConfig.GetMapMarkFuncTypeConfigByFuncId(
              o,
            ))
        )
          break;
      void 0 !== e &&
        ((r = {
          MarkType: 0,
          MarkId: 0,
          StartWorldPosition: Vector2D_1.Vector2D.Create(
            e.Position.X,
            e.Position.Y,
          ),
          StartScale: e.Scale,
          OpenFogId: 0,
        }),
        ModelManager_1.ModelManager.LoadingModel.IsLoading ||
          (_a.OpenView(2, !1, r),
          (r = { State: !0, Data: { RelativeType: 1, RelativeSubType: e.Id } }),
          ModelManager_1.ModelManager.MapModel.MapLifeEventListenerTriggerMap?.set(
            0,
            r,
          )));
    }
  }),
  (WorldMapController.iVe = (e) => {
    return ModelManager_1.ModelManager.WorldMapModel.LevelEventDisableFlag
      ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "DisableMapView",
        ),
        !1)
      : ModelManager_1.ModelManager.FunctionModel.IsOpen(10015)
        ? !ModelManager_1.ModelManager.FunctionModel.IsLockByBehaviorTree(
            10015,
          ) ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "UnableSystem",
          ),
          !1)
        : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhantomLock",
          ),
          !1);
  }),
  (WorldMapController.nye = () => {
    _a.vdl();
  }),
  (WorldMapController.Uct = (e) => {
    const r =
      ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId;
    if (void 0 === r)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "LevelEvent",
          63,
          "【疑难杂症】地图聚焦行为->任务id被提前清空了",
          ["questId", r],
        ),
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
          _a.Uct,
        );
    else if (
      6 === e.Type &&
      e.TreeConfigId ===
        ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId
    ) {
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.AfterLogicTreeChildQuestNodeStatusChange,
        _a.Uct,
      );
      const r =
        ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId;
      ModelManager_1.ModelManager.WorldMapModel.PendingOpenWorldMapQuestId =
        void 0;
      var e = ModelManager_1.ModelManager.MapModel.GetMarkByQuestId(r);
      void 0 === e
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelEvent",
            63,
            "地图聚焦行为失败->任务仍没有创建标记",
            ["questId", r],
          )
        : ((e = { MarkId: e.MarkId, MarkType: e.MarkType }),
          ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
            2,
            !1,
            e,
            () => {
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.WorldMapOpenedForQuestMapFocus,
                r,
              );
            },
          ));
    }
  });
//# sourceMappingURL=WorldMapController.js.map
