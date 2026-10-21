const clientId = process.env.OSU_CLIENT_ID;
const clientSecret = process.env.OSU_CLIENT_SECRET;

const reponse = await fetch("https://osu.ppy.sh/oauth/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: "public",
  }),
});

const data = await reponse.json();
console.log(data);

const username = "akwari_k";

const reponseProfil = await fetch(
  `https://osu.ppy.sh/api/v2/users/${encodeURIComponent(username)}?key=username`,
  {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
      Accept: "application/json",
    },
  },
);

if (!reponseProfil.ok) {
  console.log("Erreur :", reponseProfil.status);
} else {
  const profile = await reponseProfil.json();
  console.log(profile.username);
  console.log(profile.statistics);
  console.log(profile.follower_count);
}