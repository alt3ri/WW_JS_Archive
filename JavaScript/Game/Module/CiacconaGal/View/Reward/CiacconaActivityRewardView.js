"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaActivityRewardView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig"),
  CiacconaActivityRewardItem_1 = require("./CiacconaActivityRewardItem");
class CiacconaActivityRewardView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.fOc = void 0),
      (this.xqe = void 0),
      (this.CNe = void 0),
      (this.Bqe = () =>
        new CiacconaActivityRewardItem_1.CiacconaActivityRewardItem()),
      (this.AOe = () => {
        this.bl();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.CNe = this.OpenParam),
      (this.fOc = new PopupCaptionItem_1.PopupCaptionItem()),
      this.fOc.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      await this.fOc.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    var e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
      CiacconaGalDefine_1.TEXT_ID_CIACCONA_PROGRESS_TITLE,
    );
    this.fOc.SetTitleByTextIdAndArgNew(e), this.C4c();
  }
  OnStart() {
    (this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(3),
      this.Bqe,
    )),
      this.bl(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaRewardDataUpdate,
        this.AOe,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCiacconaRewardDataUpdate,
      this.AOe,
    );
  }
  OnTick() {
    this.C4c();
  }
  bl() {
    var e =
        ModelManager_1.ModelManager.CiacconaGalModel.GetAllRewardDataByActivityId(
          this.CNe.Id,
        ),
      [e, i] =
        (this.xqe?.RefreshByData(e),
        ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress());
    this.GetText(1).SetText(e + "/" + i),
      (this.GetSprite(2).fillAmount = e / (i ?? 1));
  }
  C4c() {
    var e =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        "Xkjsx_Rewards_Timeless",
      ) +
      " " +
      this.CNe.RewardRemainTimeStr;
    this.GetText(5)?.SetText(e);
  }
}
exports.CiacconaActivityRewardView = CiacconaActivityRewardView;
//# sourceMappingURL=CiacconaActivityRewardView.js.map
