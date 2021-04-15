const DEFAULT_TIME_OUT_MILLESECOND = 300;

function timedFetch(url, { timeout, ...options }) {
  if (!timeout) timeout = DEFAULT_TIME_OUT_MILLESECOND;

  return new Promise((resolve, reject) => {
    fetch(url, { ...options }).then(resolve, reject);
    if (timeout) setTimeout(reject, timeout, new Error('fetch call timeout'));
  });
}

export default timedFetch;
