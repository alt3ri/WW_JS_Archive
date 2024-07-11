"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FriendConfig = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const FriendFilterAll_1 = require("../../../Core/Define/ConfigQuery/FriendFilterAll");
const HeadIconById_1 = require("../../../Core/Define/ConfigQuery/HeadIconById");
const PersonalTipsByFunctionId_1 = require("../../../Core/Define/ConfigQuery/PersonalTipsByFunctionId");
const PersonalTipsById_1 = require("../../../Core/Define/ConfigQuery/PersonalTipsById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class FriendConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments),
      (this.DVt = (e, r) => {
        (e = PersonalTipsById_1.configPersonalTipsById.GetConfig(e)),
          (r = PersonalTipsById_1.configPersonalTipsById.GetConfig(r));
        return e.Sort - r.Sort;
      });
  }
  GetAllFilterConfigDuplicate() {
    const e = FriendFilterAll_1.configFriendFilterAll.GetConfigList();
    if (e) {
      const r = [];
      for (const i of e) r.push(i);
      return r;
    }
    return [];
  }
  GetHeadIconPath(e) {
    e = HeadIconById_1.configHeadIconById.GetConfig(e);
    if (e) return e.IconPath;
  }
  GetFriendLimitByViewType(e) {
    let r = "";
    switch (e) {
      case 1:
        r = "friend_list_limit";
        break;
      case 2:
        r = "friend_apply_list_limit";
        break;
      case 3:
        r = "RecentlyTeamLimit";
    }
    return CommonParamById_1.configCommonParamById.GetIntConfig(r);
  }
  GetProcessViewFunctionList() {
    const e =
      PersonalTipsByFunctionId_1.configPersonalTipsByFunctionId.GetConfigList(
        1,
      );
    const r = new Array();
    return (
      e.forEach((e) => {
        r.push(e.Id);
      }),
      r.sort(this.DVt),
      r
    );
  }
  GetDefaultBackgroundCardId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "default_background_card",
    );
  }
}
exports.FriendConfig = FriendConfig;
// # sourceMappingURL=FriendConfig.js.map
