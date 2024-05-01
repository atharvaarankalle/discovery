import { Grid } from "@mui/material";
import SongCard from "../components/SongCard";
const PromptPage = () => {
  /* ALL CODE HERE IS FOR TESTING SONG CARDS USING MUI-GRID, CAN REMOVE IF YOU'D LIKE */
  const songDummyData = [
    {
      id: 1,
      title: "Kill Bill",
      album: "SOS",
      artist: "SZA",
      imgUrl:
        "https://media.pitchfork.com/photos/638902d2e5592afa444298b9/master/w_1600%2Cc_limit/SZA-SOS.jpg",
    },
    {
      id: 2,
      title: "FAKE LOVE",
      album: "Love Yourself: Tear",
      artist: "BTS",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Love_Yourself_Tear_Cover.jpeg/220px-Love_Yourself_Tear_Cover.jpeg",
    },
    {
      id: 3,
      title: "Boy's a liar Pt. 2",
      album: "Heaven knows",
      artist: "PinkPantheress, Ice Spice",
      imgUrl:
        "https://upload.wikimedia.org/wikipedia/en/2/20/PinkPantheress_-_Heaven_Knows.png",
    },
    {
      id: 4,
      title: "Dance The Night",
      album: "Barbie The Album",
      artist: "Dua Lipa",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6v8uDheKvV1FzkhTMstj_lccJfojMCYi1FuP5W6qjDg&s",
    },
  ];

  return (
    <>
      <h1>Prompt Page</h1>
      <Grid container spacing={1}>
        {songDummyData.map(({ id, title, album, artist, imgUrl }) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={id}>
            <SongCard
              songTitle={title}
              album={album}
              artist={artist}
              albumArtSrc={imgUrl}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PromptPage;
