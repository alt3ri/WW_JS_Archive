"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PanelQteModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  PanelQteController_1 = require("./PanelQteController"),
  PanelQteResultHandler_1 = require("./PanelQteResultHandler"),
  PanelQteTimeDilation_1 = require("./PanelQteTimeDilation");
class PanelQteModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.s1t = new PanelQteTimeDilation_1.PanelQteTimeDilation()),
      (this.IsInQte = void 0),
      (this.hJ = void 0),
      (this.EOi = -0),
      (this.SOi = -0),
      (this.yOi = void 0),
      (this.nx = void 0),
      (this.IOi = void 0),
      (this.IsHideAllBattleUi = !1),
      (this.HideBattleUiChildren = void 0),
      (this.DisableFightInput = !1),
      (this.CurRoleEntity = void 0);
  }
  OnInit() {
    return (
      (this.IsInQte = !1),
      (this.hJ = 0),
      this.s1t.Init(),
      (this.IOi = new PanelQteResultHandler_1.PanelQteResultHandler()),
      !0
    );
  }
  OnLeaveLevel() {
    return !(this.yOi = void 0);
  }
  OnClear() {
    return (
      (this.IsInQte = void 0),
      (this.hJ = void 0),
      this.s1t.Clear(),
      !(this.IOi = void 0)
    );
  }
  StartQte(e) {
    return (
      this.hJ++,
      (this.IsInQte = !0),
      ((this.nx = e).QteHandleId = this.hJ),
      this.s1t.Start(e),
      0 < e.Config.Duration
        ? ((this.EOi =
            e.Config.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
          0 !== (e = this.s1t.GetWorldTimeDilation()) &&
            (this.SOi = Time_1.Time.WorldTime + this.EOi * e))
        : ((this.EOi = 0), (this.SOi = 0)),
      this.hJ
    );
  }
  StopQte(e) {
    return !(
      !this.IsInQte ||
      this.hJ !== e ||
      ((this.IsInQte = !1), this.s1t.Stop(), 0)
    );
  }
  ForceStopQte() {
    this.StopQte(this.hJ);
  }
  GetContext() {
    return this.nx;
  }
  GetWorldTimeDilation() {
    return this.s1t.GetWorldTimeDilation();
  }
  GetLeftTime() {
    return this.EOi;
  }
  ResetLeftTime(e) {
    this.hJ === e &&
      (0 < this.EOi
        ? 0 !== (e = this.s1t.GetWorldTimeDilation()) &&
          (this.SOi = Time_1.Time.WorldTime + this.EOi * e)
        : (this.SOi = 0));
  }
  UpdateTime(e) {
    this.EOi <= 0 ||
      (this.IsInQte &&
        (0 === this.s1t.GetWorldTimeDilation()
          ? (this.EOi -= e)
          : (this.EOi = this.SOi - Time_1.Time.WorldTime),
        this.EOi <= 0) &&
        PanelQteController_1.PanelQteController.StopQte(this.hJ));
  }
  GetPanelQteConfig(e) {
    this.yOi ||
      (this.yOi = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        "/Game/Aki/Data/Fight/UI/DT_PanelQte.DT_PanelQte",
        UE.DataTable,
      ));
    var t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
      this.yOi,
      e.toString(),
    );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("PanelQte", 18, "找不到界面QTE配置", ["qteId", e])),
      t
    );
  }
  SetQteResult(e, t) {
    return this.hJ === e && ((this.nx.Success = t), !0);
  }
  HandleResult() {
    this.IOi.Handle(this.nx);
  }
  IsQteSuccess() {
    return this.nx?.Success ?? !1;
  }
}
exports.PanelQteModel = PanelQteModel;
//# sourceMappingURL=PanelQteModel.js.map
