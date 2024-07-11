"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSkillOverView = exports.RoguelikeSkillDesc = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RoguelikeSkillDesc extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Data = void 0), (this.Index = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.Refresh();
  }
  Refresh() {
    var e, i;
    this.Data &&
      ((e =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(
          this.Data.Describe,
        )),
      (i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
        this.Data.Id,
      )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        e.BaseDesc,
        e.Args[i - 1],
      ),
      this.Index % 2 == 1 && (this.GetSprite(2).useChangeColor = !0),
      this.SetTextureByPath(e.TalentIcon, this.GetTexture(0)));
  }
}
exports.RoguelikeSkillDesc = RoguelikeSkillDesc;
class RoguelikeSkillOverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.SkillDescItemList = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.CaptionItem = new PopupCaptionItem_1.PopupCaptionItem(
      this.GetItem(1),
    )),
      this.CaptionItem.SetCloseCallBack(() => {
        UiManager_1.UiManager.CloseView(this.Info.Name);
      }),
      await this.InitDescItem();
  }
  OnBeforeDestroy() {
    this.SkillDescItemList = [];
  }
  async InitDescItem() {
    let s = 0;
    const r = [];
    Array.from(ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap)
      .sort((e, i) => {
        (e =
          ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(
            e[0],
          )),
          (i =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(
              i[0],
            ));
        return e.TalentType !== i.TalentType
          ? e.TalentType - i.TalentType
          : e.Id - i.Id;
      })
      .forEach((e) => {
        var i, t;
        1 <= e[1] &&
          ((i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(3))),
          (t = new RoguelikeSkillDesc()),
          (s += 1),
          (t.Index = s),
          (t.Data =
            ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(
              e[0],
            )),
          this.SkillDescItemList.push(t),
          r.push(t.CreateThenShowByActorAsync(i.GetOwner())));
      }),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "Roguelike_SkillNumOverView_Title",
        s,
        ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.size,
      ),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(4).SetUIActive(0 === s),
      await Promise.all(r);
  }
}
exports.RoguelikeSkillOverView = RoguelikeSkillOverView;
//# sourceMappingURL=RoguelikeSkillOverView.js.map
