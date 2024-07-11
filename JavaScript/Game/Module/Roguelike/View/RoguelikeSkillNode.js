"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoguelikeSkillNode = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  RoguelikeDefine_1 = require("../Define/RoguelikeDefine");
class RoguelikeSkillLine extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UISprite],
    ];
  }
  Refresh(e, i, t) {
    e
      ? this.GetSprite(4).SetColor(UE.Color.FromHex("AA9B6AFF"))
      : this.GetSprite(4).SetColor(UE.Color.FromHex("43434380")),
      this.GetItem(0).SetUIActive(0 === i),
      this.GetItem(3).SetUIActive(1 === t && 1 === i),
      this.GetItem(2).SetUIActive(1 === t && -1 === i);
  }
}
class RoguelikeSkillNode extends UiPanelBase_1.UiPanelBase {
  constructor(e, i, t) {
    super(),
      (this.Data = void 0),
      (this.PreItem = void 0),
      (this.LineComponentList = []),
      (this.GridPanelItem = void 0),
      (this.OnToggleStateChange = (e) => {
        1 === e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RoguelikeSelectSkill,
            this,
          );
      }),
      (this.Data = i),
      (this.PreItem = e),
      (this.GridPanelItem = t);
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
    this.Data = e || this.Data;
    e = this.RootItem.GetOwner()
      .GetAttachParentActor()
      .GetComponentByClass(UE.UIItem.StaticClass());
    const n = e.GetWidth(),
      o = e.GetHeight(),
      r = this.GetItem(4).GetAnchorOffsetX(),
      a = 2 * (n / 2 - r),
      i = ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
        this.Data.Id,
      );
    e = i === this.Data.Consule.length;
    for (let h = 0; h < this.Data.PostId.length; h++) {
      var t =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeById(
          this.Data.PostId[h],
        );
      const l =
          ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
            t.Id,
          ),
        E = t.Row - this.Data.Row;
      t = this.GetOutPosItem(E);
      if (void 0 === this.LineComponentList[h])
        LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync(
          "UiItem_RoguelikeSkillLine",
          t,
        ).then((e) => {
          const i = new RoguelikeSkillLine();
          var t = e.GetComponentByClass(UE.UIItem.StaticClass());
          const s =
            ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
              this.Data.Id,
            );
          0 == E ? t.SetWidth(a) : t.SetWidth(Math.sqrt(n * n + o * o) - 2 * r),
            i.CreateThenShowByActorAsync(e).then(() => {
              i.Refresh(0 < s && 0 < l, E, this.Data.Row);
            }),
            (this.LineComponentList[h] = i);
        });
      else {
        t = this.LineComponentList[h];
        const i =
          ModelManager_1.ModelManager.RoguelikeModel.RoguelikeSkillDataMap.get(
            this.Data.Id,
          );
        t.Refresh(0 < i && 0 < l, E, this.Data.Row);
      }
    }
    var s =
        ConfigManager_1.ConfigManager.RoguelikeConfig.GetRogueTalentTreeDescConfig(
          this.Data.Describe,
        ),
      h =
        ModelManager_1.ModelManager.RoguelikeModel?.GetRoguelikeCurrency(
          RoguelikeDefine_1.SKILL_POINT_ID,
        ) >= this.Data.Consule[i];
    this.SetSpriteByPath(s.TalentIcon, this.GetSprite(9), !1),
      ModelManager_1.ModelManager.RoguelikeModel?.SelectSkillId ===
        this.Data.Id &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RoguelikeSelectSkill,
          this,
        ),
      i < 0
        ? (this.GetItem(6).SetUIActive(!0),
          this.GetItem(7).SetUIActive(!1),
          this.GetItem(8).SetUIActive(!1),
          this.GetItem(10).SetUIActive(!1),
          this.GetItem(12).SetUIActive(!0),
          this.GetSprite(9).SetColor(UE.Color.FromHex("808080")))
        : (0 === i
            ? (this.GetItem(6).SetUIActive(!0),
              this.GetItem(7).SetUIActive(!1),
              this.GetItem(8).SetUIActive(!1),
              this.GetItem(10).SetUIActive(h))
            : (this.GetItem(6).SetUIActive(!1),
              this.GetItem(7).SetUIActive(!e),
              this.GetItem(8).SetUIActive(e),
              this.GetItem(10).SetUIActive(!e && h)),
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
exports.RoguelikeSkillNode = RoguelikeSkillNode;
//# sourceMappingURL=RoguelikeSkillNode.js.map
