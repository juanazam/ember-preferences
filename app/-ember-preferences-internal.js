import ENV from './config/environment';

export default function() {
  return {
    namespace: ENV.modulePrefix
  };
}
