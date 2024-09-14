"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  ExpComponent_1 = require("../../Common/ExpTween/ExpComponent"),
  SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RoleController_1 = require("../RoleController"),
  RoleDefine_1 = require("../RoleDefine"),
  AttrListScrollData_1 = require("../View/ViewData/AttrListScrollData"),
  RoleExpItemGridComponent_1 = require("./RoleExpItemGridComponent"),
  RoleLevelUpSuccessController_1 = require("./RoleLevelUpSuccessController");
class RoleLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AttributeLayout = void 0),
      (this.RoleInstance = void 0),
      (this.Juo = void 0),
      (this.ypt = void 0),
      (this.vji = new SelectableExpData_1.SelectableExpData()),
      (this.dji = void 0),
      (this.zuo = void 0),
      (this.dVi = void 0),
      (this.lqe = void 0),
      (this.CloseClick = () => {
        UiManager_1.UiManager.CloseView("RoleLevelUpView");
      }),
      (this.OnClickItemAdd = (t) => {
        var i = this.ypt;
        for (let e = i.length - 1; 0 <= e; e--) {
          var r = i[e];
          if (r.ItemId === t) {
            0 === r.Count
              ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                  t,
                )
              : this.Zuo()
                ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "WeaponAddExpTipsText",
                  )
                : r.Count > r.SelectedCount && (r.SelectedCount++, this.Aji());
            break;
          }
        }
      }),
      (this.OnClickItemReduce = (t) => {
        var i = this.ypt;
        for (let e = i.length - 1; 0 <= e; e--) {
          var r = i[e];
          if (r.ItemId === t) {
            0 < r.SelectedCount && r.SelectedCount--;
            break;
          }
        }
        this.Aji();
      }),
      (this.Pji = () => {
        var e = this.Juo.GetAutoButtonState(),
          t = this.ypt;
        if (0 === e) {
          let e = !1;
          for (const r of t)
            if (0 < r.Count) {
              e = !0;
              break;
            }
          if (!e)
            return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RoleNoMaterial",
            );
          var i = this.vji.GetExpDistanceToMax();
          ModelManager_1.ModelManager.WeaponModel.AutoAddExpItemEx(
            i,
            t,
            this.eco,
          ),
            this.Aji();
        } else if (1 === e) for (const o of t) o.SelectedCount = 0;
        this.Aji();
      }),
      (this.Ruo = (t) => {
        var i = this.ypt;
        for (let e = i.length - 1; 0 <= e; e--) {
          var r = i[e];
          if (
            r.ItemId === t &&
            0 < r.Count &&
            r.SelectedCount < r.Count &&
            !this.Zuo()
          )
            return !0;
        }
        return !1;
      }),
      (this.Uuo = (t) => {
        var i = this.ypt;
        for (let e = i.length - 1; 0 <= e; e--) {
          var r = i[e];
          if (r.ItemId === t && r.SelectedCount <= 0) return !1;
        }
        return !0;
      }),
      (this.eco = (e) =>
        ModelManager_1.ModelManager.RoleModel.GetRoleExpItemExp(e.ItemId)),
      (this.G1o = () => {
        return new AttributeItem_1.AttributeItem();
      }),
      (this.tco = () => {
        this.InitExp(), this.ResetDataList(), this.Aji();
      }),
      (this.ico = () => {
        var e = [];
        for (const r of this.zuo) {
          var t = r[0],
            i = r[1],
            i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
          e.push(i);
        }
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
          1010,
          e,
          this.oco,
        );
      }),
      (this.rco = () => {
        var e = [];
        for (const r of this.zuo) {
          var t = r[0],
            i = r[1],
            i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
          e.push(i);
        }
        ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
          1010,
          e,
          this.nco,
        );
      }),
      (this.qji = (e) =>
        ModelManager_1.ModelManager.RoleModel.GetRoleLevelUpExp(
          this.RoleInstance.GetRoleId(),
          e + 1,
        )),
      (this.oco = () => {
        UiManager_1.UiManager.CloseView("RoleLevelUpView");
      }),
      (this.nco = () => {
        RoleController_1.RoleController.SendRoleBreakThroughViewRequest(
          this.RoleInstance.GetRoleId(),
          this.Info.Name,
        );
      }),
      (this.sco = () => {
        this.aco(), this.dji.PlayExpTween(this.vji);
      }),
      (this.hco = (e) => {
        this.zuo = e;
      }),
      (this.Dji = () => {
        var e = this.ypt;
        let t = !1;
        for (const r of e)
          if (0 < r.SelectedCount) {
            t = !0;
            break;
          }
        if (t)
          if (this.Juo.GetIsMoneyEnough()) {
            const o = new Array();
            e.forEach((e) => {
              var t;
              0 < e.SelectedCount &&
                (((t = new RoleDefine_1.ArrayIntInt()).Z4n = e.ItemId),
                (t.e5n = e.SelectedCount),
                o.push(t));
            });
            var i,
              e = this.vji.GetOverExp();
            0 < e &&
            0 <
              (e =
                ModelManager_1.ModelManager.RoleModel.CalculateExpBackItem(e))
                .size
              ? (((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
                  e),
                i.FunctionMap.set(2, () => {
                  RoleController_1.RoleController.SendPbUpLevelRoleRequest(
                    this.RoleInstance.GetRoleId(),
                    o,
                    () => {
                      UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
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
                    UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
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
        var t = e.GetAttributeId(),
          i = this.vji.GetArrivedLevel(),
          r = this.vji.GetCurrentLevel(),
          o = this.RoleInstance.GetLevelData().GetBreachLevel(),
          s = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
            this.RoleInstance.GetRoleId(),
            t,
            r,
            o,
          );
        e.SetCurrentValue(s);
        let a = !1,
          n = 0;
        r < i
          ? 0 <
              (r = ModelManager_1.ModelManager.RoleModel.GetAddAttrLevelUp(
                this.RoleInstance.GetRoleId(),
                r,
                o,
                i,
                o,
                t,
              )) && ((n = s + r), (a = !0))
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
    this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
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
            this.G1o,
          )),
          (this.Juo = new RoleExpItemGridComponent_1.RoleExpItemGridComponent(
            this.Dji,
            this.Pji,
            this.OnClickItemAdd,
            this.OnClickItemReduce,
            this.Ruo,
            this.Uuo,
            "RoleLevelUpView",
          )),
          await this.Juo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
          this.Juo.SetButtonItemText("RoleLevelUp"),
          this.vji.SetMaxExpFunction(this.qji),
          (this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
          this.dji.Init(),
          this.dji.BindPlayCompleteCallBack(this.tco),
          this.dji.SetLevelFormatText("LevelNumber"),
          (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(4))),
          this.lqe.SetCurrencyItemList([ItemDefines_1.EItemId.Gold]),
          this.lqe.SetCloseCallBack(this.CloseClick),
          await this.AU(),
          this.Cl());
  }
  OnHandleLoadScene() {
    UiSceneManager_1.UiSceneManager.ShowRoleSystemRoleActor();
    var e = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
    e && e?.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase"),
      RoleController_1.RoleController.PlayRoleMontage(3, !0);
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.HideRoleSystemRoleActor();
  }
  lco() {
    this.ypt = [];
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleCostExpList()) {
      var e = {
        IncId: 0,
        ItemId: t.Id,
        Count: ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(
          t.Id,
        ),
        SelectedCount: 0,
      };
      this.ypt.push(e);
    }
    this.Juo.Update(this.ypt, ItemDefines_1.EItemId.Gold, 0);
  }
  Aji() {
    let t = 0;
    var e = this.ypt,
      e =
        (this.Juo.UpdateByDataList(e),
        e.forEach((e) => {
          t += this.eco(e) * e.SelectedCount;
        }),
        this.vji.UpdateExp(t),
        this.dji.Update(this.vji),
        this.vji.GetExpDistanceToMax()),
      e = ModelManager_1.ModelManager.RoleModel.GetMoneyToLevelUp(
        Math.min(e, t),
      );
    this.Juo.UpdateMoney(ItemDefines_1.EItemId.Gold, e),
      0 < t
        ? this.Juo.SetAutoButtonText("PrefabTextItem_3035508725_Text")
        : this.Juo.SetAutoButtonText("PrefabTextItem_744293929_Text"),
      this.k1o();
  }
  _co(e, t) {
    var i = this.AttributeLayout.GetLayoutItemList(),
      r = [],
      o = this.RoleInstance.GetLevelData(),
      s = this.RoleInstance.GetRoleId(),
      a = o.GetBreachLevel();
    for (const _ of i) {
      var n = _.GetAttributeId(),
        l = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
          s,
          n,
          e,
          a,
        ),
        h = ModelManager_1.ModelManager.RoleModel.GetAttributeByLevel(
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
    this.lco(), await this.uco(), this.InitExp();
  }
  async uco() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "RoleAttributeDisplay3",
      ),
      i = [],
      r = this.RoleInstance.GetAttributeData(),
      o = t.length;
    for (let e = 0; e < o; e++) {
      var s = t[e],
        s = {
          Id: s,
          IsRatio: !1,
          CurValue: r.GetAttrValueById(s),
          BgActive: 2 < o && e % 2 == 0,
          UseAnotherName: !0,
        };
      i.push(s);
    }
    await this.AttributeLayout.RefreshByDataAsync(i);
  }
  InitExp() {
    this.UpdateExpData(), this.dji.UpdateInitState(this.vji);
  }
  Cl() {
    this.k1o(), this.UpdateButtonState(), this.Aji();
  }
  ResetDataList() {
    for (const e of this.ypt)
      (e.SelectedCount = 0),
        (e.Count =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            e.ItemId,
          ));
  }
  k1o() {
    for (const e of this.AttributeLayout.GetLayoutItemList())
      this.UpdateAttributeItemValue(e);
  }
  UpdateExpData() {
    var e = this.RoleInstance.GetLevelData(),
      t = e.GetLevel(),
      i = e.GetCurrentMaxLevel(),
      r = e.GetExp(),
      e = e.GetRoleMaxLevel();
    this.vji.UpdateComponent(t, i, r, e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.sco,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RoleLevelUpReceiveItem,
        this.hco,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RoleInfoUpdate,
      this.sco,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RoleLevelUpReceiveItem,
        this.hco,
      );
  }
  aco() {
    var t = this.vji.GetCurrentLevel(),
      i = this.RoleInstance.GetLevelData(),
      r = i.GetLevel();
    if (r !== t) {
      this.k1o();
      var o = this.zuo && 0 < this.zuo.length,
        s = this._co(t, r);
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
          }).ClickFunction = o ? this.ico : this.oco)
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
            }).ClickFunction = o ? this.rco : this.nco)
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
  Zuo() {
    var e = this.vji.GetArrivedLevel();
    return this.RoleInstance.GetLevelData().GetCurrentMaxLevel() <= e;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.Juo?.GetGenericScrollView()?.GetGenericLayout();
    if (t) {
      t = t.GetLayoutItemByIndex(Number(e[1]));
      if (t) {
        e = t.GetUiItemForGuide();
        if (e) return [e, e];
      }
    }
  }
  UpdateButtonState() {
    var e = this.RoleInstance.GetLevelData().GetRoleIsMaxLevel();
    this.Juo.SetMaxItemActive(e), this.Juo.SetButtonItemActive(!e);
  }
}
exports.RoleLevelUpView = RoleLevelUpView;
//# sourceMappingURL=RoleLevelUpView.js.map
