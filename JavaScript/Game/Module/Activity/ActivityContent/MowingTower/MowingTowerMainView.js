"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingTowerMainView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem"),
  QuickRoleSelectView_1 = require("../../../RoleSelect/QuickRoleSelectView"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew"),
  MowingTowerController_1 = require("./MowingTowerController"),
  MowingTowerData_1 = require("./MowingTowerData"),
  MowingTowerMainLevelItem_1 = require("./MowingTowerMainLevelItem"),
  ROLE_TEAM_SIZE = 3;
class MowingTowerMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.bLl = void 0),
      (this.aSn = void 0),
      (this.qLl = 0),
      (this.lqe = void 0),
      (this.SUl = void 0),
      (this.kLl = void 0),
      (this.OLl = void 0),
      (this.NLl = void 0),
      (this.SPe = void 0),
      (this.$Sn = () => {
        var e = this.aSn.GetIfLevelTooLow();
        this.GetItem(20).SetUIActive(e);
      }),
      (this.Xho = () => {
        this.QSn();
      }),
      (this.oWi = () => {
        return new MowingTowerMainLevelItem_1.MowingTowerMainLevelItem();
      }),
      (this.FLl = (e) => {
        (this.qLl = e), this.R5e();
      }),
      (this.VLl = () => {
        UiManager_1.UiManager.IsViewOpen("MowingTowerRewardView") ||
          UiManager_1.UiManager.OpenView("MowingTowerRewardView");
      }),
      (this.HLl = () => {
        var e = this.aSn?.GetCurrentTeamMembers() ?? [[], []];
        e[0].length !== ROLE_TEAM_SIZE ||
        e[1].length !== ROLE_TEAM_SIZE ||
        e[0].includes(0) ||
        e[1].includes(0)
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "MowingTowerNeedThreeRole",
            )
          : MowingTowerController_1.MowingTowerController.RequestStartMowingTowerByTeamData(
              this.aSn,
            );
      }),
      (this.yUl = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          this.aSn?.GetCurrentSelectLevel()?.GetInstanceDungeonId(),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIScrollViewWithScrollbarComponent],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
      [15, UE.UIText],
      [16, UE.UIText],
      [17, UE.UIItem],
      [18, UE.UIItem],
      [19, UE.UIItem],
      [20, UE.UIItem],
      [21, UE.UIButtonComponent],
      [22, UE.UIItem],
      [23, UE.UIButtonComponent],
      [24, UE.UIText],
      [25, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.VLl],
        [21, this.HLl],
        [23, this.yUl],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ChangeMowingTowerMainView,
      this.FLl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChangeMowingTowerBuff,
        this.Xho,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ChangeMowingTowerMainView,
      this.FLl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChangeMowingTowerBuff,
        this.Xho,
      );
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      (this.SUl = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(3),
        this.oWi,
      )),
      (this.kLl = new BuffEntry()),
      await this.kLl.CreateThenShowByActorAsync(this.GetItem(17).GetOwner()),
      (this.OLl = new TeamListItem()),
      (this.NLl = new TeamListItem()),
      await this.OLl.CreateThenShowByActorAsync(this.GetItem(18).GetOwner()),
      await this.NLl.CreateThenShowByActorAsync(this.GetItem(19).GetOwner()),
      this.OLl.BindRefreshLowLevelTips(this.$Sn),
      this.NLl.BindRefreshLowLevelTips(this.$Sn);
  }
  OnStart() {
    ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId =
      this.OpenParam;
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ModelManager_1.ModelManager.MowingTowerModel.CurrentSelectActivityId,
    );
    (this.bLl = e),
      this.lqe.SetCloseCallBack(() => {
        if (0 === this.qLl)
          return ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? void ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon()
            : void this.CloseMe();
        (this.qLl = 0), this.SPe?.PlaySequencePurely("SwitchOut"), this.R5e();
      }),
      (this.qLl = 0),
      this.R5e(!0);
  }
  OnBeforeShow() {
    1 === this.qLl && this.QSn(),
      RedDotController_1.RedDotController.BindRedDot(
        "MowingTowerReward",
        this.GetItem(25),
        void 0,
        this.bLl.Id,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshMowingTowerRewardRedDot,
        this.bLl.Id,
      );
  }
  OnBeforeHide() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "MowingTowerReward",
      this.GetItem(25),
      this.bLl.Id,
    );
  }
  jLl(e = 0) {
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerSelectViewTitle"),
      this.SUl?.RefreshByData(
        this.bLl.GetMowingTowerLevelDetailInfo(),
        () => {},
      ),
      this.GetText(2)?.SetText("" + this.bLl.GetFullScore());
  }
  WLl() {
    this.lqe.SetTitleByTextIdAndArgNew("MowingTowerLevelViewTitle"),
      (this.aSn = ModelManager_1.ModelManager.MowingTowerModel.CurrentTeamInfo),
      this.OLl?.RefreshTeamRole(this.aSn, 0),
      this.NLl?.RefreshTeamRole(this.aSn, 1);
    var e = this.aSn.GetCurrentSelectLevel();
    this.QLl(e), this.KLl(e), this.EUl(e), this.QSn(), this.$Sn();
  }
  KLl(e) {
    this.SetTextureByPath(e.GetNormalTexturePath(), this.GetTexture(6));
    var i = e.GetIsInfinite();
    e.GetId() % 2 == 0 || i
      ? (this.GetItem(7)?.SetUIActive(!1), this.GetItem(8)?.SetUIActive(!0))
      : (this.GetItem(7)?.SetUIActive(!0), this.GetItem(8)?.SetUIActive(!1)),
      i
        ? (this.GetItem(9)?.SetColor(
            MowingTowerData_1.bgInfiniteMowingTowerColor,
          ),
          this.GetText(10)?.SetColor(
            MowingTowerData_1.infiniteMowingTowerColor,
          ),
          this.GetItem(7)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor),
          this.GetItem(8)?.SetColor(MowingTowerData_1.infiniteMowingTowerColor))
        : (this.GetItem(9)?.SetColor(
            MowingTowerData_1.bgNormalMowingTowerColor,
          ),
          this.GetText(10)?.SetColor(MowingTowerData_1.normalMowingTowerColor),
          this.GetItem(7)?.SetColor(MowingTowerData_1.normalMowingTowerColor),
          this.GetItem(8)?.SetColor(MowingTowerData_1.normalMowingTowerColor));
  }
  QLl(e) {
    var i = e.GetScore(),
      t = 0 < i,
      s = this.GetText(12);
    s.SetUIActive(t),
      s.SetText(i.toString()),
      this.GetItem(13).SetUIActive(!t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(10), e.GetLevelDesc()),
      this.GetText(14)?.SetText("" + e.GetFirstScore()),
      this.GetText(15)?.SetText("" + e.GetLowScore()),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(16),
        "" + e.GetLevelTips(),
      );
  }
  QSn() {
    var e = this.aSn.GetPrepareSelectBuff();
    this.kLl?.Refresh(e[0]);
  }
  EUl(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(24),
      "MowingTowerMonsterTimes",
      e.GetConfig()?.MonsterDes,
    );
  }
  R5e(e = !1) {
    0 === this.qLl &&
      (this.GetItem(5)?.SetUIActive(!0),
      this.GetItem(22)?.SetUIActive(!1),
      this.jLl(e)),
      1 === this.qLl &&
        (this.SPe?.PlaySequencePurely("SwitchIn"),
        this.GetItem(5)?.SetUIActive(!1),
        this.GetItem(22)?.SetUIActive(!0),
        this.WLl());
  }
}
exports.MowingTowerMainView = MowingTowerMainView;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SlotIndex = 0),
      (this.tyn = void 0),
      (this.iyn = () => {
        UiManager_1.UiManager.OpenView("MowingTowerBuffView");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.iyn],
        [7, this.iyn],
      ]);
  }
  Refresh(e) {
    (this.tyn = e),
      this.GetButton(0)?.SetSelectionState(0),
      this.GetButton(0)?.SetSelfInteractive(!0),
      this.oyn(),
      this.ryn(),
      this.bbn(),
      this.qfo(),
      this.Kqn();
  }
  Kqn() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(3),
      "BossRushBuffSelectTips",
    );
  }
  bbn() {
    this.GetItem(8).SetUIActive(!1);
  }
  qfo() {
    this.GetItem(7).SetUIActive(0 !== this.tyn.BuffId);
  }
  oyn() {
    this.GetItem(1).SetUIActive(0 === this.tyn.BuffId),
      this.GetItem(2).SetUIActive(0 !== this.tyn.BuffId);
  }
  ryn() {
    0 !== this.tyn.BuffId && (this.nyn(), this.syn(), this.gSn());
  }
  gSn() {
    var e =
      ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
        this.tyn.BuffId,
      ).Texture;
    this.SetTextureByPath(e, this.GetTexture(4));
  }
  syn() {
    var e =
        ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
          this.tyn.BuffId,
        ),
      i = [];
    for (const s of e.DescriptionParam) {
      var t = RegExp(/\[(.*?)\]/g).exec(s);
      t && 1 < t.length && i.push(...t[1].split(","));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Description, ...i);
  }
  nyn() {
    var e =
      ConfigManager_1.ConfigManager.MowingTowerConfig.GetMowingTowerBuffById(
        this.tyn.BuffId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
  }
}
class TeamData {
  constructor() {
    (this.RoleId = 0),
      (this.TeamInfo = void 0),
      (this.BelongTo = 0),
      (this.OnSelectRole = void 0);
  }
}
class TeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.ayn = new TeamData());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UITexture],
    ];
  }
  Refresh(e, i, t) {
    (this.ayn = e), this.Zke();
  }
  Zke() {
    var e;
    0 === this.ayn.RoleId
      ? this.GetTexture(2).SetUIActive(!1)
      : (this.GetTexture(2).SetUIActive(!0),
        (e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          this.ayn.RoleId,
        )),
        this.SetRoleIcon(
          e.RoleHeadIconCircle,
          this.GetTexture(2),
          this.ayn.RoleId,
        ));
  }
}
class TeamListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.aSn = void 0),
      (this.XLl = 0),
      (this.NSn = void 0),
      (this.OSn = void 0),
      (this.kSn = []),
      (this.jSn = void 0),
      (this.$Sn = void 0),
      (this.nqe = () => {
        UiManager_1.UiManager.IsViewShow("QuickRoleSelectView") ||
          UiManager_1.UiManager.OpenView("QuickRoleSelectView", this.D5t());
      }),
      (this.X4t = (i) => {
        for (let e = 0; e < ROLE_TEAM_SIZE; e++)
          this.aSn.SetIndexTeamMembers(this.XLl, e, 0);
        for (let e = 0; e < i.length; e++) {
          var t = i[e];
          this.aSn.SetIndexTeamMembers(this.XLl, e, t);
        }
        this.aSn.ReSortTeamMembers(this.XLl), this.XSn();
      }),
      (this.KSn = () => new TeamRoleItem()),
      (this.XSn = () => {
        this.$Sn?.(), this.RefreshTeamRole(this.aSn, this.XLl);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.nqe]]);
  }
  D5t() {
    var e = this.aSn.LevelInfo?.GetInstanceDungeonConfig(
        this.XLl,
      ).FightFormationId,
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e,
        ),
      i = [];
    for (const h of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      0 !== h.GetRoleId() && i.push(h);
    for (const o of e.TrialRole) {
      var t =
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
            o,
          ),
        t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(t.Id);
      i.push(t);
    }
    var e = this.aSn.GetCurrentTeamMembers(),
      s = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, e[this.XLl], i),
      e =
        ((ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea =
          this.XLl),
        (ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList =
          e[1 - this.XLl]),
        (ModelManager_1.ModelManager.MowingTowerModel.AddLevel =
          this.aSn.LevelInfo?.GetConfig()?.MowTowerLevel ?? [-1, -1]),
        (s.OnHideFinish = () => {
          (ModelManager_1.ModelManager.MowingTowerModel.CurrentOptionArea = -1),
            (ModelManager_1.ModelManager.MowingTowerModel.OtherHalfAreaRoleList =
              []),
            (ModelManager_1.ModelManager.MowingTowerModel.AddLevel = [-1, -1]);
        }),
        (s.OnConfirm = this.X4t),
        e[this.XLl]),
      r = [];
    for (const n of e) 0 !== n && r.push(n);
    return (
      (s.SelectedRoleList = r),
      ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(
        this.aSn.LevelInfo?.GetInstanceDungeonConfig(this.XLl).Id,
      ),
      s
    );
  }
  async OnBeforeStartAsync() {
    (this.NSn = new CommonSelectItem_1.CommonElementItem()),
      (this.OSn = new CommonSelectItem_1.CommonElementItem()),
      await this.NSn.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.NSn.SetActive(!0),
      await this.OSn.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.OSn.SetActive(!0),
      this.kSn.push(this.NSn),
      this.kSn.push(this.OSn),
      (this.jSn = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.KSn,
      ));
  }
  RefreshTeamRole(i, t) {
    (this.aSn = i), (this.XLl = t);
    var e = i.GetCurrentTeamMembers()[t],
      s = [];
    for (
      s.push(
        ...e.map((e) => ({
          RoleId: e,
          TeamInfo: i,
          BelongTo: t,
          OnSelectRole: this.XSn,
        })),
      );
      s.length < 3;

    )
      s.push({ RoleId: 0, TeamInfo: i, BelongTo: t, OnSelectRole: this.XSn });
    this.jSn.RefreshByData(s), this.JSn(), this.Olt();
  }
  JSn() {
    this.kSn.forEach((e) => {
      e.SetActive(!1);
    });
    var i = this.aSn
      .GetCurrentSelectLevel()
      .GetRecommendElementIdArray(this.XLl);
    for (let e = 0; e < i.length; e++)
      0 !== i[e] &&
        (this.kSn[e].SetActive(!0), this.kSn[e].Refresh(i[e], !1, e));
    var e =
      0 < i.length
        ? "BossRushRecommendElement"
        : "BossRushRecommendElementNone";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
  }
  Olt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "BossRushRecommendLevel",
      this.aSn.GetRecommendLevel().toString(),
    );
  }
  BindRefreshLowLevelTips(e) {
    this.$Sn = e;
  }
}
//# sourceMappingURL=MowingTowerMainView.js.map
