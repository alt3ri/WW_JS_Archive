
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.InputViewRecord=void 0;class InputViewRecord{constructor(){this.Ncr=new Map}Add(t){var r=this.Ncr.get(t),r=r?r+1:1;return this.Ncr.set(t,r),r}Remove(t){var r=this.Ncr.get(t);return void 0===r?0:(0<(r=r-1)?this.Ncr.set(t,r):this.Ncr.delete(t),r)}Has(t){t=this.Ncr.get(t);return!!t&&0<t}HasAny(){for(const t of this.Ncr.values())if(0<t)return!0;return!1}Size(){return this.Ncr.size}Clear(){this.Ncr.clear()}}exports.InputViewRecord=InputViewRecord;
//# sourceMappingURL=InputViewRecord.js.map