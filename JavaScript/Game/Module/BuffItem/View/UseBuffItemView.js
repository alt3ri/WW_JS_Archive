"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseBuffItemView = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BuffItemControl_1 = require("../BuffItemControl");
const BuffTargetRoleItem_1 = require("./BuffTargetRoleItem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UseBuffItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.h0t = []),
      (this.l0t = void 0),
      (this._0t = void 0),
      (this.WGe = void 0),
      (this.u0t = void 0),
      (this.c0t = () => {
        if (this._0t) {
          var e = this._0t.UseItemConfigId;
          if (
            ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(
              e,
            ) > 0
          )
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "UseBuffCdText",
            );
          else {
            if (this._0t.CurrentAttribute <= 0) {
              if (
                !ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(
                  e,
                )
              )
                return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "UseBuffToDeadRole",
                );
            } else if (
              ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e)
            )
              return void ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "UseBuffToAliveRole",
              );
            var e = this._0t.CurrentAttribute;
            let t = this._0t.GetAddAttribute();
            let i = this._0t.MaxAttribute;
            i < e + t
              ? ((t = this._0t.RoleName),
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  i <= e ? 37 : 170,
                )).SetTextArgs(t),
                i.FunctionMap.set(2, () => {
                  this.UiViewSequence.StopSequenceByKey("Popup"),
                    this.UiViewSequence.SequencePlayReverseByKey("Popup", !1),
                    this.m0t();
                }),
                i.FunctionMap.set(1, () => {
                  this.UiViewSequence.StopSequenceByKey("Popup"),
                    this.UiViewSequence.SequencePlayReverseByKey("Popup", !1);
                }),
                (i.IsEscViewTriggerCallBack = !1),
                ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                  i,
                ),
                this.UiViewSequence.StopSequenceByKey("Popup"),
                this.UiViewSequence.PlaySequence("Popup"))
              : this.m0t();
          }
        } else this.d0t();
      }),
      (this.C0t = () => {
        this.d0t();
      }),
      (this.KGe = (e) => {
        const t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemUseCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this._0t.SetUseItemCount(e), this.g0t();
      }),
      (this.f0t = (e, t) => {
        this.l0t && this.p0t();
      }),
      (this.v0t = (e) => {
        this.M0t(e);
      }),
      (this.S0t = () => {
        this.p0t();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.c0t],
        [5, this.C0t],
      ]);
  }
  E0t(e) {
    this.y0t(), this.I0t();
    const t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let i = !1;
    for (const r of this.h0t) {
      const s = r.GetUseBuffItemRoleData();
      if (s && s.GetEntityId() === t.Id) {
        this.M0t(r), (i = !0);
        break;
      }
    }
    i || this.M0t(this.h0t[0]);
  }
  T0t() {
    let e = this._0t.UseItemConfigId;
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e) ||
      ((e =
        ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
          e,
        )) &&
        e > 0)
      ? 1
      : this._0t.GetUseItemMaxCount();
  }
  rNe() {
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(6),
    )),
      (this.u0t = {
        MaxNumber: this.T0t(),
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      }),
      this.WGe.Init(this.u0t);
  }
  OnStart() {
    const e = this.OpenParam;
    void 0 !== e && (this.E0t(e), this.rNe());
  }
  OnBeforeDestroy() {
    this.ResetUseBuffItemView(),
      this.WGe.Destroy(),
      (this.u0t = void 0),
      (this.WGe = void 0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUseBuffItem,
      this.f0t,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUseBuffItem,
      this.f0t,
    );
  }
  OnTick(e) {
    for (const t of this.h0t) t.Tick(e);
  }
  d0t() {
    UiManager_1.UiManager.CloseView("UseBuffItemView");
  }
  ResetUseBuffItemView() {
    for (const e of this.h0t) e.ResetBuffTargetRoleItem();
    (this.h0t.length = 0),
      (this._0t = void 0),
      (this.l0t = void 0),
      ModelManager_1.ModelManager.BuffItemModel.ClearAllUseBuffItemRoleData();
  }
  y0t() {
    for (const i of [this.GetItem(1), this.GetItem(2), this.GetItem(3)]) {
      const e = i.GetOwner();
      const t = new BuffTargetRoleItem_1.BuffTargetRoleItem();
      t.Initialize(e),
        t.BindOnClickedBuffTargetRoleItem(this.v0t),
        t.BindOnUseItemAnimationFinished(this.S0t),
        this.h0t.push(t);
    }
  }
  M0t(e) {
    const t = e.GetUseBuffItemRoleData();
    t
      ? e.IsSelected() ||
        (e.SetSelected(!0),
        this._0t && this._0t.SetUseItemCount(0),
        this.l0t && this.l0t.SetSelected(!1),
        (this._0t = t),
        (this.l0t = e),
        t.SetUseItemCount(1),
        this.g0t(),
        this.L0t(),
        this.u0t && this.WGe?.Init(this.u0t))
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "NoneRole",
        );
  }
  p0t() {
    let e = ModelManager_1.ModelManager.InventoryModel;
    const t = this._0t.UseItemConfigId;
    e.GetItemCountByConfigId(t) < 1
      ? this.d0t()
      : ((e = this.T0t()), this.WGe.SetLimitMaxValue(e), this.WGe.Refresh(e));
  }
  I0t() {
    const t = ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole();
    for (const e of this.h0t) e.SetActive(!1);
    let i = 0;
    for (let e = 0; e < this.h0t.length; e++) {
      var s = e + 1;
      var s = t.get(s);
      const r = this.h0t[i];
      s
        ? (r.RefreshBuffTargetRoleItem(s), r.SetActive(!0), i++)
        : r.RemoveRole();
    }
  }
  g0t() {
    let e, t, i;
    this._0t &&
      this.l0t &&
      ((e = this._0t.CurrentAttribute),
      (t = this._0t.MaxAttribute),
      (i = this._0t.GetAddAttribute()),
      this.l0t.RefreshPreviewUseItem(e, t, i));
  }
  L0t() {
    let e, t;
    this._0t &&
      ((e = this._0t.RoleName),
      (t = this.GetText(0)),
      LguiUtil_1.LguiUtil.SetLocalText(t, "UseBuffTitle", e));
  }
  m0t() {
    let e, t, i;
    this._0t
      ? ((e = this._0t.UseItemConfigId),
        (t = this._0t.UseItemCount),
        (i = this._0t.RoleConfigId),
        BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, t, i))
      : this.d0t();
  }
}
exports.UseBuffItemView = UseBuffItemView;
// # sourceMappingURL=UseBuffItemView.js.map
