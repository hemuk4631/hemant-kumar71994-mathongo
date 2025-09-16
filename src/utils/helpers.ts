export const attachParams = (baseUrl: string, params: any) => {
    const url = new URL(baseUrl);
    url.search = new URLSearchParams(params).toString();
    return url.href;
  };