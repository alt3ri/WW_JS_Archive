"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TeamRoleSkillItem = exports.TeamRoleSkillData = void 0);
const UE = require("ue");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
class TeamRoleSkillData {
  constructor() {
    (this.SkillIcon = ""),
      (this.SkillType = 0),
      (this.SkillName = ""),
      (this.SkillTagList = void 0),
      (this.SkillResume = ""),
      (this.SkillResumeNum = []),
      (this.MultiSkillDesc = ""),
      (this.MultiSkillDescNum = []);
  }
}
exports.TeamRoleSkillData = TeamRoleSkillData;
class TeamRoleSkillItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.Pe = void 0), (this.Callback = void 0);
  }
  OnStart() {
    this.GetExtendToggle(1).OnStateChange.Add((t) => {
      this.Pe && this.Callback?.(t, this.Pe);
    });
  }
  OnBeforeDestroy() {
    this.GetExtendToggle(1).OnStateChange.Clear();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIExtendToggle],
    ];
  }
  OnSelected(t) {
    this.GetExtendToggle(1).SetToggleStateForce(1, !1);
  }
  OnDeselected(t) {
    this.GetExtendToggle(1).SetToggleState(0, !1);
  }
  Refresh(t, s, e) {
    (this.Pe = t), this.SetSpriteByPath(t.SkillIcon, this.GetSprite(0), !1);
  }
  BindOnSkillStateChange(t) {
    this.Callback = t;
  }
}
exports.TeamRoleSkillItem = TeamRoleSkillItem;
// # sourceMappingURL=TeamRoleSkillItem.js.map
