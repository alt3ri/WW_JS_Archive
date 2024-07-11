"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UseBuffItemView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  NumberSelectComponent_1 = require("../../Common/NumberSelect/NumberSelectComponent"),
  ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BuffItemControl_1 = require("../BuffItemControl"),
  BuffTargetRoleItem_1 = require("./BuffTargetRoleItem"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class UseBuffItemView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Mft = []),
      (this.Eft = void 0),
      (this.Sft = void 0),
      (this.WGe = void 0),
      (this.yft = void 0),
      (this.Ift = () => {
        if (this.Sft) {
          var e = this.Sft.UseItemConfigId;
          if (
            0 <
            ModelManager_1.ModelManager.BuffItemModel.GetBuffItemRemainCdTime(e)
          )
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "UseBuffCdText",
            );
          else {
            if (this.Sft.CurrentAttribute <= 0) {
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
            var e = this.Sft.CurrentAttribute,
              t = this.Sft.GetAddAttribute(),
              i = this.Sft.MaxAttribute;
            i < e + t
              ? ((t = this.Sft.RoleName),
                (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                  i <= e ? 37 : 170,
                )).SetTextArgs(t),
                i.FunctionMap.set(2, () => {
                  this.UiViewSequence.StopSequenceByKey("Popup"),
                    this.UiViewSequence.SequencePlayReverseByKey("Popup", !1),
                    this.Tft();
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
              : this.Tft();
          }
        } else this.Lft();
      }),
      (this.Dft = () => {
        this.Lft();
      }),
      (this.KGe = (e) => {
        var t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ItemUseCount",
          );
        return new LguiUtil_1.TableTextArgNew(t, e);
      }),
      (this.QGe = (e) => {
        this.Sft.SetUseItemCount(e), this.Rft();
      }),
      (this.Uft = (e, t) => {
        this.Eft && this.Aft();
      }),
      (this.Pft = (e) => {
        this.xft(e);
      }),
      (this.wft = () => {
        this.Aft();
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
        [4, this.Ift],
        [5, this.Dft],
      ]);
  }
  Bft(e) {
    this.bft(), this.qft();
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    let i = !1;
    for (const r of this.Mft) {
      var s = r.GetUseBuffItemRoleData();
      if (s && s.GetEntityId() === t.Id) {
        this.xft(r), (i = !0);
        break;
      }
    }
    i || this.xft(this.Mft[0]);
  }
  Gft() {
    var e = this.Sft.UseItemConfigId;
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsResurrectionItem(e) ||
      ((e =
        ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemTotalCdTime(
          e,
        )) &&
        0 < e)
      ? 1
      : this.Sft.GetUseItemMaxCount();
  }
  rNe() {
    (this.WGe = new NumberSelectComponent_1.NumberSelectComponent(
      this.GetItem(6),
    )),
      (this.yft = {
        MaxNumber: this.Gft(),
        GetExchangeTableText: this.KGe,
        ValueChangeFunction: this.QGe,
      }),
      this.WGe.Init(this.yft);
  }
  OnStart() {
    var e = this.OpenParam;
    void 0 !== e && (this.Bft(e), this.rNe());
  }
  OnBeforeDestroy() {
    this.ResetUseBuffItemView(),
      this.WGe.Destroy(),
      (this.yft = void 0),
      (this.WGe = void 0),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnUseBuffItem,
      this.Uft,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnUseBuffItem,
      this.Uft,
    );
  }
  OnTick(e) {
    for (const t of this.Mft) t.Tick(e);
  }
  Lft() {
    UiManager_1.UiManager.CloseView("UseBuffItemView");
  }
  ResetUseBuffItemView() {
    for (const e of this.Mft) e.ResetBuffTargetRoleItem();
    (this.Mft.length = 0),
      (this.Sft = void 0),
      (this.Eft = void 0),
      ModelManager_1.ModelManager.BuffItemModel.ClearAllUseBuffItemRoleData();
  }
  bft() {
    for (const i of [this.GetItem(1), this.GetItem(2), this.GetItem(3)]) {
      var e = i.GetOwner(),
        t = new BuffTargetRoleItem_1.BuffTargetRoleItem();
      t.Initialize(e),
        t.BindOnClickedBuffTargetRoleItem(this.Pft),
        t.BindOnUseItemAnimationFinished(this.wft),
        this.Mft.push(t);
    }
  }
  xft(e) {
    var t = e.GetUseBuffItemRoleData();
    t
      ? e.IsSelected() ||
        (e.SetSelected(!0),
        this.Sft && this.Sft.SetUseItemCount(0),
        this.Eft && this.Eft.SetSelected(!1),
        (this.Sft = t),
        (this.Eft = e),
        t.SetUseItemCount(1),
        this.Rft(),
        this.Nft(),
        this.yft && this.WGe?.Init(this.yft))
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "NoneRole",
        );
  }
  Aft() {
    var e = ModelManager_1.ModelManager.InventoryModel,
      t = this.Sft.UseItemConfigId;
    e.GetItemCountByConfigId(t) < 1
      ? this.Lft()
      : ((e = this.Gft()), this.WGe.SetLimitMaxValue(e), this.WGe.Refresh(e));
  }
  qft() {
    var t = ModelManager_1.ModelManager.BuffItemModel.GetAllUseBuffItemRole();
    for (const e of this.Mft) e.SetActive(!1);
    let i = 0;
    for (let e = 0; e < this.Mft.length; e++) {
      var s = e + 1,
        s = t.get(s),
        r = this.Mft[i];
      s
        ? (r.RefreshBuffTargetRoleItem(s), r.SetActive(!0), i++)
        : r.RemoveRole();
    }
  }
  Rft() {
    var e, t, i;
    this.Sft &&
      this.Eft &&
      ((e = this.Sft.CurrentAttribute),
      (t = this.Sft.MaxAttribute),
      (i = this.Sft.GetAddAttribute()),
      this.Eft.RefreshPreviewUseItem(e, t, i));
  }
  Nft() {
    var e, t;
    this.Sft &&
      ((e = this.Sft.RoleName),
      (t = this.GetText(0)),
      LguiUtil_1.LguiUtil.SetLocalText(t, "UseBuffTitle", e));
  }
  Tft() {
    var e, t, i;
    this.Sft
      ? ((e = this.Sft.UseItemConfigId),
        (t = this.Sft.UseItemCount),
        (i = this.Sft.RoleConfigId),
        BuffItemControl_1.BuffItemControl.RequestUseBuffItem(e, t, i))
      : this.Lft();
  }
}
exports.UseBuffItemView = UseBuffItemView;
//# sourceMappingURL=UseBuffItemView.js.map
