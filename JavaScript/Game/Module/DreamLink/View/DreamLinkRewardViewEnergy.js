"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DreamLinkRewardViewEnergy = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  DreamLinkController_1 = require("../DreamLinkController"),
  DreamLinkRewardEnergyItem_1 = require("./SubView/DreamLinkRewardEnergyItem");
class DreamLinkRewardViewEnergy extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.boh = void 0),
      (this.Otl = void 0),
      (this.qoh = void 0),
      (this.VOe = () => {
        return new DreamLinkRewardEnergyItem_1.DreamLinkRewardEnergyItem();
      }),
      (this.gcl = () => {
        this.v4e();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.Otl = new PopupCaptionItem_1.PopupCaptionItem()),
      e.push(this.Otl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner())),
      this.Otl.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.qoh = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.VOe,
      )),
      await Promise.all(e);
  }
  OnStart() {
    this.boh =
      DreamLinkController_1.DreamLinkController.GetCurrentActivityData();
  }
  OnBeforeShow() {
    this.v4e(), this.ktl();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.DreamLinkRewardRefresh,
      this.gcl,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.DreamLinkRewardRefresh,
      this.gcl,
    );
  }
  async v4e() {
    var i = this.boh.GetEnergyRewardDataList();
    await this.qoh.RefreshByDataAsync(i, !0);
    let t = 0;
    for (let e = 0; e < i.length; e++)
      if (2 !== i[e].Status) {
        t = e;
        break;
      }
    var e = Math.min(t + 2, i.length - 1),
      e = this.qoh.GetItemByIndex(e);
    e && this.qoh.LateScrollTo(e);
  }
  ktl() {
    var e = this.boh.MaxEnergy,
      i = this.boh.GetEnergyItemCount();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "DreamLink_Reward_Ins_Progress",
      i,
      e,
    );
  }
}
exports.DreamLinkRewardViewEnergy = DreamLinkRewardViewEnergy;
//# sourceMappingURL=DreamLinkRewardViewEnergy.js.map
