"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResonanceChainInfoItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonItem_1 = require("../../Common/Button/ButtonItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoleController_1 = require("../RoleController");
class ResonanceChainInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.dFe = 0),
      (this.Aco = void 0),
      (this.p9t = void 0),
      (this.Pco = void 0),
      (this.$pt = void 0),
      (this.xco = () => {
        var e =
          ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
            this.Aco,
          );
        if (e) {
          let i = !0;
          e.ActivateConsume.forEach((e, t) => {
            t =
              ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
            i = i && e <= t;
          }),
            i
              ? RoleController_1.RoleController.SendResonanceUnlockRequest(
                  this.dFe,
                )
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "ResonanceItemNotEnough",
                );
        }
      }),
      (this.xpt = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRoleInternalViewQuit,
        );
      }),
      (this.LoadPromise = this.CreateThenShowByResourceIdAsync(
        "UIItem_ResonanceChainInfo",
        e,
      ));
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIScrollViewWithScrollbarComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [10, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.xpt]]);
  }
  OnStart() {
    (this.p9t = new ButtonItem_1.ButtonItem(this.GetItem(5))),
      this.p9t.SetFunction(this.xco),
      (this.Pco = new MediumItemGrid_1.MediumItemGrid()),
      this.Pco.Initialize(this.GetItem(4).GetOwner()),
      (this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      ));
  }
  async ShowItem() {
    await this.LoadPromise, this.$pt.PlayLevelSequenceByName("Start");
  }
  async HideItem() {
    await this.LoadPromise, this.$pt.PlayLevelSequenceByName("Close");
  }
  async Refresh(e = !1) {
    await this.LoadPromise;
    var t,
      i =
        ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
          this.Aco,
        );
    i &&
      ((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.dFe)),
      (t = ModelManager_1.ModelManager.RoleModel.GetRoleResonanceState(
        t,
        i.GroupIndex,
      )),
      this.GetItem(5).SetUIActive(1 === t && !e),
      this.GetItem(6).SetUIActive(2 === t && !e),
      this.GetItem(7).SetUIActive(0 === t && !e),
      this.Pco.GetRootItem().SetUIActive(2 !== t && !e),
      this.GetItem(10).SetUIActive(2 !== t && !e),
      this.GetText(0).ShowTextNew(i.NodeName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        i.AttributesDescription,
        ...i.AttributesDescriptionParams,
      ),
      this.GetText(8).ShowTextNew(i.BgDescription),
      (t =
        ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(
          this.dFe,
          i.GroupIndex,
        )),
      this.p9t.SetRedDotVisible(t),
      e ||
        i.ActivateConsume.forEach((e, t) => {
          var i = { Type: 4, ItemConfigId: t },
            n =
              ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
          (i.BottomTextId = "Text_ItemEnoughText_Text"),
            n < e && (i.BottomTextId = "Text_ItemNotEnoughText_Text"),
            (i.BottomTextParameter = [n, e]),
            this.Pco.Apply(i),
            this.Pco.BindOnCanExecuteChange(() => !1),
            this.Pco.BindOnExtendToggleClicked(() => {
              ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                t,
              );
            });
        }));
  }
  Update(e, t, i = !1) {
    (this.dFe = e), (this.Aco = t), this.Refresh(i);
  }
  GetResonanceId() {
    return this.Aco;
  }
  GetUiItemForGuide() {
    return this.p9t
      ?.GetBtn()
      ?.GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.ResonanceChainInfoItem = ResonanceChainInfoItem;
//# sourceMappingURL=ResonanceChainInfoItem.js.map
