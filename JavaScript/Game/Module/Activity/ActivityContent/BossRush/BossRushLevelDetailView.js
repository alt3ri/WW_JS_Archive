"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffEntry =
    exports.BossRushTeamRoleItem =
    exports.TeamItem =
    exports.BossRushLevelDetailView =
      void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem"),
  MultiTeamRoleSelectView_1 = require("../../../RoleSelect/MultiTeamRoleSelectView"),
  TeamRoleSelectView_1 = require("../../../RoleSelect/TeamRoleSelectView"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BossRushController_1 = require("./BossRushController");
class BossRushLevelDetailView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.aSn = void 0),
      (this.d8t = void 0),
      (this.FSn = void 0),
      (this.SPe = void 0),
      (this.HSn = []),
      (this.pcr = () => {
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
          this.aSn.GetCurrentSelectLevel().GetInstanceDungeonId()),
          UiManager_1.UiManager.OpenView(
            "InstanceDungeonMonsterPreView",
            this.aSn?.GetCurrentSelectLevel()?.GetInstanceDungeonId(),
          );
      }),
      (this.sOt = () => {
        var e = this.aSn.LevelInfo.GetInstanceDungeonFormationNumb();
        let t = 0;
        this.aSn?.GetCurrentTeamMembers().forEach((e) => {
          0 !== e && t++;
        }),
          0 === e
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "BossRushAtlestOneRole",
              )
            : e > t
              ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  188,
                )).FunctionMap.set(2, () => {
                  BossRushController_1.BossRushController.RequestStartBossRushByTeamData(
                    this.aSn,
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                ))
              : BossRushController_1.BossRushController.RequestStartBossRushByTeamData(
                  this.aSn,
                );
      }),
      (this.Xho = () => {
        this.QSn();
      }),
      (this.Ylo = () => {
        this.XSn();
      }),
      (this.XSn = () => {
        this.$Sn(), this.YSn();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [1, this.pcr],
        [7, this.sOt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.d8t = new TeamItem()),
      this.d8t.BindOnSelectRoleCall(() => {
        this.XSn();
      }),
      await this.d8t.CreateByActorAsync(this.GetItem(5).GetOwner()),
      this.d8t.SetActive(!0),
      (this.FSn = new BuffEntry()),
      await this.FSn.CreateByActorAsync(this.GetItem(4).GetOwner()),
      this.HSn.push(this.FSn);
    for (const e of this.HSn)
      (e.SlotIndex = this.HSn.indexOf(e) + 1), e.SetActive(!0);
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  ROn() {
    let e = "Start";
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
      (e = "ShowView"),
      this.SPe?.PlaySequencePurely(e),
      (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeBossRushBuff,
      this.Xho,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleChangeEnd,
        this.Ylo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeBossRushBuff,
      this.Xho,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnRoleChangeEnd,
        this.Ylo,
      );
  }
  OnBeforeShow() {
    this.aSn = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo;
    for (const e of this.aSn.GetCurrentTeamMembers())
      if (
        ModelManager_1.ModelManager.RoleModel.IsMainRole(e) &&
        !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)
      ) {
        this.aSn.ClearTeamInfo();
        break;
      }
    this.ROn(),
      this.zSn(),
      this.eyn(),
      this.l3e(),
      this.$Sn(),
      this.G8t(),
      this.QSn();
  }
  $Sn() {
    var e = this.aSn.GetIfLevelTooLow();
    this.GetText(6).SetUIActive(e);
  }
  zSn() {
    var e = this.aSn.GetCurrentSelectLevel();
    this.SetTextureByPath(
      e.GetBigMonsterTexturePath(),
      this.GetTexture(0),
      "BossRushMainView",
    ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetLevelDesc());
  }
  eyn() {
    var e = this.aSn?.GetCurrentSelectLevel()?.GetConfig()?.BossCount;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "BossRushNumTips", e);
  }
  l3e() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId,
      )
        .GetBossRushLevelDetailInfoById(
          this.aSn.GetCurrentSelectLevel().GetInstanceDungeonId(),
        )
        ?.GetScore(),
      t = this.GetText(8);
    e && 0 < e
      ? (t?.SetUIActive(!0),
        t?.SetText("" + e),
        this.GetItem(9)?.SetUIActive(!1))
      : (t?.SetUIActive(!1), this.GetItem(9)?.SetUIActive(!0));
  }
  G8t() {
    this.d8t.Refresh(this.aSn);
  }
  YSn() {
    this.d8t.RefreshTeamRole(this.aSn);
  }
  QSn() {
    var t =
      0 === ModelManager_1.ModelManager.BossRushModel.CurrentSelectBuffTabName
        ? this.aSn.GetPrepareSelectBuff()
        : this.aSn.GetPrepareSelectScoreBuff();
    for (let e = 0; e < t.length; e++)
      e < this.HSn.length && this.HSn[e].Refresh(t[e]);
  }
}
exports.BossRushLevelDetailView = BossRushLevelDetailView;
class TeamItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.NSn = void 0),
      (this.OSn = void 0),
      (this.kSn = []),
      (this.wB_ = () => {}),
      (this.CurrentTeamData = void 0),
      (this.jSn = void 0),
      (this.nqe = () => {
        UiManager_1.UiManager.OpenView("MultiTeamRoleSelectView", this.RB_());
      }),
      (this.nG_ = (e, i) => {
        if (!i.includes(e)) {
          var s =
            this.CurrentTeamData.LevelInfo?.GetInstanceDungeonConfig()
              .FightFormationId;
          let t = e;
          for (const h of ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
            s,
          ).TrialRole) {
            var r =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
                h,
              );
            if (r?.Id === e) {
              t = r.ParentId;
              break;
            }
          }
          if (t !== e && i.includes(t))
            return (
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                "BossRushSameFormation",
              ),
              !1
            );
          for (const a of i) {
            let e = a;
            var o =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
                a,
              );
            if ((e = o ? o.ParentId : e) === t)
              return (
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "BossRushSameFormation",
                ),
                !1
              );
          }
        }
        return !0;
      }),
      (this.KSn = () => new BossRushTeamRoleItem()),
      (this.XSn = () => {
        this.wB_();
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
  RB_() {
    var e,
      t = [];
    for (const a of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      0 !== a.GetRoleId() &&
        ((e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(
          a,
          !1,
          !1,
        )),
        t.push(e));
    var i = [],
      s =
        this.CurrentTeamData.LevelInfo?.GetInstanceDungeonConfig()
          .FightFormationId;
    for (const n of ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
      s,
    ).TrialRole) {
      var r =
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
            n,
          ),
        r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r.Id);
      r &&
        i.push(
          MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(r, !1, !1),
        );
    }
    var s = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase(
        "BossRushNormalRole",
        t,
      ),
      o = new Array(),
      h =
        (0 < i.length &&
          ((h = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase(
            "BossRushTrailRole",
            i,
          )),
          o.push(h)),
        o.push(s),
        MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(
          5,
          3,
          this.CurrentTeamData.GetCurrentTeamMembers(),
          void 0,
          void 0,
          (t) => {
            for (let e = 0; e < t.length; e++) {
              var i = t[e];
              this.CurrentTeamData.SetIndexTeamMembers(e, i);
            }
            this.CurrentTeamData.ReSortTeamMembers(),
              this.Refresh(this.CurrentTeamData),
              this.wB_();
          },
          void 0,
          o,
        ));
    return (h.IfCanSelectCheck = this.nG_), h;
  }
  BindOnSelectRoleCall(e) {
    this.wB_ = e;
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
  Refresh(e) {
    (this.CurrentTeamData = e),
      this.ZSn(e),
      this.JSn(e),
      this.RefreshTeamRole(e),
      this.sDn(e);
  }
  sDn(e) {
    e =
      0 < e.GetCurrentSelectLevel().GetRecommendElementIdArray().length
        ? "BossRushRecommendElement"
        : "BossRushRecommendElementNone";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e);
  }
  ZSn(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      "BossRushRecommendLevel",
      e.GetRecommendLevel().toString(),
    );
  }
  JSn(e) {
    this.kSn.forEach((e) => {
      e.SetActive(!1);
    });
    var t = e.GetCurrentSelectLevel().GetRecommendElementIdArray();
    for (let e = 0; e < t.length; e++)
      0 !== t[e] &&
        (this.kSn[e].SetActive(!0), this.kSn[e].Refresh(t[e], !1, e));
  }
  RefreshTeamRole(t) {
    var e = t.GetCurrentTeamMembers(),
      i = [];
    for (
      i.push(
        ...e.map((e) => ({ RoleId: e, TeamInfo: t, OnSelectRole: this.XSn })),
      );
      i.length < 3;

    )
      i.push({ RoleId: 0, TeamInfo: t, OnSelectRole: this.XSn });
    this.jSn.RefreshByData(i);
  }
}
exports.TeamItem = TeamItem;
class BossRushTeamData {
  constructor() {
    (this.RoleId = 0), (this.TeamInfo = void 0), (this.OnSelectRole = void 0);
  }
}
class BossRushTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ayn = new BossRushTeamData()),
      (this.OnClickButton = () => {
        UiManager_1.UiManager.IsViewShow("TeamRoleSelectView") ||
          UiManager_1.UiManager.OpenView("TeamRoleSelectView", this.D5t());
      }),
      (this.Q4t = (t) => {
        var e, i;
        if (t)
          return (
            (e = this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex]),
            (i = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(
              (e) => e === t,
            )),
            0 === e && -1 === i
              ? "JoinText"
              : e === t
                ? "GoDownText"
                : "ChangeText"
          );
      }),
      (this.v4t = (t) =>
        -1 ===
        this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex((e) => e === t)),
      (this.aDn = (t) => {
        if (this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex] === t)
          return !0;
        var e = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(
          (e) => e === t,
        );
        if (-1 !== e && e !== this.GridIndex) return !0;
        (e =
          this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig()
            .FightFormationId),
          (e =
            ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
              e,
            ));
        let i = t,
          s = !0;
        for (const a of e.TrialRole) {
          var r =
            ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
              a,
            );
          if (r?.Id === t) {
            i = r.ParentId;
            break;
          }
        }
        var o = this.ayn.TeamInfo.GetCurrentTeamMembers();
        for (let e = 0; e < o.length; e++) {
          var h = o[e];
          if (0 !== h && e !== this.GridIndex) {
            let e = h;
            h =
              ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
                h,
              );
            if ((e = h ? h.ParentId : e) === i) {
              (s = !1),
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "BossRushSameFormation",
                );
              break;
            }
          }
        }
        return s;
      }),
      (this.X4t = (t) => {
        var e = this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex],
          i = this.ayn.TeamInfo.GetCurrentTeamMembers().findIndex(
            (e) => e === t,
          );
        0 === e && -1 === i
          ? this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, t)
          : e === t
            ? this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, 0)
            : (this.ayn.TeamInfo.SetIndexTeamMembers(i, e),
              this.ayn.TeamInfo.SetIndexTeamMembers(this.GridIndex, t)),
          this.ayn.TeamInfo.ReSortTeamMembers(),
          this.ayn.OnSelectRole();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UITexture],
    ];
  }
  D5t() {
    var e =
        this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig()
          .FightFormationId,
      e =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          e,
        ),
      t = [];
    for (const o of ModelManager_1.ModelManager.RoleModel.GetRoleList())
      0 !== o.GetRoleId() && t.push(o);
    for (const h of e.TrialRole) {
      var i =
          ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
            h,
          ),
        i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.Id);
      t.push(i);
    }
    var e =
        this.ayn.TeamInfo.GetCurrentTeamMembers().length > this.GridIndex
          ? this.ayn.TeamInfo.GetCurrentTeamMembers()[this.GridIndex]
          : 0,
      e = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        5,
        e,
        t,
        this.X4t,
        void 0,
        this.GridIndex + 1,
      ),
      s =
        ((e.CanConfirmFunc = this.aDn),
        (e.CanJoinTeam = this.v4t),
        e.SetGetConfirmButtonTextFunction(this.Q4t),
        this.ayn.TeamInfo.GetCurrentTeamMembers()),
      r = [];
    for (const a of s) 0 !== a && r.push(a);
    return (
      (e.FormationRoleList = r),
      ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(
        this.ayn.TeamInfo.LevelInfo?.GetInstanceDungeonConfig().Id,
      ),
      e
    );
  }
  Refresh(e, t, i) {
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
exports.BossRushTeamRoleItem = BossRushTeamRoleItem;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SlotIndex = 0),
      (this.tyn = void 0),
      (this.iyn = () => {
        this.tyn?.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BossRushLock",
            )
          : this.tyn?.State !==
              Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive &&
            ((ModelManager_1.ModelManager.BossRushModel.CurrentChangeBuffSlot =
              this.SlotIndex),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RequestChangeBossRushView,
              "BossRushBuffSelectView",
            ));
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
    (this.tyn = e).State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive
      ? this.GetButton(0)?.SetSelfInteractive(!1)
      : (this.GetButton(0)?.SetSelectionState(0),
        this.GetButton(0)?.SetSelfInteractive(!0)),
      this.oyn(),
      this.ryn(),
      this.bbn(),
      this.qfo(),
      this.Kqn();
  }
  Kqn() {
    let e = "";
    (e =
      this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked
        ? "BossRushLock"
        : this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffInactive
          ? "BossRushBuffDisableTips"
          : "BossRushBuffSelectTips"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
  }
  bbn() {
    this.GetItem(8).SetUIActive(
      this.tyn.State === Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked,
    );
  }
  qfo() {
    this.GetItem(7).SetUIActive(
      0 !== this.tyn.BuffId &&
        this.tyn.State !== Protocol_1.Aki.Protocol.Iks.Proto_BuffLocked,
    );
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
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
        this.tyn.BuffId,
      ).Texture;
    this.SetTextureByPath(e, this.GetTexture(4));
  }
  syn() {
    var e =
        ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
          this.tyn.BuffId,
        ),
      t = [];
    for (const s of e.DescriptionParam) {
      var i = RegExp(/\[(.*?)\]/g).exec(s);
      i && 1 < i.length && t.push(...i[1].split(","));
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Description, ...t);
  }
  nyn() {
    var e =
      ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffConfigById(
        this.tyn.BuffId,
      );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), e.Name);
  }
}
exports.BuffEntry = BuffEntry;
//# sourceMappingURL=BossRushLevelDetailView.js.map
