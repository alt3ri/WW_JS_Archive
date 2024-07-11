"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreRewardView = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ItemRewardController_1 = require("../ItemRewardController");
const RewardExploreBarList_1 = require("./RewardExploreBarList");
const RewardExploreConfirmButton_1 = require("./RewardExploreConfirmButton");
const RewardExploreDescription_1 = require("./RewardExploreDescription");
const RewardExploreRecord_1 = require("./RewardExploreRecord");
const RewardExploreScore_1 = require("./RewardExploreScore");
const RewardExploreTargetReachedList_1 = require("./RewardExploreTargetReachedList");
const RewardExploreToggle_1 = require("./RewardExploreToggle");
const RewardItemList_1 = require("./RewardItemList");
const SUCCESS_OUTLINE_COLOR = "C48B29FF";
const FAIL_OUTLINE_COLOR = "B33100FF";
class ExploreRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.jIt = void 0),
      (this.Ggi = void 0),
      (this.Ngi = void 0),
      (this.$gi = void 0),
      (this.sOe = void 0),
      (this.Ygi = void 0),
      (this.Jgi = void 0),
      (this.zgi = void 0),
      (this.Zgi = void 0),
      (this.SPr = void 0),
      (this.LZe = []),
      (this.e0i = () => {
        const i = this.Ngi.ButtonInfoList;
        if (i && i?.length > 0) {
          let t = 0;
          for (const e of i) this.LZe[t].Refresh(e), t++;
        }
      }),
      (this.B$t = (t) => {
        this.sOe && this.sOe.Refresh(this.jIt.GetItemList());
      });
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
    ]),
      (this.BtnBindInfo = []);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.B$t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRefreshRewardButton,
        this.e0i,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshRewardViewItemList,
      this.B$t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRefreshRewardButton,
        this.e0i,
      );
  }
  async OnBeforeStartAsync() {
    (this.jIt = this.OpenParam),
      (this.Ggi = this.jIt.GetRewardInfo()),
      (this.Ngi = this.jIt.GetExtendRewardInfo()),
      this.GetItem(5).SetUIActive(!1),
      this.Ggi.IsRecordVisible &&
        this.Ngi.ExploreRecordInfo &&
        (await this.t0i()),
      this.Ggi.IsDescription &&
        !StringUtils_1.StringUtils.IsEmpty(this.Ggi.Description) &&
        (await this.i0i()),
      this.Ggi.IsItemVisible &&
        this.Ngi.ItemList &&
        this.Ngi.ItemList?.length > 0 &&
        (await this.o0i()),
      this.Ggi.IsExploreProgressVisible &&
        this.Ngi.ExploreBarDataList &&
        (await this.r0i()),
      this.Ngi.TargetReached &&
        this.Ngi.TargetReached?.length > 0 &&
        (await this.n0i()),
      this.Ngi.StateToggle && (await this.s0i()),
      this.Ngi.ScoreReached && (await this.EPr());
    let i = this.Ngi.ButtonInfoList;
    if (i && i?.length > 0) {
      let t = 0;
      for (const e of i) this.a0i(e, t), t++;
    }
    i = this.jIt.GetRewardInfo().AudioId;
    ItemRewardController_1.ItemRewardController.PlayAudio(i);
  }
  OnStart() {
    this.h0i(),
      this.G$t() && (this.L0t(), this.l0i()),
      this.Qgi() && this.Xgi();
  }
  OnAfterPlayStartSequence() {
    this.jIt.GetRewardInfo().IsSuccess
      ? this.UiViewSequence.PlaySequence("Success", !0)
      : this.UiViewSequence.PlaySequence("Fail", !0);
  }
  OnBeforeDestroy() {
    this.Ggi.OnCloseCallback?.(),
      (this.jIt = void 0),
      (this.Ggi = void 0),
      this.$gi?.Destroy(),
      (this.$gi = void 0),
      this.sOe?.Destroy(),
      (this.sOe = void 0),
      this.Ygi?.Destroy(),
      (this.Ygi = void 0),
      this.zgi?.Destroy(),
      (this.zgi = void 0),
      this.Zgi?.Destroy(),
      (this.Zgi = void 0),
      this.Jgi?.Destroy(),
      (this.Jgi = void 0);
    for (const t of this.LZe) t.Destroy();
    (this.LZe.length = 0),
      ModelManager_1.ModelManager.ItemRewardModel.ClearCurrentRewardData();
  }
  G$t() {
    const t = this.GetItem(0);
    var i = this.Ggi.Title;
    var i = !StringUtils_1.StringUtils.IsEmpty(i);
    return t.SetUIActive(i), i;
  }
  L0t() {
    const t = this.GetText(1);
    const i = this.Ggi.Title;
    StringUtils_1.StringUtils.IsEmpty(i) ||
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
  }
  h0i() {
    this.GetItem(18).SetUIActive(void 0 !== this.Ggi.Tip),
      this.Ggi.Tip && this.GetText(19).SetText(this.Ggi.Tip);
  }
  l0i() {
    const t = this.GetText(1);
    const i = t
      .GetOwner()
      .GetComponentByClass(UE.UIEffectOutline.StaticClass());
    const e = this.Ggi.TitleHexColor;
    StringUtils_1.StringUtils.IsEmpty(e) || t.SetColor(UE.Color.FromHex(e)),
      this.Ggi.IsSuccess
        ? i.SetOutlineColor(UE.Color.FromHex(SUCCESS_OUTLINE_COLOR))
        : i.SetOutlineColor(UE.Color.FromHex(FAIL_OUTLINE_COLOR));
  }
  Qgi() {
    const t = this.GetTexture(2);
    var i = this.Ggi.TitleIconPath;
    var i = !StringUtils_1.StringUtils.IsEmpty(i);
    return t.SetUIActive(i), i;
  }
  Xgi() {
    const t = this.GetTexture(2);
    const i = this.Ggi.TitleIconPath;
    const e = this.Ggi.TitleIconHexColor;
    StringUtils_1.StringUtils.IsEmpty(i) ||
      (t.SetUIActive(!1),
      this.SetTextureByPath(i, t, void 0, () => {
        t.SetUIActive(!0);
      })),
      StringUtils_1.StringUtils.IsEmpty(e) || t.SetColor(UE.Color.FromHex(e));
  }
  async t0i() {
    let t;
    const i = this.Ngi.ExploreRecordInfo;
    i &&
      ((t = this.GetItem(3)),
      (this.$gi = new RewardExploreRecord_1.RewardExploreRecord()),
      await this.$gi.CreateThenShowByResourceIdAsync("Uiitem_ResultRecord", t),
      this.$gi.Refresh(i));
  }
  async o0i() {
    let t;
    const i = this.jIt.GetItemList();
    !i ||
      i.length < 1 ||
      ((t = this.GetItem(3)),
      (this.sOe = new RewardItemList_1.RewardItemList()),
      await this.sOe.CreateThenShowByResourceIdAsync("Uiitem_TipsItem", t),
      this.sOe.Refresh(i));
  }
  async r0i() {
    let t;
    const i = this.Ngi.ExploreBarDataList;
    !i ||
      i.length < 1 ||
      ((t = this.GetItem(3)),
      (this.Ygi = new RewardExploreBarList_1.RewardExploreBarList()),
      await this.Ygi.CreateThenShowByResourceIdAsync("Uiitem_ResultBar", t),
      this.Ygi.Refresh(this.Ggi.ExploreBarTipsTextId, i));
  }
  async i0i() {
    let t;
    const i = this.Ggi.Description;
    StringUtils_1.StringUtils.IsEmpty(i) ||
      ((t = this.GetItem(3)),
      (this.Jgi = new RewardExploreDescription_1.RewardExploreDescription()),
      await this.Jgi.CreateThenShowByResourceIdAsync("Uiitem_ResultDesc", t),
      this.Jgi.Refresh(i));
  }
  async n0i() {
    let t;
    const i = this.Ngi.TargetReached;
    !i ||
      i.length < 1 ||
      ((t = this.GetItem(3)),
      (this.zgi =
        new RewardExploreTargetReachedList_1.RewardExploreTargetReachedList()),
      await this.zgi.CreateThenShowByResourceIdAsync("UiItem_Settlement", t),
      this.zgi.SetBarList(i));
  }
  async s0i() {
    let t;
    const i = this.Ngi.StateToggle;
    i &&
      ((t = this.GetItem(6)),
      (this.Zgi = new RewardExploreToggle_1.RewardExploreToggle()),
      await this.Zgi.CreateThenShowByResourceIdAsync(
        "UiItem_SettlementToggle",
        t,
      ),
      this.Zgi.Refresh(i));
  }
  async EPr() {
    let t;
    const i = this.Ngi.ScoreReached;
    i &&
      ((t = this.GetItem(20)),
      (this.SPr = new RewardExploreScore_1.RewardExploreScore()),
      await this.SPr.CreateThenShowByResourceIdAsync("UiItem_ResultScore", t),
      this.SPr.Refresh(i));
  }
  a0i(t, i) {
    var e = this.GetItem(5);
    var s = this.GetItem(4);
    var e = LguiUtil_1.LguiUtil.DuplicateActor(e.GetOwner(), s);
    var s = new RewardExploreConfirmButton_1.RewardExploreConfirmButton(e, i);
    return s.Refresh(t), s.SetActive(!0), this.LZe.push(s), s;
  }
}
exports.ExploreRewardView = ExploreRewardView;
// # sourceMappingURL=ExploreRewardView.js.map
