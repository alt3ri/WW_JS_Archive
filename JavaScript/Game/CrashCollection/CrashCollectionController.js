"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CrashCollectionController = void 0);
const UE = require("ue");
const ControllerBase_1 = require("../../Core/Framework/ControllerBase");
const GlobalData_1 = require("../GlobalData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const EventSystem_1 = require("../Common/Event/EventSystem");
const EventDefine_1 = require("../Common/Event/EventDefine");
const ModelManager_1 = require("../Manager/ModelManager");
const GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager");
const Stats_1 = require("../../Core/Common/Stats");
const FNameUtil_1 = require("../../Core/Utils/FNameUtil");
class CrashCollectionController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.sCe(), super.OnInit();
  }
  static OnClear() {
    return this.aCe(), super.OnClear();
  }
  static sCe() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.TodTimeChange,
      this.hCe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoginSuccess,
        this.gEe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.gEe,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TodTimeChange,
      this.hCe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoginSuccess,
        this.gEe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.gEe,
      );
  }
  static OnTick(e) {
    this.lCe();
  }
  static lCe() {
    this._Ce(), this.uCe(), this.cCe(), this.mCe(), this.dCe();
  }
  static _Ce() {
    let e;
    let t =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    t?.Valid &&
      ((e = t.ActorLocationProxy),
      (t = t.ActorRotationProxy),
      UE.CrashSightProxy.SetCustomDataByFName(this.fCe, e.ToString()),
      UE.CrashSightProxy.SetCustomDataByFName(this.pCe, t.ToString()));
  }
  static uCe() {
    let e;
    let t = ControllerHolder_1.ControllerHolder.CameraController;
    t &&
      ((e = t.CameraLocation),
      (t = t.CameraRotator),
      UE.CrashSightProxy.SetCustomDataByFName(this.MCe, e.ToString()),
      UE.CrashSightProxy.SetCustomDataByFName(this.SCe, t.ToString()));
  }
  static ECe() {
    let e = ModelManager_1.ModelManager.TimeOfDayModel;
    e &&
      ((e = e.GameTime.HourMinuteString),
      UE.CrashSightProxy.SetCustomDataByFName(this.ICe, e));
  }
  static cCe() {
    const e = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
      .GetCurrentQualityInfo()
      .GetGameQualitySettingLevel();
    UE.CrashSightProxy.SetCustomDataByFName(this.LCe, e.toString());
  }
  static mCe() {
    let e = ModelManager_1.ModelManager.QuestNewModel;
    e &&
      (e = e.GetQuestsByType(1)) &&
      e.length !== 0 &&
      ((e = e
        .filter((e) => e.IsProgressing)
        .map((e) => e.Id)
        .join(", ")),
      UE.CrashSightProxy.SetCustomDataByFName(this.RCe, e));
  }
  static dCe() {
    GlobalData_1.GlobalData.World?.IsValid() &&
      UE.CrashSightProxy.SetCustomDataByFName(
        this.ACe,
        GlobalData_1.GlobalData.World.GetName(),
      );
  }
  static Bwn() {
    const e = ModelManager_1.ModelManager.LoginModel.GetReconnectHost();
    const t = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
    UE.CrashSightProxy.SetCustomDataByFName(this.qwn, e + ":" + t);
  }
  static RecordHttpInfo(e) {
    UE.CrashSightProxy.SetCustomDataByFName(this.Own, e);
  }
}
(exports.CrashCollectionController = CrashCollectionController),
  ((_a = CrashCollectionController).MJ = void 0),
  (CrashCollectionController.gCe = void 0),
  (CrashCollectionController.vCe = void 0),
  (CrashCollectionController.TCe = void 0),
  (CrashCollectionController.DCe = void 0),
  (CrashCollectionController.UCe = void 0),
  (CrashCollectionController.yCe = void 0),
  (CrashCollectionController.bwn = void 0),
  (CrashCollectionController.Gwn = void 0),
  (CrashCollectionController.fCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("ActorLocation")),
  (CrashCollectionController.pCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("ActorRotation")),
  (CrashCollectionController.MCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("CameraLocation")),
  (CrashCollectionController.SCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("CameraRotation")),
  (CrashCollectionController.ICe =
    FNameUtil_1.FNameUtil.GetDynamicFName("TODTime")),
  (CrashCollectionController.LCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QualityLevel")),
  (CrashCollectionController.RCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QuestIds")),
  (CrashCollectionController.ACe =
    FNameUtil_1.FNameUtil.GetDynamicFName("World")),
  (CrashCollectionController.qwn =
    FNameUtil_1.FNameUtil.GetDynamicFName("GateWay")),
  (CrashCollectionController.Own =
    FNameUtil_1.FNameUtil.GetDynamicFName("HttpInfo")),
  (CrashCollectionController.hCe = () => {
    _a.ECe();
  }),
  (CrashCollectionController.gEe = () => {
    _a.Bwn();
  });
// # sourceMappingURL=CrashCollectionController.js.map
