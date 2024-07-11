"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponLevelUpView = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  UiManager_1 = require("../../../Ui/UiManager"),
  AttributeItem_1 = require("../../Common/AttributeItem"),
  CommonItemSelectView_1 = require("../../Common/CommonItemSelectView"),
  CommonMultipleConsumeComponent_1 = require("../../Common/Consume/CommonMultipleConsumeComponent"),
  ItemGridConsumeComponent_1 = require("../../Common/Consume/ItemGridConsumeComponent"),
  ExpComponent_1 = require("../../Common/ExpTween/ExpComponent"),
  CommonIntensifyPropExpData_1 = require("../../Common/Model/CommonIntensifyPropExpData"),
  SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent"),
  SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ItemDefines_1 = require("../../Item/Data/ItemDefines"),
  ItemRewardController_1 = require("../../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData"),
  RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  UiSceneManager_1 = require("../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  WeaponController_1 = require("../WeaponController"),
  ITEM_MAX_COUNT = 20;
class WeaponLevelUpView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.gHi = void 0),
      (this.SHi = new SelectableExpData_1.SelectableExpData()),
      (this.WeaponInstance = void 0),
      (this.xNo = void 0),
      (this.fHi = void 0),
      (this.iuo = []),
      (this.BNo = void 0),
      (this.MHi = void 0),
      (this.EHi = void 0),
      (this.Qft = void 0),
      (this.Nki = void 0),
      (this.Oki = void 0),
      (this.bNo = () => {
        this.uuo(),
          this.gHi.PlayExpTween(this.SHi),
          (this.BNo.length = 0),
          this.LHi(),
          this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.MHi),
          this.fHi.SetMaxState(this.WeaponInstance.IsLevelMax());
      }),
      (this.qNo = (e) => {
        this.iuo = e;
      }),
      (this.GNo = (e) => this.WeaponInstance.GetLevelExp(e)),
      (this.BHi = (e) => {
        return ModelManager_1.ModelManager.WeaponModel.GetWeaponItemExp(
          e.IncId,
          e.ItemId,
        );
      }),
      (this.nuo = () => {
        this.NNo(), this.jlo();
      }),
      (this.tpt = () => new AttributeItem_1.AttributeItem()),
      (this.UHi = () => {
        if (!this.BNo || this.BNo.length <= 0)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponSelectMaterialTipsText",
          );
        else if (this.fHi.GetEnoughMoney()) {
          let e = !1,
            t = !1,
            i = !1;
          for (const a of this.BNo) {
            var s =
              ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(
                a.IncId,
              );
            s &&
              (!e &&
                ModelManager_1.ModelManager.WeaponModel.IsWeaponHighQuality(
                  s,
                ) &&
                (e = !0),
              !t &&
                ModelManager_1.ModelManager.WeaponModel.IsWeaponHighLevel(s) &&
                (t = !0),
              !i) &&
              ModelManager_1.ModelManager.WeaponModel.IsWeaponHighResonanceLevel(
                s,
              ) &&
              (i = !0);
          }
          let r = void 0;
          var o,
            n = [];
          switch (
            (e &&
              ((o =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "WeaponHighQuality",
                )),
              n.push(o)),
            t &&
              ((o =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "WeaponHasLevelUp",
                )),
              n.push(o)),
            i &&
              ((o =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "WeaponHasResonance",
                )),
              n.push(o)),
            n.length)
          ) {
            case 1:
              r = 3;
              break;
            case 2:
              r = 2;
              break;
            case 3:
              r = 1;
          }
          r
            ? ((o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r)).SetTextArgs(
                ...n,
              ),
              o.FunctionMap.set(2, () => {
                this.ONo();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                o,
              ))
            : this.ONo();
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponNoEnoughMoneyText",
          );
      }),
      (this.ONo = () => {
        var e = () => {
            var e = this.WeaponInstance.GetIncId();
            WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(
              e,
              this.BNo,
            );
          },
          t = this.SHi.GetOverExp();
        if (0 < t) {
          var i,
            t =
              ModelManager_1.ModelManager.WeaponModel.GetCanChangeMaterialList(
                t,
              );
          if (0 < t.size)
            return (
              ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
                t),
              i.FunctionMap.set(2, e),
              void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                i,
              )
            );
        }
        e();
      }),
      (this.GHi = (e, t) => {
        var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
          r = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(
            this.WeaponInstance.GetIncId(),
          ),
          s = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
          o =
            ((s.CurrentExp = this.SHi.GetCurrentExp()),
            (s.CurrentLevel = this.SHi.GetCurrentLevel()),
            (s.CurrentMaxLevel = this.SHi.GetCurrentMaxLevel()),
            (s.MaxExpFunction = this.GNo),
            (s.GetItemExpFunction = this.BHi),
            this.BNo),
          n = new SelectableComponent_1.SelectableComponentData();
        (n.IsSingleSelected = !1),
          (n.OnChangeSelectedFunction = this.pvt),
          (i.ItemDataBaseList = r),
          (i.SelectedDataList = o),
          (i.ExpData = s),
          (i.SelectableComponentData = n),
          (i.UseWayId = 2),
          UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
      }),
      (this.pvt = (e, t) => {
        (this.BNo = e), (this.SHi = t), this.xHi();
      }),
      (this.qHi = () => {
        this.GHi(0, 0);
      }),
      (this.PHi = () => {
        (this.BNo = []), this.xHi();
      }),
      (this.wHi = () => {
        var e,
          t =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListUseToAuto(
              this.WeaponInstance.GetIncId(),
            ),
          i = [],
          r = this.kNo(this.EHi);
        for (const s of t)
          s.GetQuality() > r ||
            ((e = {
              IncId: s.GetUniqueId(),
              ItemId: s.GetConfigId(),
              Count: s.GetCount(),
              SelectedCount: 0,
            }),
            i.push(e));
        0 === i.length
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "RoleNoMaterial",
            )
          : ((t = this.SHi.GetExpDistanceToMax()),
            (t = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(
              t,
              ITEM_MAX_COUNT,
              i,
              this.BHi,
            )),
            (this.BNo = t),
            this.BNo.sort((e, t) => {
              e = 0 < e.IncId;
              return e != 0 < t.IncId ? (e ? 1 : -1) : 0;
            }),
            this.xHi());
      }),
      (this.bHi = (t, i) => {
        for (let e = this.BNo.length - 1; 0 <= e; e--)
          this.BNo[e].ItemId === i &&
            this.BNo[e].IncId === t &&
            (this.BNo[e].SelectedCount--, 0 === this.BNo[e].SelectedCount) &&
            this.BNo.splice(e, 1);
        this.xHi();
      }),
      (this.zIt = (e) => {
        (this.EHi = e), this.FNo();
      }),
      (this.luo = () => {
        if (0 < this.iuo.length) {
          var e = [];
          for (const r of this.iuo) {
            var t = r[0],
              i = r[1],
              i = new RewardItemData_1.RewardItemData(t.ItemId, i, t.IncId);
            e.push(i);
          }
          ItemRewardController_1.ItemRewardController.OpenCommonRewardView(
            1010,
            e,
          );
        }
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WeaponCanGoBreach,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var e =
      new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
    (e.StrengthFunction = this.UHi),
      (e.MaterialItemFunction = this.GHi),
      (e.ItemClickFunction = this.qHi),
      (e.ReduceItemFunction = this.bHi),
      (e.AutoFunction = this.wHi),
      (e.DeleteSelectFunction = this.PHi),
      (this.fHi = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
        this.GetItem(2),
        e,
      )),
      await this.fHi.Init(),
      this.fHi.SetActive(!0);
  }
  OnStart() {
    var e = this.ExtraParams;
    (this.WeaponInstance =
      ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
      this.VNo(),
      this.wao(),
      this.HNo();
  }
  OnBeforeDestroy() {
    this.gHi.Destroy(), this.fHi.Destroy();
  }
  OnBeforeShow() {
    this.NNo(), this.C4e(), this.jlo(), this.jNo();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponLevelUp,
      this.bNo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
        this.qNo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponLevelUp,
      this.bNo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
        this.qNo,
      );
  }
  OnHideUiTabViewBase(e) {
    e && UiManager_1.UiManager.CloseView("CommonItemSelectViewRight");
  }
  VNo() {
    (this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
      this.gHi.Init(),
      this.gHi.SetLevelFormatText("LevelNumber"),
      this.gHi.BindPlayCompleteCallBack(this.nuo),
      this.SHi.SetMaxExpFunction(this.GNo);
  }
  NNo() {
    this.WNo(), this.gHi.UpdateInitState(this.SHi);
  }
  WNo() {
    var e = this.WeaponInstance.GetLevel(),
      t = this.WeaponInstance.GetCurrentMaxLevel(),
      i = this.WeaponInstance.GetExp(),
      r = this.WeaponInstance.GetMaxLevel();
    this.SHi.UpdateComponent(e, t, i, r);
  }
  uuo() {
    var t = this.SHi.GetCurrentLevel(),
      i = this.WeaponInstance.GetLevel(),
      r =
        ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
        (this.Oki =
          UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
        WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
          "WeaponLevelUpMaterialController",
          this.Nki,
          this.Oki,
        ),
        this.Nki.Model);
    if (
      (UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(
        r,
        "WeaponLevelUpEffect",
      ),
      t !== i)
    ) {
      r = this.duo(t, i);
      let e = void 0;
      (e = this.WeaponInstance.CanGoBreach()
        ? {
            Title: "Text_WeaponLevelUpSuccessText_Text",
            LevelInfo: {
              PreUpgradeLv: t,
              UpgradeLv: i,
              FormatStringId: "Text_LevelShow_Text",
              IsMaxLevel: !0,
            },
            AttributeInfo: r,
            ClickText: "Text_TurnToBreach_Text",
            ClickFunction: this.luo,
          }
        : {
            Title: "Text_WeaponLevelUpSuccessText_Text",
            LevelInfo: {
              PreUpgradeLv: t,
              UpgradeLv: i,
              FormatStringId: "Text_LevelShow_Text",
              IsMaxLevel:
                this.WeaponInstance.GetLevel() ===
                this.WeaponInstance.GetMaxLevel(),
            },
            AttributeInfo: r,
          }) &&
        ((t =
          ConfigManager_1.ConfigManager.RoleConfig.GetWeaponLevelUpSuccessDelayTime()),
        UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !0),
        TimerSystem_1.TimerSystem.Delay(() => {
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
            e,
          ),
            UiLayer_1.UiLayer.SetShowMaskLayer("OpenLevelUpSuccessView", !1);
        }, t));
    }
  }
  wao() {
    this.Qft = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.tpt,
    );
  }
  jlo() {
    var e = this.WeaponInstance.GetWeaponConfig(),
      t =
        ((this.xNo =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(
            e,
          )),
        this.WeaponInstance.GetBreachLevel()),
      i = this.SHi.GetCurrentLevel(),
      r = this.SHi.GetArrivedLevel(),
      s = [];
    for (const h of this.xNo) {
      var o = h.CurveId,
        n = h.PropId.Value,
        a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o, n, i, t);
      let e = 0;
      i < r &&
        (e = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(o, n, r, t));
      o = {
        Id: h.PropId.Id,
        IsRatio: h.PropId.IsRatio,
        CurValue: a,
        BgActive: !0,
        ShowNext: e > a,
        NextValue: e,
      };
      s.push(o);
    }
    this.Qft.RefreshByData(s);
  }
  duo(e, t) {
    var i = [],
      r = this.WeaponInstance.GetBreachLevel();
    for (const n of this.xNo) {
      var s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          n.CurveId,
          n.PropId.Value,
          e,
          r,
        ),
        o = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
          n.CurveId,
          n.PropId.Value,
          t,
          r,
        );
      s !== o &&
        ((s = new AttrListScrollData_1.AttrListScrollData(
          n.PropId.Id,
          s,
          o,
          0,
          n.PropId.IsRatio,
          0,
        )),
        i.push(
          RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.ConvertsAttrListScrollDataToAttributeInfo(
            s,
          ),
        ));
    }
    return i;
  }
  HNo() {
    this.fHi.InitFilter(2, this.zIt),
      this.fHi.SetConsumeTexture(ItemDefines_1.EItemId.Gold),
      (this.EHi = this.fHi.GetCurrentDropDownSelectIndex()),
      this.EHi && this.FNo();
    var t = this.fHi.GetMaxCount();
    this.MHi = new Array(t);
    for (let e = 0; e < t; e++) this.MHi[e] = [{ IncId: 0, ItemId: 0 }, 0];
  }
  jNo() {
    this.xHi(), this.fHi.SetMaxState(this.WeaponInstance.IsLevelMax());
  }
  FNo() {
    var e = this.kNo(this.EHi);
    this.fHi.RefreshConditionText(
      ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
        .ConsumeFilterText,
    );
  }
  kNo(e) {
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)].Id;
  }
  xHi() {
    let t = 0;
    if ((this.LHi(), this.BNo))
      for (let e = 0; e < this.BNo.length; e++) {
        var i = this.BNo[e],
          r = this.MHi[e];
        (r[0].IncId = i.IncId),
          (r[0].ItemId = i.ItemId),
          (r[1] = i.SelectedCount),
          (t += this.BHi(i) * i.SelectedCount);
      }
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListCost(
      this.MHi,
    );
    this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.MHi),
      this.SHi.UpdateExp(t),
      this.gHi.Update(this.SHi),
      this.jlo();
  }
  C4e() {
    var e = this.WeaponInstance.GetWeaponConfig(),
      t = e.WeaponName,
      e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        e.QualityId,
      ),
      e = UE.Color.FromHex(e.DropColor);
    this.GetText(4).SetColor(e), this.GetText(4).ShowTextNew(t);
  }
  LHi() {
    this.MHi.forEach((e) => {
      (e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
    });
  }
}
exports.WeaponLevelUpView = WeaponLevelUpView;
//# sourceMappingURL=WeaponLevelUpView.js.map
