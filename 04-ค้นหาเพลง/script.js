const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const pagination = document.getElementById("pagination");

const apiUrl = "https://api.lyrics.ovh/";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const songtxt = search.value.trim();

  // ถ้าไม่มีการป้อนข้อมูล
  if (!songtxt) {
    alert("ป้อนข้อมูลให้ถูกต้อง");
  } else {
    searchLyrics(songtxt);
  }
});

// songtxt คือคำที่ search แล้วเก็บค่าลงใน song

async function searchLyrics(song) {
  // fetch คือ การส่ง request ไปยัง api
  const res = await fetch(`${apiUrl}/suggest/${song}`);
  const allSongs = await res.json();
  showData(allSongs);
}

// songs รับค่า
function showData(songs) {
  //   console.log(songs);
  result.innerHTML = `
        <ul class="songs">
            ${songs.data
              .map(
                (song) =>
                  `<li>
                        <span>
                            <strong>${song.artist.name}</strong> - ${song.title}
                        </span>
                        <button class="btn"
                         data-artist = "${song.artist.name}"
                         data-title="${song.title}"
                        >เนื้อเพลง</button>
                    </li>`
              )
              //  .join("") แปลง array --> text(string)
              .join("")} 
        </ul>
    `;
  // check ว่าเพลงที่ค้นมีหน้าถัดไปรึป่าว
  if (songs.next || songs.prev) {
    pagination.innerHTML = `
    ${
      songs.prev
        ? ` <button class="btn-paginate" onclick="getMoreSongs('${songs.prev}')">ก่อนหน้า</button>`
        : ""
    }
    ${
      songs.next
        ? ` <button class="btn-paginate" onclick="getMoreSongs('${songs.next}')">ถัดไป</button>`
        : ""
    }
    
    `;
  } else {
    pagination.innerHTML = "";
  }
}

async function getMoreSongs(songsUrl) {
  // https://cors-anywhere.herokuapp.com/ เอามาแก้ cors
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${songsUrl}`);
  const allSongs = await res.json();
  showData(allSongs);
}

// e (event)ก็คือดึงตัวปุ่มมา
result.addEventListener("click", (e) => {
  const clickEl = e.target;

  if (clickEl.tagName == "BUTTON") {
    const artist = clickEl.getAttribute("data-artist");
    const title = clickEl.getAttribute("data-title");

    getLyrics(artist, title);
  }
});

async function getLyrics(artist, title) {
  const res = await fetch(`${apiUrl}/v1/${artist}/${title}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  // check ว่ามีเนื้อเพลงมั้ย
  if (lyrics) {
    result.innerHTML = `
    <h2>
        <span>
            <strong>${artist}</strong> - ${title}
        </span>
    </h2>
    <span>${lyrics}</span>
    <div class="container-btn-back">
        <button class="btn-back" onclick="history.back()">ย้อนกลับ</button>
    </div>
      `;
  } else {
    result.innerHTML = `
    <h2>
        <span>
            <strong>${artist}</strong> - ${title}
        </span>
    </h2>
    <span>ไม่มีเนื้อเพลงนี้</span>
    <div class="container-btn-back">
        <button class="btn-back onclick="history.back()"">ย้อนกลับ</button>
    </div>
    
      `;
  }
  pagination.innerHTML = "";
}
