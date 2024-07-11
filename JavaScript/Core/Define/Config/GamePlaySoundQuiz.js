"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePlaySoundQuiz = void 0);
class GamePlaySoundQuiz {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get SoundNum() {
    return this.soundnum();
  }
  get Type() {
    return this.type();
  }
  get Name() {
    return this.name();
  }
  get InteractId() {
    return this.interactid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsGamePlaySoundQuiz(t, i) {
    return (i || new GamePlaySoundQuiz()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  soundnum() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  type(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  interactid(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.GamePlaySoundQuiz = GamePlaySoundQuiz;
// # sourceMappingURL=GamePlaySoundQuiz.js.map
