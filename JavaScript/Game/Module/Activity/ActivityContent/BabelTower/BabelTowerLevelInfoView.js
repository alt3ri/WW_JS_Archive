"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BabelTowerLevelInfoView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LoginDefine_1 = require("../../../Login/Data/LoginDefine"),
  MultiTeamRoleSelectView_1 = require("../../../RoleSelect/MultiTeamRoleSelectView"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  BabelTowerController_1 = require("./BabelTowerController"),
  BabelTowerLevelBuffItem_1 = require("./BabelTowerLevelBuffItem"),
  BabelTowerTeamItem_1 = require("./BabelTowerTeamItem"),
  ROLE_TEAM_SIZE = 3;
class BabelTowerLevelInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.b1c = void 0),
      (this.lqe = void 0),
      (this.L1c = void 0),
      (this.w1c = void 0),
      (this.d8t = void 0),
      (this.nqe = () => {
        UiManager_1.UiManager.IsViewShow("MultiTeamRoleSelectView") ||
          UiManager_1.UiManager.OpenView("MultiTeamRoleSelectView", this.D5t());
      }),
      (this.Ylo = () => {
        var t = ModelManager_1.ModelManager.RoleModel;
        let i = !1;
        for (let e = 0; e < this.b1c.RoleList.length; e++) {
          var r = this.b1c.RoleList[e];
          t.IsMainRole(r) && ((i = !0), (this.b1c.RoleList[e] = 0));
        }
        if (i) {
          var e = [];
          for (const o of this.b1c.RoleList) 0 !== o && e.push(o);
          for (; e.length < 3; ) e.push(0);
          this.b1c.RoleList = e;
        }
      }),
      (this.X4t = (t) => {
        for (let e = 0; e < ROLE_TEAM_SIZE; e++) this.b1c.RoleList[e] = 0;
        for (let e = 0; e < t.length; e++) {
          var i = t[e];
          this.b1c.RoleList[e] = i;
        }
        this.XSn();
      }),
      (this.R1c = (e) => {
        var t =
          BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(
            this.b1c.BabelTowerLevelId,
          ) ?? [];
        for (const r of e)
          if (0 !== r) {
            var i =
              ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
                r,
              ).WeaponType;
            if (0 < t.length && !t?.includes(i))
              return (
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
                  "BabelTowerDebuffRoleSelectionTips",
                ),
                !1
              );
          }
        return !0;
      }),
      (this.XSn = () => {
        this.$Sn(), this.RefreshTeamRole();
      }),
      (this.L3e = () => {
        BabelTowerController_1.BabelTowerController.BabelTowerStartRequest(
          this.b1c.InstanceId,
          this.b1c.RoleList,
          this.b1c.BabelTowerLevelId,
          this.b1c.BuffList,
        );
      }),
      (this.u1c = () => {
        UiManager_1.UiManager.OpenView(
          "InstanceDungeonMonsterPreView",
          this.b1c.InstanceId,
        );
      }),
      (this.zal = () => {
        var e =
            ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
              this.b1c.BabelTowerLevelId,
            ),
          t = e.IsDifficult,
          i = e.OptionalBabelBuff,
          r = [],
          o = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
        for (const l of i) {
          let e = 0;
          t &&
            (o.GetBuffIsLock(l)
              ? (e = 1)
              : 0 < (a = o.GetBuffIsUse(l)) &&
                a !== this.b1c.BabelTowerLevelId &&
                (e = 2));
          var a = { Id: l, State: e };
          r.push(a);
        }
        var s = [];
        for (const n of this.b1c.BuffList) s.push(n);
        i = {
          LevelId: this.b1c.BabelTowerLevelId,
          CurrentSelectBuffList: s,
          MaxSelectBuffCount: e.OptionalBabelBuffNum,
          AllBuffList: r,
          OnConfirmCallBack: this.A1c,
        };
        UiManager_1.UiManager.OpenView("BabelTowerBuffSelectView", i);
      }),
      (this.A1c = (e) => {
        (this.b1c.BuffList = e), this.tst();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UIArtText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [9, this.L3e],
        [1, this.u1c],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem()),
      await this.lqe.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.lqe.SetCloseCallBack(() => {
        this.CloseMe();
      }),
      (this.d8t = new BabelTowerTeamItem_1.BabelTowerTeamItem()),
      (this.d8t.OnClickBtnCallBack = this.nqe),
      await this.d8t.CreateByActorAsync(this.GetItem(7).GetOwner()),
      this.d8t.SetActive(!0),
      (this.L1c = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem()),
      await this.L1c.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.L1c.OnClickBtnCallBack = this.zal),
      (this.w1c = new BabelTowerLevelBuffItem_1.BabelTowerLevelBuffItem()),
      await this.w1c.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.w1c.OnClickBtnCallBack = this.zal);
  }
  OnStart() {
    (this.b1c = this.OpenParam),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnRoleChangeEnd,
        this.Ylo,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRoleChangeEnd,
      this.Ylo,
    );
  }
  OnBeforeShow() {
    for (let e = 0; e < this.b1c.RoleList.length; e++) {
      var t = this.b1c.RoleList[e];
      if (
        ModelManager_1.ModelManager.RoleModel.IsMainRole(t) &&
        !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t)
      ) {
        this.b1c.RoleList[e] = 0;
        break;
      }
    }
    this.Og();
  }
  D5t() {
    var e,
      t = this.b1c.InstanceId,
      i =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          t,
        )?.FightFormationId,
      i =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          i,
        ),
      r = ModelManager_1.ModelManager.RoleModel.GetRoleList(),
      o = [],
      a =
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(
          this.b1c.BabelTowerLevelId,
        ) ?? [];
    for (const _ of r)
      0 !== _.GetRoleId() &&
        ((e = _.GetRoleConfig().WeaponType),
        (e = MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(
          _,
          !1,
          !1,
          0 < a.length && !a.includes(e),
        )),
        o.push(e));
    var s = [],
      r = i?.TrialRole ?? [],
      i = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender(),
      l = [];
    for (const M of ConfigManager_1.ConfigManager.RoleConfig.GetMainRoleByGender(
      1 === i ? LoginDefine_1.ELoginSex.Boy : LoginDefine_1.ELoginSex.Girl,
    ))
      l.push(M.Id);
    for (const u of r) {
      var n =
        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleConfigByGroupId(u);
      (ModelManager_1.ModelManager.RoleModel.IsMainRole(n.ParentId) &&
        !l.includes(n.ParentId)) ||
        ((n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n.Id)) &&
          s.push(
            MultiTeamRoleSelectView_1.MultiTeamRoleGridData.Phrase(n, !1, !1),
          ));
    }
    var i = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase(
        "BossRushNormalRole",
        o,
      ),
      r = new Array(),
      h =
        (0 < s.length &&
          ((h = MultiTeamRoleSelectView_1.MultiTeamRoleData.Phrase(
            "BossRushTrailRole",
            s,
          )),
          r.push(h)),
        r.push(i),
        this.b1c.RoleList),
      f = [];
    for (const v of h) 0 !== v && f.push(v);
    i = MultiTeamRoleSelectView_1.MultiTeamRoleSelectData.Phrase(
      5,
      3,
      f,
      void 0,
      this.R1c,
      this.X4t,
      void 0,
      r,
    );
    return (
      ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(t), i
    );
  }
  $Sn() {
    var e = this.b1c.InstanceId,
      e = ModelManager_1.ModelManager.BabelTowerModel.GetIfLevelTooLow(
        e,
        this.b1c.RoleList,
      );
    this.GetItem(8).SetUIActive(e);
  }
  RefreshTeamRole() {
    var t =
        BabelTowerController_1.BabelTowerController.GetBabelTowerData().RoleLockData.get(
          this.b1c.BabelTowerLevelId,
        ) ?? [],
      i = this.b1c.RoleList;
    for (let e = 0; e < i.length; e++) {
      var r = i[e];
      0 !== r &&
        ((r =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(r).WeaponType),
        0 < t.length && !t?.includes(r)) &&
        (i[e] = 0);
    }
    var e = this.b1c.InstanceId;
    this.d8t.RefreshItem(i, e);
  }
  tst() {
    var e = this.b1c.BuffList,
      t = 0 < e?.length ? e[0] : 0,
      t =
        (this.L1c?.RefreshItem(this.b1c.BuffCount < 1, t),
        1 < e?.length ? e[1] : 0);
    this.w1c?.RefreshItem(this.b1c.BuffCount < 2, t);
  }
  aqe() {
    this.GetArtText(2).SetText(
      (this.b1c.StarNumber < 10 ? "0" : "") + this.b1c.StarNumber,
    );
    var e,
      t =
        ConfigManager_1.ConfigManager.BabelTowerConfig.GetBabelTowerLevelConfig(
          this.b1c.BabelTowerLevelId,
        ),
      t =
        ModelManager_1.ModelManager.BabelTowerModel.CalculateDifficultyConfigByStarNum(
          t.ActivityId,
          this.b1c.StarNumber,
        );
    t &&
      ((e = UE.Color.FromHex(t.TextBgColor)),
      this.GetItem(3).SetColor(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(4),
        t.DifficultyTextKey,
      ));
  }
  Og() {
    this.XSn(), this.tst(), this.aqe();
  }
}
exports.BabelTowerLevelInfoView = BabelTowerLevelInfoView;
//# sourceMappingURL=BabelTowerLevelInfoView.js.map
