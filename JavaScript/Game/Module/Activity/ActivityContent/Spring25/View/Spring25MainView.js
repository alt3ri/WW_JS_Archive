"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25MainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../../Ui/Common/PopupCaptionItem"),
  ActivitySpring25Controller_1 = require("../Controller/ActivitySpring25Controller");
class Spring25MainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this._kl = new Map()),
      (this.mcr = void 0),
      (this.lqe = void 0),
      (this.k5l = !1),
      (this.ukl = () => {
        this.k5l ||
          ((this.k5l = !0),
          ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleInviteClickInMainView());
      }),
      (this.ckl = () => {
        this.k5l ||
          ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleGiftClickInMainView();
      }),
      (this.mkl = () => {
        this.k5l ||
          ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleLetterClickInMainView();
      }),
      (this.dkl = () => {
        this.k5l || this.CloseMe();
      }),
      (this.Ckl = () => {
        ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleHelpClick();
      }),
      (this.gkl = () => {
        (this.OpenParam =
          ModelManager_1.ModelManager.Spring25Model.BuildMainViewData()),
          this.skl();
      }),
      (this.fWl = () => {
        (this.OpenParam =
          ModelManager_1.ModelManager.Spring25Model.BuildMainViewData(!0)),
          this.skl();
      }),
      (this.r5l = (e) => {
        "Spring25EnvelopeView" === e &&
          ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleTryOpenShareViewAsync();
      }),
      (this.G5l = () => {
        this.k5l = !1;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.ukl],
        [3, this.ckl],
        [4, this.mkl],
      ]);
  }
  async OnBeforeStartAsync() {
    var e = new ItemInMain(),
      t = new ItemInMain(),
      i = new ItemInMain(),
      n = new ItemInMain(),
      r = new ItemInMain(),
      s = new ItemInMain(),
      o = new ItemInMain(),
      h =
        ((this.mcr = new ItemInMain()),
        ModelManager_1.ModelManager.PlayerInfoModel?.GetPlayerGender()),
      a = 1 === h ? 7 : 8,
      h = (this.GetItem(1 === h ? 8 : 7)?.SetUIActive(!1), this.GetItem(a));
    h.SetUIActive(!0),
      await Promise.all([
        e.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
        t.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
        i.CreateThenShowByActorAsync(this.GetItem(9).GetOwner()),
        n.CreateThenShowByActorAsync(this.GetItem(10).GetOwner()),
        r.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()),
        s.CreateThenShowByActorAsync(this.GetItem(12).GetOwner()),
        o.CreateThenShowByActorAsync(this.GetItem(13).GetOwner()),
        this.mcr.CreateThenShowByActorAsync(h.GetOwner()),
      ]),
      this._kl.set(4, e),
      this._kl.set(1, t),
      this._kl.set(7, i),
      this._kl.set(6, n),
      this._kl.set(3, r),
      this._kl.set(5, s),
      this._kl.set(2, o),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.dkl),
      this.lqe.SetHelpCallBack(this.Ckl);
  }
  OnStart() {
    this.skl(),
      RedDotController_1.RedDotController.BindRedDot(
        "Spring25AllLetter",
        this.GetItem(15),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "Spring25Reward",
        this.GetItem(14),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "Spring25Invite",
        this.GetItem(16),
      ),
      this.mcr.RefreshByInvitedAsync(
        !ModelManager_1.ModelManager.Spring25Model.NeedStartDialog,
      );
  }
  OnBeforeDestroy() {
    ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleResetCurrentSignId(),
      RedDotController_1.RedDotController.UnBindRedDot("Spring25AllLetter"),
      RedDotController_1.RedDotController.UnBindRedDot("Spring25Reward"),
      RedDotController_1.RedDotController.UnBindRedDot("Spring25Invite");
  }
  OnBeforeShow() {
    RedDotController_1.RedDotController.BindRedDot(
      "Spring25AllLetter",
      this.GetItem(15),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "Spring25Reward",
        this.GetItem(14),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "Spring25Invite",
        this.GetItem(16),
      );
  }
  OnAfterHide() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "Spring25AllLetter",
      this.GetItem(15),
    ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "Spring25Reward",
        this.GetItem(14),
      ),
      RedDotController_1.RedDotController.UnBindGivenUi(
        "Spring25Invite",
        this.GetItem(16),
      );
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.Spring25InviteDone,
      this.gkl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.Spring25ActivityParseDone,
        this.fWl,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.r5l,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.Spring25UnlockAnimDone,
        this.G5l,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.Spring25InviteDone,
      this.gkl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.Spring25ActivityParseDone,
        this.fWl,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.r5l,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.Spring25UnlockAnimDone,
        this.G5l,
      );
  }
  OnAfterPlayStartSequence() {
    this.t8l();
  }
  async t8l() {
    ModelManager_1.ModelManager.Spring25Model.NeedStartDialog &&
      ((this.k5l = !0),
      await this.mcr.RefreshByInvitedAsync(!0, !0),
      ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleOpenOpeningDialogViewInMainView(),
      (this.k5l = !1));
  }
  skl() {
    var e = this.OpenParam;
    if (e.CharacterInvitedMap.size !== this._kl.size) {
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Spring25",
          64,
          "春节活动角色信息和UI节点不符，隐藏全部节点",
          ["data count", e.CharacterInvitedMap.size],
          ["item count", this._kl.size],
        );
      for (var [, t] of this._kl) t.SetUiActive(!1);
    } else {
      for (var [i, n] of e.CharacterInvitedMap)
        this._kl.get(i)?.RefreshByInvitedAsync(n, i === e.NewRoleType);
      this.lqe.SetTitleByTextIdAndArgNew(e.TitleTextId),
        this.GetText(1)?.SetText(e.InviteRemainCount);
    }
  }
}
exports.Spring25MainView = Spring25MainView;
class ItemInMain extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ujr = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync(),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.GetRootItem()));
  }
  async RefreshByInvitedAsync(e, t = !1) {
    this.GetTexture(0)?.SetUIActive(!e),
      this.GetTexture(1)?.SetUIActive(e),
      t && (await this.sFl());
  }
  async sFl() {
    await this.ujr.LitePlayAsync("Unlock"),
      ActivitySpring25Controller_1.ActivitySpring25Controller.Instance.HandleWhenUnlockAnimEnd(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.Spring25UnlockAnimDone,
      );
  }
}
//# sourceMappingURL=Spring25MainView.js.map
