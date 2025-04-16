"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingRoleTechItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../../RedDot/RedDotController"),
  GridProxyAbstract_1 = require("../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class FishingRoleTechItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickToggleBack = void 0),
      (this.Node = void 0),
      (this.kqe = () => {
        this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(6));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UIExtendToggle],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[6, this.kqe]]);
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!1);
  }
  Refresh(e, t, i) {
    var r = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(
      e.ConfigId,
    );
    if (r) {
      this.Node &&
        RedDotController_1.RedDotController.UnBindGivenUi(
          "FishingRoleTechNode",
          this.GetItem(8),
        ),
        (this.Node = e),
        this.GetScrollScrollbar(9).SetValue(0),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnFishingTechNodeRedDotRefresh,
          this.Node?.ConfigId,
        ),
        RedDotController_1.RedDotController.BindRedDot(
          "FishingRoleTechNode",
          this.GetItem(8),
          void 0,
          this.Node.ConfigId,
        ),
        this.SetTextureByPath(r.Icon, this.GetTexture(5)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), r.Name);
      var e = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(
          e.ConfigId,
        ),
        s =
          (LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(7),
            "PrefabTextItem_3692737534_Text",
            e,
          ),
          r.Effect.length);
      if (s <= e) {
        this.GetItem(4).SetUIActive(!0), this.GetItem(2).SetUIActive(!1);
        const a = r.Effect[s - 1],
          g =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              a,
            );
        void LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(1),
          g.Desc,
          ...g.ShowParams,
        );
      } else {
        this.GetItem(4).SetUIActive(!1);
        s = ModelManager_1.ModelManager.FishingModel.GetNodePreNodeUnlock(
          this.Node.ConfigId,
        );
        this.GetItem(2).SetUIActive(!s);
        const a = r.Effect[e],
          g =
            ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
              a,
            );
        if (0 === e)
          LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(1),
            g.Desc,
            ...g.ShowParams,
          );
        else {
          var s = r.Effect[e - 1],
            o =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(
                s,
              ),
            n = [],
            h = o.ShowParams.length;
          for (let e = 0; e < h; e++) {
            var l = o.ShowParams[e] + "->" + g.ShowParams[e];
            n.push(l);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), g.Desc, ...n);
        }
      }
    }
  }
  OnBeforeDestroy() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FishingRoleTechNode",
      this.GetItem(8),
      this.Node.ConfigId,
    );
  }
  SelectToggle() {
    this.OnClickToggleBack?.(this.Node, this.GetExtendToggle(6)),
      this.GetExtendToggle(6).SetToggleState(1, !1);
  }
}
exports.FishingRoleTechItem = FishingRoleTechItem;
//# sourceMappingURL=FishingRoleTechItem.js.map
