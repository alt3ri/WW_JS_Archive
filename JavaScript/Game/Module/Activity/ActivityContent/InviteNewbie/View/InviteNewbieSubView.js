"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InviteNewbieSubView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityControllerHolder_1 = require("../../../ActivityControllerHolder"),
  ActivitySubViewBase_1 = require("../../../View/SubView/ActivitySubViewBase"),
  InviteNewbieActivityItem_1 = require("./InviteNewbieActivityItem"),
  InviteNewbieRewardItem_1 = require("./InviteNewbieRewardItem");
class InviteNewbieSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.yVc = void 0),
      (this.qsi = void 0),
      (this.NI1 = (e) => {
        this.GetText(3)?.SetText(e ?? "");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [
          2,
          ActivityControllerHolder_1.ActivityControllerHolder
            .ActivityInviteNewbieController.HandleOnCopyInviteCodeClick,
        ],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.InviteNewbieInviteCodeChanged,
      this.NI1,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.InviteNewbieInviteCodeChanged,
      this.NI1,
    );
  }
  async OnBeforeStartAsync() {
    (this.yVc = new InviteNewbieActivityItem_1.InviteNewbieActivityItem()),
      (this.qsi = new InviteNewbieRewardItem_1.InviteNewbieRewardItem()),
      await Promise.all([
        this.yVc.CreateThenShowByActorAsync(
          this.GetItem(0).GetOwner(),
          this.ActivityBaseData,
        ),
        this.qsi.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      ]),
      this.qsi.SetUiActive(!1);
  }
  OnRefreshView() {
    var e = ModelManager_1.ModelManager.InviteNewbieModel;
    this.OnTimer(0), this.GetText(3)?.SetText(e.InviteCode);
  }
  OnTimer(e) {
    var [t, i] = this.GetTimeVisibleAndRemainTime();
    this.yVc?.RefreshTimerTextByData(t, i);
  }
}
exports.InviteNewbieSubView = InviteNewbieSubView;
//# sourceMappingURL=InviteNewbieSubView.js.map
