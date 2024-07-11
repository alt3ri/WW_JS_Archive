"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureTaskItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  ActivityDailyAdventureController_1 = require("./ActivityDailyAdventureController"),
  DailyAdventureSmallGridItem_1 = require("./DailyAdventureSmallGridItem"),
  DailyAdventureTaskController_1 = require("./DailyAdventureTaskController"),
  NORMAL_BG_ALPHA = 1,
  CLAMIED_BG_ALPHA = 0.5;
class DailyAdventureTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.gOe = void 0),
      (this.TaskJumpType = 1),
      (this.TaskJumpParams = []),
      (this.aOe = (t) => {
        this.Pe &&
          (0 !== this.Pe.TaskState
            ? ((t = t.Data),
              ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                t.Item[0].ItemId,
              ))
            : ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestTaskReward(
                this.Pe.TaskId,
              ));
      }),
      (this.fOe = () => {
        this.Pe &&
          1 === this.Pe.TaskState &&
          DailyAdventureTaskController_1.DailyAdventureTaskController.TrackTaskByType(
            this.TaskJumpType,
            this.TaskJumpParams,
          );
      }),
      (this.pOe = () => {
        this.Pe &&
          0 === this.Pe.TaskState &&
          ActivityDailyAdventureController_1.ActivityDailyAdventureController.RequestTaskReward(
            this.Pe.TaskId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UISprite],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [5, this.fOe],
        [0, this.pOe],
      ]);
  }
  async OnBeforeStartAsync() {
    await this.rOe(this.GetItem(1).GetOwner());
  }
  async rOe(t) {
    var i = new DailyAdventureSmallGridItem_1.DailyAdventureSmallGridItem();
    i.BindOnExtendToggleClicked(this.aOe),
      await i.CreateThenShowByActorAsync(t),
      (this.gOe = i);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    var r =
      ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventureTaskConfig(
        t.TaskId,
      );
    if (r) {
      var s,
        a,
        h = r.TaskFunc,
        l =
          (1 <= h.length && (this.TaskJumpType = Number(h[0])),
          2 <= h.length &&
            ((this.TaskJumpParams = h.slice(1)), 2 === this.TaskJumpType) &&
            this.TaskJumpParams.push(
              ActivityDailyAdventureController_1.ActivityDailyAdventureController.GetDefaultMapMarkId().toString(),
            ),
          []);
      for ([s, a] of r.TaskReward) {
        var o = [{ IncId: 0, ItemId: s }, a];
        l.push(o);
      }
      1 !== l.length
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 38, "[日常探险活动] 任务奖励配置不正确", [
            "TaskId",
            this.Pe.TaskId,
          ])
        : ((h = { Item: l[0], HasClaimed: 2 === this.Pe.TaskState }),
          this.gOe.Refresh(h),
          this.gOe.SetReceivableVisible(0 === this.Pe.TaskState),
          this.gOe.SetLockVisible(1 === this.Pe.TaskState),
          (h = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            r.TaskTitle,
          )),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(3),
            "Text_ActivityTaskProgress_Text",
            h,
            this.Pe.CurrentProgress.toString(),
            this.Pe.TargetProgress.toString(),
          ),
          (h = !StringUtils_1.StringUtils.IsEmpty(r.TaskDescription)),
          this.GetText(4).SetUIActive(h),
          h &&
            LguiUtil_1.LguiUtil.SetLocalTextNew(
              this.GetText(4),
              r.TaskDescription,
            ),
          this._Oe(t.TaskState));
    }
  }
  _Oe(t) {
    switch (t) {
      case 1:
        var i = 1 !== this.TaskJumpType;
        this.GetButton(5).RootUIComp.SetUIActive(i),
          this.GetItem(7).SetUIActive(!i),
          this.uOe(!1),
          this.vOe(!1),
          this.GetSprite(6).SetAlpha(NORMAL_BG_ALPHA);
        break;
      case 0:
        this.GetButton(5).RootUIComp.SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.uOe(!0),
          this.vOe(!0),
          this.GetSprite(6).SetAlpha(NORMAL_BG_ALPHA);
        break;
      case 2:
        this.GetButton(5).RootUIComp.SetUIActive(!1),
          this.GetItem(7).SetUIActive(!1),
          this.uOe(!1),
          this.vOe(!1),
          this.GetSprite(6).SetAlpha(CLAMIED_BG_ALPHA);
    }
  }
  uOe(t) {
    this.GetText(3).SetChangeColor(t, this.GetText(3).changeColor);
  }
  vOe(t) {
    this.GetSprite(2).SetChangeColor(t, this.GetSprite(2).changeColor);
  }
}
exports.DailyAdventureTaskItem = DailyAdventureTaskItem;
//# sourceMappingURL=DailyAdventureTaskItem.js.map
