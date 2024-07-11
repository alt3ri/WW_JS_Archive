"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExitSkillItem = exports.ExitSkillItemData = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  EditFormationDefine_1 = require("../../EditFormationDefine");
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
      (this.dFe = void 0),
      (this.j8 = void 0),
      (this.R5t = !1),
      (this.SPe = void 0),
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
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {
    (this.dFe = void 0),
      (this.j8 = void 0),
      (this.R5t = !1),
      this.SPe?.Clear(),
      (this.SPe = void 0);
  }
  Refresh(i, t) {
    var e = i?.RoleId,
      s = i?.PlayerId;
    e ? this.U5t(e, i.OnlineIndex, s, t) : this.A5t(!1);
    let r = !1;
    !this.R5t || (this.dFe === e && this.j8 === s) || (r = !0),
      (this.dFe = e),
      (this.j8 = s),
      (this.R5t = !0),
      r && this.SPe.PlayLevelSequenceByName("Switch");
  }
  U5t(t, e, s, r) {
    var o = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t);
    if (o) {
      this.A5t(!0);
      var a = o.FormationRoleCard,
        a =
          (this.SetRoleIcon(a, this.GetTexture(2), t),
          this.SetRoleIcon(a, this.GetTexture(3), t),
          this.SetRoleIcon(a, this.GetTexture(4), t),
          ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(
            o.SkillId,
          ));
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
  A5t(i) {
    this.GetItem(0).SetUIActive(i),
      this.GetItem(1).SetUIActive(i),
      this.GetItem(6).SetUIActive(!i),
      this.GetSprite(7).SetUIActive(i),
      this.GetItem(11).SetUIActive(i),
      this.GetItem(12).SetUIActive(i),
      this.GetText(8).SetUIActive(i),
      this.GetText(10).SetUIActive(i);
    var t = this.GetText(15);
    t.SetUIActive(!i),
      i || LguiUtil_1.LguiUtil.SetLocalText(t, "EditBattleTeamEmpty");
  }
}
exports.ExitSkillItem = ExitSkillItem;
//# sourceMappingURL=ExitSkillItem.js.map
