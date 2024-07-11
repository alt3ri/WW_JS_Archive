"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const TsUiSceneRoleActor_1 = require("../Module/UiComponent/TsUiSceneRoleActor");
const UiTagAnsContext_1 = require("../Module/UiModel/UiModelComponent/Common/UiModelAns/UiAnimNotifyStateContext/UiTagAnsContext");
class TsAnimNotifyStateAddTag extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments), (this.Tag = void 0), (this.UiTagAnsContext = void 0);
  }
  K2_NotifyBegin(e, t, o) {
    var e = e.GetOwner();
    const i = this.Tag?.TagId;
    if (e instanceof TsBaseCharacter_1.default && i) {
      let s = e.CharacterActorComponent?.Entity;
      if (s) {
        s = s.GetComponent(185);
        if (s) return s.TagContainer.UpdateExactTag(4, i, 1), !0;
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "No Entity for TsBaseCharacter",
            ["Name", e.GetName()],
            ["location", e.K2_GetActorLocation()],
          );
    } else
      i &&
        e instanceof TsUiSceneRoleActor_1.default &&
        ((this.UiTagAnsContext = new UiTagAnsContext_1.UiTagAnsContext(i)),
        e.Model?.CheckGetComponent(6).AddAns(
          "UiTagAnsContext",
          this.UiTagAnsContext,
        ));
    return !1;
  }
  K2_NotifyEnd(e, t) {
    var e = e.GetOwner();
    const o = this.Tag?.TagId;
    if (e instanceof TsBaseCharacter_1.default && o) {
      let i = e.CharacterActorComponent?.Entity;
      if (i) {
        i = i.GetComponent(185);
        if (i) return i.TagContainer.UpdateExactTag(4, o, -1), !0;
      } else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Test",
            6,
            "No Entity for TsBaseCharacter",
            ["Name", e.GetName()],
            ["location", e.K2_GetActorLocation()],
          );
    } else
      this.UiTagAnsContext &&
        e instanceof TsUiSceneRoleActor_1.default &&
        e.Model?.CheckGetComponent(6).ReduceAns(
          "UiTagAnsContext",
          this.UiTagAnsContext,
        );
    return !1;
  }
  GetNotifyName() {
    return "添加TAG";
  }
}
exports.default = TsAnimNotifyStateAddTag;
// # sourceMappingURL=TsAnimNotifyStateAddTag.js.map
