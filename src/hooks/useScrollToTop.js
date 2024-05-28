export default function useScrollToTop({ target }) {
  function scrollUp() {
    target.current.scrollTo(0, 0);
  }

  return { scrollUp };
}
