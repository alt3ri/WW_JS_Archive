"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBreachView = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleController_1 = require("../RoleController"),
  StarItem_1 = require("../View/StarItem"),
  CostItemGridComponent_1 = require("./CostItemGridComponent");
class RoleBreachView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.AttributeLayout = void 0),
      (this.StarLayout = void 0),
      (this.lqe = void 0),
      (this.b1o = void 0),
      (this.q1o = void 0),
      (this.dVi = void 0),
      (this.CloseClick = () => {
        UiManager_1.UiManager.CloseView("RoleLevelUpView"), this.CloseMe();
      }),
      (this.LevelUpClick = () => {
        var e;
        0 === this.q1o
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RoleNoMaterial",
            )
          : 1 === this.q1o
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "RoleNoMoney",
              )
            : ((e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
                this.dFe,
              )),
              RoleController_1.RoleController.SendPbOverRoleRequest(
                e.GetRoleId(),
              ));
      }),
      (this.LevelUpLockTipClick = () => {
        var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(175);
        const t =
          ModelManager_1.ModelManager.QuestNewModel.GetCurWorldLevelBreakQuest();
        t < 0
          ? e.InteractionMap.set(1, !1)
          : (e.FunctionMap.set(2, () => {
              UiManager_1.UiManager.OpenView("QuestView", t);
            }),
            e.InteractionMap.set(1, !0)),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            e,
          );
      }),
      (this.OnRoleBreachQuitSequenceFinish = () => {
        var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
          this.dFe,
        );
        RoleController_1.RoleController.SendRoleLevelUpViewRequestWithOpenView(
          e.GetRoleId(),
          this.Info.Name,
        );
      }),
      (this.G1o = () => new AttributeItem_1.AttributeItem()),
      (this.vke = () => {
        return new StarItem_1.StarItem();
      }),
      (this.N1o = (e, t) => {
        this.GetItem(3).SetUIActive(!1),
          this.b1o.GetRootItem().SetUIActive(!1),
          this.lqe.GetRootItem().SetUIActive(!1),
          UiRoleUtils_1.UiRoleUtils.PlayRoleBreachFinishEffect(this.dVi);
        var i =
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleBreachSuccessDelayTime(),
          i =
            (TimerSystem_1.TimerSystem.Delay(() => {
              RoleController_1.RoleController.PlayRoleMontage(3), this.O1o();
            }, i),
            ConfigManager_1.ConfigManager.AudioConfig?.GetRoleConfig(e)
              ?.BreakUpEventList[t]);
        i &&
          (AudioSystem_1.AudioSystem.PostEvent(i), Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug("Audio", 57, "[Game.RoleBreachView] PostEvent", [
            "Event",
            i,
          ]);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIVerticalLayout],
      [7, UE.UIItem],
      [8, UE.UIItem],
    ];
  }
  OnStart() {
    (this.dFe = this.OpenParam),
      (this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor()),
      (this.StarLayout = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(5),
        this.vke,
      )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(7))),
      this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
      this.lqe.SetCloseCallBack(this.CloseClick),
      (this.b1o = new CostItemGridComponent_1.CostItemGridComponent(
        this.GetItem(8),
        this.LevelUpClick,
        this.LevelUpLockTipClick,
      )),
      this.b1o.SetMaxItemActive(!1),
      this.b1o.SetButtonItemLocalText("RoleBreakup"),
      (this.AttributeLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(6),
        this.G1o,
      )),
      this.UiViewSequence.AddSequenceFinishEvent(
        "Quit",
        this.OnRoleBreachQuitSequenceFinish,
      ),
      RoleController_1.RoleController.PlayRoleMontage(12);
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    e && e.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
      RoleController_1.RoleController.PlayRoleMontage(3, !0);
  }
  OnBeforeShow() {
    this.FTt();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleBreakUp,
      this.N1o,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleBreakUp,
      this.N1o,
    );
  }
  OnHandleReleaseScene() {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Character",
        59,
        "RoleBreachView HandleReleaseScene 隐藏模型",
      ),
      UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  FTt() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.dFe,
      ).GetLevelData(),
      t = e.GetBreachLevel(),
      i =
        (LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(4),
          "RoleBreakUpLevel",
          t + 1,
        ),
        e.GetBreachConfig(t + 1));
    this.GetText(0).SetText(i.MaxLevel.toString());
    let r = 0;
    var o = [],
      n = i.BreachConsume;
    if (n)
      for (var [a, s] of n)
        a === ItemDefines_1.EItemId.Gold
          ? (r = s)
          : ((a = {
              ItemId: a,
              IncId: 0,
              SelectedCount:
                ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
                  a,
                ),
              Count: s,
            }),
            o.push(a));
    (this.q1o = ModelManager_1.ModelManager.RoleModel.GetRoleBreachState(
      this.dFe,
    )),
      4 === this.q1o
        ? ((n =
            LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(
              i.ConditionId,
            )),
          this.b1o.SetButtonItemActive(!1),
          this.b1o.SetLockItemActive(!0),
          this.b1o.SetLockLocalText(n))
        : (this.b1o.SetButtonItemActive(!0), this.b1o.SetLockItemActive(!1)),
      this.b1o.Update(o, ItemDefines_1.EItemId.Gold, r);
    i =
      ModelManager_1.ModelManager.RoleModel.RoleBreachResponseData.GetUnLockSkillId();
    this.GetItem(1).SetUIActive(0 !== i),
      0 !== i &&
        ((n =
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillConfigById(i)),
        this.SetTextureByPath(n.Icon, this.GetTexture(2))),
      this.jxt(t, e.GetMaxBreachLevel()),
      this.k1o();
  }
  k1o() {
    var e = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay3",
      ),
      t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(
        this.dFe,
      ).GetLevelData(),
      i = t.GetLevel(),
      r = t.GetBreachLevel(),
      o = t.GetMaxBreachLevel(),
      n = [];
    for (const l of e) {
      var a = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
        this.dFe,
        l,
        i,
        r,
      );
      let e = 0;
      r < o &&
        0 <
          (s = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(
            this.dFe,
            i,
            r,
            i,
            r + 1,
            l,
          )) &&
        (e = a + s);
      var s = {
        Id: l,
        IsRatio: !1,
        CurValue: a,
        BgActive: !1,
        ShowNext: e > a,
        NextValue: e,
        UseAnotherName: !0,
      };
      n.push(s);
    }
    this.AttributeLayout.RefreshByData(n);
  }
  jxt(t, i) {
    var r = new Array(i);
    for (let e = 0; e < i; ++e) {
      var o = {
        StarOnActive: e < t,
        StarOffActive: e > t,
        StarNextActive: e === t,
        StarLoopActive: e === t,
        PlayLoopSequence: e === t,
        PlayActivateSequence: !1,
      };
      r[e] = o;
    }
    this.StarLayout.RefreshByData(r);
  }
  O1o() {
    UiManager_1.UiManager.OpenView("RoleBreachSuccessView", this.dFe);
  }
}
exports.RoleBreachView = RoleBreachView;
//# sourceMappingURL=RoleBreachView.js.map
