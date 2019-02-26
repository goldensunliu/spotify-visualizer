export async function getCurrentlyPlaying(token)
{
    let res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export async function getTrackAnalysis(token, id)
{
    let res = await fetch(`https://api.spotify.com/v1/audio-analysis/${id}`, {
        method: 'GET',
        headers: makeHeaders(token)
    });
    res = await res.json();
    return res;
}

export function makeHeaders(token) {
    return {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': "application/json"
    }
}

export function goAuth() {
  const searchParams = new URLSearchParams({
    client_id: '25bdec14ebe9410087b921de4fce9ecd',
    redirect_uri: window.location.href,
    response_type: 'token',
    scope: ['user-read-currently-playing', "streaming", "user-read-birthdate", "user-read-email", "user-read-private"]
  });
  window.location = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
}