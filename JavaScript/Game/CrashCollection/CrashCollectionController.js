"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CrashCollectionController = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../Core/Common/Log"),
  Stats_1 = require("../../Core/Common/Stats"),
  Protocol_1 = require("../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  ResourceSystem_1 = require("../../Core/Resource/ResourceSystem"),
  FNameUtil_1 = require("../../Core/Utils/FNameUtil"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameSettingsDeviceRender_1 = require("../GameSettings/GameSettingsDeviceRender"),
  GlobalData_1 = require("../GlobalData"),
  ModelManager_1 = require("../Manager/ModelManager"),
  FormationDataController_1 = require("../Module/Abilities/FormationDataController");
class CrashCollectionController extends ControllerBase_1.ControllerBase {
  static BPa() {
    if (Stats_1.Stat.Enable)
      return FormationDataController_1.FormationDataController.GlobalIsInFight
        ? this.bPa
        : this.qPa;
  }
  static GPa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInFight
        ? this.OPa
        : this.kPa;
  }
  static NPa() {
    if (Stats_1.Stat.Enable)
      return ModelManager_1.ModelManager.PlotModel?.IsInPlot
        ? this.FPa
        : this.VPa;
  }
  static HPa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInPlot
        ? this.jPa
        : this.WPa;
  }
  static cDa(e) {
    if (Stats_1.Stat.Enable)
      return Stats_1.Stat.CreateNoFlameGraph("Level: " + e);
  }
  static ZFa() {
    if (Stats_1.Stat.Enable)
      return 2 === ResourceSystem_1.ResourceSystem.GetLoadMode()
        ? this.e3a
        : this.t3a;
  }
  static OnInit() {
    return (
      this.sCe(),
      cpp_1.FKuroCrashCollectionController.Initialize(
        GlobalData_1.GlobalData.World,
        new UE.FName("ActorLocation"),
        new UE.FName("ActorRotation"),
        new UE.FName("CameraLocation"),
        new UE.FName("CameraRotation"),
        new UE.FName("World"),
      ),
      super.OnInit()
    );
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
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Xoo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetImageQualityWithValue,
        this.cCe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetRayTracingWithValue,
        this.Um1,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.SetDLSSFGWithValue,
        this.Dm1,
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
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAddNewQuest,
        this.Xoo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnQuestStateChange,
        this.DSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        this.xie,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetImageQualityWithValue,
        this.cCe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetRayTracingWithValue,
        this.Um1,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.SetDLSSFGWithValue,
        this.Dm1,
      );
  }
  static OnTick(e) {
    this.lCe();
  }
  static lCe() {
    this.MJ.Start();
    var e = this.BPa(),
      t = this.GPa(),
      r = this.NPa(),
      o = this.HPa(),
      a = this.ZFa();
    e?.Start(),
      t?.Start(),
      r?.Start(),
      o?.Start(),
      a?.Start(),
      a?.Stop(),
      o?.Stop(),
      r?.Stop(),
      t?.Stop(),
      e?.Stop(),
      this.MJ.Stop();
  }
  static SCe() {
    this.yCe.Start();
    var e = ModelManager_1.ModelManager.TimeOfDayModel;
    e &&
      ((e = e.GameTime.HourMinuteString),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.ICe, e)),
      this.yCe.Stop();
  }
  static eEl() {
    this.DCe.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(
        this.RCe,
        this.tEl.join(", "),
      ),
      this.DCe.Stop();
  }
  static xGn() {
    this.PGn.Start();
    var e = ModelManager_1.ModelManager.LoginModel.GetReconnectHost(),
      t = ModelManager_1.ModelManager.LoginModel.GetReconnectPort();
    cpp_1.FCrashSightProxy.SetCustomDataByFName(this.BGn, e + ":" + t),
      this.PGn.Stop();
  }
  static RecordHttpInfo(e) {
    this.wGn.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(this.bGn, e),
      this.wGn.Stop();
  }
}
(exports.CrashCollectionController = CrashCollectionController),
  ((_a = CrashCollectionController).MJ = Stats_1.Stat.Create(
    "CrashCollectionController.GatherCrashInfo",
  )),
  (CrashCollectionController.TCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherQualityLevel",
  )),
  (CrashCollectionController.DCe = Stats_1.Stat.Create(
    "CrashCollectionController.GatherQuestInfo",
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
  (CrashCollectionController.ICe =
    FNameUtil_1.FNameUtil.GetDynamicFName("TODTime")),
  (CrashCollectionController.LCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QualityLevel")),
  (CrashCollectionController.Bm1 = "RayTracing"),
  (CrashCollectionController.km1 = "DlssFG"),
  (CrashCollectionController.RCe =
    FNameUtil_1.FNameUtil.GetDynamicFName("QuestIds")),
  (CrashCollectionController.BGn =
    FNameUtil_1.FNameUtil.GetDynamicFName("GateWay")),
  (CrashCollectionController.bGn =
    FNameUtil_1.FNameUtil.GetDynamicFName("HttpInfo")),
  (CrashCollectionController.bPa = Stats_1.Stat.Create("Origin IsFight: True")),
  (CrashCollectionController.qPa = Stats_1.Stat.Create(
    "Origin IsFight: False",
  )),
  (CrashCollectionController.FPa = Stats_1.Stat.Create(
    "Origin IsCutscene: True",
  )),
  (CrashCollectionController.VPa = Stats_1.Stat.Create(
    "Origin IsCutscene: False",
  )),
  (CrashCollectionController.OPa = Stats_1.Stat.Create(
    "GameBudget IsFight: True",
  )),
  (CrashCollectionController.kPa = Stats_1.Stat.Create(
    "GameBudget IsFight: False",
  )),
  (CrashCollectionController.jPa = Stats_1.Stat.Create(
    "GameBudget IsCutscene: True",
  )),
  (CrashCollectionController.WPa = Stats_1.Stat.Create(
    "GameBudget IsCutscene: False",
  )),
  (CrashCollectionController.e3a = Stats_1.Stat.Create("LoadModel: InGame")),
  (CrashCollectionController.t3a = Stats_1.Stat.Create("LoadModel: InLoading")),
  (CrashCollectionController.hCe = () => {
    _a.SCe();
  }),
  (CrashCollectionController.cCe = (e) => {
    _a.TCe.Start();
    var t =
        GameSettingsDeviceRender_1.GameSettingsDeviceRender
          .GameQualitySettingLevel,
      t =
        (e !== t &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Game", 36, "CrashSight GatherQualityLevel"),
        _a.cDa(t));
    t?.Start(),
      cpp_1.FCrashSightProxy.SetCustomDataByFName(_a.LCe, e.toString()),
      t?.Stop(),
      _a.TCe.Stop();
  }),
  (CrashCollectionController.Um1 = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Game", 36, "CrashSight GatherRayTracing"),
      cpp_1.FCrashSightProxy.SetCustomData(_a.Bm1, e.toString());
  }),
  (CrashCollectionController.Dm1 = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Game", 36, "CrashSight GatherDlssFg"),
      cpp_1.FCrashSightProxy.SetCustomData(_a.km1, e.toString());
  }),
  (CrashCollectionController.tEl = new Array()),
  (CrashCollectionController.Xoo = (e) => {
    1 === e.Type &&
      e.IsProgressing &&
      !_a.tEl.includes(e.Id) &&
      (_a.tEl.push(e.Id), _a.eEl());
  }),
  (CrashCollectionController.xie = (e, t) => {
    var r =
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
        3,
      );
    r
      ? cpp_1.FKuroCrashCollectionController.UpdateMainCharacter(r.Actor)
      : cpp_1.FKuroCrashCollectionController.UpdateMainCharacter(void 0);
  }),
  (CrashCollectionController.DSe = (e, t) => {
    var r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e);
    r &&
      1 === r.Type &&
      (t === Protocol_1.Aki.Protocol.hTs.nvs
        ? _a.tEl.includes(e) || (_a.tEl.push(e), _a.eEl())
        : -1 < (r = _a.tEl.indexOf(e)) && (_a.tEl.splice(r, 1), _a.eEl()));
  }),
  (CrashCollectionController.gSe = () => {
    _a.xGn();
  });
//# sourceMappingURL=CrashCollectionController.js.map
