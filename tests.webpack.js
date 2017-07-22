var context = require.context('./test/__tests__', true, /-test\.js$/);
context.keys().forEach(context);
