"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CrashCollectionController = void 0);
const cpp_1 = require("cpp"),
  Stats_1 = require("../../Core/Common/Stats"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../GameSettings/GameSettingsDeviceRender"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  FormationDataController_1 = require("../Module/Abilities/FormationDataController");
class CrashCollectionController extends ControllerBase_1.ControllerBase {
  static UPa() {
    if (Stats_1.Stat.Enable)
      return FormationDataController_1.FormationDataController.GlobalIsInFight
        ? this.xPa
        : this.PPa;
  }
  static wPa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInFight
        ? this.BPa
        : this.bPa;
  }
  static qPa() {
    if (Stats_1.Stat.Enable)
      return ModelManager_1.ModelManager.PlotModel?.IsInPlot
        ? this.GPa
        : this.OPa;
  }
  static kPa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInPlot
        ? this.NPa
        : this.FPa;
  }
  static nDa(t, e) {
    var r;
    if (Stats_1.Stat.Enable)
      return (
        (r =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
            ?.PbDataId),
        Stats_1.Stat.Create(
          `Id: ${String(r)}, Pos: X=${t.X.toFixed(2)}, Y=${t.Y.toFixed(2)}, Z=${t.Z.toFixed(2)}, Rot: (Pitch=${e.Pitch.toFixed(2)}, Yaw=${e.Yaw.toFixed(2)}, Roll=${e.Roll.toFixed(2)})`,
        )
      );
  }
  static sDa(t, e) {
    if (Stats_1.Stat.Enable)
      return Stats_1.Stat.Create(
        `Pos: X=${t.X.toFixed(2)}, Y=${t.Y.toFixed(2)}, Z=${t.Z.toFixed(2)}, Rot: (Pitch=${e.Pitch.toFixed(2)}, Yaw=${e.Yaw.toFixed(2)}, Roll=${e.Roll.toFixed(2)})`,
      );
  }
  static aDa(t) {
    if (Stats_1.Stat.Enable) return Stats_1.Stat.Create("World: " + t);
  }
  static hDa(t) {
    if (Stats_1.Stat.Enable) return Stats_1.Stat.Create("Level: " + t);
  }
  static Yka() {
    if (Stats_1.Stat.Enable)
      return 2 === ResourceSystem_1.ResourceSystem.GetLoadMode()
        ? this.zka
        : this.Jka;
  }
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
        this.gSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.gSe,
      );
  }
  static aCe() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.TodTimeChange,
      this.hCe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoginSuccess,
        this.gSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ReConnectSuccess,
        this.gSe,
      );
  }
  static OnTick(t) {
    this.lCe();
  }
  static lCe() {
    this.MJ.Start();
    var t = this.UPa(),
      e = this.wPa(),
      r = this.qPa(),
      a = this.kPa(),
      o = this.Yka();
    t?.Start(),
      e?.Start(),
      r?.Start(),
      a?.Start(),
      o?.Start(),
      this._Ce(),
      this.uCe(),
      this.cCe(),
      this.mCe(),
      this.dCe(),
      o?.Stop(),
      a?.Stop(),
      r?.Stop(),
      e?.Stop(),
      t?.Stop(),
      this.MJ.Stop();
  }
  static _Ce() {
    this.gCe.Start();
    var t,
      e,
      r =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          3,
        );
    r?.Valid &&
      ((t = r.ActorLocationProxy),
      (r = r.ActorRotationProxy),
      (e = this.nDa(t, r))?.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.fCe, t.ToString()),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.pCe, r.ToString()),
      e?.Stop()),
      this.gCe.Stop();
  }
  static uCe() {
    this.vCe.Start();
    var t,
      e,
      r = ControllerHolder_1.ControllerHolder.CameraController;
    r &&
      ((t = r.CameraLocation),
      (r = r.CameraRotator),
      (e = this.sDa(t, r))?.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.MCe, t.ToString()),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.ECe, r.ToString()),
      e?.Stop()),
      this.vCe.Stop();
  }
  static SCe() {
    this.yCe.Start();
    var t = ModelManager_1.ModelManager.TimeOfDayModel;
    t &&
      ((t = t.GameTime.HourMinuteString),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.ICe, t)),
      this.yCe.Stop();
  }
  static cCe() {
    this.TCe.Start();
    var t =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .GameQualitySettingLevel,
      e = this.hDa(t);
    e?.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.LCe, t.toString()),
      e?.Stop(),
      this.TCe.Stop();
  }
  static mCe() {
    this.DCe.Start();
    var t = ModelManager_1.ModelManager.QuestNewModel;
    (t = t && t.GetQuestsByType(1)) &&
      0 !== t.length &&
      ((t = t
        .filter((t) => t.IsProgressing)
        .map((t) => t.Id)
        .join(", ")),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.RCe, t)),
      this.DCe.Stop();
  }
  static dCe() {
    var t, e;
    this.UCe.Start(),
      GlobalData_1.GlobalData.World?.IsValid() &&
        ((t = GlobalData_1.GlobalData.World.GetName()),
        (e = this.aDa(t))?.Start(),
        cpp_1.FCrashSightProxy.SetCustomDataByFName(this.ACe, t),
        e?.Stop()),
      this.UCe.Stop();
  }
  static xGn() {
    this.PGn.Start();
    var t = ModelManager_1.ModelManager.LoginModel.GetReconnectHost(),
      e = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
    cpp_1.FCrashSightProxy.SetCustomDataByFName(this.BGn, t + ":" + e),
      this.PGn.Stop();
  }
  static RecordHttpInfo(t) {
    this.wGn.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.bGn, t),
      this.wGn.Stop();
  }
}
(exports.CrashCollectionController = CrashCollectionController),
  ((_a = CrashCollectionController).MJ = Stats_1.Stat.Create(
    "CrashCollectionController.GatherCrashInfo",
  )),
  (CrashCollectionController.gCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherCharacterInfo",
  )),
  (CrashCollectionController.vCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherCameraInfo",
  )),
  (CrashCollectionController.TCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherQualityLevel",
  )),
  (CrashCollectionController.DCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherQuestInfo",
  )),
  (CrashCollectionController.UCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherWorldInfo",
  )),
  (CrashCollectionController.yCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherTODInfo",
  )),
  (CrashCollectionController.PGn = Stats_1.Stat.Create(
    "CrashCollectionController.GatherGateWayInfo",
  )),
  (CrashCollectionController.wGn = Stats_1.Stat.Create(
    "CrashCollectionController.RecordHttpInfo",
  )),
  (CrashCollectionController.fCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("ActorLocation")),
  (CrashCollectionController.pCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("ActorRotation")),
  (CrashCollectionController.MCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("CameraLocation")),
  (CrashCollectionController.ECe =
    FNameUtil_1.FNameUtil.GetDynamicFName("CameraRotation")),
  (CrashCollectionController.ICe =
    FNameUtil_1.FNameUtil.GetDynamicFName("TODTime")),
  (CrashCollectionController.LCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QualityLevel")),
  (CrashCollectionController.RCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QuestIds")),
  (CrashCollectionController.ACe =
    FNameUtil_1.FNameUtil.GetDynamicFName("World")),
  (CrashCollectionController.BGn =
    FNameUtil_1.FNameUtil.GetDynamicFName("GateWay")),
  (CrashCollectionController.bGn =
    FNameUtil_1.FNameUtil.GetDynamicFName("HttpInfo")),
  (CrashCollectionController.xPa = Stats_1.Stat.Create("Origin IsFight: True")),
  (CrashCollectionController.PPa = Stats_1.Stat.Create(
    "Origin IsFight: False",
  )),
  (CrashCollectionController.GPa = Stats_1.Stat.Create(
    "Origin IsCutscene: True",
  )),
  (CrashCollectionController.OPa = Stats_1.Stat.Create(
    "Origin IsCutscene: False",
  )),
  (CrashCollectionController.BPa = Stats_1.Stat.Create(
    "GameBudget IsFight: True",
  )),
  (CrashCollectionController.bPa = Stats_1.Stat.Create(
    "GameBudget IsFight: False",
  )),
  (CrashCollectionController.NPa = Stats_1.Stat.Create(
    "GameBudget IsCutscene: True",
  )),
  (CrashCollectionController.FPa = Stats_1.Stat.Create(
    "GameBudget IsCutscene: False",
  )),
  (CrashCollectionController.zka = Stats_1.Stat.Create("LoadModel: InGame")),
  (CrashCollectionController.Jka = Stats_1.Stat.Create("LoadModel: InLoading")),
  (CrashCollectionController.hCe = () => {
    _a.SCe();
  }),
  (CrashCollectionController.gSe = () => {
    _a.xGn();
  });
//# sourceMappingURL=CrashCollectionController.js.map
