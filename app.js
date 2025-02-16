document.addEventListener("DOMContentLoaded", async () => {
    try {
        const profile = await fetchData("/profile");
        displayUserProfile(profile);

        const topArtists = await fetchData("/top-artists");
        displayTopArtists(topArtists);

        const topTracks = await fetchData("/top-tracks");
        displayTopTracks(topTracks);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

// General function to fetch data from backend
async function fetchData(endpoint) {
    const response = await fetch(`http://localhost:3000${endpoint}`);
    if (!response.ok) throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    return response.json();
}

// Profile Display
function displayUserProfile(profile) {
    document.getElementById("profile").innerHTML = `
        <h2>${profile.display_name}</h2>
        <img src="${profile.images[0]?.url || 'https://placehold.co/100'}" alt="Profile Image" />
        <p>Followers: ${profile.followers.total}</p>
    `;
}

// Top Artists Display
function displayTopArtists(artists) {
    const topArtistsDiv = document.getElementById("top-artists");
    topArtistsDiv.innerHTML = artists.map(artist => `
        <div class="artist-card">
            <img src="${artist.images[0]?.url || 'https://placehold.co/150'}" alt="Artist Image" width="100">
            <p>${artist.name}</p>
        </div>
    `).join('');
}

// Top Tracks Display
function displayTopTracks(tracks) {
    const topTracksDiv = document.getElementById("top-tracks");
    topTracksDiv.innerHTML = tracks.map(track => `
        <div class="track-card">
            <p>${track.name} - ${track.artists.map(a => a.name).join(", ")}</p>
        </div>
    `).join('');
}
