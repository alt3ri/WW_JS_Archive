"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionLevelUpView = void 0);
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const CommonMultipleConsumeComponent_1 = require("../../../Common/Consume/CommonMultipleConsumeComponent");
const ItemGridConsumeComponent_1 = require("../../../Common/Consume/ItemGridConsumeComponent");
const ExpComponent_1 = require("../../../Common/ExpTween/ExpComponent");
const CommonIntensifyPropExpData_1 = require("../../../Common/Model/CommonIntensifyPropExpData");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectableExpData_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableExpData");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const RoleLevelUpSuccessController_1 = require("../../../RoleUi/RoleLevel/RoleLevelUpSuccessController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const VisionIdentifyComponent_1 = require("./VisionIdentifyComponent");
const VisionMainAttributeComponent_1 = require("./VisionMainAttributeComponent");
const VisionNameText_1 = require("./VisionNameText");
class VisionLevelUpView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.gHi = void 0),
      (this.fHi = void 0),
      (this.G7i = 0),
      (this.pHi = 0),
      (this.vHi = []),
      (this.MHi = void 0),
      (this.SHi = void 0),
      (this.q7i = void 0),
      (this.b7i = void 0),
      (this.EHi = 0),
      (this.O7i = !1),
      (this.v8i = void 0),
      (this.zIt = (e) => {
        this.EHi = e;
        e =
          ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
            this.EHi
          ].Id;
        this.fHi.RefreshConditionText(
          ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityById(e)
            .ConsumeFilterText,
        );
      }),
      (this.yHi = (e) => {
        e &&
          (UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !1),
          (e = this.IHi()),
          (this.SHi = e),
          this.gHi.UpdateInitState(e));
      }),
      (this.THi = () => {
        UiLayer_1.UiLayer.SetShowMaskLayer("PhantomLevelUp", !0),
          this.gHi.PlayExpTween(this.SHi),
          (this.vHi = []),
          this.LHi(),
          this.fHi.UpdateComponent(ItemDefines_1.EItemId.Gold, 0, this.MHi);
        const e =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            this.G7i,
          ).GetPhantomLevel();
        const i =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
            this.G7i,
          );
        this.fHi.SetMaxState(e === i), (this.pHi = 0), this.g0t(), this.DHi();
      }),
      (this.RHi = () => {
        if (this.vHi?.length === 0)
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "VisionNotSelectItem",
          );
        else if (this.fHi.GetEnoughMoney()) {
          let e = !1;
          let i = !1;
          let t = !1;
          for (const h of this.vHi) {
            const r =
              ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
                h.IncId,
              );
            r &&
              (!e &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(
                  r,
                ) &&
                (e = !0),
              !i &&
                ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(
                  r,
                ) &&
                (i = !0),
              !t) &&
              ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(
                r,
              ) &&
              (t = !0);
          }
          let o = void 0;
          let n;
          const s = [];
          switch (
            (e &&
              ((n =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighQuality",
                )),
              s.push(n)),
            i &&
              ((n =
                ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                  "VisionHighLevel",
                )),
              s.push(n)),
            t &&
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
                this.UHi();
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                n,
              ))
            : this.UHi();
        } else
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponNoEnoughMoneyText",
          );
      }),
      (this.UHi = () => {
        const t = new Array();
        const o = new Map();
        this.vHi.forEach((e) => {
          var i = new Protocol_1.Aki.Protocol.e3s();
          var i =
            ((i.I5n = e.SelectedCount),
            (i.Ykn = e.IncId),
            (i.G3n = e.ItemId),
            t.push(i),
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
              e.IncId,
            ));
          i && ((e = i.GetIdentifyBackItem()), this.AHi(e, o));
        });
        let e = this.SHi.GetOverExp();
        e > 0 &&
          ((e =
            ModelManager_1.ModelManager.PhantomBattleModel.CalculateExpBackItem(
              e,
            )),
          this.AHi(e, o)),
          o.size > 0
            ? (((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(24)).ItemIdMap =
                o),
              e.FunctionMap.set(2, () => {
                ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
                  this.G7i,
                  t,
                );
              }),
              ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                e,
              ))
            : ControllerHolder_1.ControllerHolder.PhantomBattleController.SendPhantomLevelUpRequest(
                this.G7i,
                t,
              );
      }),
      (this.PHi = () => {
        (this.vHi = []), this.xHi();
      }),
      (this.wHi = () => {
        var e =
          ConfigManager_1.ConfigManager.CommonConfig.GetItemQualityList()[
            this.EHi
          ].Id;
        var e =
          ModelManager_1.ModelManager.PhantomBattleModel.GetSortedExpMaterialList(
            this.G7i,
            e,
          );
        if (e.length === 0)
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "WeaponNoMaterial",
          );
        else {
          const i = new Array();
          e.forEach((e) => {
            e = {
              IncId: e.GetUniqueId(),
              ItemId: e.GetConfigId(),
              Count: e.GetCount(),
              SelectedCount: 0,
            };
            i.push(e);
          });
          (e = this.SHi.GetExpDistanceToMax()),
            (e = ModelManager_1.ModelManager.WeaponModel.AutoAddExpItem(
              e,
              20,
              i,
              this.BHi,
            ));
          (this.vHi = e), this.xHi();
        }
      }),
      (this.bHi = (i, t) => {
        for (let e = this.vHi.length - 1; e >= 0; e--)
          this.vHi[e].ItemId === t &&
            this.vHi[e].IncId === i &&
            (this.vHi[e].SelectedCount--, this.vHi[e].SelectedCount === 0) &&
            this.vHi.splice(e, 1);
        this.xHi();
      }),
      (this.qHi = () => {
        this.GHi(0, 0);
      }),
      (this.GHi = (e, i) => {
        const t = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
        var o =
          ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(
            this.G7i,
          );
        var r =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            this.G7i,
          );
        const n = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
        var r =
          ((n.CurrentExp = r.GetExp()),
          (n.CurrentLevel = r.GetPhantomLevel()),
          (n.CurrentMaxLevel =
            ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
              this.G7i,
            )),
          (n.MaxExpFunction = this.NHi),
          (n.GetItemExpFunction = this.BHi),
          this.vHi);
        var o =
          ((t.ItemDataBaseList = o),
          (t.SelectedDataList = r),
          (t.UseWayId = 26),
          (t.ExpData = n),
          new SelectableComponent_1.SelectableComponentData());
        (o.IsSingleSelected = !1),
          ((t.SelectableComponentData = o).OnChangeSelectedFunction = this.pvt),
          UiManager_1.UiManager.OpenView("CommonItemSelectViewRight", t);
      }),
      (this.NHi = (e) => {
        var i =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            this.G7i,
          );
        var i =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
            i.GetConfigId(),
          );
        return ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomLevelExpByGroupIdAndLevel(
          i.PhantomItem.LevelUpGroupId,
          e + 1,
        );
      }),
      (this.pvt = (e, i) => {
        (this.vHi = e), (this.SHi = i), this.xHi();
      }),
      (this.BHi = (e) => {
        const i =
          ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
            e.IncId,
          );
        return i
          ? i.GetEatFullExp()
          : ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemById(
              e.ItemId,
            ).Exp;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    (this.b7i = new VisionIdentifyComponent_1.LevelUpIdentifyComponent(
      this.GetItem(3),
    )),
      await this.b7i.Init(this.GetViewName());
    const e =
      new CommonMultipleConsumeComponent_1.CommonMultipleConsumeFunction();
    (e.StrengthFunction = this.RHi),
      (e.MaterialItemFunction = this.GHi),
      (e.ItemClickFunction = this.qHi),
      (e.ReduceItemFunction = this.bHi),
      (e.AutoFunction = this.wHi),
      (e.DeleteSelectFunction = this.PHi),
      (this.fHi = new ItemGridConsumeComponent_1.ItemGridConsumeComponent(
        this.GetItem(2),
        e,
        "VisionLevelUpView",
      )),
      await this.fHi.Init(),
      this.fHi.SetActive(!0),
      (this.q7i =
        new VisionMainAttributeComponent_1.VisionMainAttributeComponent()),
      await this.q7i.CreateByActorAsync(this.GetItem(1).GetOwner());
  }
  OnStart() {
    (this.gHi = new ExpComponent_1.ExpComponent(this.GetItem(0), !1)),
      this.gHi.Init(),
      this.gHi.SetLevelFormatText("VisionLevel"),
      this.gHi.BindPlayCompleteCallBack(this.yHi),
      this.fHi.InitFilter(0, this.zIt),
      this.fHi.SetConsumeTexture(ItemDefines_1.EItemId.Gold);
    const i = this.fHi.GetMaxCount();
    this.MHi = new Array(i);
    for (let e = 0; e < i; e++) this.MHi[e] = [{ IncId: 0, ItemId: 0 }, 0];
    this.v8i = new VisionNameText_1.VisionNameText(this.GetText(4));
  }
  DHi() {
    let e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetCachePhantomLevelUpData();
    const i =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      ).GetPhantomLevel();
    e.Level !== i &&
      ((e =
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionLevelUpDelay()),
      TimerSystem_1.TimerSystem.Delay(() => {
        var e =
          UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model;
        var e =
          (e &&
            UiModelUtil_1.UiModelUtil.SetRenderingMaterial(
              e,
              "VisionStepupController",
            ),
          ModelManager_1.ModelManager.PhantomBattleModel.GetLevelUpSuccessData(
            this.G7i,
          ));
        RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessAttributeView(
          e,
        );
      }, e));
  }
  OHi(e) {
    this.G7i = e;
    e = this.IHi();
    this.gHi.UpdateInitState(e),
      this.fHi.SetMaxState(e.GetCurrentLevel() === e.GetCurrentMaxLevel()),
      this.pvt([], e);
  }
  IHi() {
    const e = new CommonIntensifyPropExpData_1.CommonIntensifyPropExpData();
    var i =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    var i =
      ((e.CurrentExp = i.GetExp()),
      (e.CurrentLevel = i.GetPhantomLevel()),
      (e.CurrentMaxLevel =
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetMaxLevel(
          this.G7i,
        )),
      (e.MaxExpFunction = this.NHi),
      SelectableExpData_1.SelectableExpData.PhraseData(e));
    return i;
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PhantomLevelUp,
      this.THi,
    ),
      (this.O7i = !0),
      (this.G7i = this.ExtraParams),
      (this.pHi = 0),
      this.OHi(this.G7i),
      this.g0t(),
      this.C4e();
  }
  C4e() {
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    this.v8i.Update(e);
  }
  g0t() {
    const e =
      ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(
        this.G7i,
      );
    var i = e.GetLevelUpPreviewData(e.GetPhantomLevel() + this.pHi);
    var i =
      (this.q7i.Update(i),
      e.GetLevelSubPropPreviewData(
        e.GetPhantomLevel(),
        e.GetPhantomLevel() + this.pHi,
      ));
    this.b7i.Update(i, !1), this.b7i.GetRootItem().SetUIActive(i.length > 0);
  }
  dEe() {
    this.O7i &&
      ((this.O7i = !1),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PhantomLevelUp,
        this.THi,
      ));
  }
  OnBeforeHide() {
    this.dEe();
  }
  AHi(e, o) {
    e.forEach((e, i) => {
      let t = o.get(i);
      (t = t || 0), (t += e), o.set(i, t);
    });
  }
  xHi() {
    let i = 0;
    if ((this.LHi(), this.vHi))
      for (let e = 0; e < this.vHi.length; e++) {
        const t = this.vHi[e];
        const o = this.MHi[e];
        (o[0].IncId = t.IncId),
          (o[0].ItemId = t.ItemId),
          (o[1] = t.SelectedCount),
          (i += this.BHi(t) * t.SelectedCount);
      }
    this.SHi.UpdateExp(i),
      this.gHi.Update(this.SHi),
      (this.pHi = this.SHi.GetArrivedLevel() - this.SHi.GetCurrentLevel()),
      this.fHi.UpdateComponent(
        ItemDefines_1.EItemId.Gold,
        ControllerHolder_1.ControllerHolder.PhantomBattleController.GetLevelUpNeedCost(
          this.SHi.GetCurrentAddExp(),
        ),
        this.MHi,
      ),
      this.g0t();
  }
  LHi() {
    this.MHi.forEach((e) => {
      (e[0].IncId = 0), (e[0].ItemId = 0), (e[1] = 0);
    });
  }
  OnBeforeDestroy() {
    this.dEe(), this.q7i.Destroy(), this.b7i.Destroy();
  }
}
exports.VisionLevelUpView = VisionLevelUpView;
// # sourceMappingURL=VisionLevelUpView.js.map
