"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingHandBookRewardView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  FishingHandBookRewardItem_1 = require("./FishingHandBookRewardItem");
class FishingHandBookRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.NGt = void 0),
      (this.jWt = () => {
        return new FishingHandBookRewardItem_1.FishingHandBookRewardItem();
      }),
      (this.ck_ = () => {
        this.v4e();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.FishingRefreshHandBookRewardView,
      this.ck_,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.FishingRefreshHandBookRewardView,
      this.ck_,
    );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      });
  }
  OnStart() {
    (this.NGt = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.jWt,
    )),
      this.v4e();
  }
  v4e() {
    var e =
        ModelManager_1.ModelManager.FishingModel.FishingItemHandBookRewardMap,
      e = Array.from(e.values()),
      t =
        (e.sort((e, t) => {
          return (
            (e.IsTaken ? 2 : e.IsFinished ? 0 : 1) -
            (t.IsTaken ? 2 : t.IsFinished ? 0 : 1)
          );
        }),
        []);
    for (const i of e) t.push(i.Id);
    this.NGt.RefreshByData(t, () => {
      this.NGt?.GetUiAnimController()?.Play();
    });
  }
}
exports.FishingHandBookRewardView = FishingHandBookRewardView;
//# sourceMappingURL=FishingHandBookRewardView.js.map
