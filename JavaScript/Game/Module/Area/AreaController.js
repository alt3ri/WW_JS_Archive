"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AreaController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  UnopenedAreaController_1 = require("../../LevelGamePlay/UnopenedArea/UnopenedAreaController"),
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
    Net_1.Net.Register(29646, this.LWe);
  }
  static UnRegisterNetEvent() {
    Net_1.Net.UnRegister(29646);
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
    e === ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId &&
      r &&
      ModelManager_1.ModelManager.AreaModel.SetAreaName(e, !0);
    r = Protocol_1.Aki.Protocol.iYn.create({ s5n: e, Lja: 0 });
    const o = ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId;
    Net_1.Net.Call(20547, r, (e) => {
      e &&
        (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28024,
            )
          : ModelManager_1.ModelManager.AreaModel.AreaInfo?.AreaId !== e.s5n &&
            (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Area",
                7,
                "[AreaController.BeginOverlap] 进入区域",
                ["CurArea", o],
                ["EnterArea", e.s5n],
              ),
            ModelManager_1.ModelManager.AreaModel.SetAreaName(e.s5n)));
    });
  }
  static EndOverlap(r) {
    var e;
    0 !== r &&
      1 !== r &&
      ((e = Protocol_1.Aki.Protocol.iYn.create({ s5n: 0, Lja: r })),
      Net_1.Net.Call(20547, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                28024,
              )
            : (ModelManager_1.ModelManager.AreaModel.SetAreaInfo(e.s5n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ChangeArea,
              ),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "Area",
                  7,
                  "[AreaController.EndOverlap] 离开区域",
                  ["LeaveArea", r],
                  ["EnterArea", e.s5n],
                )));
      }));
  }
  static RequestChangeAreaState(e, r) {}
}
((exports.AreaController = AreaController).IWe = void 0),
  (AreaController.TWe = void 0),
  (AreaController.DWe = (e) => {
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
        e.GRs.p6n,
        e.GRs.Y4n,
      ),
      UnopenedAreaController_1.UnopenedAreaController.AreaCheckStatesChange(e);
  });
//# sourceMappingURL=AreaController.js.map
