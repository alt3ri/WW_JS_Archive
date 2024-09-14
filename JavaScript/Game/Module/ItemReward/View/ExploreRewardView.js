"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreRewardView = void 0);
const UE = require("ue"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FriendController_1 = require("../../Friend/FriendController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ItemRewardController_1 = require("../ItemRewardController"),
  RewardExploreBarList_1 = require("./RewardExploreBarList"),
  RewardExploreConfirmButton_1 = require("./RewardExploreConfirmButton"),
  RewardExploreDescription_1 = require("./RewardExploreDescription"),
  RewardExploreFriendItem_1 = require("./RewardExploreFriendItem"),
  RewardExploreOnlineChallengePlayer_1 = require("./RewardExploreOnlineChallengePlayer"),
  RewardExploreRecord_1 = require("./RewardExploreRecord"),
  RewardExploreScore_1 = require("./RewardExploreScore"),
  RewardExploreTargetReachedList_1 = require("./RewardExploreTargetReachedList"),
  RewardExploreToggle_1 = require("./RewardExploreToggle"),
  RewardItemList_1 = require("./RewardItemList"),
  SUCCESS_OUTLINE_COLOR = "C48B29FF",
  FAIL_OUTLINE_COLOR = "B33100FF";
class ExploreRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.$Tt = void 0),
      (this.G0i = void 0),
      (this.N0i = void 0),
      (this.$0i = void 0),
      (this.sOe = void 0),
      (this.Y0i = void 0),
      (this.J0i = void 0),
      (this.z0i = void 0),
      (this.dWs = void 0),
      (this.Xzs = void 0),
      (this.Z0i = void 0),
      (this.Iyn = void 0),
      (this.Het = []),
      (this.efi = () => {
        var t = this.N0i.ButtonInfoList;
        if (t && 0 < t?.length) {
          let e = 0;
          for (const i of t) this.Het[e].Refresh(i), e++;
        }
      }),
      (this.Yzs = () => {
        var e =
          ItemRewardController_1.ItemRewardController.BuildExploreFriendDataList();
        ItemRewardController_1.ItemRewardController.SetExploreFriendDataList(e),
          this.Jzs();
      }),
      (this.Yra = () => {
        var e =
          ItemRewardController_1.ItemRewardController.BuildExploreFriendIdList();
        FriendController_1.FriendController.CheckHasAnyApplied(e) &&
          !UiManager_1.UiManager.IsViewOpen("FriendApplyView") &&
          UiManager_1.UiManager.OpenView("FriendApplyView", e);
      }),
      (this.BYt = (e) => {
        this.sOe && this.sOe.Refresh(this.$Tt.GetItemList());
      }),
      (this.zzs = () =>
        new RewardExploreFriendItem_1.RewardExploreFriendItem());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIText],
      [20, UE.UIItem],
      [21, UE.UIVerticalLayout],
      [22, UE.UIItem],
    ]),
      (this.BtnBindInfo = []);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRewardButton,
        this.efi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendApplyReceived,
        this.Yra,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendApplicationListUpdate,
        this.Yzs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FriendAdded,
        this.Yzs,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.BYt,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRewardButton,
        this.efi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendApplyReceived,
        this.Yra,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendApplicationListUpdate,
        this.Yzs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FriendAdded,
        this.Yzs,
      );
  }
  async OnBeforeStartAsync() {
    (this.$Tt = this.OpenParam),
      (this.G0i = this.$Tt.GetRewardInfo()),
      (this.N0i = this.$Tt.GetExtendRewardInfo()),
      this.GetItem(5).SetUIActive(!1),
      this.G0i.IsRecordVisible &&
        this.N0i.ExploreRecordInfo &&
        (await this.tfi()),
      this.G0i.IsDescription &&
        !StringUtils_1.StringUtils.IsEmpty(this.G0i.Description) &&
        (await this.ifi()),
      this.G0i.IsItemVisible &&
        this.N0i.ItemList &&
        0 < this.N0i.ItemList?.length &&
        (await this.ofi()),
      this.G0i.IsShowOnlineChallengePlayer && (await this.CWs()),
      this.G0i.IsExploreProgressVisible &&
        this.N0i.ExploreBarDataList &&
        (await this.rfi()),
      this.N0i.TargetReached &&
        0 < this.N0i.TargetReached?.length &&
        (await this.nfi()),
      this.N0i.StateToggle && (await this.sfi()),
      this.N0i.ScoreReached && (await this.Tyn()),
      this.N0i.ExploreFriendDataList && (await this.Zzs());
    var t = this.N0i.ButtonInfoList;
    if (t && 0 < t?.length) {
      let e = 0;
      for (const i of t) this.afi(i, e), e++;
    }
    t = this.$Tt.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(t);
  }
  OnStart() {
    this.hfi(),
      this.GYt() && (this.Nft(), this.lfi()),
      this.Q0i() && this.X0i();
  }
  OnAfterShow() {
    this.N0i.ExploreFriendDataList && this.Yra();
  }
  OnAfterPlayStartSequence() {
    this.$Tt.GetRewardInfo().IsSuccess
      ? this.UiViewSequence.PlaySequence("Success", !0)
      : this.UiViewSequence.PlaySequence("Fail", !0);
  }
  OnBeforeDestroy() {
    this.G0i.OnCloseCallback?.(),
      (this.$Tt = void 0),
      (this.G0i = void 0),
      this.$0i?.Destroy(),
      (this.$0i = void 0),
      this.sOe?.Destroy(),
      (this.sOe = void 0),
      this.Y0i?.Destroy(),
      (this.Y0i = void 0),
      this.z0i?.Destroy(),
      (this.z0i = void 0),
      this.Z0i?.Destroy(),
      (this.Z0i = void 0),
      this.J0i?.Destroy(),
      (this.J0i = void 0);
    for (const e of this.Het) e.Destroy();
    (this.Het.length = 0),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData(),
      UiManager_1.UiManager.IsViewOpen("FriendApplyView") &&
        UiManager_1.UiManager.CloseView("FriendApplyView");
  }
  GYt() {
    var e = this.GetItem(0),
      t = this.G0i.Title,
      t = !StringUtils_1.StringUtils.IsEmpty(t);
    return e.SetUIActive(t), t;
  }
  Nft() {
    var e = this.GetText(1),
      t = this.G0i.Title;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      LguiUtil_1.LguiUtil.SetLocalTextNew(e, t);
  }
  hfi() {
    this.GetItem(18).SetUIActive(void 0 !== this.G0i.Tip),
      this.G0i.Tip && this.GetText(19).SetText(this.G0i.Tip);
  }
  lfi() {
    var e = this.GetText(1),
      t = e.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass()),
      i = this.G0i.TitleHexColor;
    StringUtils_1.StringUtils.IsEmpty(i) || e.SetColor(UE.Color.FromHex(i)),
      this.G0i.IsSuccess
        ? t.SetOutlineColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR))
        : t.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
  }
  Q0i() {
    var e = this.GetTexture(2),
      t = this.G0i.TitleIconPath,
      t = !StringUtils_1.StringUtils.IsEmpty(t);
    return e.SetUIActive(t), t;
  }
  X0i() {
    const e = this.GetTexture(2);
    var t = this.G0i.TitleIconPath,
      i = this.G0i.TitleIconHexColor;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      (e.SetUIActive(!1),
      this.SetTextureByPath(t, e, void 0, () => {
        e.SetUIActive(!0);
      })),
      StringUtils_1.StringUtils.IsEmpty(i) || e.SetColor(UE.Color.FromHex(i));
  }
  Jzs() {
    var e = this.N0i.ExploreFriendDataList;
    e && this.Xzs?.RefreshByData(e);
  }
  async tfi() {
    var e,
      t = this.N0i.ExploreRecordInfo;
    t &&
      ((e = this.GetItem(3)),
      (this.$0i = new RewardExploreRecord_1.RewardExploreRecord()),
      await this.$0i.CreateThenShowByResourceIdAsync("Uiitem_ResultRecord", e),
      this.$0i.Refresh(t));
  }
  async ofi() {
    var e,
      t = this.$Tt.GetItemList();
    !t ||
      t.length < 1 ||
      ((e = this.GetItem(3)),
      (this.sOe = new RewardItemList_1.RewardItemList()),
      await this.sOe.CreateThenShowByResourceIdAsync("Uiitem_TipsItem", e),
      this.sOe.Refresh(t));
  }
  async rfi() {
    var e,
      t = this.N0i.ExploreBarDataList;
    !t ||
      t.length < 1 ||
      ((e = this.GetItem(3)),
      (this.Y0i = new RewardExploreBarList_1.RewardExploreBarList()),
      await this.Y0i.CreateThenShowByResourceIdAsync("Uiitem_ResultBar", e),
      this.Y0i.Refresh(this.G0i.ExploreBarTipsTextId, t));
  }
  async ifi() {
    var e,
      t = this.G0i.Description;
    StringUtils_1.StringUtils.IsEmpty(t) ||
      ((e = this.GetItem(3)),
      (this.J0i = new RewardExploreDescription_1.RewardExploreDescription()),
      await this.J0i.CreateThenShowByResourceIdAsync("Uiitem_ResultDesc", e),
      this.J0i.Refresh(t));
  }
  async nfi() {
    var e,
      t = this.N0i.TargetReached;
    !t ||
      t.length < 1 ||
      ((e = this.GetItem(3)),
      (this.z0i =
        new RewardExploreTargetReachedList_1.RewardExploreTargetReachedList()),
      await this.z0i.CreateThenShowByResourceIdAsync("UiItem_Settlement", e),
      this.z0i.SetBarList(t));
  }
  async CWs() {
    var e = this.GetItem(20);
    (this.dWs =
      new RewardExploreOnlineChallengePlayer_1.RewardExploreOnlineChallengePlayer()),
      await this.dWs.CreateThenShowByResourceIdAsync(
        "UiItem_ChallengeAgain",
        e,
      );
  }
  async sfi() {
    var e,
      t = this.N0i.StateToggle;
    t &&
      ((e = this.GetItem(6)),
      (this.Z0i = new RewardExploreToggle_1.RewardExploreToggle()),
      await this.Z0i.CreateThenShowByResourceIdAsync(
        "UiItem_SettlementToggle",
        e,
      ),
      this.Z0i.Refresh(t));
  }
  async Tyn() {
    var e,
      t = this.N0i.ScoreReached;
    t &&
      ((e = this.GetItem(20)),
      (this.Iyn = new RewardExploreScore_1.RewardExploreScore()),
      await this.Iyn.CreateThenShowByResourceIdAsync("UiItem_ResultScore", e),
      this.Iyn.Refresh(t));
  }
  async Zzs() {
    var e = this.N0i.ExploreFriendDataList,
      t = this.GetVerticalLayout(21),
      i = new GenericLayout_1.GenericLayout(t, this.zzs);
    await i.RefreshByDataAsync(e), t.RootUIComp.SetUIActive(!0), (this.Xzs = i);
  }
  afi(e, t) {
    var i = this.GetItem(5),
      r = this.GetItem(4),
      i = LguiUtil_1.LguiUtil.DuplicateActor(i.GetOwner(), r),
      r = new RewardExploreConfirmButton_1.RewardExploreConfirmButton(i, t);
    return r.Refresh(e), r.SetActive(!0), this.Het.push(r), r;
  }
}
exports.ExploreRewardView = ExploreRewardView;
//# sourceMappingURL=ExploreRewardView.js.map
