"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonFailView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  TrainingView_1 = require("../TrainingDegree/TrainingView"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonFailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NUe = 0),
      (this.$Fe = void 0),
      (this.e3t = void 0),
      (this.zFe = () => {
        this.r1i();
      }),
      (this.n1i = () => {
        this.o3e(),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
            () => {
              UiManager_1.UiManager.IsViewShow(this.Info.Name) &&
                this.CloseMe();
            },
          );
      });
  }
  get Kli() {
    return this.NUe
      ? ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(this.NUe)
      : void 0;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIVerticalLayout],
    ]),
      (this.BtnBindInfo = [
        [1, this.zFe],
        [2, this.n1i],
      ]);
  }
  OnStart() {
    (this.NUe =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
      UiManager_1.UiManager.IsViewShow("ReviveView") &&
        UiManager_1.UiManager.CloseView("ReviveView"),
      this.SHe(),
      this.e3e(),
      (this.e3t = new TrainingView_1.TrainingView()),
      this.e3t.Show(this.GetVerticalLayout(4)),
      this.SetButtonUiActive(2, !1);
  }
  OnBeforeDestroy() {
    this.e3t && this.e3t.Clear(), (this.e3t = void 0), this.o3e();
  }
  SHe() {
    this.GetText(0).ShowTextNew(this.Kli.FailTips);
  }
  e3e() {
    let e = this.Kli.AutoLeaveTime;
    this.$Fe = TimerSystem_1.TimerSystem.Loop(
      () => {
        e <= 0
          ? this.r1i()
          : LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(3),
              "InstanceDungeonLeftTimeToAutoLeave",
              e--,
            );
      },
      CommonDefine_1.MILLIONSECOND_PER_SECOND,
      e + 1,
    );
  }
  o3e() {
    TimerSystem_1.TimerSystem.Has(this.$Fe) &&
      TimerSystem_1.TimerSystem.Remove(this.$Fe),
      (this.$Fe = void 0);
  }
  r1i() {
    this.o3e(),
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
        () => {
          UiManager_1.UiManager.IsViewShow(this.Info.Name) && this.CloseMe();
        },
      );
  }
}
exports.InstanceDungeonFailView = InstanceDungeonFailView;
//# sourceMappingURL=InstanceDungeonFailView.js.map
