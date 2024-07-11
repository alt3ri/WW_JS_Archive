"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CrashCollectionController = void 0);
const Stats_1 = require("../../Core/Common/Stats"),
  ControllerBase_1 = require("../../Core/Framework/ControllerBase"),
  GameBudgetInterfaceController_1 = require("../../Core/GameBudgetAllocator/GameBudgetInterfaceController"),
  EventDefine_1 = require("../Common/Event/EventDefine"),
  EventSystem_1 = require("../Common/Event/EventSystem"),
  GameQualitySettingsManager_1 = require("../GameQualitySettings/GameQualitySettingsManager"),
  GlobalData_1 = require("../GlobalData"),
  ControllerHolder_1 = require("../Manager/ControllerHolder"),
  ModelManager_1 = require("../Manager/ModelManager"),
  FormationDataController_1 = require("../Module/Abilities/FormationDataController");
class CrashCollectionController extends ControllerBase_1.ControllerBase {
  static $Ia() {
    if (Stats_1.Stat.Enable)
      return FormationDataController_1.FormationDataController.GlobalIsInFight
        ? this.XIa
        : this.YIa;
  }
  static JIa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInFight
        ? this.zIa
        : this.ZIa;
  }
  static eTa() {
    if (Stats_1.Stat.Enable)
      return ModelManager_1.ModelManager.PlotModel?.IsInPlot
        ? this.tTa
        : this.iTa;
  }
  static rTa() {
    if (Stats_1.Stat.Enable)
      return GameBudgetInterfaceController_1.GameBudgetInterfaceController
        .IsInPlot
        ? this.oTa
        : this.nTa;
  }
  static wya(t, e) {
    Stats_1.Stat.Enable &&
      ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.PbDataId;
  }
  static Bya(t, e) {
    Stats_1.Stat.Enable;
  }
  static bya(t) {
    Stats_1.Stat.Enable;
  }
  static qya(t) {
    Stats_1.Stat.Enable;
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
    this.$Ia(), this.JIa(), this.eTa(), this.rTa();
    this._Ce(), this.uCe(), this.cCe(), this.mCe(), this.dCe();
  }
  static _Ce() {
    var t,
      e =
        ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity?.GetComponent(
          3,
        );
    e?.Valid &&
      ((t = e.ActorLocationProxy), (e = e.ActorRotationProxy), this.wya(t, e));
  }
  static uCe() {
    var t,
      e = ControllerHolder_1.ControllerHolder.CameraController;
    e && ((t = e.CameraLocation), (e = e.CameraRotator), this.Bya(t, e));
  }
  static SCe() {
    ModelManager_1.ModelManager.TimeOfDayModel;
  }
  static cCe() {
    var t = GameQualitySettingsManager_1.GameQualitySettingsManager.Get()
      .GetCurrentQualityInfo()
      .GetGameQualitySettingLevel();
    this.qya(t);
  }
  static mCe() {
    var t = ModelManager_1.ModelManager.QuestNewModel;
    t && (t = t.GetQuestsByType(1)) && t.length;
  }
  static dCe() {
    var t;
    GlobalData_1.GlobalData.World?.IsValid() &&
      ((t = GlobalData_1.GlobalData.World.GetName()), this.bya(t));
  }
  static EGn() {}
  static RecordHttpInfo(t) {}
}
(exports.CrashCollectionController = CrashCollectionController),
  ((_a = CrashCollectionController).MJ = void 0),
  (CrashCollectionController.gCe = void 0),
  (CrashCollectionController.vCe = void 0),
  (CrashCollectionController.TCe = void 0),
  (CrashCollectionController.DCe = void 0),
  (CrashCollectionController.UCe = void 0),
  (CrashCollectionController.yCe = void 0),
  (CrashCollectionController.yGn = void 0),
  (CrashCollectionController.TGn = void 0),
  (CrashCollectionController.XIa = void 0),
  (CrashCollectionController.YIa = void 0),
  (CrashCollectionController.tTa = void 0),
  (CrashCollectionController.iTa = void 0),
  (CrashCollectionController.zIa = void 0),
  (CrashCollectionController.ZIa = void 0),
  (CrashCollectionController.oTa = void 0),
  (CrashCollectionController.nTa = void 0),
  (CrashCollectionController.hCe = () => {
    _a.SCe();
  }),
  (CrashCollectionController.gSe = () => {
    _a.EGn();
  });
//# sourceMappingURL=CrashCollectionController.js.map
