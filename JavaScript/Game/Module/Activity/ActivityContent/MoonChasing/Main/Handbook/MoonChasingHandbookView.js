"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MoonChasingHandbookView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  CommonRewardPopup_1 = require("../../../../../Common/CommonRewardPopup"),
  LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView"),
  ActivityMoonChasingController_1 = require("../../Activity/ActivityMoonChasingController"),
  HandbookDisplayGrid_1 = require("./HandbookDisplayGrid"),
  HandbookRewardPanel_1 = require("./HandbookRewardPanel");
class MoonChasingHandbookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.u7s = void 0),
      (this.KTt = void 0),
      (this.S2t = void 0),
      (this.c7s = () => new HandbookDisplayGrid_1.HandbookDisplayGrid()),
      (this.m7s = (e) => {
        this.S2t.Refresh(e);
      }),
      (this.OnTrackMoonHandbookUpdate = () => {
        this.S2t.SetActive(!1), this.KTt.RefreshLayout();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.u7s = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(2).GetOwner(),
        this.c7s,
      ));
    var e = this.GetItem(4);
    (this.KTt = new HandbookRewardPanel_1.HandbookRewardPanel()),
      await this.KTt.CreateThenShowByActorAsync(e.GetOwner()),
      (this.S2t = new CommonRewardPopup_1.CommonRewardPopup(this.RootItem));
  }
  OnBeforeShow() {
    this.v4e(),
      this.d7s(),
      this.KTt.RefreshLayout(),
      ActivityMoonChasingController_1.ActivityMoonChasingController.CheckIsActivityClose();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TrackMoonHandbookUpdate,
        this.OnTrackMoonHandbookUpdate,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TrackMoonHandbookUpdate,
        this.OnTrackMoonHandbookUpdate,
      );
  }
  d7s() {
    var e =
      ModelManager_1.ModelManager.MoonChasingModel.GetHandbookUnlockCount();
    this.GetText(3).SetText(e.toString());
  }
  v4e() {
    var e = ModelManager_1.ModelManager.MoonChasingModel.GetHandbookGridList();
    this.u7s.RefreshByData(e, !1, void 0, !0);
  }
}
exports.MoonChasingHandbookView = MoonChasingHandbookView;
//# sourceMappingURL=MoonChasingHandbookView.js.map
