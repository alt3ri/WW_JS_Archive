"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AudioModel = exports.AudioBox = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../Actor/ActorSystem"),
  PriorityQueue_1 = require("../Container/PriorityQueue"),
  ModelBase_1 = require("../Framework/ModelBase"),
  MathUtils_1 = require("../Utils/MathUtils");
class AudioBox {
  constructor(e, t, r) {
    (this.Priority = e), (this.PbDataId = t), (this.BoxType = r);
  }
}
(exports.AudioBox = AudioBox).Compare = (e, t) => {
  let r = t.Priority - e.Priority;
  return 0 === r && r--, r;
};
class AudioModel extends ModelBase_1.ModelBase {
  constructor() {
    super(), (this.Q6 = void 0), (this.X6 = void 0);
  }
  static GetSpectrumActor() {
    return (
      AudioModel.Y6 ||
        (AudioModel.Y6 = ActorSystem_1.ActorSystem.Get(
          UE.BP_Wwise_AudioSpectrum_C.StaticClass(),
          MathUtils_1.MathUtils.DefaultTransformDouble,
        )),
      AudioModel.Y6
    );
  }
  static DestroySpectrumActor() {
    AudioModel.Y6 &&
      (ActorSystem_1.ActorSystem.Put(
        "AudioModel.DestroySpectrumActor",
        AudioModel.Y6,
      ),
      (AudioModel.Y6 = void 0));
  }
  OnInit() {
    return (
      (this.Q6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare)),
      (this.X6 = new PriorityQueue_1.PriorityQueue(AudioBox.Compare)),
      !0
    );
  }
  OnClear() {
    return (this.Q6 = void 0), !(this.X6 = void 0);
  }
  UpdateAudioBoxQueue(e, t) {
    let r = void 0,
      i = void 0;
    switch (e.BoxType) {
      case "AudioAMB":
        this.Q6 && !this.Q6.Empty && (r = this.Q6.Top), (i = this.Q6);
        break;
      case "AudioBGM":
        this.X6 && !this.X6.Empty && (r = this.X6.Top), (i = this.X6);
        break;
      default:
        return;
    }
    var o = r === e;
    switch (t) {
      case 0:
        if ((i.Push(e), i.Top === e)) return i.Top;
        break;
      case 1:
        if ((i.Remove(e), o && !i.Empty)) return i.Top;
        break;
      case 2:
        if (o) return i.Top;
        break;
      default:
        return;
    }
  }
}
(exports.AudioModel = AudioModel).Y6 = void 0;
//# sourceMappingURL=AudioModel.js.map
