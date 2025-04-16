"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleGrowingMainView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  ActivityLongShanController_1 = require("../ActivityLongShanController"),
  RoleGrowingStageItem_1 = require("./SubView/RoleGrowingStageItem");
class RoleGrowingMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ActivityBaseData = void 0),
      (this.lqe = void 0),
      (this.bCl = []),
      (this.AOe = () => {
        this.bCl.forEach((e) => {
          e.Refresh(this.ActivityBaseData);
        });
      }),
      (this.wOe = (e) => {
        this.ActivityBaseData.GetStageInfoById(e)
          ? UiManager_1.UiManager.OpenView("RoleGrowingTaskView", e)
          : ActivityLongShanController_1.ActivityLongShanController.ShowUnlockTip(
              e,
            );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    this.ActivityBaseData =
      ActivityLongShanController_1.ActivityLongShanController.GetActivityData();
    var t = [];
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      this.lqe.SetTitle(this.ActivityBaseData.GetTitle());
    for (let e = 0; e < this.ActivityBaseData.StageIds.length; e++) {
      var i = this.ActivityBaseData.StageIds[e],
        i = new RoleGrowingStageItem_1.RoleGrowingStageItem(i);
      (i.OnClickStageDetail = this.wOe),
        t.push(i.CreateByActorAsync(this.GetItem(1 + e).GetOwner())),
        this.AddChild(i),
        this.bCl.push(i);
    }
    await Promise.all(t);
  }
  OnBeforeShow() {
    ControllerHolder_1.ControllerHolder.ActivityController.CheckIsActivityClose(
      void 0,
      this.ActivityBaseData.Id,
    ),
      this.AOe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.LongShanUpdate,
      this.AOe,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.LongShanUpdate,
      this.AOe,
    );
  }
}
exports.RoleGrowingMainView = RoleGrowingMainView;
//# sourceMappingURL=RoleGrowingMainView.js.map
