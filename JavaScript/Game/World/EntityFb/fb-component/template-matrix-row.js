"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TemplateMatrixRow = void 0);
const flatbuffers = require("../../../../RunTimeLibs/FlatBuffers/flatbuffers"),
  spawn_template_entity_config_js_1 = require("../fb-component/spawn-template-entity-config.js");
class TemplateMatrixRow {
  constructor() {
    (this.bb = void 0), (this.bb_pos = 0);
  }
  __init(t, e) {
    return (this.bb_pos = t), (this.bb = e), this;
  }
  static getRootAsTemplateMatrixRow(t, e) {
    return (e || new TemplateMatrixRow()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  static getSizePrefixedRootAsTemplateMatrixRow(t, e) {
    return (
      t.setPosition(t.position() + flatbuffers.SIZE_PREFIX_LENGTH),
      (e || new TemplateMatrixRow()).__init(
        t.readInt32(t.position()) + t.position(),
        t,
      )
    );
  }
  items(t, e) {
    var i = this.bb.__offset(this.bb_pos, 4);
    return i
      ? (
          e || new spawn_template_entity_config_js_1.SpawnTemplateEntityConfig()
        ).__init(
          this.bb.__indirect(this.bb.__vector(this.bb_pos + i) + 4 * t),
          this.bb,
        )
      : void 0;
  }
  itemsLength() {
    var t = this.bb.__offset(this.bb_pos, 4);
    return t ? this.bb.__vector_len(this.bb_pos + t) : 0;
  }
  static startTemplateMatrixRow(t) {
    t.startObject(1);
  }
  static addItems(t, e) {
    t.addFieldOffset(0, e, 0);
  }
  static createItemsVector(e, i) {
    e.startVector(4, i.length, 4);
    for (let t = i.length - 1; 0 <= t; t--) e.addOffset(i[t]);
    return e.endVector();
  }
  static startItemsVector(t, e) {
    t.startVector(4, e, 4);
  }
  static endTemplateMatrixRow(t) {
    return t.endObject();
  }
  static createTemplateMatrixRow(t, e) {
    return (
      TemplateMatrixRow.startTemplateMatrixRow(t),
      TemplateMatrixRow.addItems(t, e),
      TemplateMatrixRow.endTemplateMatrixRow(t)
    );
  }
}
exports.TemplateMatrixRow = TemplateMatrixRow;
//# sourceMappingURL=template-matrix-row.js.map
