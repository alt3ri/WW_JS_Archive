"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChapterEntryView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../../CiacconaGalTextConfig"),
  CiacconaGalRewardButtonItem_1 = require("../CiacconaGalRewardButtonItem"),
  CiacconaGalTitleItem_1 = require("../CiacconaGalTitleItem"),
  CiacconaGalChapterEntryItem_1 = require("./CiacconaGalChapterEntryItem");
class CiacconaGalChapterEntryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Qyi = void 0),
      (this._T1 = void 0),
      (this.l4c = void 0),
      (this.u4c = void 0),
      (this.d4c = void 0),
      (this.Pe = void 0),
      (this.SUc = () => {
        return new CiacconaGalChapterEntryItem_1.CiacconaGalChapterEntryItem();
      }),
      (this.G3c = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenEndingView();
      }),
      (this.F3c = () => {
        ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenRewardViewByActivityId(
          this.Pe.Id,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [2, UE.UIItem],
      [1, UE.UIHorizontalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.Qyi = new PopupCaptionItem_1.PopupCaptionItem()),
      this.Qyi.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.l4c = new CiacconaGalTitleItem_1.CiacconaTitleInspirationItem(
        ModelManager_1.ModelManager.CiacconaGalModel.ActivityData,
      )),
      (this.u4c =
        new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem()),
      (this.d4c =
        new CiacconaGalRewardButtonItem_1.CiacconaGalRewardButtonItem()),
      this.d4c.SetNeedRemainTime(!0);
    var e = [],
      e =
        (e.push(
          this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
        ),
        e.push(
          this.l4c.CreateThenShowByResourceIdAsync(
            "PnlTimeInfo",
            this.Qyi.GetToggleRootItem(),
          ),
        ),
        e.push(this.u4c.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
        e.push(this.d4c.CreateThenShowByActorAsync(this.GetItem(4).GetOwner())),
        await Promise.all(e),
        this.u4c.SetOnClick(this.G3c),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_REWARD,
        )),
      e =
        (this.u4c.SetTitle(e),
        this.d4c.SetOnClick(this.F3c),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_PROGRESS_REWARD,
        )),
      e = (this.d4c.SetTitle(e), this.GetHorizontalLayout(1));
    e &&
      ((this._T1 = new GenericLayout_1.GenericLayout(e, this.SUc)),
      (e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
        CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_TITLE,
      )),
      this.Qyi.SetTitleByTextIdAndArgNew(e),
      (e = CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
        CiacconaGalDefine_1.TEXT_ID_CIACCONA_CHAPTER_ENTRY_INTERNAL_TITLE,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e));
  }
  OnBeforeShow() {
    this.Og();
  }
  Og() {
    this.Pe = this.OpenParam;
    var e = [];
    for (const o of this.Pe.SlotIds) {
      var i =
        ModelManager_1.ModelManager.CiacconaGalModel.GetChapterSlotDataById(o);
      i && e.push(i);
    }
    this._T1.RefreshByData(e),
      this.u4c.SetRedDotVisible(
        ModelManager_1.ModelManager.CiacconaGalModel.HasAnyEndingReward(),
      );
    var [t, a] =
        ModelManager_1.ModelManager.CiacconaGalModel.GetEndingProgress(),
      [t, a] =
        (this.u4c.SetProgressText(t + "/" + a),
        this.d4c.SetRedDotVisible(
          ModelManager_1.ModelManager.CiacconaGalModel.HasAnyProgressReward(),
        ),
        this.d4c.SetUiActive(
          ModelManager_1.ModelManager.CiacconaGalModel.ActivityData
            .IsInRewardTime,
        ),
        ModelManager_1.ModelManager.CiacconaGalModel.GetProgressRewardProgress());
    this.d4c.SetProgressText(t + "/" + a);
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return 0 !== e.length && (e = this._T1?.GetGridByDisplayIndex(0))
      ? [e, e]
      : void 0;
  }
}
exports.CiacconaGalChapterEntryView = CiacconaGalChapterEntryView;
//# sourceMappingURL=CiacconaGalChapterEntryView.js.map
