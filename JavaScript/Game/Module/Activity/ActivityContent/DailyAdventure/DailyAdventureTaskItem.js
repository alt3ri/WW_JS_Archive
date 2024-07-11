"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyAdventureTaskItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivityDailyAdventureController_1 = require("./ActivityDailyAdventureController");
const DailyAdventureSmallGridItem_1 = require("./DailyAdventureSmallGridItem");
const DailyAdventureTaskController_1 = require("./DailyAdventureTaskController");
const NORMAL_BG_ALPHA = 1;
const CLAMIED_BG_ALPHA = 0.5;
class DailyAdventureTaskItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.gOe = void 0),
      (this.TaskJumpType = 1),
      (this.TaskJumpParams = []),
      (this.aOe = (t) => {
        this.Pe &&
          (this.Pe.TaskState !== 0
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
          this.Pe.TaskState === 1 &&
          DailyAdventureTaskController_1.DailyAdventureTaskController.TrackTaskByType(
            this.TaskJumpType,
            this.TaskJumpParams,
          );
      }),
      (this.pOe = () => {
        this.Pe &&
          this.Pe.TaskState === 0 &&
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
    const i = new DailyAdventureSmallGridItem_1.DailyAdventureSmallGridItem();
    i.BindOnExtendToggleClicked(this.aOe),
      await i.CreateThenShowByActorAsync(t),
      (this.gOe = i);
  }
  Refresh(t, i, e) {
    this.Pe = t;
    const r =
      ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventureTaskConfig(
        t.TaskId,
      );
    if (r) {
      let s;
      let a;
      let h = r.TaskFunc;
      const l =
        (h.length >= 1 && (this.TaskJumpType = Number(h[0])),
        h.length >= 2 &&
          ((this.TaskJumpParams = h.slice(1)), this.TaskJumpType === 2) &&
          this.TaskJumpParams.push(
            ActivityDailyAdventureController_1.ActivityDailyAdventureController.GetDefaultMapMarkId().toString(),
          ),
        []);
      for ([s, a] of r.TaskReward) {
        const o = [{ IncId: 0, ItemId: s }, a];
        l.push(o);
      }
      l.length !== 1
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Activity", 38, "[日常探险活动] 任务奖励配置不正确", [
            "TaskId",
            this.Pe.TaskId,
          ])
        : ((h = { Item: l[0], HasClaimed: this.Pe.TaskState === 2 }),
          this.gOe.Refresh(h),
          this.gOe.SetReceivableVisible(this.Pe.TaskState === 0),
          this.gOe.SetLockVisible(this.Pe.TaskState === 1),
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
        var i = this.TaskJumpType !== 1;
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
// # sourceMappingURL=DailyAdventureTaskItem.js.map
