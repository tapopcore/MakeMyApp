const config = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.pdf$/,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext]',
        },
      });
  
      return config;
    },
  };
  
  export default config;
  