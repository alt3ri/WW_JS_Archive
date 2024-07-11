"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeleportAssistant = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../Core/Net/Net"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  LevelLoadingController_1 = require("../../LevelLoading/LevelLoadingController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  GM_UNLOCK_ALL_TELEPORT = "activateteleport 0";
class TeleportAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments),
      (this._Di = void 0),
      (this.uDi = ""),
      (this.cDi = 0),
      (this.mDi = !1),
      (this.xK = !1),
      (this.dDi = (e) => {
        ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.IVn),
          (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
              ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) ||
            this.CDi(e.IVn);
      }),
      (this.gDi = () => {
        LevelLoadingController_1.LevelLoadingController.CloseLoading(
          0,
          () => {
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.BlackScreenFadeOnPlotToWorldMap,
            );
          },
          1,
        );
      }),
      (this.hWe = (e) => {
        e.FlowListName === this.uDi &&
          e.FlowId === this.cDi &&
          ((this.xK = !1),
          1 === this._Di.Type
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "TeleporterUnlockBig",
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "TeleporterUnlock",
              ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Plot", 39, "Close PlotView And Open WorldMapView"),
          (e = { MarkType: 0, MarkId: 0, OpenAreaId: this._Di.FogId }),
          this._Di.ShowWorldMap
            ? (EventSystem_1.EventSystem.Once(
                EventDefine_1.EEventName.WorldMapViewOpened,
                this.gDi,
              ),
              WorldMapController_1.WorldMapController.OpenView(2, !1, e))
            : LevelLoadingController_1.LevelLoadingController.CloseLoading(
                0,
                () => {},
                1,
              ),
          (this.uDi = void 0),
          (this.cDi = void 0));
      }),
      (this.fDi = (e) => {
        e.toLowerCase() === GM_UNLOCK_ALL_TELEPORT && (this.mDi = !0);
      });
  }
  OnDestroy() {
    (this._Di = void 0),
      (this.uDi = void 0),
      (this.cDi = void 0),
      (this.mDi = void 0),
      (this.xK = void 0);
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21861, this.dDi);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21861);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotNetworkEnd,
      this.hWe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnExecuteServerGm,
        this.fDi,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotNetworkEnd,
      this.hWe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnExecuteServerGm,
        this.fDi,
      );
  }
  CDi(e) {
    var t;
    this.mDi ||
      this.xK ||
      (e &&
        0 !== e.length &&
        (e = ConfigManager_1.ConfigManager.MapConfig.GetTeleportConfigById(
          e[0],
        )) &&
        !StringUtils_1.StringUtils.IsEmpty(e.Plot) &&
        2 < (t = e.Plot.split(",")).length &&
        ((this.uDi = t[0]),
        (this.cDi = Number(t[1])),
        (t = Number(t[2])),
        (this._Di = e),
        (this.xK = !0),
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(
          this.uDi,
          this.cDi,
          t,
        )));
  }
  async RequestTeleportData() {
    var e = Protocol_1.Aki.Protocol.nCs.create(),
      e = await Net_1.Net.CallAsync(7491, e);
    e &&
      (e.A9n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.A9n,
            20728,
          )
        : ModelManager_1.ModelManager.MapModel.UnlockTeleports(e.IVn, !0));
  }
  RequestUnlockTeleport(t) {
    var e = Protocol_1.Aki.Protocol.lCs.create({ J4n: t });
    Net_1.Net.Call(19061, e, (e) => {
      e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            29892,
          )
        : ModelManager_1.ModelManager.MapModel.UnlockTeleport(t);
    });
  }
}
exports.TeleportAssistant = TeleportAssistant;
//# sourceMappingURL=TeleportAssistant.js.map
