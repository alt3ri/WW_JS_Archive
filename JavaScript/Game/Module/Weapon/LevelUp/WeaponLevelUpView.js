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
      (this.dji = void 0),
      (this.vji = new SelectableExpData_1.SelectableExpData()),
      (this.WeaponInstance = void 0),
      (this.UOo = void 0),
      (this.Cji = void 0),
      (this.zuo = []),
      (this.POo = void 0),
      (this.pji = void 0),
      (this.Mji = void 0),
      (this.nvt = void 0),
      (this.N2i = void 0),
      (this.O2i = void 0),
      (this.xOo = () => {
        this.aco(),
          this.dji.PlayExpTween(this.vji),
          (this.POo.length = 0),
          this.Iji(),
          this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.pji),
          this.Cji.SetMaxState(this.WeaponInstance.IsLevelMax());
      }),
      (this.wOo = (e) => {
        this.zuo = e;
      }),
      (this.BOo = (e) => this.WeaponInstance.GetLevelExp(e)),
      (this.xji = (e) => {
        return ModelManager_1.ModelManager.WeaponModel.GetWeaponItemExp(
          e.IncId,
          e.ItemId,
        );
      }),
      (this.tco = () => {
        this.bOo(), this.k1o();
      }),
      (this.mvt = () => new AttributeItem_1.AttributeItem()),
      (this.Dji = () => {
        if (!this.POo || this.POo.length <= 0)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponSelectMaterialTipsText",
          );
        else if (this.Cji.GetEnoughMoney()) {
          let e = !1,
            t = !1,
            i = !1;
          for (const a of this.POo) {
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
                this.qOo();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                o,
              ))
            : this.qOo();
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponNoEnoughMoneyText",
          );
      }),
      (this.qOo = () => {
        var e = () => {
            var e = this.WeaponInstance.GetIncId();
            WeaponController_1.WeaponController.SendPbWeaponLevelUpRequest(
              e,
              this.POo,
            );
          },
          t = this.vji.GetOverExp();
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
      (this.bji = (e, t) => {
        var i = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData(),
          r = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(
            this.WeaponInstance.GetIncId(),
          ),
          s = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData(),
          o =
            ((s.CurrentExp = this.vji.GetCurrentExp()),
            (s.CurrentLevel = this.vji.GetCurrentLevel()),
            (s.CurrentMaxLevel = this.vji.GetCurrentMaxLevel()),
            (s.MaxExpFunction = this.BOo),
            (s.GetItemExpFunction = this.xji),
            this.POo),
          n = new SelectableComponent_1.SelectableComponentData();
        (n.IsSingleSelected = !1),
          (n.OnChangeSelectedFunction = this.AMt),
          (i.ItemDataBaseList = r),
          (i.SelectedDataList = o),
          (i.ExpData = s),
          (i.SelectableComponentData = n),
          (i.UseWayId = 2),
          UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", i);
      }),
      (this.AMt = (e, t) => {
        (this.POo = e), (this.vji = t), this.Aji();
      }),
      (this.Bji = () => {
        this.bji(0, 0);
      }),
      (this.Uji = () => {
        (this.POo = []), this.Aji();
      }),
      (this.Pji = () => {
        var e,
          t =
            ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListUseToAuto(
              this.WeaponInstance.GetIncId(),
            ),
          i = [],
          r = this.GOo(this.Mji);
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
          : ((t = this.vji.GetExpDistanceToMax()),
            (t = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(
              t,
              ITEM_MAX_COUNT,
              i,
              this.xji,
            )),
            (this.POo = t),
            this.POo.sort((e, t) => {
              e = 0 < e.IncId;
              return e != 0 < t.IncId ? (e ? 1 : -1) : 0;
            }),
            this.Aji());
      }),
      (this.wji = (t, i) => {
        for (let e = this.POo.length - 1; 0 <= e; e--)
          this.POo[e].ItemId === i &&
            this.POo[e].IncId === t &&
            (this.POo[e].SelectedCount--, 0 === this.POo[e].SelectedCount) &&
            this.POo.splice(e, 1);
        this.Aji();
      }),
      (this.oLt = (e) => {
        (this.Mji = e), this.NOo();
      }),
      (this.nco = () => {
        if (0 < this.zuo.length) {
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
    (e.StrengthFunction = this.Dji),
      (e.MaterialItemFunction = this.bji),
      (e.ItemClickFunction = this.Bji),
      (e.ReduceItemFunction = this.wji),
      (e.AutoFunction = this.Pji),
      (e.DeleteSelectFunction = this.Uji),
      (this.Cji = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
        this.GetItem(2),
        e,
      )),
      await this.Cji.Init(),
      this.Cji.SetActive(!0);
  }
  OnStart() {
    var e = this.ExtraParams;
    (this.WeaponInstance =
      ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e)),
      this.OOo(),
      this.Uho(),
      this.kOo();
  }
  OnBeforeDestroy() {
    this.dji.Destroy(), this.Cji.Destroy();
  }
  OnBeforeShow() {
    this.bOo(), this.P5e(), this.k1o(), this.FOo();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WeaponLevelUp,
      this.xOo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
        this.wOo,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WeaponLevelUp,
      this.xOo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WeaponLevelUpReceiveItem,
        this.wOo,
      );
  }
  OnHideUiTabViewBase(e) {
    e && UiManager_1.UiManager.CloseView("CommonItemSelectViewRight");
  }
  OOo() {
    (this.dji = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
      this.dji.Init(),
      this.dji.SetLevelFormatText("LevelNumber"),
      this.dji.BindPlayCompleteCallBack(this.tco),
      this.vji.SetMaxExpFunction(this.BOo);
  }
  bOo() {
    this.VOo(), this.dji.UpdateInitState(this.vji);
  }
  VOo() {
    var e = this.WeaponInstance.GetLevel(),
      t = this.WeaponInstance.GetCurrentMaxLevel(),
      i = this.WeaponInstance.GetExp(),
      r = this.WeaponInstance.GetMaxLevel();
    this.vji.UpdateComponent(e, t, i, r);
  }
  aco() {
    var t = this.vji.GetCurrentLevel(),
      i = this.WeaponInstance.GetLevel(),
      r =
        ((this.N2i = UiSceneManager_1.UiSceneManager.GetWeaponObserver()),
        (this.O2i =
          UiSceneManager_1.UiSceneManager.GetWeaponScabbardObserver()),
        WeaponController_1.WeaponController.PlayWeaponRenderingMaterial(
          "WeaponLevelUpMaterialController",
          this.N2i,
          this.O2i,
        ),
        this.N2i.Model);
    if (
      (UiModelUtil_1.UiModelUtil.PlayEffectAtRootComponent(
        r,
        "WeaponLevelUpEffect",
      ),
      t !== i)
    ) {
      r = this._co(t, i);
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
            ClickFunction: this.nco,
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
  Uho() {
    this.nvt = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(1),
      this.mvt,
    );
  }
  k1o() {
    var e = this.WeaponInstance.GetWeaponConfig(),
      t =
        ((this.UOo =
          ModelManager_1.ModelManager.WeaponModel.GetWeaponAttributeParamList(
            e,
          )),
        this.WeaponInstance.GetBreachLevel()),
      i = this.vji.GetCurrentLevel(),
      r = this.vji.GetArrivedLevel(),
      s = [];
    for (const h of this.UOo) {
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
    this.nvt.RefreshByData(s);
  }
  _co(e, t) {
    var i = [],
      r = this.WeaponInstance.GetBreachLevel();
    for (const n of this.UOo) {
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
  kOo() {
    this.Cji.InitFilter(2, this.oLt),
      this.Cji.SetConsumeTexture(ItemDefines_1.EItemId.Gold),
      (this.Mji = this.Cji.GetCurrentDropDownSelectIndex()),
      this.Mji && this.NOo();
    var t = this.Cji.GetMaxCount();
    this.pji = new Array(t);
    for (let e = 0; e < t; e++) this.pji[e] = [{ IncId: 0, ItemId: 0 }, 0];
  }
  FOo() {
    this.Aji(), this.Cji.SetMaxState(this.WeaponInstance.IsLevelMax());
  }
  NOo() {
    var e = this.GOo(this.Mji);
    this.Cji.RefreshConditionText(
      ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
        .ConsumeFilterText,
    );
  }
  GOo(e) {
    var t = ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList();
    return t[MathUtils_1.MathUtils.Clamp(e, 0, t.length - 1)].Id;
  }
  Aji() {
    let t = 0;
    if ((this.Iji(), this.POo))
      for (let e = 0; e < this.POo.length; e++) {
        var i = this.POo[e],
          r = this.pji[e];
        (r[0].IncId = i.IncId),
          (r[0].ItemId = i.ItemId),
          (r[1] = i.SelectedCount),
          (t += this.xji(i) * i.SelectedCount);
      }
    var e = ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemListCost(
      this.pji,
    );
    this.Cji.UpdateComponent(ItemDefines_1.EItemId.Gold, e, this.pji),
      this.vji.UpdateExp(t),
      this.dji.Update(this.vji),
      this.k1o();
  }
  P5e() {
    var e = this.WeaponInstance.GetWeaponConfig(),
      t = e.WeaponName,
      e = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(
        e.QualityId,
      ),
      e = UE.Color.FromHex(e.DropColor);
    this.GetText(4).SetColor(e), this.GetText(4).ShowTextNew(t);
  }
  Iji() {
    this.pji.forEach((e) => {
      (e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
    });
  }
}
exports.WeaponLevelUpView = WeaponLevelUpView;
//# sourceMappingURL=WeaponLevelUpView.js.map
