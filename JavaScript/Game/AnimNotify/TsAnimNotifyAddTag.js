"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyAddTag extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments), (this.Tag = void 0);
  }
  K2_Notify(e, r) {
    var e = e.GetOwner();
    const t = this.Tag?.TagId;
    return (
      e instanceof TsBaseCharacter_1.default &&
        t &&
        (e = e.CharacterActorComponent.Entity?.GetComponent(185)) &&
        e.TagContainer.UpdateExactTag(4, t, 1),
      !0
    );
  }
  GetNotifyName() {
    return "添加Tag";
  }
}
exports.default = TsAnimNotifyAddTag;
// # sourceMappingURL=TsAnimNotifyAddTag.js.map
