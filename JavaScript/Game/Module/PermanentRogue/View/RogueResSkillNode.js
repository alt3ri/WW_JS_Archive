"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResSkillNode = void 0);
const UE = require("ue"),
  RogueResSortById_1 = require("../../../../Core/Define/ConfigQuery/RogueResSortById"),
  RogueResTalentTreeDescById_1 = require("../../../../Core/Define/ConfigQuery/RogueResTalentTreeDescById"),
  RogueResThemeById_1 = require("../../../../Core/Define/ConfigQuery/RogueResThemeById"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class RogueResSkillLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UISprite],
    ];
  }
  Refresh(e, t, s) {
    e
      ? this.GetSprite(4).SetColor(UE.Color.FromHex("AA9B6AFF"))
      : this.GetSprite(4).SetColor(UE.Color.FromHex("43434380")),
      this.GetItem(0).SetUIActive(0 === t),
      this.GetItem(3).SetUIActive(1 === s && 1 === t),
      this.GetItem(2).SetUIActive(1 === s && -1 === t);
  }
}
class RogueResSkillNode extends UiPanelBase_1.UiPanelBase {
  constructor(e, t, s) {
    super(),
      (this.Data = void 0),
      (this.PreItem = void 0),
      (this.LineComponentList = []),
      (this.GridPanelItem = void 0),
      (this.OnToggleStateChange = (e) => {
        1 === e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueResSelectSkill,
            this,
          );
      }),
      (this.Data = t),
      (this.PreItem = e),
      (this.GridPanelItem = s);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [11, UE.UIExtendToggle],
      [12, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetExtendToggle(11).OnStateChange.Add(this.OnToggleStateChange),
      (this.GetExtendToggle(11).bLockStateOnSelect = !0);
  }
  Refresh(e) {
    this.Data = e ?? this.Data;
    e = this.RootItem.GetOwner()
      .GetAttachParentActor()
      .GetComponentByClass(UE.UIItem.StaticClass());
    const h = e.GetWidth(),
      o = e.GetHeight(),
      n = this.GetItem(4).GetAnchorOffsetX(),
      r = 2 * (h / 2 - n),
      u =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(
          this.Data.Id,
        );
    e = u === this.Data.Consule.length;
    const a = RogueResSortById_1.configRogueResSortById.GetConfig(this.Data.Id);
    for (let i = 0; i < a.PostId.length; i++) {
      var t = RogueResSortById_1.configRogueResSortById.GetConfig(a.PostId[i]);
      const E =
          ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetSkillLevelById(
            a.PostId[i],
          ),
        U = t.Row - a.Row;
      t = this.GetOutPosItem(U);
      void 0 === this.LineComponentList[i]
        ? LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
            "UiItem_RoguelikeSkillLine",
            t,
          ).then((e) => {
            const t = new RogueResSkillLine();
            var s = e.GetComponentByClass(UE.UIItem.StaticClass());
            0 == U
              ? s.SetWidth(r)
              : s.SetWidth(Math.sqrt(h * h + o * o) - 2 * n),
              s.SetAnchorOffsetX(0),
              t.CreateThenShowByActorAsync(e).then(() => {
                t.Refresh(0 < u && 0 < E, U, a.Row);
              }),
              (this.LineComponentList[i] = t);
          })
        : this.LineComponentList[i].Refresh(0 < u && 0 < E, U, a.Row);
    }
    var s =
        RogueResTalentTreeDescById_1.configRogueResTalentTreeDescById.GetConfig(
          this.Data.Describe,
        ),
      i = RogueResThemeById_1.configRogueResThemeById.GetConfig(
        this.Data.SeasonId,
      ),
      i =
        ModelManager_1.ModelManager.ActivityPermanentRogueModel.GetCurrency(
          i.SkillItem,
        ) >= this.Data.Consule[u];
    this.SetSpriteByPath(s.TalentIcon, this.GetSprite(9), !1),
      ModelManager_1.ModelManager.ActivityPermanentRogueModel?.SelectSkillId ===
        this.Data.Id &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RogueResSelectSkill,
          this,
        ),
      u < 0
        ? (this.GetItem(6).SetUIActive(!0),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1),
          this.GetItem(10).SetUIActive(!1),
          this.GetItem(12).SetUIActive(!0),
          this.GetSprite(9).SetColor(UE.Color.FromHex("808080")))
        : (0 === u
            ? (this.GetItem(6).SetUIActive(!0),
              this.GetItem(7).SetUIActive(!1),
              this.GetItem(8).SetUIActive(!1),
              this.GetItem(10).SetUIActive(i))
            : (this.GetItem(6).SetUIActive(!1),
              this.GetItem(7).SetUIActive(!e),
              this.GetItem(8).SetUIActive(e),
              this.GetItem(10).SetUIActive(!e && i)),
          this.GetItem(12).SetUIActive(!1),
          this.GetSprite(9).SetColor(UE.Color.FromHex("FFFFFF")));
  }
  GetOutPosItem(e) {
    return 0 < e ? this.GetItem(5) : e < 0 ? this.GetItem(3) : this.GetItem(4);
  }
  SetToggleState(e) {
    this.GetExtendToggle(11).SetToggleState(e, !1);
  }
}
exports.RogueResSkillNode = RogueResSkillNode;
//# sourceMappingURL=RogueResSkillNode.js.map
