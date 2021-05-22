import preInit from "../services/preInit";
import init from "../services/init";
import start from "../services/start";
import { removeEventListeners } from "./eventController";
import { openList, closeList } from "./listController";
import { goTo, next, previous, select } from "./actionController";

export default function (autoComplete) {
  const { prototype } = autoComplete;

  // Pre-Initialization stage
  prototype.preInit = () => preInit(this);
  // Initialization stage
  prototype.init = () => init(this);
  // Start autoComplete.js engine
  prototype.start = () => start(this);
  // Un-Initialize autoComplete.js engine
  prototype.unInit = () => removeEventListeners(this);
  // Open result list
  prototype.open = () => openList(this);
  // Close result list
  prototype.close = () => closeList(this);
  // Go to result by index
  prototype.goTo = (index) => goTo(index, this);
  // Go to next result
  prototype.next = () => next(this);
  // Go to previous result
  prototype.previous = () => previous(this);
  // Select result by index
  prototype.select = (index) => select(this, null, index);
}
