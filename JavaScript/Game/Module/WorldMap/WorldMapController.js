"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  WorldMapDefine_1 = require("./WorldMapDefine");
class WorldMapController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "WorldMapView",
        WorldMapController.lOi,
      ),
      !0
    );
  }
  static OnLeaveLevel() {
    return (
      void 0 !== this.cFo &&
        TimerSystem_1.TimerSystem.Has(this.cFo) &&
        TimerSystem_1.TimerSystem.Remove(this.cFo),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenView, this.mFo),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.dFo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OpenView,
      this.mFo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.dFo,
      );
  }
  static TryTeleport(e) {
    TeleportController_1.TeleportController.CheckCanTeleport()
      ? TeleportController_1.TeleportController.SendTeleportTransferRequest(e)
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleTransmitLimit",
        );
  }
  static MapOpenPush(e) {
    var r = new Protocol_1.Aki.Protocol.drs();
    (r.BVn = e), Net_1.Net.Send(23528, r);
  }
  static LockView(e) {
    this.CFo = e;
  }
  static CanWoldMapViewOpen() {
    return this.CFo;
  }
  static OpenView(o, e, r, t) {
    (ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = e),
      UiManager_1.UiManager.OpenView("WorldMapView", r, (e, r) => {
        e && WorldMapController.MapOpenPush(o),
          (ModelManager_1.ModelManager.WorldMapModel.IsBattleViewOpen = !1),
          t?.(e, r);
      });
  }
  static FocalMarkItem(e, r) {
    var o = ModelManager_1.ModelManager.WorldMapModel,
      t = o.CurrentFocalMarkType,
      n = o.CurrentFocalMarkId;
    (t === e && n === r) ||
      (UiManager_1.UiManager.IsViewShow("ItemTipsView") &&
        UiManager_1.UiManager.CloseView("ItemTipsView")),
      (o.CurrentFocalMarkType = e),
      (o.CurrentFocalMarkId = r),
      UiManager_1.UiManager.IsViewShow("WorldMapView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnWorldMapTrackMarkItem,
            e,
            r,
          )
        : ((t = { MarkType: e, MarkId: r, OpenAreaId: 0 }),
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
      void 0 !== this.cFo &&
        (TimerSystem_1.TimerSystem.Remove(this.cFo), (this.cFo = void 0)),
      this.iRi.ClearData(),
      !0
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "WorldMapView",
      WorldMapController.V4e,
      "WorldMapController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "WorldMapView",
      WorldMapController.V4e,
    );
  }
}
(exports.WorldMapController = WorldMapController),
  ((_a = WorldMapController).cFo = void 0),
  (WorldMapController.CFo = !0),
  (WorldMapController.gFo = void 0),
  (WorldMapController.iRi =
    new WorldMapDefine_1.MarkPriority2HierarchyIndexHelper()),
  (WorldMapController.lOi = () => {
    WorldMapController.OpenView(0, !0);
  }),
  (WorldMapController.mFo = (e, r) => {
    "FunctionOpenView" === e &&
      (_a.gFo =
        ModelManager_1.ModelManager.FunctionModel?.GetNewOpenFunctionIdList());
  }),
  (WorldMapController.dFo = (r, e) => {
    if ("FunctionOpenView" === r) {
      let e = void 0;
      for (const o of _a.gFo)
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
          OpenAreaId: 0,
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
  (WorldMapController.V4e = (e) => {
    return _a.CanWoldMapViewOpen()
      ? ModelManager_1.ModelManager.WorldMapModel.LevelEventDisableFlag
        ? (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "DisableMapView",
          ),
          !1)
        : !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10015) ||
          (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "PhantomLock",
          ),
          !1)
      : (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "UnableSystem",
        ),
        !1);
  });
//# sourceMappingURL=WorldMapController.js.map
