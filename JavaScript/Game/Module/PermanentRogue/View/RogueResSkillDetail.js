"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSkillDetail = void 0);
const UE = require("ue"),
  RogueResCurrencyById_1 = require("../../../../Core/Define/ConfigQuery/RogueResCurrencyById"),
  RogueResTalentTreeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeById"),
  RogueResTalentTreeDescById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeDescById"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RoleLevelUpSuccessController_1 = require("../../RoleUi/RoleLevel/RoleLevelUpSuccessController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ActivityPermanentRogueController_1 = require("../ActivityPermanentRogueController");
class RogueResSkillDetail extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.Ilo = () => {
        var e = RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
            this.Data.Id,
          ),
          e = RogueResThemeById_1.configRogueResThemeById.GetConfig(e.SeasonId),
          e =
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(
              e.SkillItem,
            ),
          i =
            ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(
              this.Data.Id,
            );
        e < (this.Data?.Consule[i] ?? 0)
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "Roguelike_Skill_Point_Not_Enough",
            )
          : ActivityPermanentRogueController_1.ActivityPermanentRogueController.RequestRogueResTalentSkillLevel(
              this.Data.Id,
            ).then(() => {
              this.Refresh(this.Data);
              var e =
                  RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(
                    this.Data.Describe,
                  ),
                e = {
                  Title: "Text_ResonanceUnlockSuccess_Text",
                  TextList: [{ TextId: e.TalentDesc, Params: e.Args }],
                };
              RoleLevelUpSuccessController_1.RoleLevelUpSuccessController.OpenSuccessEffectView(
                e,
              );
            });
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [9, UE.UIButtonComponent],
      [8, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [5, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UITexture],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[9, this.Ilo]]);
  }
  OnStart() {}
  Refresh(e) {
    this.Data = e;
    var i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(
          e.Id,
        ),
      t =
        RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(
          e.Describe,
        ),
      s = i >= e.Consule.length,
      t =
        (this.SetSpriteByPath(t.TalentIcon, this.GetSprite(1), !1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.TalentName),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(3),
          "Text_LevelNumber_Text",
          i,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(4),
          t.TalentDesc,
          t.Args[i <= 0 ? 0 : i - 1],
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(6),
          "Text_LevelNumber_Text",
          i + 1,
        ),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(7),
          t.TalentDesc,
          t.Args[s ? i - 1 : i],
        ),
        RogueResTalentTreeById_1.configRogueResTalentTreeById.GetConfig(
          this.Data.Id,
        )),
      t = RogueResThemeById_1.configRogueResThemeById.GetConfig(t.SeasonId),
      r = RogueResCurrencyById_1.configRogueResCurrencyById.GetConfig(
        t.SkillItem,
      ),
      t = ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(
        t.SkillItem,
      ),
      e = e.Consule[i],
      t = e <= t,
      o = this.GetText(8);
    o.SetText(e?.toString()),
      t
        ? o.SetChangeColor(!1, o.changeColor)
        : o.SetChangeColor(!0, o.changeColor),
      this.SetTextureByPath(r.IconSmall, this.GetTexture(12)),
      this.UpdateDetail(i, s);
  }
  UpdateDetail(e, i) {
    e < 0
      ? (this.GetItem(2).SetUIActive(!1),
        this.GetItem(5).SetUIActive(!1),
        this.GetItem(16).SetUIActive(!1),
        this.GetButton(9).RootUIComp.SetUIActive(!1),
        this.GetItem(14).SetUIActive(!0),
        this.GetItem(13).SetUIActive(!1))
      : 0 === e
        ? (this.GetItem(2).SetUIActive(!1),
          this.GetItem(5).SetUIActive(!1),
          this.GetItem(16).SetUIActive(!0),
          this.GetButton(9).RootUIComp.SetUIActive(!0),
          this.GetItem(14).SetUIActive(!1),
          this.GetItem(13).SetUIActive(!1))
        : (this.GetItem(2).SetUIActive(!i),
          this.GetItem(5).SetUIActive(!i),
          this.GetItem(16).SetUIActive(!i),
          this.GetButton(9).RootUIComp.SetUIActive(!i),
          this.GetItem(14).SetUIActive(!1),
          this.GetItem(13).SetUIActive(i));
  }
}
exports.RogueResSkillDetail = RogueResSkillDetail;
//# sourceMappingURL=RogueResSkillDetail.js.map
