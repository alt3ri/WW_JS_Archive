"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerRewardView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  ShipTowerAreaItem_1 = require("./ShipTowerAreaItem"),
  ShipTowerRewardItem_1 = require("./ShipTowerRewardItem");
class ShipTowerRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.OpenParam = void 0),
      (this.zJa = void 0),
      (this.PA_ = void 0),
      (this.xA_ = void 0),
      (this.uA_ = void 0),
      (this.iJl = void 0),
      (this.OW_ = !0),
      (this.n9_ = (e) => {
        "Start" === e && this.PA_?.SelectGridProxy(this.kA_());
      }),
      (this.UA_ = () => {
        var e = new ShipTowerAreaItem_1.ShipTowerAreaItem();
        return (e.ClickCallBack = this.DA_), e;
      }),
      (this.rOe = () => {
        var e = new ShipTowerRewardItem_1.ShipTowerRewardItem();
        return (e.ClickCallBack = this.u6e), e;
      }),
      (this.DA_ = (e) => {
        (this.iJl = e),
          this.xA_?.RefreshByData(e.RewardList, void 0, void 0, this.OW_),
          (this.OW_ = !0);
      }),
      (this.u6e = (e) => {
        var t =
          this.iJl?.RewardList.filter((e) => e.IsReceive)?.map((e) => e.Id) ??
          [];
        ModelManager_1.ModelManager.ShipTowerModel.ReceiveAward(e.Id, t);
      }),
      (this.BA_ = (e) => {
        this.iJl &&
          (this.PA_?.RefreshByData(this.uA_, !0, () => {
            (this.OW_ = !1),
              this.PA_?.DeselectCurrentGridProxy(),
              this.PA_?.SelectGridProxy(this.dq_());
          }),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Temp",
            69,
            "",
            ["EventRewardReceive", e],
            ["SelectId", this.iJl?.Id],
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  Es_() {
    (this.uA_ = ModelManager_1.ModelManager.ShipTowerModel.GetAreaList()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Temp", 69, "", ["DataParam", this.OpenParam]);
  }
  async OnBeforeStartAsync() {
    this.Es_(),
      await super.OnBeforeStartAsync(),
      await this.syc(),
      (this.zJa = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.zJa.SetCloseCallBack(this.CloseMe.bind(this)),
      this.zJa.SetHelpBtnActive(!1),
      (this.PA_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(1),
        this.GetItem(3).GetOwner(),
        this.UA_,
        !0,
      )),
      (this.xA_ = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(4).GetOwner(),
        this.rOe,
        !0,
      )),
      await this.PA_.RefreshByDataAsync(this.uA_);
  }
  async syc() {
    UiManager_1.UiManager.IsViewOpen("ShipTowerView") ||
      (await ModelManager_1.ModelManager.ShipTowerModel.CheckIsNeedShowSeasonReview());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ShipTowerRewardReceive,
      this.BA_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.n9_,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ShipTowerRewardReceive,
      this.BA_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
        this.n9_,
      );
  }
  OnBeforeShow() {}
  OnBeforeDestroy() {}
  kA_() {
    if (!this.OpenParam?.RewardId) return this.dq_();
    const t = this.OpenParam.RewardId;
    var e = this.uA_.findIndex((e) => e.RewardList.some((e) => e.Id === t));
    return this.mq_(e);
  }
  dq_() {
    var e = this.uA_.findIndex((e) => e.RewardList.some((e) => e.IsReceive));
    return this.mq_(e);
  }
  mq_(e) {
    return -1 === e ? 0 : e;
  }
}
exports.ShipTowerRewardView = ShipTowerRewardView;
//# sourceMappingURL=ShipTowerRewardView.js.map
