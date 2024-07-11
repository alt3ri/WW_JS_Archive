"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitSkillItem = exports.ExitSkillItemData = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const EditFormationDefine_1 = require("../../EditFormationDefine");
class ExitSkillItemData {
  constructor() {
    (this.RoleId = void 0),
      (this.OnlineIndex = void 0),
      (this.PlayerId = void 0);
  }
}
exports.ExitSkillItemData = ExitSkillItemData;
class ExitSkillItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.zke = void 0),
      (this.j8 = void 0),
      (this.R4t = !1),
      (this.EPe = void 0),
      this.CreateThenShowByActor(i.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UITexture],
      [4, UE.UITexture],
      [3, UE.UITexture],
      [5, UE.UISprite],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIText],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIHorizontalLayout],
      [14, UE.UIItem],
      [15, UE.UIText],
    ];
  }
  OnStart() {
    this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    (this.zke = void 0),
      (this.j8 = void 0),
      (this.R4t = !1),
      this.EPe?.Clear(),
      (this.EPe = void 0);
  }
  Refresh(i, t) {
    const e = i?.RoleId;
    const s = i?.PlayerId;
    e ? this.U4t(e, i.OnlineIndex, s, t) : this.A4t(!1);
    let r = !1;
    !this.R4t || (this.zke === e && this.j8 === s) || (r = !0),
      (this.zke = e),
      (this.j8 = s),
      (this.R4t = !0),
      r && this.EPe.PlayLevelSequenceByName("Switch");
  }
  U4t(t, e, s, r) {
    let o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (o) {
      this.A4t(!0);
      var a = o.FormationRoleCard;
      var a =
        (this.SetRoleIcon(a, this.GetTexture(2), t),
        this.SetRoleIcon(a, this.GetTexture(3), t),
        this.SetRoleIcon(a, this.GetTexture(4), t),
        ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(o.SkillId));
      let i = void 0;
      for (const h of a)
        if (h.SkillType === EditFormationDefine_1.EXIT_SKILL_TYPE) {
          i = h;
          break;
        }
      if (
        (i &&
          (this.SetSpriteByPath(i.Icon, this.GetSprite(7), !1),
          LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), i.SkillName),
          r
            ? LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(10),
                i.MultiSkillDescribe,
                ...i.MultiSkillDetailNum,
              )
            : LguiUtil_1.LguiUtil.SetLocalTextNew(
                this.GetText(10),
                i.SkillDescribe,
                ...i.SkillDetailNum,
              )),
        e)
      ) {
        this.GetSprite(5).SetUIActive(!0);
        let i = void 0;
        i =
          s === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()
            ? EditFormationDefine_1.SELF_ONLINE_INDEX
            : EditFormationDefine_1.OTHER_ONLINE_INDEX;
        (t = StringUtils_1.StringUtils.Format(i, e.toString())),
          (o =
            ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(t));
        this.SetSpriteByPath(o, this.GetSprite(5), !1);
      } else this.GetSprite(5).SetUIActive(!1);
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Formation", 49, "ExitSkillItem,找不到角色配置");
  }
  A4t(i) {
    this.GetItem(0).SetUIActive(i),
      this.GetItem(1).SetUIActive(i),
      this.GetItem(6).SetUIActive(!i),
      this.GetSprite(7).SetUIActive(i),
      this.GetItem(11).SetUIActive(i),
      this.GetItem(12).SetUIActive(i),
      this.GetText(8).SetUIActive(i),
      this.GetText(10).SetUIActive(i);
    const t = this.GetText(15);
    t.SetUIActive(!i),
      i || LguiUtil_1.LguiUtil.SetLocalText(t, "EditBattleTeamEmpty");
  }
}
exports.ExitSkillItem = ExitSkillItem;
// # sourceMappingURL=ExitSkillItem.js.map
