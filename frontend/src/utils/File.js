export default {
  formatSize(size) {
    const kb = size / 1024;
    if (kb < 1000) {
      return `${kb.toFixed(0)} kb`;
    }
    const mb = kb / 1024;
    return `${mb.toFixed(2)} mb`;
  },
};
