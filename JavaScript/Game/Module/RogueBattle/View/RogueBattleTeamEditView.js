"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleTeamEditView = void 0);
const UE = require("ue"),
  UiResourceById_1 = require("../../../../Core/Define/ConfigQuery/UiResourceById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem"),
  EditFormationDefine_1 = require("../../EditFormation/EditFormationDefine"),
  QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView"),
  TeamRoleSelectView_1 = require("../../RoleSelect/TeamRoleSelectView"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RogueBattleTeamEditSlot_1 = require("../Component/RogueBattleTeamEditSlot"),
  RogueBattleTeamEditTab_1 = require("../Component/RogueBattleTeamEditTab"),
  MAX_FORMATION_NUM = 3;
class RogueBattleTeamEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.RoleSlotList = []),
      (this.TabComponent = void 0),
      (this.u5t = -1),
      (this.mc1 = !1),
      (this.g01 = void 0),
      (this.Hv1 = () => {
        var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(
          this.OpenParam,
        );
        e &&
          UiManager_1.UiManager.OpenView(
            "RogueBattleEnvironmentBuffView",
            e.Data.sr1?.Vy_,
          );
      }),
      (this.$v1 = () => {
        var e =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            this.TabComponent.GetSelectedIndex(),
          );
        e &&
          ((e = e.jo1),
          ControllerHolder_1.ControllerHolder.MapRogueController.OpenRogueFetterView(
            e,
          ));
      }),
      (this.L1i = () => {
        if (!this.mc1) {
          this.GetItem(10).SetUIActive(!0),
            this.g01?.PlaySequencePurely("Progressing");
          const t = this.OpenParam;
          var e = new UiAsyncTask_1.UiAsyncTask(
            "RogueBattleTeamEditView.OnClickBtnConfirm",
            async () => {
              (this.mc1 = !0),
                await ControllerHolder_1.ControllerHolder.RogueBattleController.SwitchFormationRequest(
                  this.TabComponent.GetSelectedIndex(),
                ),
                await ModelManager_1.ModelManager.SceneTeamModel.LoadTeamPromise
                  ?.Promise,
                ModelManager_1.ModelManager.BattleLinkModel.CheckInNewBattleLink() &&
                  (await ModelManager_1.ModelManager.BattleLinkModel.PreloadTeamRoleRes()
                    .Promise),
                ModelManager_1.ModelManager.MapRogueModel.ExecuteOpData(t);
            },
          );
          this.RunAsyncTask(e);
        }
      }),
      (this.yqe = (e) => {
        var t = EditFormationDefine_1.FORMATION_SPRITES[e],
          t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t),
          e = e + 1,
          i =
            ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
              "TeamText",
            ),
          t = new CommonTabData_1.CommonTabData(
            t,
            new CommonTabTitleData_1.CommonTabTitleData(i, e),
          );
        return (
          t.SetSmallIcon(
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
              "SP_TeamTitle",
            ),
          ),
          t
        );
      }),
      (this.UVc = (e) => {
        const i =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            e,
          );
        i &&
          this.RoleSlotList.forEach((e, t) => {
            t >= i.Q6n.length
              ? e.UpdateRoleInfo(0)
              : e.UpdateRoleInfo(i.Q6n[t]);
          }),
          this.Og();
      }),
      (this.so1 = () => {
        var e, t;
        UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView") ||
          ((t =
            ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
              this.TabComponent.GetSelectedIndex(),
            )),
          (e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleList()),
          ((t = new QuickRoleSelectView_1.QuickRoleSelectViewData(
            4,
            t.Q6n,
            e,
          )).OnConfirm = this.N4t),
          (t.CanConfirm = this.Pg1),
          UiManager_1.UiManager.OpenView("QuickRoleSelectView", t));
      }),
      (this.Pg1 = (e) => {
        if (0 === e.length)
          return (
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "RogueBattle_TeamEmpty_QuickSelect",
            ),
            !1
          );
        let t = !0;
        for (const i of e)
          if (0 !== i) {
            t = !1;
            break;
          }
        return !t;
      }),
      (this.N4t = (e) => {
        const i =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            this.TabComponent.GetSelectedIndex(),
          );
        (i.Q6n = e),
          ControllerHolder_1.ControllerHolder.RogueBattleController.ChangeFormationAllListRequest(
            this.TabComponent.GetSelectedIndex(),
          ).finally(() => {
            if (i) {
              let t = 0;
              for (let e = 0; e < i.Q6n.length; e++)
                0 !== i.Q6n[e] &&
                  (this.RoleSlotList[t].UpdateRoleInfo(i.Q6n[e]), t++);
              for (let e = t; e < this.RoleSlotList.length; e++)
                this.RoleSlotList[e].UpdateRoleInfo(0);
            }
            this.Og();
          });
      }),
      (this.ao1 = (e) => {
        UiManager_1.UiManager.OpenView("TeamRoleSelectView", this.D5t(e));
      }),
      (this.L01 = (e) => {
        e >= RoleDefine_1.ROBOT_DATA_MIN_ID
          ? RoleController_1.RoleController.OpenRoleMainView(1, 0, [e])
          : (e =
              ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
                e,
              )) &&
            RoleController_1.RoleController.OpenRoleMainView(1, 0, [
              e.TrialRoleId,
            ]);
      }),
      (this.Q4t = (e) => {
        var t =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            this.TabComponent.GetSelectedIndex(),
          );
        return t && t.Q6n[this.u5t] === e ? "GoDownText" : "JoinText";
      }),
      (this.S4t = (e) => {
        var t,
          i =
            ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
              this.TabComponent.GetSelectedIndex(),
            );
        return (
          !i ||
          !(
            (1 === (t = i.Q6n.filter((e) => 0 !== e)).length && t[0] === e) ||
            (i.Q6n.includes(e) && i.Q6n[this.u5t] !== e)
          )
        );
      }),
      (this.v4t = (e) => {
        var t =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            this.TabComponent.GetSelectedIndex(),
          );
        return !t || !t.Q6n.includes(e) || t.Q6n[this.u5t] === e;
      }),
      (this.X4t = (e) => {
        const i =
          ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
            this.TabComponent.GetSelectedIndex(),
          );
        ControllerHolder_1.ControllerHolder.RogueBattleController.ChangeFormationRequest(
          this.TabComponent.GetSelectedIndex(),
          this.u5t,
          e,
        ).finally(() => {
          if (i) {
            let t = 0;
            for (let e = 0; e < i.Q6n.length; e++)
              0 !== i.Q6n[e] &&
                (this.RoleSlotList[t].UpdateRoleInfo(i.Q6n[e]), t++);
            for (let e = t; e < this.RoleSlotList.length; e++)
              this.RoleSlotList[e].UpdateRoleInfo(0);
          }
          this.Og();
        });
      }),
      (this.y5t = () => {});
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UITexture],
      [12, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [3, this.L1i],
        [5, this.so1],
        [7, this.Hv1],
        [8, this.$v1],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.RoleSlotList = [
      new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(0),
      new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(1),
      new RogueBattleTeamEditSlot_1.RogueBattleTeamEditSlot(2),
    ]),
      this.RoleSlotList.forEach((e) => {
        e.OnClickCallBack = this.ao1;
      });
    var e = new CommonTabComponentData_1.CommonTabComponentData(
      () => new RogueBattleTeamEditTab_1.RogueBattleTeamEditTab(),
      this.UVc,
      this.yqe,
    );
    (this.TabComponent =
      new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
        this.GetItem(6),
        e,
        () => {
          this.CloseMe();
        },
      )),
      (this.g01 = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetItem(10),
      )),
      await Promise.all([
        this.RoleSlotList[0].CreateThenShowByActorAsync(
          this.GetItem(0).GetOwner(),
        ),
        this.RoleSlotList[1].CreateThenShowByActorAsync(
          this.GetItem(1).GetOwner(),
        ),
        this.RoleSlotList[2].CreateThenShowByActorAsync(
          this.GetItem(2).GetOwner(),
        ),
        this.TabComponent.RefreshTabItemByLengthAsync(MAX_FORMATION_NUM),
      ]),
      this.TabComponent.SelectToggleByIndex(0),
      this.TabComponent.SetCloseBtnShowState(!1);
  }
  OnBeforeDestroy() {
    this.g01?.StopPlayingSequence(), this.g01?.Clear(), (this.g01 = void 0);
  }
  D5t(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.GetRoleList(),
      i = this.TabComponent.GetSelectedIndex(),
      i =
        ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
          i,
        ),
      o = i?.Q6n[e],
      o = new TeamRoleSelectView_1.TeamRoleSelectViewData(
        5,
        o,
        t,
        this.X4t,
        this.y5t,
        e,
      );
    return (
      o.SetGetConfirmButtonEnableFunction(this.S4t),
      o.SetGetConfirmButtonTextFunction(this.Q4t),
      o.SetConfirmCheckFunction(this.S4t),
      (o.CanJoinTeam = this.v4t),
      (o.DetailCallback = this.L01),
      (o.FormationRoleList = i?.Q6n),
      (this.u5t = e),
      o
    );
  }
  Og() {
    this.Wv1(), this.M3e(), this.sR1();
  }
  sR1() {
    var e = ModelManager_1.ModelManager.MapRogueModel.GetOpData(this.OpenParam);
    e &&
      ((e =
        0 !==
          (e =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRoomPoolConfig(
              e.Data.sr1.Vy_,
            ))?.EnvDesc.length || 0 !== e?.MonsterDesc.length),
      this.GetButton(7).RootUIComp.SetUIActive(e));
  }
  M3e() {
    let e = !0;
    for (const t of (ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
      this.TabComponent.GetSelectedIndex(),
    )).Q6n)
      if (0 !== t) {
        e = !1;
        break;
      }
    this.GetButton(3).SetSelfInteractive(!e);
  }
  Wv1() {
    var e,
      t = ModelManager_1.ModelManager.RogueBattleModel?.GetFormationDataByIndex(
        this.TabComponent.GetSelectedIndex(),
      );
    t &&
      (0 === (t = t.jo1)
        ? (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(12),
            "RogueBattle_TeamEdit_LinkLock",
          ),
          (e = UiResourceById_1.configUiResourceById.GetConfig(
            "T_TeamRoleSkillNone",
          )),
          this.SetTextureShowUntilLoaded(e.Path, this.GetTexture(11)))
        : ((e =
            ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(t)),
          this.SetTextureShowUntilLoaded(e.Icon, this.GetTexture(11)),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(12),
            "RogueBattle_TeamEdit_LinkUnlock",
            ConfigManager_1.ConfigManager.TextConfig.GetMultiText(e.Name),
          )),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RogueTeamEditViewLinkBtnRefresh,
        0 !== t,
      ));
  }
}
exports.RogueBattleTeamEditView = RogueBattleTeamEditView;
//# sourceMappingURL=RogueBattleTeamEditView.js.map
