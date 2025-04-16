"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeTabView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../RedDot/RedDotController"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  FormationDataController_1 = require("../../Abilities/FormationDataController"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  SkinController_1 = require("../../Skin/SkinController"),
  UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  MainRoleController_1 = require("../MainRoleController"),
  RoleController_1 = require("../RoleController"),
  RoleTagSmallIconItem_1 = require("../RoleTag/RoleTagSmallIconItem"),
  StarItem_1 = require("../View/StarItem");
class RoleAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.Ndo = 0),
      (this.Odo = void 0),
      (this.kdo = void 0),
      (this.RoleViewAgent = void 0),
      (this.RoleInstance = void 0),
      (this.AttributeItemList = []),
      (this.RoleSystemUiParams = void 0),
      (this.$be = void 0),
      (this.Klo = void 0),
      (this.DetailClick = () => {
        this.Fdo();
      }),
      (this.LevelUpClick = () => {
        RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(
          this.RoleInstance.GetRoleId(),
        );
      }),
      (this.BreakthroughClick = () => {
        RoleController_1.RoleController.SendRoleBreakThroughViewRequest(
          this.RoleInstance.GetRoleId(),
        );
      }),
      (this.RoleChangeClick = () => {
        ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById(
              "InstanceDungeonShieldViewCantOpen",
            )
          : UiManager_1.UiManager.OpenView(
              "RoleElementView",
              this.RoleViewAgent,
            );
      }),
      (this.RoleTagClick = () => {
        var e = this.RoleInstance.GetRoleConfig(),
          e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e);
        UiManager_1.UiManager.OpenView("RoleTagDetailView", e);
      }),
      (this.OnRoleSkinClick = () => {
        var e = this.RoleViewAgent.GetCurSelectRoleId();
        SkinController_1.SkinController.SkipToSkinView(
          e,
          "RoleSkinTabView",
          !1,
        );
      }),
      (this.TeachClick = () => {
        if (
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice01",
          );
        else if (
          FormationDataController_1.FormationDataController.GlobalIsInFight
        )
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice06",
          );
        else if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "RoleGuideNotice05",
          );
        else {
          const o = this.RoleViewAgent.GetCurSelectRoleId();
          var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o),
            t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
          const r = e.RoleGuide;
          0 === r
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "RoleGuideNotice02",
                t,
              )
            : ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
                  r,
                )
              ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "PhantomFormationEnterInstanceTip",
                )
              : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(
                  t,
                ),
                e.FunctionMap.set(2, () => {
                  var e =
                      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                        r,
                      ).FightFormationId,
                    e =
                      ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
                        e,
                      )?.AutoRole;
                  if (0 < (e?.length ?? 0)) {
                    var t = new Array();
                    for (const i of e)
                      t.push(
                        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
                          i,
                        ),
                      );
                    e = { Q6n: o };
                    (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Hah =
                      e),
                      InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                        r,
                        t,
                        0,
                        0,
                      );
                  } else
                    Log_1.Log.CheckError() &&
                      Log_1.Log.Error("Role", 43, "未配置出战人物");
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  e,
                ));
        }
      }),
      (this.dVi = void 0),
      (this.vke = () => {
        return new StarItem_1.StarItem();
      }),
      (this.qdo = () => new RoleTagSmallIconItem_1.RoleTagSmallIconItem()),
      (this.Vdo = (e) => {
        (this.RoleInstance =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoleSkinRedDotRefresh,
            e,
          ),
          this.PlayMontageStartWithReLoop(),
          this.Hdo(),
          this.jdo();
      }),
      (this.Wdo = () => {
        this.Hdo();
      }),
      (this.Kdo = () => {
        this.PlayModelEffect();
      }),
      (this.Qdo = () => {
        this.Xdo();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIText],
      [6, UE.UIText],
      [5, UE.UIItem],
      [7, UE.UIText],
      [8, UE.UIText],
      [9, UE.UITexture],
      [10, UE.UIHorizontalLayout],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIItem],
      [16, UE.UIButtonComponent],
      [17, UE.UIHorizontalLayout],
      [18, UE.UIItem],
      [19, UE.UIButtonComponent],
      [20, UE.UIButtonComponent],
      [21, UE.UIButtonComponent],
      [22, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [0, this.DetailClick],
        [14, this.TeachClick],
        [16, this.RoleChangeClick],
        [19, this.RoleTagClick],
        [21, this.OnRoleSkinClick],
      ]);
  }
  OnStart() {
    (this.RoleViewAgent = this.ExtraParams),
      void 0 === this.RoleViewAgent
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 58, "RoleViewAgent为空", [
            "界面名称",
            "RoleAttributeTabView",
          ])
        : ((this.RoleSystemUiParams =
            this.RoleViewAgent.GetRoleSystemUiParams()),
          (this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
          (this.Ndo = 0),
          (this.Odo = new ButtonItem_1.ButtonItem(this.GetItem(1))),
          (this.kdo = new ButtonItem_1.ButtonItem(this.GetItem(15))),
          this.Odo.SetFunction(this.LevelUpClick),
          this.kdo.SetFunction(this.BreakthroughClick),
          this.SetButtonUiActive(20, !1),
          this.Uho(),
          (this.$be = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(10),
            this.vke,
          )),
          (this.Klo = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(17),
            this.qdo,
          )));
  }
  Uho() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay6",
      ),
      i = this.GetItem(12),
      o = this.GetItem(5);
    let r = void 0;
    var n = t.length;
    for (let e = 0; e < n; ++e) {
      r = 0 === e ? o : LguiUtil_1.LguiUtil.CopyItem(o, i);
      var s = t[e],
        l = new AttributeItem_1.AttributeItem();
      l.CreateThenShowByActor(r.GetOwner()),
        l.UpdateParam(s, !1),
        2 < n && e % 2 == 0 ? l.SetBgActive(!0) : l.SetBgActive(!1),
        this.AttributeItemList.push(l);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.Wdo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Vdo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUp,
        this.Wdo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveRole,
        this.Kdo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshName,
        this.Qdo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.Wdo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Vdo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUp,
        this.Wdo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveRole,
        this.Kdo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshName,
        this.Qdo,
      );
  }
  jdo() {
    var e, t, i;
    this.Odo.BindRedDot(
      "RoleAttributeTabLevelUp",
      this.RoleInstance.GetDataId(),
    ),
      this.kdo.BindRedDot(
        "RoleAttributeTabBreakUp",
        this.RoleInstance.GetDataId(),
      ),
      RedDotController_1.RedDotController.BindRedDot(
        "RoleSkin",
        this.GetItem(22),
        void 0,
        this.RoleInstance.GetDataId(),
      ),
      this.RoleSystemUiParams.TeachBtn &&
      ((e = this.RoleInstance.IsTrialRole()),
      (t = ModelManager_1.ModelManager.FunctionModel.IsShow(10043)),
      (i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043)),
      t) &&
      i
        ? this.GetButton(14).GetRootComponent().SetUIActive(!e)
        : this.GetButton(14).GetRootComponent().SetUIActive(!1);
  }
  PlayModelEffect() {
    UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
  }
  Fdo() {
    UiManager_1.UiManager.OpenView(
      "RoleAttributeDetailView",
      this.RoleInstance.GetShowAttrList(),
    );
  }
  $do() {
    this.SetRoleLevelUpState();
    var e = this.RoleInstance.GetLevelData(),
      t =
        (1 === this.Ndo || 0 === this.Ndo
          ? this.GetText(2).SetText("")
          : LguiUtil_1.LguiUtil.SetLocalText(
              this.GetText(2),
              "RoleExp",
              e.GetExp(),
              e.GetCurrentMaxExp(),
            ),
        1 === this.Ndo || 0 === this.Ndo ? 1 : e.GetExpPercentage()),
      t = (this.GetSprite(3).SetFillAmount(t), this.GetText(6));
    LguiUtil_1.LguiUtil.SetLocalText(
      t,
      "RoleMaxLevel02",
      e.GetCurrentMaxLevel(),
    );
  }
  Ydo() {
    var e = this.RoleInstance.GetLevelData(),
      t = e.GetBreachLevel();
    let i =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakLevel");
    void 0 !== (i = i?.replace("%s", "[" + t + "]")) &&
      this.GetText(4).SetText(i);
    var o = e.GetMaxBreachLevel(),
      r = new Array(o);
    for (let e = 0; e < o; ++e) {
      var n = {
        StarOnActive: e < t,
        StarOffActive: e >= t,
        StarNextActive: !1,
        StarLoopActive: !1,
        PlayLoopSequence: !1,
        PlayActivateSequence: !1,
      };
      r[e] = n;
    }
    this.$be.RefreshByData(r);
    (e = 0 === this.Ndo ? e.GetRoleMaxLevel() : e.GetLevel()),
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "CommonLevel", e),
      (e = this.RoleInstance.GetElementInfo()),
      this.SetElementIcon(
        e.Icon,
        this.GetTexture(9),
        this.RoleInstance.GetRoleConfig().ElementId,
        "RoleRootView",
      ),
      (e =
        ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(
          e.Name,
        ));
    this.GetText(8).SetText(e);
  }
  Jdo() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(
      this.RoleInstance.GetRoleConfig(),
    );
    this.Klo.RefreshByData(e);
  }
  Hdo() {
    this.$do(),
      this.UpdateButtonState(),
      this.Ydo(),
      this.Xdo(),
      this.UpdateAttribute(),
      this.zdo(),
      this.Zdo(),
      this.Jdo(),
      this.bIl();
  }
  Zdo() {
    var e = this.RoleViewAgent.GetCurSelectRoleId(),
      t = this.RoleViewAgent.GetCurSelectRoleData(),
      e = MainRoleController_1.MainRoleController.IsMainRole(e),
      t = t.IsTrialRole(),
      i =
        ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementTransferFunctionId(),
      i = ModelManager_1.ModelManager.FunctionModel.IsOpen(i),
      o = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    this.GetButton(16).RootUIComp.SetUIActive(e && i && !o && !t);
  }
  bIl() {
    var e = this.RoleViewAgent.GetCurSelectRoleData().IsTrialRole();
    this.GetButton(21).RootUIComp.SetUIActive(!e);
  }
  Xdo() {
    this.GetText(11).SetText(this.RoleInstance.GetName());
  }
  zdo() {
    var e = this.RoleInstance.IsTrialRole();
    this.GetItem(13).SetUIActive(e);
  }
  UpdateButtonState() {
    if (this.RoleInstance.IsTrialRole())
      this.Odo.SetActive(!1), this.kdo.SetActive(!1);
    else {
      let e = "RoleMaxLevelPreview";
      this.Odo.SetActive(0 !== this.Ndo && 3 !== this.Ndo),
        0 !== this.Ndo &&
          (1 === this.Ndo
            ? (e = "RoleReachMaxLevel")
            : 3 === this.Ndo
              ? (e = "RoleBreakup")
              : 2 === this.Ndo && (e = "RoleLevelUp"),
          (t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e)),
          this.Odo.SetText(t),
          this.Odo.SetEnableClick(1 !== this.Ndo)),
        this.kdo.SetActive(0 !== this.Ndo && 3 === this.Ndo);
      var t =
        ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakup");
      this.kdo.SetText(t);
    }
  }
  SetRoleLevelUpState() {
    var e = this.RoleInstance.GetLevelData();
    e.GetRoleIsMaxLevel()
      ? (this.Ndo = 1)
      : e.GetRoleNeedBreakUp()
        ? (this.Ndo = 3)
        : (this.Ndo = 2);
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  PlayMontageStartWithReLoop() {
    RoleController_1.RoleController.PlayRoleMontage(3, !1, !0, !1);
  }
  UpdateAttribute() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "RoleAttributeDisplay6",
    );
    for (let e = 0; e < this.AttributeItemList.length; ++e) {
      var i = this.AttributeItemList[e],
        o = t[e],
        o = this.RoleInstance.GetShowAttributeValueById(o);
      i.SetCurrentValue(o), i.SetActive(!0);
    }
  }
  OnBeforeShow() {
    (this.RoleInstance = this.RoleViewAgent.GetCurSelectRoleData()),
      this.Hdo(),
      this.jdo(),
      this.Odo.BindRedDot(
        "RoleAttributeTabLevelUp",
        this.RoleInstance.GetDataId(),
      );
  }
  OnAfterShow() {
    this.PlayMontageStart();
  }
  OnBeforeHide() {
    this.Odo.UnBindRedDot(),
      RedDotController_1.RedDotController.UnBindGivenUi("RoleSkin");
  }
  OnBeforeDestroy() {
    for (const e of this.AttributeItemList) e.Destroy();
    (this.AttributeItemList = []), (this.Odo = void 0);
  }
}
exports.RoleAttributeTabView = RoleAttributeTabView;
//# sourceMappingURL=RoleAttributeTabView.js.map
