"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionModifySceneItemAttributeTag =
    exports.unionToUnionModifySceneItemAttributeTag =
    exports.UnionModifySceneItemAttributeTag =
      void 0);
const modify_self_scene_item_attribute_tag_js_1 = require("../fb-action/modify-self-scene-item-attribute-tag.js"),
  modify_target_scene_item_attribute_tag_js_1 = require("../fb-action/modify-target-scene-item-attribute-tag.js");
var UnionModifySceneItemAttributeTag;
function unionToUnionModifySceneItemAttributeTag(e, t) {
  switch (UnionModifySceneItemAttributeTag[e]) {
    case "NONE":
      return;
    case "ModifySelfSceneItemAttributeTag":
      return t(
        new modify_self_scene_item_attribute_tag_js_1.ModifySelfSceneItemAttributeTag(),
      );
    case "ModifyTargetSceneItemAttributeTag":
      return t(
        new modify_target_scene_item_attribute_tag_js_1.ModifyTargetSceneItemAttributeTag(),
      );
    default:
      return;
  }
}
function unionListToUnionModifySceneItemAttributeTag(e, t, i) {
  switch (UnionModifySceneItemAttributeTag[e]) {
    case "NONE":
      return;
    case "ModifySelfSceneItemAttributeTag":
      return t(
        i,
        new modify_self_scene_item_attribute_tag_js_1.ModifySelfSceneItemAttributeTag(),
      );
    case "ModifyTargetSceneItemAttributeTag":
      return t(
        i,
        new modify_target_scene_item_attribute_tag_js_1.ModifyTargetSceneItemAttributeTag(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.ModifySelfSceneItemAttributeTag = 1)] =
      "ModifySelfSceneItemAttributeTag"),
    (e[(e.ModifyTargetSceneItemAttributeTag = 2)] =
      "ModifyTargetSceneItemAttributeTag");
})(
  (UnionModifySceneItemAttributeTag =
    exports.UnionModifySceneItemAttributeTag ||
    (exports.UnionModifySceneItemAttributeTag = {})),
),
  (exports.unionToUnionModifySceneItemAttributeTag =
    unionToUnionModifySceneItemAttributeTag),
  (exports.unionListToUnionModifySceneItemAttributeTag =
    unionListToUnionModifySceneItemAttributeTag);
//# sourceMappingURL=union-modify-scene-item-attribute-tag.js.map
