"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSkillOverView = exports.RogueResSkillDesc = void 0);
const UE = require("ue"),
  RogueResTalentTreeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeById"),
  RogueResTalentTreeDescById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeDescById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../../Ui/UiManager"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueResSkillDesc extends UiPanelBase_1.UiPanelBase {
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
        RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(
          this.Data.Describe,
        )),
      (i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(
          this.Data.Id,
        )),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        e.TalentDesc,
        e.Args[i - 1],
      ),
      this.Index % 2 == 1 && (this.GetSprite(2).useChangeColor = !0),
      this.SetTextureByPath(e.TalentIcon, this.GetTexture(0)));
  }
}
exports.RogueResSkillDesc = RogueResSkillDesc;
class RogueResSkillOverView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.CaptionItem = void 0),
      (this.SkillDescItemList = []),
      (this.Z5c = 0);
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
    (this.Z5c = this.OpenParam),
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
    let t = 0;
    const r = [];
    var e =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillDict(
          this.Z5c,
        ),
      i = [];
    for (const o of Object.keys(e)) {
      var s = Number(o);
      i.push([s, e[o]]);
    }
    i
      .sort((e, i) => {
        (e = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
          e[0],
        )),
          (i = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
            i[0],
          ));
        return e.Id - i.Id;
      })
      .forEach((e) => {
        var i, s;
        1 <= e[1] &&
          ((i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(2), this.GetItem(3))),
          (s = new RogueResSkillDesc()),
          (t += 1),
          (s.Index = t),
          (s.Data =
            RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
              e[0],
            )),
          this.SkillDescItemList.push(s),
          r.push(s.CreateThenShowByActorAsync(i.GetOwner())));
      }),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "Roguelike_SkillNumOverView_Title",
        t,
        i.length,
      ),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(4).SetUIActive(0 === t),
      await Promise.all(r);
  }
}
exports.RogueResSkillOverView = RogueResSkillOverView;
//# sourceMappingURL=RogueResSkillOverView.js.map
