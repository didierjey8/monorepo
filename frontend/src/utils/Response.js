export default {
  success: (data) => ({ status: true, data: data || null }),
  error: (data) => ({ status: false, error: (data || null) }),
};
