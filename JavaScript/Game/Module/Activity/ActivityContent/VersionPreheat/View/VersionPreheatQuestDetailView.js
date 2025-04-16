"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VersionPreheatButton =
    exports.VersionPreheatQuestDetailRoleItem =
    exports.VersionPreheatQuestDetailView =
      void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  ActivityVersionPreheatController_1 = require("../Controller/ActivityVersionPreheatController");
class VersionPreheatQuestDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.wno = [31, 32, 33, 34, 35, 36, 37]),
      (this.V_l = void 0),
      (this.H_l = void 0),
      (this.j_l = void 0),
      (this.W_l = void 0),
      (this.KUa = !0),
      (this.$_l = () => {
        var t = this.OpenParam.PersistentData;
        ActivityVersionPreheatController_1.ActivityVersionPreheatController.Instance.OpenShareView(
          t.QuestSharePhotoPath,
          t.QuestTitleTextId,
          t.QuestContentTextId,
        );
      }),
      (this.X_l = () => {}),
      (this.Y_l = () => {
        this.CloseMe();
      }),
      (this.a4e = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UITexture],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISliderComponent],
      [8, UE.UISprite],
      [9, UE.UIText],
      [10, UE.UISprite],
      [11, UE.UIText],
      [12, UE.UISprite],
      [13, UE.UIText],
      [14, UE.UIText],
      [15, UE.UITexture],
      [16, UE.UIButtonComponent],
      [17, UE.UIItem],
      [18, UE.UIText],
      [19, UE.UIHorizontalLayout],
      [20, UE.UIItem],
      [21, UE.UIItem],
      [22, UE.UIItem],
      [23, UE.UIText],
      [24, UE.UIItem],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIButtonComponent],
      [28, UE.UIText],
      [29, UE.UIItem],
      [30, UE.UIText],
      [31, UE.UIItem],
      [32, UE.UIItem],
      [33, UE.UIItem],
      [34, UE.UIItem],
      [35, UE.UIItem],
      [36, UE.UIItem],
      [37, UE.UIItem],
      [38, UE.UIButtonComponent],
      [39, UE.UITexture],
      [40, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [16, this.$_l],
        [27, this.X_l],
        [38, this.Y_l],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.V_l = new VersionPreheatQuestDetailRoleItem()),
      await this.V_l.CreateThenShowByActorAsync(this.GetItem(22).GetOwner()),
      (this.H_l = new VersionPreheatQuestDetailRoleItem()),
      await this.H_l.CreateThenShowByActorAsync(this.GetItem(25).GetOwner()),
      (this.j_l = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(19),
        this.a4e,
      )),
      (this.W_l = new VersionPreheatButton()),
      await this.W_l.CreateThenShowByActorAsync(this.GetItem(40).GetOwner());
    var t = this.OpenParam;
    this.QCl(t);
  }
  OnBeforeShow() {
    var t;
    this.KUa
      ? (this.KUa = !1)
      : void 0 !==
          (t = ModelManager_1.ModelManager.VersionPreheatModel)
            .CurrentUsingVersionPreheatId &&
        ((t = t.BuildQuestDetailDataById(t.CurrentUsingVersionPreheatId)),
        this.QCl(t));
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.VersionPreheatModel.CurrentUsingVersionPreheatId =
      void 0;
  }
  J_l(t) {
    this.SetTextureByPath(t.QuestPhotoPath, this.GetTexture(15)),
      this.Z_l(t.Index),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        t.QuestContentTextId,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.QuestTitleTextId),
      this.GetTexture(1)?.SetUIActive(0 === t.QuestCrestIndex),
      this.GetTexture(2)?.SetUIActive(1 === t.QuestCrestIndex),
      this.GetButton(16)?.RootUIComp.SetUIActive(t.CanShare),
      this.GetTexture(39)?.SetUIActive(t.CanShare);
  }
  Z_l(i) {
    for (let t = 0; t < this.wno.length; t++)
      this.GetItem(this.wno[t])?.SetUIActive(t === i);
  }
  eul(t) {
    void 0 === t
      ? this.GetItem(4)?.SetUIActive(!1)
      : (this.GetItem(4)?.SetUIActive(!0),
        this.GetText(9)?.SetText(t.LeftPercentageText),
        this.GetText(11)?.SetText(t.RightPercentageText),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(13),
          t.LeftThemeTextId,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(14),
          t.RightThemeTextId,
        ),
        this.GetSprite(10)?.SetUIActive(t.IsLeftChosen),
        this.GetSprite(12)?.SetUIActive(!t.IsLeftChosen),
        this.GetSprite(6)?.SetFillAmount(t.LeftNormalized),
        this.GetSprite(5)?.SetFillAmount(t.RightNormalized),
        this.GetSlider(7)?.SetValue(t.LeftNormalized));
  }
  tul(t) {
    void 0 === t
      ? this.GetItem(21)?.SetUIActive(!1)
      : (this.GetItem(21)?.SetUIActive(!0),
        this.V_l.RefreshExternal(t.NpcIconPath),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(23),
          t.NpcContentTextId,
        ),
        void 0 === (t = t.SelfChatData)
          ? this.GetItem(24)?.SetUIActive(!1)
          : (this.GetItem(24)?.SetUIActive(!0),
            this.H_l.RefreshExternal(t.NpcIconPath),
            void 0 === t.NpcContentTextId
              ? this.GetItem(26)?.SetUIActive(!1)
              : (this.GetItem(26)?.SetUIActive(!0),
                LguiUtil_1.LguiUtil.SetLocalTextNew(
                  this.GetText(28),
                  t.NpcContentTextId,
                )),
            this.GetButton(27)?.RootUIComp.SetUIActive(!1)));
  }
  iul(t) {
    void 0 === t
      ? this.GetItem(17)?.SetUIActive(!1)
      : (this.GetItem(17)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(18),
          t.QuestContentTextId,
        ),
        this.KCl(t),
        (this.W_l.ClickRewardFunc = t.ClickFunc),
        (this.W_l.ClickRewardPassData = t.ClickPassData));
  }
  async KCl(t) {
    await this.j_l.RefreshByDataAsync(t.ItemListData);
    for (const i of this.j_l.GetLayoutItemList())
      i.SetReceivedVisible(t.IsReceived);
  }
  e4i(t) {
    void 0 === t
      ? this.GetText(30)?.SetUIActive(!1)
      : (this.GetText(30)?.SetUIActive(!0),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(30), t));
  }
  QCl(t) {
    this.J_l(t.PersistentData),
      this.eul(t.VoteData),
      this.tul(t.ChatData),
      this.iul(t.RewardData),
      this.e4i(t.BonusTextId);
  }
}
exports.VersionPreheatQuestDetailView = VersionPreheatQuestDetailView;
class VersionPreheatQuestDetailRoleItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  RefreshExternal(t) {
    this.SetTextureByPath(t, this.GetTexture(0));
  }
}
exports.VersionPreheatQuestDetailRoleItem = VersionPreheatQuestDetailRoleItem;
class VersionPreheatButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ClickRewardFunc = void 0),
      (this.ClickRewardPassData = void 0),
      (this.p9a = () => {
        void 0 !== this.ClickRewardFunc &&
          void 0 !== this.ClickRewardPassData &&
          this.ClickRewardFunc(this.ClickRewardPassData);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.p9a]]);
  }
  OnStart() {
    this.GetItem(2)?.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Text_RoleQuestGoto_Text",
      );
  }
}
exports.VersionPreheatButton = VersionPreheatButton;
//# sourceMappingURL=VersionPreheatQuestDetailView.js.map
