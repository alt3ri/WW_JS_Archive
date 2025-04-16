"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalChapterResultOrInitPanel = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ButtonAndTextItem_1 = require("../../Common/Button/ButtonAndTextItem"),
  ButtonSpriteItem_1 = require("../../Common/Button/ButtonSpriteItem"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine");
class CiacconaGalChapterSubEndingItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.bPc = void 0),
      (this.FKa = () => {
        var t,
          e =
            ModelManager_1.ModelManager.CiacconaGalModel.GetChapterDataBySubEndingId(
              this.Pe.Id,
            );
        e &&
          ((t = ModelManager_1.ModelManager.CiacconaGalModel.ActivityData.Id),
          ControllerHolder_1.ControllerHolder.CiacconaGalController.RequestGetSubEndingReward(
            t,
            e.Id,
            this.Pe.Id,
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UISprite],
    ];
  }
  async OnBeforeStartAsync() {
    (this.bPc = new ButtonSpriteItem_1.ButtonSpriteItem()),
      await this.bPc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      this.bPc.SetFunction(this.FKa);
  }
  Refresh(t, e, i) {
    (this.Pe = t),
      this.GetSprite(1).SetUIActive(this.Pe.IsFinished),
      this.GetSprite(5).SetUIActive(this.Pe.IsRewarded),
      this.bPc.SetActive(this.Pe.IsFinished && !this.Pe.IsRewarded);
    let n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_PlotReasoningLockBg",
      ),
      s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "SP_PlotReasoningFinishMain",
      );
    this.Pe.IsFinished
      ? 1 === this.Pe.Type
        ? ((n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "T_PlotReasoningFinishMainBg",
          )),
          (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_PlotReasoningFinishMain",
          )))
        : 2 === this.Pe.Type &&
          ((n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "T_PlotReasoningFinishBranchBg",
          )),
          (s = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
            "SP_PlotReasoningFinishBranch",
          )))
      : (n = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          "T_PlotReasoningLockBg",
        )),
      this.SetTextureByPath(n, this.GetTexture(0)),
      this.SetSpriteByPath(s, this.GetSprite(1), !1),
      this.GetText(2)?.SetUIActive(this.Pe.IsFinished),
      this.GetText(3)?.SetUIActive(this.Pe.IsFinished),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), this.Pe.Title),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), this.Pe.Desc);
  }
}
class CiacconaGalChapterResultOrInitPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t, e) {
    super(),
      (this.IPc = t),
      (this.Mke = e),
      (this.m8t = void 0),
      (this.LPc = void 0),
      (this.wPc = () => {
        return new CiacconaGalChapterSubEndingItem();
      }),
      (this.m4c = () => {
        this.RPc();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    (this.LPc = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(2),
      this.wPc,
    )),
      this.tkt(),
      this.RPc(),
      this.zao(),
      this.IPc.IsFinished
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCiacconaChapterRestart,
          )
        : EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnCiacconaChapterFirstStart,
          );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCiacconaChapterDataUpdate,
      this.m4c,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCiacconaChapterDataUpdate,
      this.m4c,
    );
  }
  tkt() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.IPc.Title),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), this.IPc.Desc);
  }
  RPc() {
    if (
      (this.GetVerticalLayout(2).SetActive(this.IPc.IsFinished),
      this.IPc.IsFinished)
    ) {
      var t = [];
      for (const i of this.IPc.SubEndingIds) {
        var e =
          ModelManager_1.ModelManager.CiacconaGalModel.GetSubEndingDataById(i);
        e && t.push(e);
      }
      this.LPc.RefreshByData(t);
    }
  }
  zao() {
    (this.m8t = new ButtonAndTextItem_1.ButtonAndTextItem(this.GetItem(4))),
      this.IPc.IsFinished
        ? this.m8t.RefreshTextNew(
            CiacconaGalDefine_1.TEXT_CIACCONA_BTN_CHAPTER_RESTART,
          )
        : this.m8t.RefreshTextNew(
            CiacconaGalDefine_1.TEXT_CIACCONA_BTN_CHAPTER_INIT,
          ),
      this.m8t.BindCallback(this.Mke);
  }
}
exports.CiacconaGalChapterResultOrInitPanel =
  CiacconaGalChapterResultOrInitPanel;
//# sourceMappingURL=CiacconaGalChapterResultOrInitPanel.js.map
