export const ApiManagerUtil = {
  mapToObject(map: Map<string, any>): object {
    const parameterObject: object = {};
    if (map) {
      for (const [key, value] of map) {
        // eslint-disable-next-line security/detect-object-injection
        parameterObject[key] = value;
      }
    }
    return parameterObject;
  },
};
