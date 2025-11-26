const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

app.post("/download", (req, res) => {
    const { url } = req.body;
    console.log("Received URL:", url);
  
    const outputPath = path.join(__dirname, "downloads", "%(title)s.%(ext)s");
    const command = `yt-dlp -f "bestvideo[ext=mp4][height<=720]+bestaudio[ext=m4a]/best[ext=mp4]/best" -o "${outputPath}" "${url}" --merge-output-format mp4`;
  
    console.log("Running command:", command);
  
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Exec Error:", error.message);
        console.error("stderr:", stderr);
        return res.status(500).send("Download failed.");
      }
  
      console.log("stdout:", stdout);
  
      const match = stdout.match(/Destination: (.+\.mp4)/);
      if (!match) {
        console.error("Could not match filename in stdout.");
        return res.status(500).send("Could not find file.");
      }
  
      const filename = path.basename(match[1]);
      res.json({ downloadUrl: `/downloads/${filename}` });
    });
  });
  

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
