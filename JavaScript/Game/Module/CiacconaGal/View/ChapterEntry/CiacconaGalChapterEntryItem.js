"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChapterEntryItem = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil");
class CiacconaGalChapterEntryItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.c4c = void 0),
      (this.eTt = () => {
        this.GetExtendToggle(4).SetToggleState(0),
          ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(
            this.Pe.ChapterId,
          ).IsUnlocked
            ? ControllerHolder_1.ControllerHolder.CiacconaGalController.OpenChapterViewById(
                this.Pe.ChapterId,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "RequirePreChapter",
              );
      }),
      (this.q3c = () => new CiacconaSubEndingIcon());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UIExtendToggle],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[4, this.eTt]]);
  }
  OnStart() {
    this.c4c = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(5),
      this.q3c,
    );
  }
  Refresh(e, r, t) {
    this.Pe = e;
    var i = ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataById(
        e.ChapterId,
      ),
      n =
        (this.GetSprite(1).SetUIActive(!i.IsUnlocked),
        i.IsUnlocked ? e.SlotImagePath : e.SlotLockImagePath),
      n =
        (this.SetTextureByPath(n, this.GetTexture(0)),
        this.SetSpriteByPath(e.RomanNumberIconPath, this.GetSprite(3), !1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), i.Title),
        i.SubEndingIds.map((e) =>
          ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(e),
        ));
    this.c4c.RefreshByData(n),
      this.GetItem(7).SetUIActive(
        ModelManager_1.ModelManager.CiacconaGalModel.HasAnySubEndingRewardByChapterId(
          e.ChapterId,
        ),
      );
  }
}
exports.CiacconaGalChapterEntryItem = CiacconaGalChapterEntryItem;
class CiacconaSubEndingIcon extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  Refresh(e, r, t) {
    let i = "SP_PlotReasoningLock";
    e.IsFinished &&
      (i =
        1 === e.Type
          ? "SP_PlotReasoningFinishMain"
          : "SP_PlotReasoningFinishBranch");
    e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.SetSpriteByPath(e, this.GetSprite(0), !1);
  }
}
//# sourceMappingURL=CiacconaGalChapterEntryItem.js.map
