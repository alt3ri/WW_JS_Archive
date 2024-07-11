"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponLevelUpView = void 0);
const UE = require("ue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../Ui/UiLayer");
const UiManager_1 = require("../../../Ui/UiManager");
const AttributeItem_1 = require("../../Common/AttributeItem");
const CommonItemSelectView_1 = require("../../Common/CommonItemSelectView");
const CommonMultipleConsumeComponent_1 = require("../../Common/Consume/CommonMultipleConsumeComponent");
const ItemGridConsumeComponent_1 = require("../../Common/Consume/ItemGridConsumeComponent");
const ExpComponent_1 = require("../../Common/ExpTween/ExpComponent");
const CommonIntensifyPropExpData_1 = require("../../Common/Model/CommonIntensifyPropExpData");
const SelectableComponent_1 = require("../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectableExpData_1 = require("../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const AttrListScrollData_1 = require("../../RoleUi/View/ViewData/AttrListScrollData");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../UiModel/UiModelUtil");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const WeaponController_1 = require("../WeaponController");
const ITEM_MAX_COUNT = 20;
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
          let e = !1;
          let t = !1;
          let i = !1;
          for (const a of this.BNo) {
            const s =
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
          let o;
          const n = [];
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
        const e = () => {
          const e = this.WeaponInstance.GetIncId();
          WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(
            e,
            this.BNo,
          );
        };
        var t = this.SHi.GetOverExp();
        if (t > 0) {
          let i;
          var t =
            ModelManager_1.ModelManager.WeaponModel.GetCanChangeMaterialList(t);
          if (t.size > 0)
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
        const i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
        const r = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(
          this.WeaponInstance.GetIncId(),
        );
        const s = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
        const o =
          ((s.CurrentExp = this.SHi.GetCurrentExp()),
          (s.CurrentLevel = this.SHi.GetCurrentLevel()),
          (s.CurrentMaxLevel = this.SHi.GetCurrentMaxLevel()),
          (s.MaxExpFunction = this.GNo),
          (s.GetItemExpFunction = this.BHi),
          this.BNo);
        const n = new SelectableComponent_1.SelectableComponentData();
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
        let e;
        let t =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListUseToAuto(
            this.WeaponInstance.GetIncId(),
          );
        const i = [];
        const r = this.kNo(this.EHi);
        for (const s of t)
          s.GetQuality() > r ||
            ((e = {
              IncId: s.GetUniqueId(),
              ItemId: s.GetConfigId(),
              Count: s.GetCount(),
              SelectedCount: 0,
            }),
            i.push(e));
        i.length === 0
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
              e = e.IncId > 0;
              return e != t.IncId > 0 ? (e ? 1 : -1) : 0;
            }),
            this.xHi());
      }),
      (this.bHi = (t, i) => {
        for (let e = this.BNo.length - 1; e >= 0; e--)
          this.BNo[e].ItemId === i &&
            this.BNo[e].IncId === t &&
            (this.BNo[e].SelectedCount--, this.BNo[e].SelectedCount === 0) &&
            this.BNo.splice(e, 1);
        this.xHi();
      }),
      (this.zIt = (e) => {
        (this.EHi = e), this.FNo();
      }),
      (this.luo = () => {
        if (this.iuo.length > 0) {
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
    const e =
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
    const e = this.ExtraParams;
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
    const e = this.WeaponInstance.GetLevel();
    const t = this.WeaponInstance.GetCurrentMaxLevel();
    const i = this.WeaponInstance.GetExp();
    const r = this.WeaponInstance.GetMaxLevel();
    this.SHi.UpdateComponent(e, t, i, r);
  }
  uuo() {
    let t = this.SHi.GetCurrentLevel();
    const i = this.WeaponInstance.GetLevel();
    let r =
      ((this.Nki = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
      (this.Oki = UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
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
    const e = this.WeaponInstance.GetWeaponConfig();
    const t =
      ((this.xNo =
        ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(e)),
      this.WeaponInstance.GetBreachLevel());
    const i = this.SHi.GetCurrentLevel();
    const r = this.SHi.GetArrivedLevel();
    const s = [];
    for (const h of this.xNo) {
      let o = h.CurveId;
      const n = h.PropId.Value;
      const a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        o,
        n,
        i,
        t,
      );
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
    const i = [];
    const r = this.WeaponInstance.GetBreachLevel();
    for (const n of this.xNo) {
      let s = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
        n.CurveId,
        n.PropId.Value,
        e,
        r,
      );
      const o = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(
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
    const t = this.fHi.GetMaxCount();
    this.MHi = new Array(t);
    for (let e = 0; e < t; e++) this.MHi[e] = [{ IncId: 0, ItemId: 0 }, 0];
  }
  jNo() {
    this.xHi(), this.fHi.SetMaxState(this.WeaponInstance.IsLevelMax());
  }
  FNo() {
    const e = this.kNo(this.EHi);
    this.fHi.RefreshConditionText(
      ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
        .ConsumeFilterText,
    );
  }
  kNo(e) {
    const t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)].Id;
  }
  xHi() {
    let t = 0;
    if ((this.LHi(), this.BNo))
      for (let e = 0; e < this.BNo.length; e++) {
        const i = this.BNo[e];
        const r = this.MHi[e];
        (r[0].IncId = i.IncId),
          (r[0].ItemId = i.ItemId),
          (r[1] = i.SelectedCount),
          (t += this.BHi(i) * i.SelectedCount);
      }
    const e = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListCost(
      this.MHi,
    );
    this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.MHi),
      this.SHi.UpdateExp(t),
      this.gHi.Update(this.SHi),
      this.jlo();
  }
  C4e() {
    var e = this.WeaponInstance.GetWeaponConfig();
    const t = e.WeaponName;
    var e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
      e.QualityId,
    );
    var e = UE.Color.FromHex(e.DropColor);
    this.GetText(4).SetColor(e), this.GetText(4).ShowTextNew(t);
  }
  LHi() {
    this.MHi.forEach((e) => {
      (e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
    });
  }
}
exports.WeaponLevelUpView = WeaponLevelUpView;
// # sourceMappingURL=WeaponLevelUpView.js.map
