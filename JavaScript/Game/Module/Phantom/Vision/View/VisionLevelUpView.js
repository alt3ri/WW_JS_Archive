"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionLevelUpView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../../Ui/UiLayer"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView"),
  CommonMultipleConsumeComponent_1 = require("../../../Common/Consume/CommonMultipleConsumeComponent"),
  ItemGridConsumeComponent_1 = require("../../../Common/Consume/ItemGridConsumeComponent"),
  ExpComponent_1 = require("../../../Common/ExpTween/ExpComponent"),
  CommonIntensifyPropExpData_1 = require("../../../Common/Model/CommonIntensifyPropExpData"),
  SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  SelectableExpData_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableExpData"),
  ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../../Item/Data/ItemDefines"),
  RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  PhantomBattleController_1 = require("../../PhantomBattle/PhantomBattleController"),
  VisionIdentifyComponent_1 = require("./VisionIdentifyComponent"),
  VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent"),
  VisionNameText_1 = require("./VisionNameText");
class VisionLevelUpView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.dji = void 0),
      (this.Cji = void 0),
      (this.qHi = 0),
      (this.gji = 0),
      (this.fji = []),
      (this.pji = void 0),
      (this.vji = void 0),
      (this.bHi = void 0),
      (this.BHi = void 0),
      (this.Mji = 0),
      (this.NHi = !1),
      (this.p9i = void 0),
      (this.Ndl = !1),
      (this.oLt = (e) => {
        this.Mji = e;
        e =
          ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
            this.Mji
          ].Id;
        this.Cji.RefreshConditionText(
          ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
            .ConsumeFilterText,
        );
      }),
      (this.Eji = (e) => {
        e &&
          (UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1),
          (this.Ndl = !1),
          (e = this.Sji()),
          (this.vji = e),
          this.dji.UpdateInitState(e));
      }),
      (this.yji = () => {
        UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
          (this.Ndl = !0),
          this.dji.PlayExpTween(this.vji),
          (this.fji = []),
          this.Iji(),
          this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji);
        var e =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              this.qHi,
            ).GetPhantomLevel(),
          t =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
              this.qHi,
            );
        this.Cji.SetMaxState(e === t), (this.gji = 0), this.Rft(), this.Tji();
      }),
      (this.I3a = (e) => {
        e === this.qHi && this.Oqe();
      }),
      (this.f1l = () => {
        this.v1l();
      }),
      (this.Lji = () => {
        if (0 === this.fji?.length)
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionNotSelectItem",
          );
        else if (this.Cji.GetEnoughMoney()) {
          let e = !1,
            t = !1,
            i = !1;
          for (const h of this.fji) {
            var r =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
                h.IncId,
              );
            r &&
              (!e &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
                  r,
                ) &&
                (e = !0),
              !t &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
                  r,
                ) &&
                (t = !0),
              !i) &&
              ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(
                r,
              ) &&
              (i = !0);
          }
          let o = void 0;
          var n,
            s = [];
          switch (
            (e &&
              ((n =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighQuality",
                )),
              s.push(n)),
            t &&
              ((n =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighLevel",
                )),
              s.push(n)),
            i &&
              ((n =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighRare",
                )),
              s.push(n)),
            s.length)
          ) {
            case 1:
              o = 127;
              break;
            case 2:
              o = 126;
              break;
            case 3:
              o = 125;
          }
          o
            ? ((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(o)).SetTextArgs(
                ...s,
              ),
              n.FunctionMap.set(2, () => {
                this.Dji();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                n,
              ))
            : this.Dji();
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponNoEnoughMoneyText",
          );
      }),
      (this.Dji = () => {
        const i = new Array(),
          o = new Map();
        this.fji.forEach((e) => {
          var t = new Protocol_1.Aki.Protocol.Y5s(),
            t =
              ((t.m9n = e.SelectedCount),
              (t.w5n = e.IncId),
              (t.L8n = e.ItemId),
              i.push(t),
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
                e.IncId,
              ));
          t && ((e = t.GetIdentifyBackItem()), this.Rji(e, o));
        });
        var e = this.vji.GetOverExp();
        0 < e &&
          ((e =
            ModelManager_1.ModelManager.PhantomBattleModel.CalculateExpBackItem(
              e,
            )),
          this.Rji(e, o));
        const t = () => {
          var e;
          0 < o.size
            ? (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
                o),
              e.FunctionMap.set(2, () => {
                ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
                  this.qHi,
                  i,
                );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ))
            : ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
                this.qHi,
                i,
              );
        };
        let r = !1;
        for (const n of i)
          if (
            0 < n.w5n &&
            ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup(
              [n.w5n],
            )
          ) {
            r = !0;
            break;
          }
        r
          ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              247,
            )).FunctionMap.set(2, () => {
              t();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              e,
            ))
          : t();
      }),
      (this.Uji = () => {
        (this.fji = []), this.Aji();
      }),
      (this.Pji = () => {
        var t =
            ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
              this.Mji
            ].Id,
          i = ModelManager_1.ModelManager.PhantomBattleModel,
          o = i.GetVisionLevelUpMaterialUseType(),
          t = i.GetSortedExpMaterialList(this.qHi, t, 0 === o);
        if (0 === t.length)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "RoleNoMaterial",
          );
        else {
          const s = new Array();
          t.forEach((e) => {
            e = {
              IncId: e.GetUniqueId(),
              ItemId: e.GetConfigId(),
              Count: e.GetCount(),
              SelectedCount: 0,
            };
            s.push(e);
          });
          o = 1 === i.GetVisionLevelUpMaterialPutInMode();
          let e = 0;
          if (o) {
            var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
                "VisionLevelStageList",
              ),
              r = this.vji.GetCurrentLevel(),
              n = this.vji.GetCurrentMaxLevel();
            for (const h of t) {
              if (h > n) break;
              if (h > r) {
                e = this.vji.GetExpDistanceToLevel(h);
                break;
              }
            }
          } else e = this.vji.GetExpDistanceToMax();
          (i = ModelManager_1.ModelManager.WeaponModel),
            (t =
              (o &&
                !i.CheckSatisfyExp(e, 20, s, this.xji) &&
                ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
                  "Text_EchoMaterialLack_Text",
                ),
              i.AutoAddExpItem(e, 20, s, this.xji)));
          (this.fji = t), this.Aji();
        }
      }),
      (this.wji = (t, i) => {
        for (let e = this.fji.length - 1; 0 <= e; e--)
          this.fji[e].ItemId === i &&
            this.fji[e].IncId === t &&
            (this.fji[e].SelectedCount--, 0 === this.fji[e].SelectedCount) &&
            this.fji.splice(e, 1);
        this.Aji();
      }),
      (this.Bji = () => {
        this.bji(0, 0);
      }),
      (this.bji = (e, t) => {
        var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
          o = ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(
            this.qHi,
          ),
          r =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              this.qHi,
            ),
          n = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
          r =
            ((n.CurrentExp = r.GetExp()),
            (n.CurrentLevel = r.GetPhantomLevel()),
            (n.CurrentMaxLevel =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
                this.qHi,
              )),
            (n.MaxExpFunction = this.qji),
            (n.GetItemExpFunction = this.xji),
            this.fji),
          o =
            ((i.ItemDataBaseList = o),
            (i.SelectedDataList = r),
            (i.UseWayId = 26),
            (i.ExpData = n),
            new SelectableComponent_1.SelectableComponentData());
        (o.IsSingleSelected = !1),
          ((i.SelectableComponentData = o).OnChangeSelectedFunction = this.AMt),
          UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
      }),
      (this.qji = (e) => {
        var t =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              this.qHi,
            ),
          t =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
              t.GetConfigId(),
            );
        return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
          t.PhantomItem.LevelUpGroupId,
          e + 1,
        );
      }),
      (this.AMt = (e, t) => {
        (this.fji = e), (this.vji = t), this.Aji();
      }),
      (this.xji = (e) => {
        var t =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            e.IncId,
          );
        return t
          ? t.GetEatFullExp()
          : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemById(
              e.ItemId,
            ).Exp;
      }),
      (this.OnClickLockToggle = () => {
        var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
          this.qHi,
        );
        void 0 !== e &&
          ControllerHolder_1.ControllerHolder.InventoryController.ItemLockRequest(
            this.qHi,
            !e.GetIsLock(),
          );
      }),
      (this.OnClickDeprecateToggle = () => {
        var e = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
          this.qHi,
        );
        void 0 !== e &&
          ControllerHolder_1.ControllerHolder.InventoryController.ItemDeprecateRequest(
            this.qHi,
            !e.GetIsDeprecated(),
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIExtendToggle],
      [6, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [
        [5, this.OnClickLockToggle],
        [6, this.OnClickDeprecateToggle],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.BHi = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
      this.GetItem(3),
    )),
      await this.BHi.Init(this.GetViewName());
    var e =
      new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
    (e.StrengthFunction = this.Lji),
      (e.MaterialItemFunction = this.bji),
      (e.ItemClickFunction = this.Bji),
      (e.ReduceItemFunction = this.wji),
      (e.AutoFunction = this.Pji),
      (e.DeleteSelectFunction = this.Uji),
      (this.Cji = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
        this.GetItem(2),
        e,
        "VisionLevelUpView",
        !0,
      )),
      await this.Cji.Init(),
      this.Cji.SetActive(!0),
      (this.bHi =
        new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
      await this.bHi.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    (this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
      this.dji.Init(),
      this.dji.SetLevelFormatText("VisionLevel"),
      this.dji.BindPlayCompleteCallBack(this.Eji),
      this.Cji.InitFilter(0, this.oLt),
      this.Cji.SetConsumeTexture(ItemDefines_1.EItemId.Gold),
      this.Cji.SetSettingButtonVisible(!0),
      this.Cji.BindSettingButtonRedDot("VisionLevelUpSetting"),
      this.Cji.SetSettingButtonClickCallBack(() => {
        var e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(
          "VisionLevelUpSetting",
        );
        e &&
          e.IsRedDotActive() &&
          PhantomBattleController_1.PhantomBattleController.RecordVisionLevelUpSettingRedDot(),
          UiManager_1.UiManager.OpenView("VisionLevelUpSettingPopView");
      });
    var t = this.Cji.GetMaxCount();
    this.pji = new Array(t);
    for (let e = 0; e < t; e++) this.pji[e] = [{ IncId: 0, ItemId: 0 }, 0];
    this.p9i = new VisionNameText_1.VisionNameText(this.GetText(4));
  }
  Tji() {
    var e =
        ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData(),
      t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ).GetPhantomLevel();
    e.Level !== t &&
      ((e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpDelay()),
      TimerSystem_1.TimerSystem.Delay(() => {
        var e =
            UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model,
          e =
            (e &&
              UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
                e,
                "VisionStepupController",
              ),
            ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpSuccessData(
              this.qHi,
            ));
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
          e,
        );
      }, e));
  }
  Gji(e) {
    this.qHi = e;
    e = this.Sji();
    this.dji.UpdateInitState(e),
      this.Cji.SetMaxState(e.GetCurrentLevel() === e.GetCurrentMaxLevel()),
      this.AMt([], e);
  }
  Sji() {
    var e = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
      t =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ),
      t =
        ((e.CurrentExp = t.GetExp()),
        (e.CurrentLevel = t.GetPhantomLevel()),
        (e.CurrentMaxLevel =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
            this.qHi,
          )),
        (e.MaxExpFunction = this.qji),
        SelectableExpData_1.SelectableExpData.PhraseData(e));
    return t;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomLevelUp,
      this.yji,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange,
        this.f1l,
      ),
      (this.NHi = !0),
      (this.qHi = this.ExtraParams),
      (this.gji = 0),
      this.Gji(this.qHi),
      this.Rft(),
      this.P5e(),
      this.Oqe(),
      this.v1l();
  }
  P5e() {
    var e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.qHi,
      );
    this.p9i.Update(e);
  }
  Rft() {
    var e =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
          this.qHi,
        ),
      t = e.GetLevelUpPreviewData(e.GetPhantomLevel() + this.gji),
      t =
        (this.bHi.Update(t),
        e.GetLevelSubPropPreviewData(
          e.GetPhantomLevel(),
          e.GetPhantomLevel() + this.gji,
        ));
    this.BHi.Update(t, !1), this.BHi.GetRootItem().SetUIActive(0 < t.length);
  }
  Oqe() {
    var e,
      t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
        this.qHi,
      );
    void 0 !== t &&
      ((e = t.GetIsLock() ? 0 : 1),
      this.GetExtendToggle(5).SetToggleState(e, !1),
      (e = t.GetIsDeprecated() ? 1 : 0),
      this.GetExtendToggle(6).SetToggleState(e, !1));
  }
  v1l() {
    var e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetVisionLevelUpMaterialPutInMode();
    this.Cji?.UpdateAutoSelectTextByTextId(
      0 === e ? "Text_QuickInsertion_Text" : "Text_StageInsertion_Text",
    );
  }
  dSe() {
    this.NHi &&
      ((this.NHi = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.yji,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnItemFuncValueChange,
        this.I3a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnVisionLevelUpMaterialPutInModeChange,
        this.f1l,
      ));
  }
  OnBeforeHide() {
    this.dSe();
  }
  Rji(e, o) {
    e.forEach((e, t) => {
      let i = o.get(t);
      (i = i || 0), (i += e), o.set(t, i);
    });
  }
  Aji() {
    let t = 0;
    if ((this.Iji(), this.fji))
      for (let e = 0; e < this.fji.length; e++) {
        var i = this.fji[e],
          o = this.pji[e];
        (o[0].IncId = i.IncId),
          (o[0].ItemId = i.ItemId),
          (o[1] = i.SelectedCount),
          (t += this.xji(i) * i.SelectedCount);
      }
    this.vji.UpdateExp(t),
      this.dji.Update(this.vji),
      (this.gji = this.vji.GetArrivedLevel() - this.vji.GetCurrentLevel());
    var e = this.vji.GetExpDistanceToMax();
    this.Cji.UpdateComponent(
      ItemDefines_1.EItemId.Gold,
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpNeedCost(
        Math.min(t, e),
      ),
      this.pji,
    ),
      this.Rft();
  }
  Iji() {
    this.pji.forEach((e) => {
      (e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
    });
  }
  OnBeforeDestroy() {
    this.dSe(),
      this.bHi.Destroy(),
      this.BHi.Destroy(),
      this.Ndl && UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1);
  }
}
exports.VisionLevelUpView = VisionLevelUpView;
//# sourceMappingURL=VisionLevelUpView.js.map
