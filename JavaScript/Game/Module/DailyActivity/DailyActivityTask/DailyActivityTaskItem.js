"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityTaskItem = exports.DailyActiveTaskData = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  DailyActivityController_1 = require("../DailyActivityController"),
  DailyActivityTaskController_1 = require("./DailyActivityTaskController");
class DailyActiveTaskData {
  constructor() {
    (this.RewardItemList = []),
      (this.TaskId = 0),
      (this.TaskState = 2),
      (this.CurrentProgress = 0),
      (this.TargetProgress = 0),
      (this.Sort = 0),
      (this.IsFunctionUnlock = !1);
  }
}
exports.DailyActiveTaskData = DailyActiveTaskData;
class DailyActivityTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.BOe = 0),
      (this.Wkt = 1),
      (this.Kkt = []),
      (this.Qkt = !1),
      (this.Xkt = 0),
      (this.$kt = () => {
        this.BOe &&
          DailyActivityController_1.DailyActivityController.RequestDailyActivityTaskReward(
            [this.BOe],
          );
      }),
      (this.Ykt = () => {
        this.BOe &&
          (this.Qkt
            ? DailyActivityTaskController_1.DailyActiveTaskController.TrackTaskByType(
                this.Wkt,
                this.Kkt,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "FunctionDisable",
              ));
      }),
      (this.jbe = () => {
        this.BOe &&
          this.Xkt &&
          ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
            this.Xkt,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIButtonComponent],
      [7, UE.UIItem],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [4, this.jbe],
        [5, this.Ykt],
        [6, this.$kt],
      ]);
  }
  OnStart() {}
  OnBeforeDestroy() {}
  IsNormalTaskJumpType() {
    return 1 === this.Wkt;
  }
  Refresh(t, i, s) {
    (this.BOe = t.TaskId),
      (this.Qkt = t.IsFunctionUnlock),
      this.GetText(1).SetText(
        t.CurrentProgress.toString() + "/" + t.TargetProgress.toString(),
      );
    var e =
        ConfigManager_1.ConfigManager.DailyActivityConfig.GetActivityTaskConfigById(
          this.BOe,
        ),
      r = e.TaskName,
      a = [],
      h =
        (2 !== e.UpdateType ||
          (h = ModelManager_1.ModelManager.DailyActivityModel.AreaId) <= 0 ||
          ((h = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(h)) &&
            (h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
              h.Title,
            )) &&
            a.push(h)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r, ...a),
        e.TaskFunc),
      r =
        (1 <= h.length && (this.Wkt = Number(h[0])),
        2 <= h.length && (this.Kkt = h.slice(1)),
        6 === this.Wkt &&
          (this.Kkt = [
            ModelManager_1.ModelManager.DailyActivityModel.AreaId.toString(),
          ]),
        t.RewardItemList[0]);
    switch (
      ((this.Xkt = r[0].ItemId),
      this.GetText(8).SetText("+" + r[1].toString()),
      t.TaskState)
    ) {
      case 2:
        var o = this.IsNormalTaskJumpType();
        this.GetText(2).SetUIActive(o),
          this.GetButton(5).RootUIComp.SetUIActive(!o),
          this.GetButton(6).RootUIComp.SetUIActive(!1),
          this.GetItem(3).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1);
        break;
      case 1:
        this.GetText(2).SetUIActive(!1),
          this.GetButton(5).RootUIComp.SetUIActive(!1),
          this.GetButton(6).RootUIComp.SetUIActive(!0),
          this.GetItem(3).SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1);
        break;
      case 3:
        this.GetText(2).SetUIActive(!1),
          this.GetButton(5).RootUIComp.SetUIActive(!1),
          this.GetButton(6).RootUIComp.SetUIActive(!1),
          this.GetItem(3).SetUIActive(!0),
          this.GetItem(7).SetUIActive(!0);
    }
  }
}
exports.DailyActivityTaskItem = DailyActivityTaskItem;
//# sourceMappingURL=DailyActivityTaskItem.js.map
