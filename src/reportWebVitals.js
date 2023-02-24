// file có chức năng thông kê báo cáo 
// cung cấp cho công cụ tìm kiếm để hiểu web có hiệu năng như nào để tối ưu trải nghiệm người dùng
// gửi những thông tin vào công cụ gg analytics

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
