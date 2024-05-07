/* eslint-disable no-param-reassign */
export default function transform(data: any, headers: any, fns?: any) {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns];
  }
  fns.forEach((fn: any) => {
    data = fn(data, headers);
  });
  return data;
}
