"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAttributeTabView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MainRoleController_1 = require("../MainRoleController");
const RoleController_1 = require("../RoleController");
const RoleBreakPreviewViewModel_1 = require("../RoleLevel/RoleBreakPreviewViewModel");
const RoleTagSmallIconItem_1 = require("../RoleTag/RoleTagSmallIconItem");
const StarItem_1 = require("../View/StarItem");
class RoleAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.Fmo = 0),
      (this.Vmo = void 0),
      (this.Hmo = void 0),
      (this.RoleViewAgent = void 0),
      (this.RoleInstance = void 0),
      (this.AttributeItemList = []),
      (this.RoleSystemUiParams = void 0),
      (this.$be = void 0),
      (this.Yho = void 0),
      (this.DetailClick = () => {
        this.jmo();
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
        const e = this.RoleInstance.GetRoleConfig();
        UiManager_1.UiManager.OpenView("RoleTagDetailView", e.Tag);
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
          var e = this.RoleViewAgent.GetCurSelectRoleId();
          var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
          const t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
            e.Name,
          );
          const o = e.RoleGuide;
          o === 0
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "RoleGuideNotice02",
                t,
              )
            : ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(
                t,
              ),
              e.FunctionMap.set(2, () => {
                var e =
                  ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                    o,
                  ).FightFormationId;
                var e =
                  ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
                    e,
                  )?.AutoRole;
                if ((e?.length ?? 0) > 0) {
                  const t = new Array();
                  for (const i of e)
                    t.push(
                      ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
                        i,
                      ),
                    );
                  InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
                    o,
                    t,
                  );
                } else
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error("Role", 44, "未配置出战人物");
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ));
        }
      }),
      (this.RoleBreakPreviewClick = () => {
        const e = new RoleBreakPreviewViewModel_1.RoleBreakPreviewViewModel();
        (e.CachedRoleInstance = this.RoleInstance),
          UiManager_1.UiManager.OpenView("RoleBreakPreviewView", e, this.AAn);
      }),
      (this.AAn = (e, t) => {
        e && this.AddChild(UiManager_1.UiManager.GetView(t));
      }),
      (this.C5i = void 0),
      (this.sAt = () => {
        return new StarItem_1.StarItem();
      }),
      (this.Omo = () => new RoleTagSmallIconItem_1.RoleTagSmallIconItem()),
      (this.Wmo = (e) => {
        (this.RoleInstance =
          ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e)),
          this.PlayMontageStartWithReLoop(),
          this.Kmo(),
          this.Qmo();
      }),
      (this.Xmo = () => {
        this.Kmo();
      }),
      (this.$mo = () => {
        this.PlayModelEffect();
      }),
      (this.Ymo = () => {
        this.Jmo();
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
    ]),
      (this.BtnBindInfo = [
        [0, this.DetailClick],
        [14, this.TeachClick],
        [16, this.RoleChangeClick],
        [19, this.RoleTagClick],
        [20, this.RoleBreakPreviewClick],
      ]);
  }
  OnStart() {
    (this.RoleViewAgent = this.ExtraParams),
      void 0 === this.RoleViewAgent
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "RoleViewAgent为空", [
            "界面名称",
            "RoleAttributeTabView",
          ])
        : ((this.RoleSystemUiParams =
            this.RoleViewAgent.GetRoleSystemUiParams()),
          (this.C5i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
          (this.Fmo = 0),
          (this.Vmo = new ButtonItem_1.ButtonItem(this.GetItem(1))),
          (this.Hmo = new ButtonItem_1.ButtonItem(this.GetItem(15))),
          this.Vmo.SetFunction(this.LevelUpClick),
          this.Hmo.SetFunction(this.BreakthroughClick),
          this.GetButton(20).GetRootComponent().SetUIActive(!0),
          this.wao(),
          (this.$be = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(10),
            this.sAt,
          )),
          (this.Yho = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(17),
            this.Omo,
          )));
  }
  wao() {
    const t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "RoleAttributeDisplay6",
    );
    const i = this.GetItem(12);
    const o = this.GetItem(5);
    let r = void 0;
    const s = t.length;
    for (let e = 0; e < s; ++e) {
      r = e === 0 ? o : LguiUtil_1.LguiUtil.CopyItem(o, i);
      const n = t[e];
      const a = new AttributeItem_1.AttributeItem();
      a.CreateThenShowByActor(r.GetOwner()),
        a.UpdateParam(n, !1),
        s > 2 && e % 2 == 0 ? a.SetBgActive(!0) : a.SetBgActive(!1),
        this.AttributeItemList.push(a);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.Xmo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Wmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUp,
        this.Xmo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveRole,
        this.$mo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleRefreshName,
        this.Ymo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.Xmo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleSystemChangeRole,
        this.Wmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUp,
        this.Xmo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveRole,
        this.$mo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleRefreshName,
        this.Ymo,
      );
  }
  Qmo() {
    let e, t, i;
    this.Vmo.BindRedDot(
      "RoleAttributeTabLevelUp",
      this.RoleInstance.GetDataId(),
    ),
      this.Hmo.BindRedDot(
        "RoleAttributeTabBreakUp",
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
    UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.C5i);
  }
  jmo() {
    UiManager_1.UiManager.OpenView(
      "RoleAttributeDetailView",
      this.RoleInstance.GetShowAttrList(),
    );
  }
  zmo() {
    this.SetRoleLevelUpState();
    const e = this.RoleInstance.GetLevelData();
    var t =
      (this.Fmo === 1 || this.Fmo === 0
        ? this.GetText(2).SetText("")
        : LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(2),
            "RoleExp",
            e.GetExp(),
            e.GetCurrentMaxExp(),
          ),
      this.Fmo === 1 || this.Fmo === 0 ? 1 : e.GetExpPercentage());
    var t = (this.GetSprite(3).SetFillAmount(t), this.GetText(6));
    LguiUtil_1.LguiUtil.SetLocalText(
      t,
      "RoleMaxLevel02",
      e.GetCurrentMaxLevel(),
    );
  }
  Zmo() {
    let e = this.RoleInstance.GetLevelData();
    const t = e.GetBreachLevel();
    let i =
      ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakLevel");
    void 0 !== (i = i?.replace("%s", "[" + t + "]")) &&
      this.GetText(4).SetText(i);
    const o = e.GetMaxBreachLevel();
    const r = new Array(o);
    for (let e = 0; e < o; ++e) {
      const s = {
        StarOnActive: e < t,
        StarOffActive: e >= t,
        StarNextActive: !1,
        StarLoopActive: !1,
        PlayLoopSequence: !1,
        PlayActivateSequence: !1,
      };
      r[e] = s;
    }
    this.$be.RefreshByData(r);
    (e = this.Fmo === 0 ? e.GetRoleMaxLevel() : e.GetLevel()),
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
  edo() {
    const e = this.RoleInstance.GetRoleConfig().Tag;
    this.Yho.RefreshByData(e);
  }
  Kmo() {
    this.zmo(),
      this.UpdateButtonState(),
      this.Zmo(),
      this.Jmo(),
      this.UpdateAttribute(),
      this.tdo(),
      this.ido(),
      this.edo();
  }
  ido() {
    var e = this.RoleViewAgent.GetCurSelectRoleId();
    var t = this.RoleViewAgent.GetCurSelectRoleData();
    var e = MainRoleController_1.MainRoleController.IsMainRole(e);
    var t = t.IsTrialRole();
    var i =
      ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementTransferFunctionId();
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(i);
    const o =
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    this.GetButton(16).RootUIComp.SetUIActive(e && i && !o && !t);
  }
  Jmo() {
    this.GetText(11).SetText(this.RoleInstance.GetName());
  }
  tdo() {
    const e = this.RoleInstance.IsTrialRole();
    this.GetItem(13).SetUIActive(e);
  }
  UpdateButtonState() {
    let t = this.GetButton(20).RootUIComp;
    if (this.RoleInstance.IsTrialRole())
      this.Vmo.SetActive(!1), this.Hmo.SetActive(!1), t.SetUIActive(!1);
    else {
      t.SetUIActive(this.Fmo !== 0);
      let e = "RoleMaxLevelPreview";
      this.Vmo.SetActive(this.Fmo !== 0 && this.Fmo !== 3),
        this.Fmo !== 0 &&
          (this.Fmo === 1
            ? (e = "RoleReachMaxLevel")
            : this.Fmo === 3
              ? (e = "RoleBreakup")
              : this.Fmo === 2 && (e = "RoleLevelUp"),
          (t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e)),
          this.Vmo.SetText(t),
          this.Vmo.SetEnableClick(this.Fmo !== 1)),
        this.Hmo.SetActive(this.Fmo !== 0 && this.Fmo === 3);
      t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakup");
      this.Hmo.SetText(t);
    }
  }
  SetRoleLevelUpState() {
    const e = this.RoleInstance.GetLevelData();
    e.GetRoleIsMaxLevel()
      ? (this.Fmo = 1)
      : e.GetRoleNeedBreakUp()
        ? (this.Fmo = 3)
        : (this.Fmo = 2);
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  PlayMontageStartWithReLoop() {
    RoleController_1.RoleController.PlayRoleMontage(3, !1, !0, !1);
  }
  UpdateAttribute() {
    const t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "RoleAttributeDisplay6",
    );
    for (let e = 0; e < this.AttributeItemList.length; ++e) {
      const i = this.AttributeItemList[e];
      var o = t[e];
      var o = this.RoleInstance.GetShowAttributeValueById(o);
      i.SetCurrentValue(o), i.SetActive(!0);
    }
  }
  OnBeforeShow() {
    (this.RoleInstance = this.RoleViewAgent.GetCurSelectRoleData()),
      this.PlayMontageStart(),
      this.Kmo(),
      this.Qmo(),
      this.Vmo.BindRedDot(
        "RoleAttributeTabLevelUp",
        this.RoleInstance.GetDataId(),
      );
  }
  OnBeforeHide() {
    this.Vmo.UnBindRedDot();
  }
  OnBeforeDestroy() {
    for (const e of this.AttributeItemList) e.Destroy();
    (this.AttributeItemList = []), (this.Vmo = void 0);
  }
}
exports.RoleAttributeTabView = RoleAttributeTabView;
// # sourceMappingURL=RoleAttributeTabView.js.map
