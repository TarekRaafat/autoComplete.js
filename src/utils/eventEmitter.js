/**
 * Event emitter on input field
 *
 * @param target
 * @param event
 * @param name
 * @param { data }
 *
 * @return void
 */
export default (target, name, detail) => {
  // Dispatch event on input
  // TODO Revision for the detail object
  target.dispatchEvent(
    new CustomEvent(name, {
      bubbles: true,
      detail,
      // event,
      // input,
      // query,
      // matches,
      // results,
      // },
      cancelable: true,
    })
  );
};
