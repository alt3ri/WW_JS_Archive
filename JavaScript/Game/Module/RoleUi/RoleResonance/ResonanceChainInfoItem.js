"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ResonanceChainInfoItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const RoleController_1 = require("../RoleController");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class ResonanceChainInfoItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.zke = 0),
      (this.Buo = void 0),
      (this.p8t = void 0),
      (this.buo = void 0),
      (this.Gft = void 0),
      (this.quo = () => {
        const e =
          ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
            this.Buo,
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
                  this.zke,
                )
              : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                  "ResonanceItemNotEnough",
                );
        }
      }),
      (this.Mft = () => {
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
      (this.BtnBindInfo = [[9, this.Mft]]);
  }
  OnStart() {
    (this.p8t = new ButtonItem_1.ButtonItem(this.GetItem(5))),
      this.p8t.SetFunction(this.quo),
      (this.buo = new MediumItemGrid_1.MediumItemGrid()),
      this.buo.Initialize(this.GetItem(4).GetOwner()),
      (this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetRootItem(),
      ));
  }
  async ShowItem() {
    await this.LoadPromise,
      this.Gft.StopCurrentSequence(),
      this.Gft.PlayLevelSequenceByName("Start");
  }
  async HideItem() {
    await this.LoadPromise,
      this.Gft.StopCurrentSequence(),
      this.Gft.PlayLevelSequenceByName("Close");
  }
  async Refresh(e = !1) {
    await this.LoadPromise;
    let t;
    const i =
      ConfigManager_1.ConfigManager.RoleResonanceConfig.GetRoleResonanceById(
        this.Buo,
      );
    i &&
      ((t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.zke)),
      (t = ModelManager_1.ModelManager.RoleModel.GetRoleResonanceState(
        t,
        i.GroupIndex,
      )),
      this.GetItem(5).SetUIActive(t === 1 && !e),
      this.GetItem(6).SetUIActive(t === 2 && !e),
      this.GetItem(7).SetUIActive(t === 0 && !e),
      this.buo.GetRootItem().SetUIActive(t !== 2 && !e),
      this.GetItem(10).SetUIActive(t !== 2 && !e),
      this.GetText(0).ShowTextNew(i.NodeName),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        i.AttributesDescription,
        ...i.AttributesDescriptionParams,
      ),
      this.GetText(8).ShowTextNew(i.BgDescription),
      (t =
        ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabHoleCondition(
          this.zke,
          i.GroupIndex,
        )),
      this.p8t.SetRedDotVisible(t),
      e ||
        i.ActivateConsume.forEach((e, t) => {
          const i = { Type: 4, ItemConfigId: t };
          const n =
            ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(t);
          (i.BottomTextId = "Text_ItemEnoughText_Text"),
            n < e && (i.BottomTextId = "Text_ItemNotEnoughText_Text"),
            (i.BottomTextParameter = [n, e]),
            this.buo.Apply(i),
            this.buo.BindOnCanExecuteChange(() => !1),
            this.buo.BindOnExtendToggleClicked(() => {
              ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
                t,
              );
            });
        }));
  }
  Update(e, t, i = !1) {
    (this.zke = e), (this.Buo = t), this.Refresh(i);
  }
  GetResonanceId() {
    return this.Buo;
  }
  GetUiItemForGuide() {
    return this.p8t
      ?.GetBtn()
      ?.GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.ResonanceChainInfoItem = ResonanceChainInfoItem;
// # sourceMappingURL=ResonanceChainInfoItem.js.map
