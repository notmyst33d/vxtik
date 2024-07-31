const REHYDRATION_REGEX = /<script[^>]+\bid="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>/;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname == "/favicon.ico") {
      return new Response();
    }
    url.hostname = "www.tiktok.com";
    url.protocol = "https";
    url.port = "";
    const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0" } });
    const cookie = response.headers.getSetCookie().map(c => c.split("; ")[0]).join("; ");
    const webpage = await response.text();
    const start = REHYDRATION_REGEX.exec(webpage);
    const end = webpage.indexOf("</script>", start.index + start[0].length);
    const data = JSON.parse(webpage.substring(start.index + start[0].length, end));
    const stream = data["__DEFAULT_SCOPE__"]["webapp.video-detail"]["itemInfo"]["itemStruct"]["video"]["playAddr"];
    return fetch(stream, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0", "Cookie": cookie } });
  },
};