/**
 * onSelection function
 *
 * @param event
 * @param query
 * @param results
 * @param selection
 * @param feedback
 *
 * @return void
 */
export default (event, query, results, selection, feedback) => {
  // Data feedback function
  // invoked on user selection
  feedback({
    event,
    query,
    results,
    selection,
  });
};
