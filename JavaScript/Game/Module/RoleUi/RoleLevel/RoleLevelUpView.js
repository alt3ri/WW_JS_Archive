"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpView = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ExpComponent_1 = require("../../Common/ExpTween/ExpComponent");
const SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const RoleController_1 = require("../RoleController");
const RoleDefine_1 = require("../RoleDefine");
const AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData");
const RoleExpItemGridComponent_1 = require("./RoleExpItemGridComponent");
const RoleLevelUpSuccessController_1 = require("./RoleLevelUpSuccessController");
class RoleLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AttributeLayout = void 0),
      (this.RoleInstance = void 0),
      (this.tuo = void 0),
      (this.uft = void 0),
      (this.SHi = new SelectableExpData_1.SelectableExpData()),
      (this.gHi = void 0),
      (this.iuo = void 0),
      (this.C5i = void 0),
      (this.lqe = void 0),
      (this.CloseClick = () => {
        UiManager_1.UiManager.CloseView("RoleLevelUpView");
      }),
      (this.OnClickItemAdd = (t) => {
        const i = this.uft;
        for (let e = i.length - 1; e >= 0; e--) {
          const r = i[e];
          if (r.ItemId === t) {
            r.Count === 0
              ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                  t,
                )
              : this.ouo()
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "WeaponAddExpTipsText",
                  )
                : r.Count > r.SelectedCount && (r.SelectedCount++, this.xHi());
            break;
          }
        }
      }),
      (this.OnClickItemReduce = (t) => {
        const i = this.uft;
        for (let e = i.length - 1; e >= 0; e--) {
          const r = i[e];
          if (r.ItemId === t) {
            r.SelectedCount > 0 && r.SelectedCount--;
            break;
          }
        }
        this.xHi();
      }),
      (this.wHi = () => {
        const e = this.tuo.GetAutoButtonState();
        const t = this.uft;
        if (e === 0) {
          let e = !1;
          for (const r of t)
            if (r.Count > 0) {
              e = !0;
              break;
            }
          if (!e)
            return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RoleNoMaterial",
            );
          const i = this.SHi.GetExpDistanceToMax();
          ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(
            i,
            t,
            this.ruo,
          ),
            this.xHi();
        } else if (e === 1) for (const o of t) o.SelectedCount = 0;
        this.xHi();
      }),
      (this.x_o = (t) => {
        const i = this.uft;
        for (let e = i.length - 1; e >= 0; e--) {
          const r = i[e];
          if (
            r.ItemId === t &&
            r.Count > 0 &&
            r.SelectedCount < r.Count &&
            !this.ouo()
          )
            return !0;
        }
        return !1;
      }),
      (this.w_o = (t) => {
        const i = this.uft;
        for (let e = i.length - 1; e >= 0; e--) {
          const r = i[e];
          if (r.ItemId === t && r.SelectedCount <= 0) return !1;
        }
        return !0;
      }),
      (this.ruo = (e) =>
        ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId)),
      (this.Flo = () => {
        return new AttributeItem_1.AttributeItem();
      }),
      (this.nuo = () => {
        this.InitExp(), this.ResetDataList(), this.xHi();
      }),
      (this.suo = () => {
        const e = [];
        for (const r of this.iuo) {
          const t = r[0];
          var i = r[1];
          var i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
          e.push(i);
        }
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
          1010,
          e,
          this.auo,
        );
      }),
      (this.huo = () => {
        const e = [];
        for (const r of this.iuo) {
          const t = r[0];
          var i = r[1];
          var i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
          e.push(i);
        }
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
          1010,
          e,
          this.luo,
        );
      }),
      (this.NHi = (e) =>
        ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(
          this.RoleInstance.GetRoleId(),
          e + 1,
        )),
      (this.auo = () => {
        UiManager_1.UiManager.CloseView("RoleLevelUpView");
      }),
      (this.luo = () => {
        RoleController_1.RoleController.SendRoleBreakThroughViewRequest(
          this.RoleInstance.GetRoleId(),
          this.Info.Name,
        );
      }),
      (this._uo = () => {
        this.uuo(), this.gHi.PlayExpTween(this.SHi);
      }),
      (this.cuo = (e) => {
        this.iuo = e;
      }),
      (this.UHi = () => {
        var e = this.uft;
        let t = !1;
        for (const r of e)
          if (r.SelectedCount > 0) {
            t = !0;
            break;
          }
        if (t)
          if (this.tuo.GetIsMoneyEnough()) {
            const o = new Array();
            e.forEach((e) => {
              let t;
              e.SelectedCount > 0 &&
                (((t = new RoleDefine_1.ArrayIntInt()).Ckn = e.ItemId),
                (t.gkn = e.SelectedCount),
                o.push(t));
            });
            let i;
            var e = this.SHi.GetOverExp();
            e > 0 &&
            (e = ModelManager_1.ModelManager.RoleModel.CalculateExpBackItem(e))
              .size > 0
              ? (((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
                  e),
                i.FunctionMap.set(2, () => {
                  RoleController_1.RoleController.SendPbUpLevelRoleRequest(
                    this.RoleInstance.GetRoleId(),
                    o,
                    () => {
                      UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.C5i);
                    },
                  );
                }),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                ))
              : RoleController_1.RoleController.SendPbUpLevelRoleRequest(
                  this.RoleInstance.GetRoleId(),
                  o,
                  () => {
                    UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.C5i);
                  },
                );
          } else
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RoleNoMoney",
            );
        else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponSelectMaterialTipsText",
          );
      }),
      (this.OnAttributeChangeSequenceFinished = (e) => {
        this.UpdateAttributeItemValue(e);
      }),
      (this.UpdateAttributeItemValue = (e) => {
        const t = e.GetAttributeId();
        const i = this.SHi.GetArrivedLevel();
        let r = this.SHi.GetCurrentLevel();
        const o = this.RoleInstance.GetLevelData().GetBreachLevel();
        const s = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
          this.RoleInstance.GetRoleId(),
          t,
          r,
          o,
        );
        e.SetCurrentValue(s);
        let a = !1;
        let n = 0;
        r < i
          ? (r = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(
              this.RoleInstance.GetRoleId(),
              r,
              o,
              i,
              o,
              t,
            )) > 0 && ((n = s + r), (a = !0))
          : (a = !1),
          e.SetNextItemActive(a),
          a && e.SetNextValue(n);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIGridLayout],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    this.C5i = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
  }
  async OnBeforeStartAsync() {
    const e = this.OpenParam;
    (this.RoleInstance =
      ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e)),
      void 0 === this.RoleInstance
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error("Role", 59, "无效的roleId", [
            "界面名称",
            "RoleLevelUpView",
          ])
        : ((this.AttributeLayout = new GenericLayout_1.GenericLayout(
            this.GetGridLayout(2),
            this.Flo,
          )),
          (this.tuo = new RoleExpItemGridComponent_1.RoleExpItemGridComponent(
            this.UHi,
            this.wHi,
            this.OnClickItemAdd,
            this.OnClickItemReduce,
            this.x_o,
            this.w_o,
            "RoleLevelUpView",
          )),
          await this.tuo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
          this.tuo.SetButtonItemText("RoleLevelUp"),
          this.SHi.SetMaxExpFunction(this.NHi),
          (this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
          this.gHi.Init(),
          this.gHi.BindPlayCompleteCallBack(this.nuo),
          this.gHi.SetLevelFormatText("LevelNumber"),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4))),
          this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
          this.lqe.SetCloseCallBack(this.CloseClick),
          await this.AU(),
          this.Cl());
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    const e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    e && e?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
      RoleController_1.RoleController.PlayRoleMontage(3, !0);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  muo() {
    this.uft = [];
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      const e = {
        IncId: 0,
        ItemId: t.Id,
        Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          t.Id,
        ),
        SelectedCount: 0,
      };
      this.uft.push(e);
    }
    this.tuo.Update(this.uft, ItemDefines_1.EItemId.Gold, 0);
  }
  xHi() {
    let t = 0;
    var e = this.uft;
    var e =
      (this.tuo.UpdateByDataList(e),
      e.forEach((e) => {
        t += this.ruo(e) * e.SelectedCount;
      }),
      this.SHi.UpdateExp(t),
      this.gHi.Update(this.SHi),
      ModelManager_1.ModelManager.RoleModel.GetMoneyToLevelUp(t));
    this.tuo.UpdateMoney(ItemDefines_1.EItemId.Gold, e),
      t > 0
        ? this.tuo.SetAutoButtonText("PrefabTextItem_3035508725_Text")
        : this.tuo.SetAutoButtonText("PrefabTextItem_744293929_Text"),
      this.jlo();
  }
  duo(e, t) {
    const i = this.AttributeLayout.GetLayoutItemList();
    const r = [];
    const o = this.RoleInstance.GetLevelData();
    const s = this.RoleInstance.GetRoleId();
    const a = o.GetBreachLevel();
    for (const _ of i) {
      const n = _.GetAttributeId();
      let l = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
        s,
        n,
        e,
        a,
      );
      let h = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
        s,
        n,
        t,
        a,
      );
      l !== h &&
        ((l = new AttrListScrollData_1.AttrListScrollData(n, l, h, 0, !1, 0)),
        ((h =
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
            l,
          )).Name =
          ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(
            n,
          ).AnotherName),
        r.push(h));
    }
    return r;
  }
  async AU() {
    this.muo(), await this.Cuo(), this.InitExp();
  }
  async Cuo() {
    const t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "RoleAttributeDisplay3",
    );
    const i = [];
    const r = this.RoleInstance.GetAttributeData();
    const o = t.length;
    for (let e = 0; e < o; e++) {
      var s = t[e];
      var s = {
        Id: s,
        IsRatio: !1,
        CurValue: r.GetAttrValueById(s),
        BgActive: o > 2 && e % 2 == 0,
        UseAnotherName: !0,
      };
      i.push(s);
    }
    await this.AttributeLayout.RefreshByDataAsync(i);
  }
  InitExp() {
    this.UpdateExpData(), this.gHi.UpdateInitState(this.SHi);
  }
  Cl() {
    this.jlo(), this.UpdateButtonState(), this.xHi();
  }
  ResetDataList() {
    for (const e of this.uft)
      (e.SelectedCount = 0),
        (e.Count =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e.ItemId,
          ));
  }
  jlo() {
    for (const e of this.AttributeLayout.GetLayoutItemList())
      this.UpdateAttributeItemValue(e);
  }
  UpdateExpData() {
    var e = this.RoleInstance.GetLevelData();
    const t = e.GetLevel();
    const i = e.GetCurrentMaxLevel();
    const r = e.GetExp();
    var e = e.GetRoleMaxLevel();
    this.SHi.UpdateComponent(t, i, r, e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this._uo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUpReceiveItem,
        this.cuo,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this._uo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUpReceiveItem,
        this.cuo,
      );
  }
  uuo() {
    const t = this.SHi.GetCurrentLevel();
    let i = this.RoleInstance.GetLevelData();
    const r = i.GetLevel();
    if (r !== t) {
      this.jlo();
      const o = this.iuo && this.iuo.length > 0;
      const s = this.duo(t, r);
      let e = void 0;
      i.GetRoleIsMaxLevel()
        ? ((e = {
            LevelInfo: {
              PreUpgradeLv: t,
              UpgradeLv: r,
              FormatStringId: "Text_LevelShow_Text",
              IsMaxLevel: !0,
            },
            AttributeInfo: s,
          }).ClickFunction = o ? this.suo : this.auo)
        : i.GetRoleNeedBreakUp()
          ? ((e = {
              LevelInfo: {
                PreUpgradeLv: t,
                UpgradeLv: r,
                FormatStringId: "Text_LevelShow_Text",
                IsMaxLevel: !0,
              },
              ClickText: "Text_TurnToRoleBreach_Text",
              AttributeInfo: s,
            }).ClickFunction = o ? this.huo : this.luo)
          : (e = {
              LevelInfo: {
                PreUpgradeLv: t,
                UpgradeLv: r,
                FormatStringId: "Text_LevelShow_Text",
              },
              AttributeInfo: s,
            }),
        e &&
          ((i =
            ConfigManager_1.ConfigManager.RoleConfig.GetRoleLevelUpSuccessDelayTime()),
          UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !0),
          TimerSystem_1.TimerSystem.Delay(() => {
            RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
              e,
            ),
              UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !1);
          }, i));
    }
  }
  ouo() {
    const e = this.SHi.GetArrivedLevel();
    return this.RoleInstance.GetLevelData().GetCurrentMaxLevel() <= e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    let t = this.tuo?.GetGenericScrollView()?.GetGenericLayout();
    if (t) {
      t = t.GetLayoutItemByIndex(Number(e[1]));
      if (t) {
        e = t.GetUiItemForGuide();
        if (e) return [e, e];
      }
    }
  }
  UpdateButtonState() {
    const e = this.RoleInstance.GetLevelData().GetRoleIsMaxLevel();
    this.tuo.SetMaxItemActive(e), this.tuo.SetButtonItemActive(!e);
  }
}
exports.RoleLevelUpView = RoleLevelUpView;
// # sourceMappingURL=RoleLevelUpView.js.map
