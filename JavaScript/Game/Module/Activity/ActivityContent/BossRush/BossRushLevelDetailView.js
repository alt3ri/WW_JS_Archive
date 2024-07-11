"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushTeamRoleItem = exports.BossRushLevelDetailView = void 0);
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
  DifficultUnlockTipView_1 = require("../../../InstanceDungeon/DifficultUnlockTipView"),
  CommonSelectItem_1 = require("../../../Roguelike/View/CommonSelectItem"),
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
      (this.NSn = void 0),
      (this.OSn = void 0),
      (this.kSn = []),
      (this.FSn = void 0),
      (this.VSn = void 0),
      (this.HSn = []),
      (this.SPe = void 0),
      (this.jSn = void 0),
      (this.WSn = () => {
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId =
          this.aSn.GetCurrentSelectLevel().GetInstanceDungeonId()),
          UiManager_1.UiManager.OpenView(
            "InstanceDungeonMonsterPreView",
            this.aSn?.GetCurrentSelectLevel()?.GetInstanceDungeonId(),
          );
      }),
      (this.KSn = () => new BossRushTeamRoleItem()),
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
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIButtonComponent],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [1, this.sOt],
        [11, this.WSn],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnChangeBossRushBuff,
      this.Xho,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeBossRushBuff,
      this.Xho,
    );
  }
  async OnBeforeStartAsync() {
    (this.NSn = new CommonSelectItem_1.CommonElementItem()),
      (this.OSn = new CommonSelectItem_1.CommonElementItem()),
      await this.NSn.CreateByActorAsync(this.GetItem(8).GetOwner()),
      this.NSn.SetActive(!0),
      await this.OSn.CreateByActorAsync(this.GetItem(9).GetOwner()),
      this.OSn.SetActive(!0),
      this.kSn.push(this.NSn),
      this.kSn.push(this.OSn),
      (this.FSn = new BuffEntry()),
      (this.VSn = new BuffEntry()),
      await this.FSn.CreateByActorAsync(this.GetItem(5).GetOwner()),
      await this.VSn.CreateByActorAsync(this.GetItem(6).GetOwner()),
      this.HSn.push(this.FSn),
      this.HSn.push(this.VSn);
    for (const e of this.HSn)
      (e.SlotIndex = this.HSn.indexOf(e) + 1), e.SetActive(!0);
    (this.jSn = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(10),
      this.KSn,
    )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnStart() {}
  OnBeforeShow() {
    (this.aSn = ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo),
      this.SOn(),
      this.$Sn(),
      this.JSn(),
      this.zSn(),
      this.QSn(),
      this.YSn(),
      this.ZSn(),
      this.eyn(),
      this.sDn();
  }
  OnAfterShow() {
    this.haa();
  }
  haa() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId,
    );
    e.GetNewBuffState() &&
      (e.CacheNewBuffUnlock(),
      ((e = new DifficultUnlockTipView_1.DifficultUnlockTipsData()).Text =
        "BossRushUnlockBuffTips"),
      UiManager_1.UiManager.OpenView("DifficultUnlockTipView", e));
  }
  SOn() {
    let e = "Start";
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
      (e = "ShowView"),
      this.SPe?.PlaySequencePurely(e),
      (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
  }
  eyn() {
    var e = this.aSn?.GetCurrentSelectLevel()?.GetConfig()?.BossCount;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), "BossRushNumTips", e);
  }
  sDn() {
    var e =
      0 < this.aSn.GetCurrentSelectLevel().GetRecommendElementIdArray().length
        ? "BossRushRecommendElement"
        : "BossRushRecommendElementNone";
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), e);
  }
  ZSn() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(7),
      "BossRushRecommendLevel",
      this.aSn.GetRecommendLevel().toString(),
    );
  }
  $Sn() {
    var e = this.aSn.GetIfLevelTooLow();
    this.GetText(2).SetUIActive(e);
  }
  JSn() {
    this.kSn.forEach((e) => {
      e.SetActive(!1);
    });
    var t = this.aSn.GetCurrentSelectLevel().GetRecommendElementIdArray();
    for (let e = 0; e < t.length; e++)
      0 !== t[e] &&
        (this.kSn[e].SetActive(!0), this.kSn[e].Refresh(t[e], !1, e));
  }
  zSn() {
    var e = this.aSn.GetCurrentSelectLevel();
    this.SetTextureByPath(
      e.GetBigMonsterTexturePath(),
      this.GetTexture(0),
      "BossRushMainView",
    ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.GetMonsterName());
  }
  QSn() {
    var t = this.aSn.GetPrepareSelectBuff();
    for (let e = 0; e < t.length; e++) this.HSn[e].Refresh(t[e]);
  }
  YSn() {
    var e = this.aSn.GetCurrentTeamMembers(),
      t = [];
    for (
      t.push(
        ...e.map((e) => ({
          RoleId: e,
          TeamInfo: this.aSn,
          OnSelectRole: this.XSn,
        })),
      );
      t.length < 3;

    )
      t.push({ RoleId: 0, TeamInfo: this.aSn, OnSelectRole: this.XSn });
    this.jSn.RefreshByData(t);
  }
}
exports.BossRushLevelDetailView = BossRushLevelDetailView;
class BuffEntry extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SlotIndex = 0),
      (this.tyn = void 0),
      (this.iyn = () => {
        this.tyn?.State === Protocol_1.Aki.Protocol.fks.cBs
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BossRushLock",
            )
          : this.tyn?.State !== Protocol_1.Aki.Protocol.fks.Proto_Inactive &&
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
    (this.tyn = e).State === Protocol_1.Aki.Protocol.fks.Proto_Inactive
      ? this.GetButton(0)?.SetSelfInteractive(!1)
      : (this.GetButton(0)?.SetSelectionState(0),
        this.GetButton(0)?.SetSelfInteractive(!0)),
      this.oyn(),
      this.ryn(),
      this.Lbn(),
      this.qfo(),
      this.Gqn();
  }
  Gqn() {
    let e = "";
    (e =
      this.tyn.State === Protocol_1.Aki.Protocol.fks.cBs
        ? "BossRushLock"
        : this.tyn.State === Protocol_1.Aki.Protocol.fks.Proto_Inactive
          ? "BossRushBuffDisableTips"
          : "BossRushBuffSelectTips"),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e);
  }
  Lbn() {
    this.GetItem(8).SetUIActive(
      this.tyn.State === Protocol_1.Aki.Protocol.fks.cBs,
    );
  }
  qfo() {
    this.GetItem(7).SetUIActive(
      0 !== this.tyn.BuffId &&
        this.tyn.State !== Protocol_1.Aki.Protocol.fks.cBs,
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
class BossRushTeamData {
  constructor() {
    (this.RoleId = 0), (this.TeamInfo = void 0), (this.OnSelectRole = void 0);
  }
}
class BossRushTeamRoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ayn = new BossRushTeamData()),
      (this.nqe = () => {
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
        for (const n of e.TrialRole) {
          var r =
            ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(
              n,
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
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.nqe]]);
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
    for (const n of s) 0 !== n && r.push(n);
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
//# sourceMappingURL=BossRushLevelDetailView.js.map
