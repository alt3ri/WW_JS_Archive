"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  AreaAtmosphere_1 = require("./AreaAtmosphere"),
  AreaAudio_1 = require("./AreaAudio");
class AreaController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      AreaController.IWe ||
        ((AreaController.IWe = new AreaAudio_1.AreaAudio()),
        AreaController.IWe.Init()),
      AreaController.TWe ||
        (AreaController.TWe = new AreaAtmosphere_1.AreaAtmosphere()),
      this.RegisterNetEvent(),
      this.RegisterEvents(),
      !0
    );
  }
  static OnClear() {
    return (
      AreaController.IWe && AreaController.IWe.Destroy(),
      AreaController.TWe && AreaController.TWe.Destroy(),
      this.UnRegisterNetEvent(),
      this.UnRegisterEvents(),
      !0
    );
  }
  static OnTick(e) {
    AreaController.TWe && AreaController.TWe.OnTick(e);
  }
  static RegisterNetEvent() {
    Net_1.Net.Register(5057, this.LWe);
  }
  static UnRegisterNetEvent() {
    Net_1.Net.UnRegister(5057);
  }
  static RegisterEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InitArea, this.DWe);
  }
  static UnRegisterEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InitArea,
      this.DWe,
    );
  }
  static BeginOverlap(e, r = !1) {
    if (e === this.RWe())
      (ModelManager_1.ModelManager.AreaModel.AreaInfo &&
        ModelManager_1.ModelManager.AreaModel.AreaInfo.AreaId === e) ||
        ModelManager_1.ModelManager.AreaModel.SetAreaInfo(e),
        r
          ? ModelManager_1.ModelManager.AreaModel.SetAreaName(e, !0)
          : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ChangeArea);
    else {
      r = Protocol_1.Aki.Protocol.XXn.create({ J4n: e });
      const o = this.RWe();
      Net_1.Net.Call(14209, r, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                9225,
              )
            : ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId !==
                e.J4n &&
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Area",
                  7,
                  "[AreaController.BeginOverlap] 进入区域",
                  ["CurArea", o],
                  ["EnterArea", e.J4n],
                ),
              ModelManager_1.ModelManager.AreaModel.SetAreaName(e.J4n)));
      });
    }
  }
  static EndOverlap(r) {
    if (0 !== r && 1 !== r) {
      const o = ConfigManager_1.ConfigManager.AreaConfig.GetParentAreaId(
        this.RWe(),
      );
      var e;
      1 !== o &&
        o !== this.RWe() &&
        ((e = Protocol_1.Aki.Protocol.XXn.create({ J4n: o })),
        Net_1.Net.Call(14209, e, (e) => {
          e &&
            (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.O4n,
                  9225,
                )
              : (ModelManager_1.ModelManager.AreaModel.SetAreaInfo(o),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ChangeArea,
                ),
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "Area",
                    7,
                    "[AreaController.EndOverlap] 离开区域",
                    ["LeaveArea", r],
                    ["EnterArea", o],
                  )));
        }));
    }
  }
  static RequestChangeAreaState(e, r) {}
  static RWe() {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(6);
  }
}
((exports.AreaController = AreaController).DWe = (e) => {
  ModelManager_1.ModelManager.AreaModel.InitAreaStates(e),
    UnopenedAreaController_1.UnopenedAreaController.AreaCheckInit(e);
}),
  (AreaController.LWe = (e) => {
    e ||
      (Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Area",
          7,
          "[AreaController.AreaStatesChangeNotify] Notify Info Error",
        )),
      ModelManager_1.ModelManager.AreaModel.ToggleAreaState(
        e.PRs.l6n,
        e.PRs.F4n,
      ),
      UnopenedAreaController_1.UnopenedAreaController.AreaCheckStatesChange(e);
  });
//# sourceMappingURL=AreaController.js.map
