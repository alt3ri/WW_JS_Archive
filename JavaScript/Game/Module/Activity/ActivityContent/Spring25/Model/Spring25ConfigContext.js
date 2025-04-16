"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Spring25ConfigContext = void 0);
const SpringChatById_1 = require("../../../../../../Core/Define/ConfigQuery/SpringChatById"),
  SpringResourceByRoleType_1 = require("../../../../../../Core/Define/ConfigQuery/SpringResourceByRoleType"),
  SpringRewardAll_1 = require("../../../../../../Core/Define/ConfigQuery/SpringRewardAll"),
  SpringSignAll_1 = require("../../../../../../Core/Define/ConfigQuery/SpringSignAll"),
  SpringSignById_1 = require("../../../../../../Core/Define/ConfigQuery/SpringSignById"),
  Spring25Define_1 = require("../Spring25Define");
class Spring25ConfigContext {
  constructor(e) {
    (this.i5l = void 0),
      (this.GGl = void 0),
      (this.kGl = void 0),
      (this.i5l = e);
  }
  get OGl() {
    if (void 0 === this.GGl) {
      this.GGl = new Map();
      var e = SpringSignAll_1.configSpringSignAll.GetConfigList();
      if (e) {
        var i = this.i5l.CurrentActivityId;
        for (const t of e) i === t.ActivityId && this.GGl.set(t.Id, t);
      }
    }
    return this.GGl;
  }
  get NGl() {
    if (void 0 === this.kGl) {
      this.kGl = new Map();
      var e = SpringRewardAll_1.configSpringRewardAll.GetConfigList();
      if (e) {
        var i = this.i5l.CurrentActivityId;
        for (const t of e) i === t.ActivityId && this.kGl.set(t.Id, t);
      }
    }
    return this.kGl;
  }
  Dispose() {
    this.kGl?.clear(),
      (this.kGl = void 0),
      this.GGl?.clear(),
      (this.GGl = void 0);
  }
  FGl(e) {
    e = this.OGl.get(e)?.ResourceTypeId;
    if (void 0 !== e) {
      e =
        SpringResourceByRoleType_1.configSpringResourceByRoleType.GetConfigList(
          e,
        );
      if (void 0 !== e) return e[0];
    }
  }
  get TaskCfgMap() {
    return this.NGl;
  }
  get SignCfgMap() {
    return this.OGl;
  }
  get TaskCount() {
    return this.TaskCfgMap.size;
  }
  get SignCount() {
    return this.OGl.size;
  }
  StartChatCfgByGender(e) {
    return 1 === e
      ? SpringChatById_1.configSpringChatById.GetConfig(
          Spring25Define_1.START_MALE_CHAT_CONFIG_ID,
        )
      : SpringChatById_1.configSpringChatById.GetConfig(
          Spring25Define_1.START_FEMALE_CHAT_CONFIG_ID,
        );
  }
  GetChatConfigBySignId(i, t) {
    i = this.FGl(i);
    if (void 0 !== i) {
      i = i.DialogDataList;
      if (!(i.length < 2)) {
        let e = 0;
        return (
          (e = 1 === t ? i[0] : i[1]),
          SpringChatById_1.configSpringChatById.GetConfig(e)
        );
      }
    }
  }
  GetLetterContentTextIdBySignId(e) {
    return this.FGl(e)?.LetterContent;
  }
  GetLetterTitleTextIdBySignId(e) {
    return this.FGl(e)?.LetterTitle;
  }
  GetLetterTabTextIdBySignId(e) {
    return this.FGl(e)?.LetterTab;
  }
  GetLetterIconBySignId(e) {
    return this.FGl(e)?.MailIcon;
  }
  GetRoleNameTextIdBySignId(e) {
    return this.FGl(e)?.RoleName;
  }
  GetResourceTypeBySignId(e) {
    return SpringSignById_1.configSpringSignById.GetConfig(e)?.ResourceTypeId;
  }
  GetTaskNameTextIdByTaskId(e) {
    return this.NGl.get(e)?.TaskTitle;
  }
  GetTaskThresholdByTaskId(e) {
    return this.NGl.get(e)?.TaskThreshold ?? 0;
  }
}
exports.Spring25ConfigContext = Spring25ConfigContext;
//# sourceMappingURL=Spring25ConfigContext.js.map
