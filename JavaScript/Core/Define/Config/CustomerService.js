"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CustomerService = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class CustomerService {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PackageType() {
    return this.packagetype();
  }
  get Language() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.languageLength(),
      this.language,
      this,
    );
  }
  get PackageId() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.packageidLength(),
      this.packageid,
      this,
    );
  }
  get Channel() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.channelLength(),
      this.channel,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsCustomerService(t, s) {
    return (s || new CustomerService()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  packagetype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLanguageAt(t) {
    return this.language(t);
  }
  language(t, s) {
    var i = this.J7.__offset(this.z7, 8);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  languageLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetPackageidAt(t) {
    return this.packageid(t);
  }
  packageid(t, s) {
    var i = this.J7.__offset(this.z7, 10);
    return i
      ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s)
      : null;
  }
  packageidLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  GetChannelAt(t) {
    return this.channel(t);
  }
  channel(t) {
    var s = this.J7.__offset(this.z7, 12);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  channelLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  channelArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=CustomerService.js.map
