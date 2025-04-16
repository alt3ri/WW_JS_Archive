"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FishingDockQuestItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  FishingDockQuestChildItem_1 = require("./FishingDockQuestChildItem");
class FishingDockQuestItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.SO_ = void 0),
      (this.Ud_ = () => {
        UiManager_1.UiManager.OpenView("FishingQuestView");
      }),
      (this.sGe = () => {
        return new FishingDockQuestChildItem_1.FishingDockQuestChildItem();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.Ud_]]);
  }
  OnStart() {
    this.SO_ = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(2),
      this.sGe,
    );
  }
  OnBeforeShow() {
    this.RefreshItem();
  }
  RefreshItem() {
    let e = !1;
    var i, t;
    for ([i, t] of ModelManager_1.ModelManager.FishingQuestModel
      .CurrentEntrusts) {
      const M =
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(i);
      if (3 !== M.EntrustPool && 2 === t) {
        e = !0;
        break;
      }
      var r =
          ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
            M.AccessPath,
          ),
        a = Number(r?.Val3 ?? 0);
      if (r && a)
        if (ModelManager_1.ModelManager.FishingModel.GetTechNodeCanLevelUp(a)) {
          e = !0;
          break;
        }
    }
    if (
      (this.GetItem(4).SetUIActive(e),
      ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust)
    ) {
      const M = ConfigManager_1.ConfigManager.FishingConfig.GetFishingEntrust(
        ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust,
      );
      if (M)
        if (0 === M.EntrustType || 1 === M.EntrustType) {
          this.GetVerticalLayout(2).RootUIComp.SetUIActive(!0);
          var s,
            n,
            o = M.EntrustTarget,
            g = [],
            u = M.TargetDesText;
          for ([s, n] of o) {
            var h =
                ModelManager_1.ModelManager.DockyardModel.GetItemCountByItemId(
                  s,
                ),
              h = { MaxCount: n, CurrentCount: h, DesText: u.get(s) ?? "" };
            g.push(h);
          }
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), M.Name),
            this.SO_?.RefreshByData(g);
        } else
          2 === M.EntrustType &&
            this.GetVerticalLayout(2).RootUIComp.SetUIActive(!1);
    } else
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "Fishing_NotTraceEntrust",
      ),
        this.GetVerticalLayout(2).RootUIComp.SetUIActive(!1);
  }
}
exports.FishingDockQuestItem = FishingDockQuestItem;
//# sourceMappingURL=FishingDockQuestItem.js.map
