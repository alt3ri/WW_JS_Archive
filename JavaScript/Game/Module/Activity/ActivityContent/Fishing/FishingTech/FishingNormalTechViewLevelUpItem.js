"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingNormalTechViewLevelUpItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  FishingController_1 = require("../FishingController"),
  FishingDefine_1 = require("../FishingDefine"),
  FishingTechCostItem_1 = require("./FishingTechCostItem"),
  FishingTechLevelUpItem_1 = require("./FishingTechLevelUpItem");
class FishingNormalTechViewLevelUpItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.s4e = void 0),
      (this.U1a = void 0),
      (this.PRr = void 0),
      (this.th_ = (e) => {
        (this.PRr?.ConfigId !== e && this.PRr?.PreNode !== e) ||
          this.RefreshView(this.PRr);
      }),
      (this.IK_ = () => {
        this.PRr && this.RefreshView(this.PRr);
      }),
      (this.sGe = () => {
        return new FishingTechLevelUpItem_1.FishingTechLevelUpItem();
      }),
      (this.ih_ = () => {
        this.PRr &&
          FishingController_1.FishingController.RequestFishingTechLevelUp(
            this.PRr.ConfigId,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIHorizontalLayout],
      [8, UE.UIItem],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIText],
      [13, UE.UIItem],
      [14, UE.UIText],
    ]),
      (this.BtnBindInfo = [[9, this.ih_]]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingTechViewComeBack,
        this.IK_,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFishingTechNodeRefresh,
      this.th_,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingTechViewComeBack,
        this.IK_,
      );
  }
  async OnBeforeStartAsync() {
    (this.s4e = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(6),
      this.sGe,
    )),
      (this.U1a = new FishingTechCostItem_1.FishingTechCostItem()),
      await this.U1a.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()),
      this.U1a.RefreshCost(FishingDefine_1.FISHING_CURRENCY_ITEMID, 0);
  }
  RefreshView(i) {
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(
      i.ConfigId,
    );
    if (t) {
      (this.PRr = i), this.SetTextureByPath(t.Icon, this.GetTexture(2));
      var s = 1 === this.PRr.NodeType,
        s =
          (this.GetItem(0).SetUIActive(s),
          this.GetItem(1).SetUIActive(!s),
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(12),
            FishingDefine_1.fishingNodeTypeText[i.NodeType],
          ),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.Name),
          ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(
            i.ConfigId,
          )),
        n =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(4),
            "PrefabTextItem_3692737534_Text",
            s,
          ),
          t.Effect.length);
      if (n <= s) {
        this.GetItem(13).SetUIActive(!1),
          this.GetItem(11).SetUIActive(!0),
          this.GetItem(10).SetUIActive(!1),
          this.GetButton(9).RootUIComp.SetUIActive(!1);
        const l = t.Effect[n - 1],
          U =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              l,
            );
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          U.Desc,
          ...U.ShowParams,
        ),
          void this.U1a?.SetUiActive(!1);
      } else {
        this.GetItem(13).SetUIActive(!0), this.GetItem(11).SetUIActive(!1);
        (n = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(
          i.ConfigId,
        )),
          (i =
            ModelManager_1.ModelManager.FishingModel.GetNodeLevelUpItemEnough(
              i.ConfigId,
            ));
        this.GetItem(10).SetUIActive(!n || !i),
          n
            ? i ||
              LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(14),
                "FishingTechLevelUpNotEnough",
              )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(14),
                "FishingTechLevelUpNotPreNodeLock",
              ),
          this.GetButton(9).RootUIComp.SetUIActive(n && i),
          this.GetItem(11).SetUIActive(!1);
        const l = t.Effect[s],
          U =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              l,
            );
        var h,
          r = [];
        let e = !1;
        for (const u of U.Consume)
          u[0] === FishingDefine_1.FISHING_CURRENCY_ITEMID
            ? (this.U1a?.RefreshCost(u[0], u[1]), (e = !0))
            : ((h = { ItemId: u[0], ItemNeedNum: u[1] }), r.push(h));
        if ((this.s4e?.RefreshByData(r), this.U1a?.SetUiActive(e), 0 === s))
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(5),
            U.Desc,
            ...U.ShowParams,
          );
        else {
          var n = t.Effect[s - 1],
            o =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
                n,
              ),
            a = [],
            g = o.ShowParams.length;
          for (let e = 0; e < g; e++) {
            var _ = o.ShowParams[e] + "->" + U.ShowParams[e];
            a.push(_);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), U.Desc, ...a);
        }
      }
    }
  }
}
exports.FishingNormalTechViewLevelUpItem = FishingNormalTechViewLevelUpItem;
//# sourceMappingURL=FishingNormalTechViewLevelUpItem.js.map
